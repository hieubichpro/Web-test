import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./components/pages/LoginPage";
import { Registration } from "./components/pages/RegistrationPage";
import { AdminClubPage } from "./components/pages/AdminClubPage";
import { AdminUserPage } from "./components/pages/AdminUserPage";
import { RefereeLeaguePage } from "./components/pages/RefereeLeaguePage";
import { RefereeMatchPage } from "./components/pages/RefereeMatchPage";
import { GuestLeaguePage } from "./components/pages/GuestLeaguePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrate" element={<Registration />} />
        <Route path="/admin/users" element={<AdminUserPage />} />
        <Route path="/admin/clubs" element={<AdminClubPage />} />
        <Route path="/referee/:id/leagues" element={<RefereeLeaguePage />} />
        <Route path="/leagues/:id/matches" element={<RefereeMatchPage />} />
        <Route path="/guest/leagues" element={<GuestLeaguePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
