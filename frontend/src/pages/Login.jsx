import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );
      localStorage.setItem(
  "role",
  res.data.user.role
);

     if (res.data.user.role === "doctor") {
  navigate("/doctor");
} else if (res.data.user.role === "helper") {
  navigate("/helper");
} else {
  navigate("/dashboard");
}
    } catch (error) {
      alert("Login Failed");
      console.log(error);
    }
  };

  
    return (
 <div
  className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
  style={{
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.25), rgba(255,255,255,0.25)), url('/medilocker-bg.png')",
}}
>
    <div className="bg-white/30 backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-2xl w-96">
        

  <h1 className="text-4xl font-bold text-center text-blue-700 mb-2">
  MediLocker
</h1>

<p className="text-center text-gray-600 mb-6">
  Your Secure Medical Vault
</p>


        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
           className="w-full p-3 rounded-lg mb-4 bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded-lg mb-4 bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
          <p className="text-center mt-4 text-sm">
  Don't have an account?{" "}
  <span
    onClick={() => navigate("/register")}
    className="text-blue-700 cursor-pointer font-semibold"
  >
    Register
  </span>
</p>
        </form>
      </div>
    </div>
  );
}

export default Login;