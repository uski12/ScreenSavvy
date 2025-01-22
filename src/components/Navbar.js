import { FaSearch, FaUser } from "react-icons/fa";
import NavLink from "./NavLink";
import { useState } from "react";
import Search from "./Search";
import { useAuth } from '../AuthProvider';
import axios from "axios";

const Navbar = () => {
    const auth = useAuth();

    const [searchExpanded, setSearchExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    // Handle search toggle
    const handleSearchClick = () => {
        setSearchExpanded(!searchExpanded);
        if (!searchExpanded) {
            setSearchQuery('');
            setShowSearchResults(false);
        }
    };

    // Handle input change for search query
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle search submission
    const handleSearchSubmit = () => {
        if (searchQuery) {
            setShowSearchResults(true);
        }
    };

    // Reset search
    const handleResetSearch = () => {
        setSearchExpanded(false);
        setSearchQuery('');
        setShowSearchResults(false);
    };


    const deleteAcc = async () => {
        const response = await axios.delete("http://localhost:5000/api/user/delete", {data: { email: auth.user }});
        console.log(auth.user);
        auth.logOut();
    }

    return (
        <>
            <nav className="bg-black h-20 flex justify-between px-10 items-center z-12 font-sans">
                <div className="flex items-center space-x-6 text-xl font-bold uppercase">
                    <a href="/"> <img src="/assets/logo-icon.png" className="h-10 pr-8" alt="Logo" /> </a>
                    <NavLink to="/" text="Home" />
                    <NavLink to="/movies" text="Movies" />
                    <NavLink to="/tv" text="TV Shows" />
                    <NavLink to="/about" text="About" />
                </div>

                <div className="flex items-center space-x-4">
                    <div className={`relative transition-all duration-300 ${searchExpanded ? 'w-72' : 'w-0'}`}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                            placeholder="Search for movies and tv shows"
                            className={`transition-all duration-300 w-full bg-transparent text-white text-sm border-b-2 border-white p-2 ${searchExpanded ? 'opacity-100' : 'opacity-0'}`}
                        />
                    </div>

                    <FaSearch className="text-white h-6 w-6 cursor-pointer" onClick={handleSearchClick} />

                    <div className="relative pl-5">
                        <FaUser className="text-white h-6 w-6 cursor-pointer" onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} />
                        {profileDropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-black text-white p-2 shadow-lg z-30 w-[5rem]">
                                <button onClick={() => auth.logOut()}>Sign Out</button>
                                <button onClick={() => deleteAcc()}>Delete account</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {showSearchResults && (
                <Search searchQuery={searchQuery} onReset={handleResetSearch} />
            )}
        </>
    );
};

export default Navbar;
