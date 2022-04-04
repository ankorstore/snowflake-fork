import Logo from "./Logo";
import { useSession, signOut } from "next-auth/react";
import Button from "./Button";

const NavBar = () => {
  const { status } = useSession();

  return (
    <nav className="flex items-center justify-between flex-wrap p-2 border-b border-b-slate-400 border-solid">
      <div className="flex items-center flex-shrink-0">
        <Logo />
      </div>
      {status === "authenticated" ? (
        <Button onClick={signOut}>Sign out</Button>
      ) : null}
    </nav>
  );
};

export default NavBar;
