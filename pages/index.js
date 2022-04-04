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
      const userId = session.user.name;
      router.push(`/user/${userId}`);
    }
  }, [status]);

  if (status === "loading") {
    return "Loading...";
  }

  return null;
};

export default IndexPage;
