import { TextInput } from "../UI/InputText";
import { Button } from "../UI/Button";
import { useState } from "react";
import { NavBarReferee } from "../UI/NavBarReferee";
import { MatchTable } from "../UI/MatchTable";
import { Match } from "../../types/Matches";
export const RefereeMatchPage = () => {
  const myHandle = () => {
    alert("My alert");
  };
  const [matches, setMatches] = useState<Match[]>([]);

  return (
    <div className="flex flex-col h-screen">
      <NavBarReferee />
      <div className="flex flex-grow">
        <div className="w-1/2 border-r p-4 flex flex-col justify-center items-center">
          <TextInput label="ID" type="ID" />
          <TextInput label="Id Home" type="Id Home" />
          <TextInput label="Id Guest" type="Id Guest" />
          <TextInput label="Id League" type="Id League" />
          <TextInput label="Goal Home" type="Goal Home" />
          <TextInput label="Goal Guest" type="Goal Guest" />
          <div className="flex space-x-2 mt-4">
            <Button
              text="Add"
              backgroundColor="bg-sky-500"
              onClick={myHandle}
            />
            <Button
              text="Modify"
              backgroundColor="bg-yellow-500"
              onClick={myHandle}
            />
            <Button
              text="Delete"
              backgroundColor="bg-red-500"
              onClick={myHandle}
            />
          </div>
        </div>
        <div className="w-1/2 p-4">
          <MatchTable matches={matches} />
        </div>
      </div>
    </div>
  );
};
