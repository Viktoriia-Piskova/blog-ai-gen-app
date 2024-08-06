import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps.js";

export default function TokenPopup() {
  const handleClick = async () => {
    const response = await fetch("/api/addTokens", {
      method: "POST",
    });
    const json = await response.json();
  };

  return (
    <div>
      <h1>From token popup</h1>
      <button className="btn" onClick={handleClick}>
        Add Tokens
      </button>
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
