import { Logo } from "./Logo";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
export const NavBarGuest = () => {
  const navigate = useNavigate();
  const handleOut = () => {
    navigate("/login");
  };
  const handleLeague = () => {
    navigate("/guest/leagues");
  };
  return (
    <nav className="bg-sky-500 p-4 flex items-center">
      <div className="flex items-center">
        <Logo />
      </div>
      <div className="flex-grow flex justify-center" />
      <Button
        text="Leagues"
        backgroundColor="bg-sky-500"
        onClick={handleLeague}
      />
      <Button text="Out" backgroundColor="bg-sky-500" onClick={handleOut} />
      <div className="flex items-center" />
    </nav>
  );
};

// export default Navbar;
