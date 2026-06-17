import { useState } from "react";
import API from "../services/api";

function Register() {
const [form, setForm] = useState({
  name: "",
  phone: "",
  password: "",
  age: "",
  role: "patient"
});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/register",
        form
      );

      alert("Registration Successful");

      console.log(res.data);
    } catch (error) {
      console.log(error);

      alert("Registration Failed");
    }
  };

return (
  <div
    className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/medilocker-bg.png')",
    }}
  >
    <div className="bg-white/40 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-96">

      <h1 className="text-4xl font-bold text-center text-blue-700 mb-2">
        MediLocker
      </h1>

      <p className="text-center text-gray-700 mb-6">
        Create Your Account
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />
<div>
  <label className="block mb-1 font-medium">
    Role
  </label>

  <select
    name="role"
    value={form.role}
    onChange={handleChange}
    className="w-full border rounded-lg p-3"
  >
    <option value="patient">
      Patient
    </option>

    <option value="doctor">
      Doctor
    </option>

    <option value="helper">
      Helper
    </option>
  </select>
</div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Register
        </button>
        <p className="text-center mt-4">
  Already have an account?
  <a
    href="/"
    className="text-blue-600 font-semibold ml-1"
  >
    Login
  </a>
</p>
      </form>

    </div>
  </div>
);
}

export default Register;