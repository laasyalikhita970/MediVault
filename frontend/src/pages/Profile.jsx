import { useState } from "react";
import API from "../services/api";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [form, setForm] = useState({
    name: user.name,
    age: user.age
  });
const [passwords, setPasswords] =
useState({
  oldPassword: "",
  newPassword: ""
});
  const saveProfile = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await API.put(
        "/auth/profile",
        form,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert("Profile Updated");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };
const changePassword =
async () => {
  try {
    const token =
      localStorage.getItem(
        "token"
      );

    await API.put(
      "/auth/change-password",
      passwords,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    alert(
      "Password Updated"
    );

  } catch (error) {
    alert(
      "Password Change Failed"
    );
  }
};
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          My Profile
        </h1>

        <input
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
          className="w-full border p-3 rounded mb-4"
          placeholder="Name"
        />

        <input
          value={form.age}
          onChange={(e) =>
            setForm({
              ...form,
              age: e.target.value
            })
          }
          className="w-full border p-3 rounded mb-4"
          placeholder="Age"
        />
<button
  onClick={saveProfile}
  className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
>
  Save Changes
</button>

<h2 className="text-xl font-bold mb-4">
  Change Password
</h2>

<input
  type="password"
  placeholder="Old Password"
  className="w-full border p-3 rounded mb-3"
  onChange={(e) =>
    setPasswords({
      ...passwords,
      oldPassword: e.target.value
    })
  }
/>

<input
  type="password"
  placeholder="New Password"
  className="w-full border p-3 rounded mb-3"
  onChange={(e) =>
    setPasswords({
      ...passwords,
      newPassword: e.target.value
    })
  }
/>

<button
  onClick={changePassword}
  className="bg-red-500 text-white px-4 py-2 rounded"
>
  Change Password
</button>

      </div>
    </div>
  );
}

export default Profile;