import React from "react";
import { Logo } from "../UI/Logo";
import { TextInput } from "../UI/InputText";
import { Button } from "../UI/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/UserService";
import { AxiosError } from "axios";
export const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("login");
  const [password, setPassword] = useState("password");
  const [rePassword, setRePassword] = useState("repassword");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [role, setRole] = useState("role");
  const [name, setName] = useState("name");

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePassword(e.target.value);
  };
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleExit = () => {
    navigate("/login");
  };

  const handleOK = () => {
    UserService.sign_up({ login, password, role, name })
      .then((res) => {
        navigate("/login");
      })
      .catch((err: AxiosError) => {
        setError(true);
        switch (err.response?.status) {
          case 409:
            setErrorMessage("Пользователь с таким логином уже существует.");
            break;
          default:
            setErrorMessage("Ошибка сервера.");
        }
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="bg-sky-500 p-6 rounded w-1/2 h-1/2 ml-auto flex items-center justify-center">
        <Logo />
      </div>

      <div className="bg-white p-6 rounded w-1/2 h-1/2 ml-auto">
        {/* <Logo /> */}
        <h2 className="text-2xl font-bold mb-6 text-center text-sky-500">
          Registrate your account
        </h2>
        <div>
          <TextInput
            label="Username"
            type="username"
            onChange={handleLoginChange}
          />
          <TextInput
            label="Password"
            type="password"
            onChange={handlePasswordChange}
          />
          <TextInput
            label="Re-Password"
            type="password"
            onChange={handleRePasswordChange}
          />
          <TextInput label="Role" type="role" onChange={handleRoleChange} />
          <TextInput label="Name" type="name" onChange={handleNameChange} />
          {error && (
            <span className="text-red-500 text-sm">{errorMessage}</span>
          )}
          <div className="flex space-x-10 ml-7">
            <Button text="OK" backgroundColor="bg-sky-500" onClick={handleOK} />
            <Button
              text="Exit"
              backgroundColor="bg-yellow-500"
              onClick={handleExit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
