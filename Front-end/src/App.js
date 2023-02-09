import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import Activate from "./pages/home/activate";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} exact />
        <Route element={<LoggedInRoutes />} />
        <Route path="/profile" element={<Profile />} exact />
        <Route path="/" element={<Home />} exact />
        <Route path="/activate/:id" element={<Activate />} exact />
      </Routes>
    </div>
  );
}

export default App;
