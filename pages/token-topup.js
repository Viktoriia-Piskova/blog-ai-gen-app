import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout";

export default function TokenPopup() {
  return (
    <div>
      <h1>From token popup</h1>
    </div>
  );
}

TokenPopup.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}> {page} </AppLayout>
}

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
