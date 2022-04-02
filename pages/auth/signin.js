import { getProviders, signIn } from "next-auth/react";
import Button from "../../components/Button";
import OktaIcon from "../../components/icons/OktaIcon";
import GoogleIcon from "../../components/icons/GoogleIcon";

const ProviderIcon = ({ providerId }) => {
  switch (providerId) {
    case "google":
      return <GoogleIcon className={"fill-white h-4 inline-block"} />;
    case "okta":
      return <OktaIcon className={"fill-white h-4 inline-block"} />;
    default:
      return null;
  }
};

export default function SignIn({ providers }) {
  return (
    <div className="flex flex-col items-center gap-4 mt-24">
      <h1>Engineering Growth Framework</h1>
      <p className="pb-6">Please, authorized to continue using an app</p>

      {Object.values(providers).map((provider) => (
        <Button
          key={provider.name}
          onClick={() => signIn(provider.id)}
          color="black"
          size="large"
        >
          Sign in with <ProviderIcon providerId={provider.id} />
        </Button>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}
