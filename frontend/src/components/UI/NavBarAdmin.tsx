import { Logo } from "./Logo";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/UserService";
export const NavBarAdmin = () => {
  const navigate = useNavigate();
  const handleOut = () => {
    UserService.sign_out();
    navigate("/login");
  };
  const handleUsers = () => {
    navigate("/admin/users");
  };

  const handleClubs = () => {
    navigate("/admin/clubs");
  };

  return (
    <nav className="bg-sky-500 p-4 flex items-center justify-between">
      <div className="">
        <Logo />
      </div>
      <div className="" />
      <Button text="Clubs" backgroundColor="bg-sky-500" onClick={handleClubs} />
      <Button text="Users" backgroundColor="bg-sky-500" onClick={handleUsers} />
      <Button text="Log out" backgroundColor="bg-sky-500" onClick={handleOut} />
    </nav>
  );
};
