import Logo from "./Logo";

const NavBar = () => (
  <nav className="flex items-center justify-between flex-wrap p-2 border-b border-b-slate-400 border-solid">
    <div className="flex items-center flex-shrink-0">
      <Logo />
    </div>
  </nav>
);

export default NavBar;
