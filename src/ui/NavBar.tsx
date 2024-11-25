import Logo from "./Logo";
import Profile from "../components/Profile";
import SearchForm from "../components/SearchForm";

function NavBar() {
  return (
    <header className="border-b border-b-[#999] px-[2vw] py-4">
      <div className="mx-auto flex max-w-[80rem] items-center justify-between">
        <Logo />
        <SearchForm />
        <Profile />
      </div>
    </header>
  );
}

export default NavBar;
