import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function HelperDashboard() {
  const [phone, setPhone] = useState("");
  const [records, setRecords] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const searchPatient = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await API.get(
        `/records/${phone}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setRecords(res.data);
    } catch (error) {
      console.log(error);
      alert("Patient not found");
    }
  };

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">
            Helper Dashboard
          </h1>

          <p className="text-gray-500">
            Welcome {user?.name}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter Patient Phone"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          className="border p-3 rounded w-80"
        />

        <button
          onClick={searchPatient}
          className="bg-blue-600 text-white px-5 rounded"
        >
          Search
        </button>
      </div>

      {records.map((record) => (
        <div
          key={record._id}
          className="bg-white rounded-xl shadow p-5 mb-4"
        >
          <h2 className="text-2xl font-bold text-blue-600">
            {record.title}
          </h2>

          <p>
            <strong>Patient:</strong>{" "}
            {record.patientName}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {record.patientPhone}
          </p>

          <p>
            <strong>Diagnosis:</strong>{" "}
            {record.diagnosis || "N/A"}
          </p>

          <p>
            <strong>Doctor:</strong>{" "}
            {record.doctorName || "N/A"}
          </p>

          <p>
            <strong>Department:</strong>{" "}
            {record.department || "N/A"}
          </p>

          <p>
            <strong>Notes:</strong>{" "}
            {record.notes || "N/A"}
          </p>

          <p>
            <strong>Medicines:</strong>{" "}
            {record.medicines?.length
              ? record.medicines.join(", ")
              : "N/A"}
          </p>

          {record.fileUrl && (
            <div className="mt-4">
              <a
                href={`http://localhost:5000${record.fileUrl}`}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                View Report
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default HelperDashboard;