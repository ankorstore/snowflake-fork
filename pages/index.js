import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const IndexPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    } else if (status === "authenticated") {
      router.push("/users");
    }
  }, [status]);

  if (status === "loading") {
    return "Loading...";
  }

  return null;
};

export default IndexPage;
