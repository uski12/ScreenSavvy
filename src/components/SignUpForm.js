import { useState } from 'react';
import InputField from './InputField';
import Button from './FormButton';
import axios from "axios";

const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        const user = {
            name: username,
            email: email,
            password: password,
            watchedList: [],
        };


        if (password) {
            try {
                const response = await axios.post("http://localhost:5000/api/user/signup", user); //adds user data to database
                alert(response.data.msg);
                setError('');
                setUsername('');
                setEmail('');
                setPassword('');


            } catch (error) {
                console.error(error);
                alert("Error!");
            }

        } else {
            setError('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a digit.');
        }    
    };

  return (
    <form onSubmit={handleSignUpSubmit} className="w-full max-w-md px-8">
        <InputField type="email" value={email} placeholder="Email ID" onChange={(e) => setEmail(e.target.value)} />
        <InputField type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <InputField type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} error={error} />
        <Button text="SIGN UP" type="submit" />
    </form>
  )
}

export default SignUpForm
