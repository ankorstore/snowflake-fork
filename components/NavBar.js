import Logo from "./Logo";
import { signIn } from "next-auth/react";
import Button from "./Button";

const NavBar = () => (
  <nav className="flex items-center justify-between flex-wrap p-2 border-b border-b-slate-400 border-solid">
    <div className="flex items-center flex-shrink-0">
      <Logo />
    </div>
    <Button onClick={signIn}>Sign in</Button>
  </nav>
);

export default NavBar;
