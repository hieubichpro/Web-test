import ballLogo from "../../assets/ball.png";

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-xl md:text-2xl font-bold text-white">
        {" "}
        {/* Thay đổi kích thước văn bản */}
        Football Tournament
      </span>
      <img
        src={ballLogo}
        className="h-8 w-8 md:h-10 md:w-10 object-contain"
        alt="Football Logo"
      />{" "}
      {/* Thay đổi kích thước hình ảnh */}
    </div>
  );
};
