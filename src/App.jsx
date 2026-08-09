import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./Pages/Sign-in/SignIn";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={Navigate to="/sign-in" replace} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
