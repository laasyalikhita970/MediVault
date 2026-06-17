import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function DoctorDashboard() {
  const [phone, setPhone] = useState("");
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] =
  useState(null);
  const user = JSON.parse(
  localStorage.getItem("user")
);
const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/");
};
const [prescription, setPrescription] =
  useState({
    department: "",
    medicines: "",
    notes: ""
  });
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
const savePrescription = async () => {
  try {
    const token =
      localStorage.getItem("token");

    await API.put(
      `/records/${selectedRecord._id}`,
      {
  doctorName: user.name,

  department:
    prescription.department,

  medicines:
    prescription.medicines.split(","),

  notes:
    prescription.notes
},
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    alert("Prescription Saved");

    setSelectedRecord(null);

    searchPatient();
  } catch (error) {
    console.log(error);
    alert("Failed");
  }
};
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
  <div>
    <h1 className="text-3xl font-bold text-blue-600">
      Doctor Dashboard
    </h1>

    
  </div>

  <button
    onClick={logout}
    className="bg-red-500 text-white px-4 py-2 rounded"
  >
    Logout
  </button>
</div>
<p className="text-gray-500">
  Welcome Dr. {user?.name}
</p>
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
      {record.medicines?.length
  ? record.medicines.join(", ")
  : "N/A"}
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
    onClick={() => setSelectedRecord(record)}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Add Prescription
  </button>
</div>
  </div>
))}
{selectedRecord && (
  <div className="bg-white shadow rounded-xl p-6 mt-6">
    <h2 className="text-2xl font-bold mb-4">
      Add Prescription
    </h2>

    <input
  placeholder="Department"
  className="w-full border p-3 rounded mb-3"
  onChange={(e) =>
    setPrescription({
      ...prescription,
      department: e.target.value
    })
  }
/>

    <input
      placeholder="Medicines (comma separated)"
      className="w-full border p-3 rounded mb-3"
      onChange={(e) =>
        setPrescription({
          ...prescription,
          medicines: e.target.value
        })
      }
    />

    <textarea
      placeholder="Notes"
      className="w-full border p-3 rounded mb-3"
      onChange={(e) =>
        setPrescription({
          ...prescription,
          notes: e.target.value
        })
      }
    />

    <button
      onClick={savePrescription}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Save Prescription
    </button>
  </div>
)}
    </div>
  );
}

export default DoctorDashboard;