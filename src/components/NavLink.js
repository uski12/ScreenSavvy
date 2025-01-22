import { NavLink as Link } from "react-router-dom";

const NavLink = ({ to, text }) => (
        <Link to={to} className="text-gray-300 hover:text-green-600 transition-colors active:text-green-600">
            {text}
        </Link>
);

export default NavLink
