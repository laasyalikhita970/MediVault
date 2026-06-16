import { useEffect, useState } from "react";
import AddRecord from "../components/AddRecord";
import RecordsList from "../components/RecordsList";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [records, setRecords] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
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
    record.patientPhone.includes(searchPhone)
);
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

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
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
            Logged User
          </h3>

          <p className="font-bold">
            {user?.name}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <input
          type="text"
          placeholder="Search Patient Phone"
          value={searchPhone}
          onChange={(e) =>
            setSearchPhone(e.target.value)
          }
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
      </div>

    </div>
  </div>
);
}

export default Dashboard;