import React from "react";
import { Match } from "../../types/Matches"; // Đường dẫn đến file chứa interface Match

interface MatchTableProps {
  matches: Match[];
}

export const MatchTable: React.FC<MatchTableProps> = ({ matches }) => {
  return (
    <div className="max-h-60 overflow-y-auto">
      {" "}
      {/* Thêm div bao quanh bảng */}
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-sky-500 p-2">Id</th>
            <th className="border border-sky-500 p-2">Name Home</th>
            <th className="border border-sky-500 p-2">Goal Home</th>
            <th className="border border-sky-500 p-2">Goal Guest</th>
            <th className="border border-sky-500 p-2">Name Guest</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td className="border border-sky-500 p-2">{match.id}</td>
              <td className="border border-sky-500 p-2">{match.nameHome}</td>
              <td className="border border-sky-500 p-2">{match.goalHome}</td>
              <td className="border border-sky-500 p-2">{match.goalGuest}</td>
              <td className="border border-sky-500 p-2">{match.nameGuest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
