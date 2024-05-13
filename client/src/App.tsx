import { Routes, Route } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import MainLayout from "./layout/main-layout";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </MainLayout>
  );
}
