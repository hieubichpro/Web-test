import React, { useState, useEffect } from "react";
import { NavBarAdmin } from "../UI/NavBarAdmin";
import { TextInput } from "../UI/InputText";
import { Button } from "../UI/Button";
import { ClubTable } from "../UI/ClubTable";
import { Club } from "../../types/Clubs";
import { ClubService } from "../../services/ClubService";

export const AdminClubPage = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [newClub, setNewClub] = useState({
    id: 0,
    name: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClubSelect = (club: Club) => {
    setNewClub(club);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClub({ ...newClub, [name]: value });
  };

  const fetchClubs = async () => {
    try {
      const response = await ClubService.getAll();
      setClubs(response.data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const handleDelete = async () => {
    try {
      await ClubService.delete(newClub.id.toString());
      fetchClubs();
      setNewClub({ id: 0, name: "" });
    } catch (error) {
      setError(true);
      setErrorMessage("Error deleting");
    }
  };

  const handleAdd = async () => {
    try {
      await ClubService.create({ name: newClub.name, id_league: 0 });
      fetchClubs();
      setNewClub({ id: 0, name: "" });
    } catch (error) {
      setError(true);

      setErrorMessage("Error adding club");
    }
  };

  const handleModify = async () => {
    try {
      await ClubService.update(newClub.id.toString(), {
        name: newClub.name,
        id_league: 0,
      });
      fetchClubs();
      setNewClub({ id: 0, name: "" });
    } catch (error) {
      setError(true);

      setErrorMessage("Error modifying club");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBarAdmin />
      <div className="flex flex-grow">
        <div className="w-1/2 border-r p-4 flex flex-col justify-center items-center">
          <TextInput
            label="Name"
            name="name"
            value={newClub.name}
            type="text"
            onChange={handleInputChange}
          />
          {error && (
            <span className="text-red-500 text-sm">{errorMessage}</span>
          )}
          <div className="flex space-x-2 mt-4">
            <Button
              text="Add"
              backgroundColor="bg-sky-500"
              onClick={handleAdd}
            />
            <Button
              text="Modify"
              backgroundColor="bg-yellow-500"
              onClick={handleModify}
            />
            <Button
              text="Delete"
              backgroundColor="bg-red-500"
              onClick={handleDelete}
            />
          </div>
        </div>
        <div className="w-1/2 p-4 flex justify-center items-center">
          {" "}
          {/* Căn giữa */}
          <div className="w-full">
            {" "}
            {/* Đảm bảo chiều rộng là 100% */}
            <ClubTable clubs={clubs} onClubSelect={handleClubSelect} />
          </div>
        </div>
      </div>
    </div>
  );
};
