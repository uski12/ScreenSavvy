import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

const Login = () => {

  const [isLoginPage, setIsLoginPage] = useState(true);
  const toggleForm = (e) => {
    e.preventDefault();
    setIsLoginPage(!isLoginPage);
  };
  
    return (
        <div className="flex min-h-screen">
          <div className="w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent">
            <div className="flex h-full items-center justify-center">
              <img src= "/assets/logo_full.png" alt="Screen Savvy" className="object-contain p-40"/>
              </div>
            </div>
          </div>
          <div className="w-1/2 bg-black flex flex-col items-center justify-center p-8">
            <h2 className="text-white text-4xl font-bold mb-8">{isLoginPage ? 'LOGIN' : 'SIGN UP'}</h2>
            {isLoginPage ? <LoginForm /> : <SignUpForm />}
            <p className="mt-4 text-center text-sm">
              {isLoginPage ? (
                <>
                  Don’t have an account?{' '}
                  <a href="#signup" onClick={toggleForm} className="text-green-600 hover:underline">
                    Sign up
                  </a>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <a href="#login" onClick={toggleForm} className="text-green-600 hover:underline">
                    Login
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      );


};


export default Login
