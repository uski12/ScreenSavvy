import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import Navbar from "../components/Navbar";

const Box = ({ icon, text1, text2, text3 }) => (
    <div className="grid p-5 place-items-center h-72 w-96">
    {/* Icon */}
    <div className="w-24 h-24 bg-gray-400 flex justify-center items-center rounded-full">
    <IconWithCircle Icon={icon} bgColor="bg-gray-400"/>
    </div>

    {/* Text */}
    <div className="text-gray-400 font-light text-start space-y-2">
    <p>{text1}</p>
    <p>{text2}</p>
    <p>{text3}</p>
    </div>
    </div>
);

const IconWithCircle = ({ Icon, bgColor }) => (
    <div className={`w-16 h-16 flex items-center justify-center rounded-full ${bgColor} text-white`}>
    <Icon className="text-5xl" />
    </div>
);

const info = [
    {
        icon: FaMapMarkerAlt,
        text1: "House of Lords, unit no. 305",
        text2: "Door no. 15 & 16, St. Marks Road",
    },
    {
        icon: FaPhoneAlt,
        text1: "+91 12345 67890",
    },
    {
        icon: FaEnvelope,
        text1: "whyrusogayuski12@gmail.com",
    },
];


const About = () => (
    <div className="h-screen overflow-hidden">
    {/* Navbar */}
    <Navbar />

    {/* Boxes Section */}
    <div className="flex justify-center items-center bg-teal-800 h-[45vh] space-x-6">
    {info.map((box, index) => (
        <Box
        key={index}
        icon={box.icon}
        text1={box.text1}
        text2={box.text2}
        text3={box.text3}
        />
    ))}
    </div>

    {/* About Section */}
    <div className="grid bg-gray-900 h-[50vh] text-gray-400 place-items-center px-5">
    <h1 className="text-3xl font-bold">About</h1>
    <p className="text-center w-1/2">
    This software is to manage and track your watched movies, as well as show new recommendations based on your watch history. It features dynamic web pages (no reloading), dynamic components, among various other features.
    </p>
    </div>
    </div>
);

export default About;

