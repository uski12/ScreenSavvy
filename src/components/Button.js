const Button = ({ text, onClick, color = "bg-green-800" }) => (
        <button onClick={onClick} className={`px-4 py-2 rounded-lg text-white font-semibold ${color}`} >
            {text}
        </button>
);

export default Button