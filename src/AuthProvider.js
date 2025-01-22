import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("email") || null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();

    const loginAction = async (data) => {
        try {
            const res = await axios.get("http://localhost:5000/api/user/login", {params: { email: data.email, password: data.password}});
            console.log(res);
            if (res.data.token) {
                setUser(data.email);
                setToken(res.data.token);
                localStorage.setItem("site", res.data.token);
                localStorage.setItem("email", data.email);
                navigate("/");
                return;
            } else {
                alert("Error: user not found");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
        {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
