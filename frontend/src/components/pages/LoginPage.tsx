import React, { useState, useEffect } from "react";
import { Logo } from "../UI/Logo";
import { TextInput } from "../UI/InputText";
import { Button } from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/UserService";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // V восстанавливаем состояние формы из localStorage
  useEffect(() => {
    const savedLogin = localStorage.getItem("login");
    const savedPassword = localStorage.getItem("password");
    if (savedLogin) setLogin(savedLogin);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLogin(value);
    localStorage.setItem("login", value); // Сохранение в localStorage
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    localStorage.setItem("password", value); // Сохранение в localStorage
  };

  const handleSignIn = () => {
    UserService.sign_in({ login, password })
      .then((res) => {
        // Очистка localStorage при успешной авторизации
        localStorage.removeItem("login");
        localStorage.removeItem("password");

        if (res.data.role === "Admin") {
          navigate("/admin/users");
        } else {
          navigate(`/referee/${res.data.id}/leagues`);
        }
      })
      .catch((err) => {
        setError(true);
        switch (err.response?.status) {
          case 401:
            setErrorMessage("Неверный пароль.");
            break;
          case 404:
            setErrorMessage("Пользователь с таким логином не найден.");
            break;
          default:
            setErrorMessage("Ошибка сервера.");
            break;
        }
      });
  };

  const handleGuest = () => {
    navigate("/guest/leagues");
  };

  const handleSignUp = () => {
    navigate("/registrate");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="bg-sky-500 p-6 rounded w-full max-w-md h-1/2 flex items-center justify-center mb-6">
        <Logo />
      </div>

      <div className="bg-white p-6 rounded w-full max-w-md h-1/2">
        <h2 className="text-2xl font-bold mt-10 mb-6 text-center text-sky-500">
          Login to your account
        </h2>
        <div>
          <TextInput
            label="Username"
            type="username"
            value={login}
            onChange={handleLoginChange}
          />
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {error && (
            <span className="text-red-500 text-sm">{errorMessage}</span>
          )}
          <div className="flex flex-col space-y-4 mt-10">
            <div className="flex justify-between">
              <Button
                text="Sign-in"
                backgroundColor="bg-sky-500"
                onClick={handleSignIn}
              />
              <Button
                text="Guest"
                backgroundColor="bg-yellow-500"
                onClick={handleGuest}
              />
            </div>
            <Button
              text="Sign-up"
              backgroundColor="bg-green-500"
              onClick={handleSignUp}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
