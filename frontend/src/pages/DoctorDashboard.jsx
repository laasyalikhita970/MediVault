import { useState } from "react";
import API from "../services/api";

function DoctorDashboard() {
  const [phone, setPhone] = useState("");
  const [records, setRecords] = useState([]);

  const searchPatient = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await API.get(
        `/records/${phone}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Doctor Dashboard
      </h1>

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
      <strong>Patient:</strong>
      {" "}
      {record.patientName}
    </p>

    <p>
      <strong>Phone:</strong>
      {" "}
      {record.patientPhone}
    </p>

    <p>
      <strong>Diagnosis:</strong>
      {" "}
      {record.diagnosis || "N/A"}
    </p>

    <p>
      <strong>Doctor:</strong>
      {" "}
      {record.doctorName || "N/A"}
    </p>

    <p>
      <strong>Department:</strong>
      {" "}
      {record.department || "N/A"}
    </p>

    <p>
      <strong>Notes:</strong>
      {" "}
      {record.notes || "N/A"}
    </p>

    <p>
      <strong>Medicines:</strong>
      {" "}
      {record.medicines?.join(", ") || "N/A"}
    </p>

    <div className="mt-4 flex gap-3">
  {record.fileUrl && (
    <a
      href={`http://localhost:5000${record.fileUrl}`}
      target="_blank"
      rel="noreferrer"
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      View Report
    </a>
  )}

  <button
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Add Prescription
  </button>
</div>
  </div>
))}
    </div>
  );
}

export default DoctorDashboard;