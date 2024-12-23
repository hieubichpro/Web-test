interface ButtonProps {
  text: string;
  backgroundColor?: string; // Màu nền tùy chọn
  onClick: () => void; // Hàm xử lý sự kiện click
}

export const Button: React.FC<ButtonProps> = ({
  text,
  backgroundColor = "bg-blue-500",
  onClick,
}) => {
  return (
    <button
      className={`text-white font-bold py-2 px-4 rounded ${backgroundColor} 
                  hover:bg-red-300 transition duration-300 
                  w-full sm:w-auto`} // Thêm lớp w-full cho màn hình nhỏ và w-auto cho màn hình lớn
      onClick={onClick}
    >
      {text}
    </button>
  );
};

// export default Button;
