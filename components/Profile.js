import { signOut, useSession } from "next-auth/react";
import Button from "./Button";

const Profile = () => {
  const { data: session } = useSession();
  return (
    <div>
      Signed in as {session.user.email} <br />
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
};

export default Profile;
