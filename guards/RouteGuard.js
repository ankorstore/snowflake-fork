import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const RouteGuard = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      setLoading(false);
    } else {
      router.push("/login");
    }
  }, [session]);

  return loading ? null : children;
};

export default RouteGuard;
