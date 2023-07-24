import { User } from "firebase/auth";
import Image from "next/image";

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const Header = ({ onLogout, user }: HeaderProps) => {
  return (
    <header className="bg-white w-full">
      <nav className="flex justify-between items-center w-[95%] mx-auto">
        <div className="flex justify-betwee items-center">
          <Image src={"/logo.png"} alt="logo" width={64} height={64} />
          <label className="text-[#2c3e50] font-bold text-xl">Josh</label>
        </div>
        <div className="hidden md:block">
          <label className="text-[#2c3e50] font-bold text-xl">
            Find what suits you <b>{user?.email?.split(".")[0]}</b> !
          </label>
        </div>
        <div>
          <button
            className="bg-[#2c3e50] text-white px-5 py-2 rounded-xl hover:bg-[#bdc3c7]"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
