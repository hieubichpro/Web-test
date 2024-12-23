import React from "react";
import { LeagueView } from "../../types/Leagues";

interface LeagueTableProps {
  leagues: LeagueView[];
  onLeagueSelect: (league: LeagueView) => void; // Thêm prop cho hàm callback
}

export const LeagueTable: React.FC<LeagueTableProps> = ({
  leagues,
  onLeagueSelect,
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
            <th className="border border-sky-500 p-2">Name User</th>
          </tr>
        </thead>
        <tbody>
          {leagues.map((league) => (
            <tr
              key={league.id}
              onClick={() => onLeagueSelect(league)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="border border-sky-500 p-2">{league.id}</td>
              <td className="border border-sky-500 p-2">{league.name}</td>
              <td className="border border-sky-500 p-2">{league.name_User}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
