import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Component() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/users");
    }
  }, [session]);

  if (session) {
    return "Loading...";
  }

  return <h1 className="text-center">Please, signed in to use the app</h1>;
}
