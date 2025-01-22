import { useState } from 'react';
import InputField from './InputField';
import Button from './FormButton'
import { useAuth } from '../AuthProvider'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState("");

	const auth = useAuth();
	const data = {
		email: email,
		password: password,
	};

	const navigate = useNavigate();

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		try {
			auth.loginAction(data);
			console.log();
		} catch (error) {
			console.error(error);
			alert("Error!");
		}
	};

	return (
		<form onSubmit={handleLoginSubmit} className="w-full max-w-md">
		<InputField type="email" value={email} placeholder="Email ID" onChange={(e) => setEmail(e.target.value)} />
		<InputField type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
		<div className="flex items-center justify-between text-gray-300 mb-4">
		<label className="flex items-center">
		<input type="checkbox" className="mr-2" />
		Remember me
		</label>
		<a href="#" className="text-green-600 hover:text-green-800">
		Forgot password?
		</a>
		</div>
		<Button text="LOGIN" type="submit" />
		</form>
	)
}

export default LoginForm
