const FormButton = ({ text, onClick, type = "submit" }) => (
        <button type={type} onClick={onClick} className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-black">
            {text}
        </button>
);

export default FormButton