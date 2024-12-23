import React, { useEffect, useState } from "react";
import { TextInput } from "../UI/InputText";
import { Button } from "../UI/Button";
import { LeagueView } from "../../types/Leagues";
import { LeagueTable } from "../UI/LeagueTable";
import { NavBarReferee } from "../UI/NavBarReferee";
import { getUser } from "../../utils/UserUtils";
import { LeagueService } from "../../services/LeagueService";
import { UserService } from "../../services/UserService";

export const RefereeLeaguePage = () => {
  const [leagues, setLeagues] = useState<LeagueView[]>([]);
  const [newLeague, setNewLeague] = useState({
    id: 0,
    name: "",
  });
  const [error, setError] = useState<string>("");
  const currUser = getUser();

  const handleLeagueSelect = (league: LeagueView) => {
    setNewLeague(league);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLeague({ ...newLeague, [name]: value });
    localStorage.setItem("newLeague", JSON.stringify(newLeague));
  };

  const fetchLeagues = async () => {
    try {
      if (currUser) {
        const response = await UserService.get_leagues(currUser.id.toString());
        setLeagues(response.data);
      }
    } catch (error) {
      console.error("Error fetching leagues:", error);
    }
  };

  useEffect(() => {
    if (currUser) {
      fetchLeagues();
    }
  }, [currUser]);

  useEffect(() => {
    const savedLeague = localStorage.getItem("newLeague");
    if (savedLeague) {
      setNewLeague(JSON.parse(savedLeague));
    }
  }, []);

  const handleDelete = async () => {
    try {
      localStorage.removeItem("newLeague");
      await LeagueService.delete(newLeague.id.toString());
      fetchLeagues();
      setNewLeague({ id: 0, name: "" }); // Clear input fields
    } catch (error) {
      setError("Error deleting");
    }
  };

  const handleAdd = async () => {
    try {
      localStorage.removeItem("newLeague");
      await LeagueService.create({
        name: newLeague.name,
        idUser: currUser != null ? currUser.id : 1,
      });
      fetchLeagues();
      setNewLeague({ id: 0, name: "" });
    } catch (error) {
      setError("Error adding league");
    }
  };

  const handleModify = async () => {
    try {
      localStorage.removeItem("newLeague");
      await LeagueService.update(newLeague.id.toString(), {
        name: newLeague.name,
        idUser: currUser != null ? currUser.id : 1,
      });
      fetchLeagues();
      setNewLeague({ id: 0, name: "" }); // Clear input fields
    } catch (error) {
      setError("Error modifying");
    }
  };

  if (!currUser) {
    console.error("not user");
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      <NavBarReferee />
      <div className="flex flex-grow flex-col md:flex-row">
        <div className="w-full md:w-1/2 border-r p-4 flex flex-col justify-center items-center">
          <TextInput
            label="Name"
            name="name"
            value={newLeague.name}
            type="text"
            onChange={handleInputChange}
          />
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <div className="flex space-x-2 mt-4">
            <Button
              text="Add"
              backgroundColor="bg-sky-500"
              onClick={handleAdd}
            />
            <Button
              text="Modify"
              backgroundColor="bg-yellow -500"
              onClick={handleModify}
            />
            <Button
              text="Delete"
              backgroundColor="bg-red-500"
              onClick={handleDelete}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          <div className="w-full">
            <LeagueTable
              leagues={leagues}
              onLeagueSelect={handleLeagueSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
