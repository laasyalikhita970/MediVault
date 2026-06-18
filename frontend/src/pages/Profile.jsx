import { useState } from "react";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [profile] = useState(user);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          My Profile
        </h1>

        <p className="mb-3">
          <strong>Name:</strong> {profile.name}
        </p>

        <p className="mb-3">
          <strong>Phone:</strong> {profile.phone}
        </p>

        <p className="mb-3">
          <strong>Age:</strong> {profile.age}
        </p>

        <p className="mb-3">
          <strong>Role:</strong> {profile.role}
        </p>

      </div>
    </div>
  );
}

export default Profile;