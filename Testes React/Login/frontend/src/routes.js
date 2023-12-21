import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Header/NavBar";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Config from "./pages/config/config";
import Register from "./pages/register/register";

function RoutesApp() {

    return (
        <div>
            <div>
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/config" element={<Config />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default RoutesApp;