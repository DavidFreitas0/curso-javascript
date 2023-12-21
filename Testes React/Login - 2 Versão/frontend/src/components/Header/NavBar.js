import { Link } from "react-router-dom";
import "./NavBar.css";

function Navbar() {
    return (
        <div className="containerNav">
            <nav className="header">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                     <li>
                        <Link to="/login">Entre na sua conta</Link>
                    </li>
                    <li>
                        <Link to="/config">Configurações</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Navbar;