import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
 

const Login = () => {
  const { signIn, signInwithgoogle, } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
   
  const location = useLocation();
  const from = location.state?.from || "/";
 
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signIn(email, password);
      navigate(from);
    } catch (err) {
  setError("Invalid email or password");
  Swal.fire({
    icon: 'error',
    title: 'Login Failed',
    text: 'Invalid email or password',
    confirmButtonColor: '#3085d6',
  });
}
  };

  const handleGoogleLogin = async () => {
  try {
    const result = await signInwithgoogle();
    const user = result.user;

    
    const userInfo = {

      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      borrowedbookid:[]

    };
     

    
    await axios.post("https://book-exchange-backend-alpha.vercel.app/users", userInfo);

     
    navigate(from || "/");
  } catch (err) {
    setError(err.message);
    
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4 py-12">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            <FaGoogle className="text-red-500" /> Continue with Google
          </button>
        </div>

        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-600 font-medium hover:underline">
            Register
          </Link>
        </p>

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-purple-600 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
