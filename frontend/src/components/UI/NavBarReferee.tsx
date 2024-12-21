import { Logo } from "./Logo";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
export const NavBarReferee = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    alert("Button was clicked");
  };
  const handleLogout = () => {
    navigate("/");
  };
  return (
    <nav className="bg-sky-500 p-4 flex items-center">
      <div className="flex items-center">
        <Logo />
      </div>
      <div className="flex-grow flex justify-center" />
      <Button
        text="My Leagues"
        backgroundColor="bg-sky-500"
        onClick={handleClick}
      />
      <Button
        text="Log out"
        backgroundColor="bg-sky-500"
        onClick={handleLogout}
      />
      <div className="flex items-center" />
    </nav>
  );
};
