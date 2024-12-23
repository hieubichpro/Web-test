import React from "react";
import { User } from "../../types/Users"; // Đường dẫn đến file chứa interface User

interface UserTableProps {
  users: User[];
  onUserSelect: (user: User) => void; // Thêm prop cho hàm callback
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onUserSelect,
}) => {
  return (
    <div className="max-h-60 overflow-y-auto">
      {" "}
      {/* Thêm div bao quanh bảng */}
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-sky-500 p-2">Id</th>
            <th className="border border-sky-500 p-2">Login</th>
            <th className="border border-sky-500 p-2">Password</th>
            <th className="border border-sky-500 p-2">Role</th>
            <th className="border border-sky-500 p-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              onClick={() => onUserSelect(user)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="border border-sky-500 p-2">{user.id}</td>
              <td className="border border-sky-500 p-2">{user.login}</td>
              <td className="border border-sky-500 p-2">{user.password}</td>
              <td className="border border-sky-500 p-2">{user.role}</td>
              <td className="border border-sky-500 p-2">{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
