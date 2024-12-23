import React, { useState, useEffect } from "react";
import { Logo } from "../UI/Logo";
import { TextInput } from "../UI/InputText";
import { Button } from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/UserService";
import { AxiosError } from "axios";

export const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  // V восстанавливаем состояние формы из localStorage
  useEffect(() => {
    const savedLogin = localStorage.getItem("registration_login");
    const savedPassword = localStorage.getItem("registration_password");
    const savedRePassword = localStorage.getItem("registration_rePassword");
    const savedRole = localStorage.getItem("registration_role");
    const savedName = localStorage.getItem("registration_name");

    if (savedLogin) setLogin(savedLogin);
    if (savedPassword) setPassword(savedPassword);
    if (savedRePassword) setRePassword(savedRePassword);
    if (savedRole) setRole(savedRole);
    if (savedName) setName(savedName);
  }, []);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLogin(value);
    localStorage.setItem("registration_login", value); // Сохранение в localStorage
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    localStorage.setItem("registration_password", value); // Сохранение в localStorage
  };

  const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRePassword(value);
    localStorage.setItem("registration_rePassword", value); // Сохранение в localStorage
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRole(value);
    localStorage.setItem("registration_role", value); // Сохранение в localStorage
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    localStorage.setItem("registration_name", value); // Сохранение в localStorage
  };

  const handleExit = () => {
    navigate("/login");
  };

  const handleOK = () => {
    UserService.sign_up({ login, password, role, name })
      .then((res) => {
        // Очистка localStorage при успешной регистрации
        localStorage.removeItem("registration_login");
        localStorage.removeItem("registration_password");
        localStorage.removeItem("registration_rePassword");
        localStorage.removeItem("registration_role");
        localStorage.removeItem("registration_name");

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
      <div className="bg-sky-500 p-6 rounded w-full max-w-md flex items-center justify-center mb-6">
        <Logo />
      </div>

      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-sky-500">
          Registrate your account
        </h2>
        <div>
          <TextInput
            label="Username"
            type="text"
            value={login}
            onChange={handleLoginChange}
          />
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <TextInput
            label="Re-Password"
            type="password"
            value={rePassword}
            onChange={handleRePasswordChange}
          />
          <TextInput
            label="Role"
            type="text"
            value={role}
            onChange={handleRoleChange}
          />
          <TextInput
            label="Name"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
          {error && (
            <span className="text-red-500 text-sm">{errorMessage}</span>
          )}
          <div className="flex space-x-10 mt-4">
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
