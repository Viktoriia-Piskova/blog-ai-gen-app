import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps.js";

export default function TokenPopup() {
  const handleClick = async () => {
    const response = await fetch("/api/addTokens", {
      method: "POST",
    });
    const json = await response.json();

    console.log(json)
    window.location.href = json.session.url
  };

  return (
    <div className="px-2">
      <h1 className="text-center">Buy 10 tokens for $1!</h1>
      <button className="btn max-w-[250px] block m-auto my-9" onClick={handleClick}>
        Add Tokens
      </button>
      <p>Of course, it's a dummy payment; you don't need to enter your real card data!</p>
      <p>Use this: 4242 4242 4242 4242</p>
      <p>And yes, the generated posts will have the "made by the free AI API" quality</p>
    </div>
  );
}

TokenPopup.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}> {page} </AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    return { props };
  },
});
