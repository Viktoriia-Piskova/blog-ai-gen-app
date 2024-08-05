import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useState } from "react";
import { useRouter } from "next/router";
// import Markdown from "react-markdown";

export default function NewPost(props) {
  // const [postContent, setPostContent] = useState("");
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/generatePost", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ topic, keywords }),
    });
    const json = await response.json();
    // setPostContent(json.post.postContent);
    console.log("Response from news.js: ", json);
    if (json?.postID) {
      router.push(`/post/${json?.postID}`)
    }
  };
  return (
    <div className="p-4">
      <form className="" onSubmit={(e) => handleSubmit(e)}>
        <div className="">
          <label>
            <strong>Generate blog post on the topic of:</strong>
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
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
            className="block w-full my-2 px-4 py-2 rounded-sm resize-none border-2 border-slate-500"
          />
        </div>
        <button className="btn" type="submit">
          Generate
        </button>
      </form>
      {/* <Markdown className="p-2 abg-markdown">{postContent}</Markdown> */}
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}> {page} </AppLayout>;
};

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
