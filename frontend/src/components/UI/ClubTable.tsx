import React from "react";
import { Club } from "../../types/Clubs";

interface ClubTableProps {
  clubs: Club[];
  onClubSelect: (club: Club) => void;
}

export const ClubTable: React.FC<ClubTableProps> = ({
  clubs,
  onClubSelect,
}) => {
  return (
    <div className="max-h-60 overflow-y-auto">
      {" "}
      {/* Thêm div bao quanh bảng */}
      <table className="min-w-full border-collapse border border-sky-200">
        <thead>
          <tr>
            <th className="border border-sky-500 p-2">Id</th>
            <th className="border border-sky-500 p-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((club) => (
            <tr
              key={club.id}
              onClick={() => onClubSelect(club)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="border border-sky-500 p-2">{club.id}</td>
              <td className="border border-sky-500 p-2">{club.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
