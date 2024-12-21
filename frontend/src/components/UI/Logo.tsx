import ballLogo from "../../assets/ball.png";

export const Logo: React.FC = () => {
  return (
    <div className="flex">
      <span className="mr-4 text-2xl font-bold text-white">
        Football Tournament
      </span>
      <img src={ballLogo} className="h-10 w-10 object-contain"></img>
    </div>
  );
};
