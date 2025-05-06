import React from 'react';
import { useLocation } from 'react-router-dom';

const Login = () => {
    const location = useLocation();
    const error = new URLSearchParams(location.search).get('error');

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                {error && <p className="text-red-500 mb-4">Error: {decodeURIComponent(error)}</p>}
                <p>Please log in with GitHub.</p>
                <button
                    onClick={() => {
                        window.location.href = 'http://localhost:3000/auth/github/login';
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                    Login with GitHub
                </button>
            </div>
        </div>
    );
};

export default Login;