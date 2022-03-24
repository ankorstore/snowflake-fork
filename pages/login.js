import { useSession, signIn, signOut } from "next-auth/react";

const Button = (props) => {
  return (
    <>
      <style jsx>{`
        button {
          padding: 10px 16px;
          border-radius: 2px;
          border: 1px solid black;
          background: transparent;
        }
      `}</style>
      <button {...props} />
    </>
  );
};

export default function Component() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  );
}
