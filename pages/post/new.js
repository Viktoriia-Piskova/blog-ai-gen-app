import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useState } from "react";
import { useRouter } from "next/router";
import { getAppProps } from "../../utils/getAppProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain } from "@fortawesome/free-solid-svg-icons";
export default function NewPost(props) {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generatePost", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ topic, keywords }),
      });
      const json = await response.json();
      if (json?.postID) {
        router.push(`/post/${json?.postID}`);
      }
    } catch (e) {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full overflow-hidden">
      {!!isGenerating && (
        <div className="text-green-500 flex h-full w-full animate-pulse flex-col justify-center items-center">
          <FontAwesomeIcon className="text-8xl" icon={faBrain} />
          <h2>Generating...</h2>
        </div>
      )}
      {!isGenerating && (
        <div className="w-full h-full flex flex-col overflow-auto px-4">
          <form
            className="m-auto w-full max-w-screen-sm p-4 bg-slate-100 rounded-md shadow-xl shadow-slate-200 border border-slate-200 "
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="">
              <label>
                <strong>Generate blog post on the topic of:</strong>
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                maxLength={100}
                className="block w-full my-2 px-4 py-2 rounded-sm resize-none border-2 border-slate-500"
              />
            </div>
            <div className="">
              <label>
                <strong>Targeting the following keywords:</strong>
              </label>
              <textarea
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                maxLength={80}
                className="block w-full my-2 px-4 py-2 rounded-sm resize-none border-2 border-slate-500"
              />
              <small className="block mb-2">
                Separate keywords with a comma
              </small>
            </div>
            <button className="btn" type="submit" disabled={!keywords.trim() || !topic.trim()}>
              Generate
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}> {page} </AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    if (!props.availableTokens) {
      return {
        redirect: {
          destination: "/token-topup",
          permanent: false,
        },
      };
    }
    return { props };
  },
});
