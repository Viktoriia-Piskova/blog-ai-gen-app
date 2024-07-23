import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function TokenPopup() {
  return (
    <div>
      <h1>From token popup</h1>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
