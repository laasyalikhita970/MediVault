import { useEffect, useState } from "react";
import AddRecord from "../components/AddRecord";
import RecordsList from "../components/RecordsList";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [records, setRecords] = useState([]);

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

  return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-6xl mx-auto">

      <div className="bg-white rounded-xl shadow p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">
            MediVault
          </h1>

          <p className="text-gray-600">
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

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <AddRecord refreshRecords={loadRecords} />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <RecordsList
          records={records}
          deleteRecord={deleteRecord}
        />
      </div>

    </div>
  </div>
);
}

export default Dashboard;