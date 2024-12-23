import React, { useState, useEffect } from "react";
import { LeagueView, RawLeague } from "../../types/Leagues";
import { LeagueTable } from "../UI/LeagueTable";
import { MatchTable } from "../UI/MatchTable";
import { Match } from "../../types/Matches";
import { NavBarGuest } from "../UI/NavBarGuest";
import { LeagueService } from "../../services/LeagueService";

export const GuestLeaguePage = () => {
  const [leagues, setLeagues] = useState<LeagueView[]>([]);
  const [newLeague, setNewLeague] = useState({
    id: 0,
    name: "",
  });
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string>("");

  const handleLeagueSelect = (league: RawLeague) => {
    setNewLeague(league);
  };

  const fetchLeagues = async () => {
    try {
      const response = await LeagueService.getAll();
      setLeagues(response.data);
    } catch (error) {
      console.error("Error fetching leagues:", error);
    }
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await LeagueService.get_matches(newLeague.id.toString());
      setMatches(response.data);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  useEffect(() => {
    if (newLeague.id) {
      fetchMatches();
    }
  }, [newLeague]);

  return (
    <div className="flex flex-col h-screen">
      <NavBarGuest />
      <div className="flex flex-grow flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          <div className="w-full">
            <LeagueTable
              leagues={leagues}
              onLeagueSelect={handleLeagueSelect}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          <div className="w-full">
            <MatchTable matches={matches} />
          </div>
        </div>
      </div>
    </div>
  );
};
