import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './ui/firebaseConfig';

export default function GoogleLoginPage() {
  const navigate = useNavigate();
  const [useGoogleSignIn, setUseGoogleSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google sign-in successful', user);
      navigate('/chat'); // Redirect to chat app after Google sign-in
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError("Failed to sign in with Google");
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/chat'); // Redirect to chat app after email sign-in
    } catch (error) {
      console.error("Error signing in with email:", error);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-teal-500 to-green-500">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg w-full max-w-4xl overflow-hidden">
        
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 px-8 py-6 md:px-12 flex flex-col items-center">
          <Card className="w-full max-w-md p-6 shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-semibold text-gray-800 mb-6">
                {useGoogleSignIn ? "Login with Google" : "Login with Email"}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              {error && <p className="text-red-500">{error}</p>}
              {useGoogleSignIn ? (
                <Button 
                  onClick={handleGoogleSignIn} 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md"
                >
                  Sign in with Google
                </Button>
              ) : (
                <form onSubmit={handleEmailSignIn} className="w-full space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md">
                    Sign in
                  </Button>
                </form>
              )}
              <button
                onClick={() => setUseGoogleSignIn(!useGoogleSignIn)}
                className="mt-4 text-blue-500 underline"
              >
                {useGoogleSignIn ? "Sign in with Email" : "Sign in with Google"}
              </button>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Side: Image or Illustration */}
        <div className="hidden md:block w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/600)' }}></div>

      </div>
    </div>
  );
}
