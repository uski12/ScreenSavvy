const InputField = ({ type, value, placeholder, onChange, error='' }) => (
    <div className="mb-4">
    <input
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    className="w-full px-4 py-3 rounded-lg bg-white-800 text-black focus:outline-none focus:ring-2 focus:ring-green-600"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>

);

export default InputField