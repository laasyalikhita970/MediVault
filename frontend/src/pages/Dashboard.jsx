import { useEffect, useState } from "react";
import AddRecord from "../components/AddRecord";
import RecordsList from "../components/RecordsList";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import MedicalTimeline from "../components/MedicalTimeline";
function Dashboard() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRecord, setEditingRecord] =
  useState(null);
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token =
    localStorage.getItem("token");

  const loadRecords = async () => {
    try {
      const res = await API.get(
        `/records/${user.phone}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setRecords(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecord = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this record?"
    );

  if (!confirmDelete) return;

  try {
      await API.delete(
        `/records/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      loadRecords();
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/");
};

  useEffect(() => {
    loadRecords();
  }, []);
const filteredRecords = records.filter(
  (record) =>
    record.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
);
const totalReports =
  records.filter(r => r.fileUrl).length;

const totalPrescriptions =
  records.filter(
    r => r.category === "Prescription"
  ).length;

const totalTests =
  records.filter(
    r =>
      r.category === "Blood Test" ||
      r.category === "X-Ray"
  ).length;
 return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-6xl mx-auto">

      <div className="bg-white rounded-xl shadow p-6 mb-6 flex justify-between items-center">
        <div>
          <div>
  <h1 className="text-3xl font-bold text-blue-700">
    MediLocker Dashboard
  </h1>

  <p className="text-gray-500">
    Welcome {user?.name}
  </p>
</div>

          
        </div>
        <div className="flex gap-3">
        <button
  onClick={() =>
    navigate("/profile")
  }
  className="bg-blue-600 text-white px-4 py-2 rounded"
>
  Profile
</button>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
        </div>
      </div>
      

    <div className="grid md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-gray-500">
            Total Records
          </h3>

          <p className="text-3xl font-bold">
            {records.length}
          </p>
        </div>
<div className="bg-white shadow rounded-xl p-4">
  <h3 className="text-gray-500">
    Reports
  </h3>

  <p className="text-3xl font-bold">
    {totalReports}
  </p>
</div>

<div className="bg-white shadow rounded-xl p-4">
  <h3 className="text-gray-500">
    Prescriptions
  </h3>

  <p className="text-3xl font-bold">
    {totalPrescriptions}
  </p>
</div>
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-gray-500">
            Logged User
          </h3>

          <p className="font-bold">
            {user?.name}
          </p>
        </div>
      </div>
<div className="bg-white shadow rounded-xl p-4">
  <h3 className="text-gray-500">
    Tests
  </h3>

  <p className="text-3xl font-bold">
    {totalTests}
  </p>
</div>
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <input
          type="text"
         value={searchTerm}

onChange={(e) =>
  setSearchTerm(e.target.value)
}

placeholder="Search Record Title"
          className="w-full border p-3 rounded"
        />
      </div>

     
      <div className="bg-white rounded-xl shadow p-6 mb-6">
       {editingRecord && (
  <div className="bg-yellow-100 p-3 mb-4 rounded">
    Editing: {editingRecord.title}
  </div>
)}
       <AddRecord
  refreshRecords={loadRecords}
  editingRecord={editingRecord}
  setEditingRecord={setEditingRecord}
/>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <RecordsList
  records={filteredRecords}
  deleteRecord={deleteRecord}
  setEditingRecord={setEditingRecord}
/>
<div className="bg-white rounded-xl shadow p-6 mt-6">
  <h2 className="text-2xl font-bold mb-4">
    Recent Activity
  </h2>

  {records.slice(0, 5).map((record) => (
    <div
      key={record._id}
      className="border-b py-3"
    >
      <p className="font-semibold">
        {record.title}
      </p>

      <p className="text-gray-500 text-sm">
        {new Date(
          record.createdAt
        ).toLocaleDateString()}
      </p>
    </div>
  ))}
</div>
<div className="mt-6">
  <MedicalTimeline
    records={records}
  />
</div>
      </div>

    </div>
  </div>
);
}

export default Dashboard;