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
    <div>
      <h1>MediVault Dashboard</h1>

      <h3>
        Welcome {user?.name}
      </h3>
<button onClick={logout}>
  Logout
</button>
      <AddRecord
        refreshRecords={loadRecords}
      />

      <hr />

      <RecordsList
        records={records}
        deleteRecord={deleteRecord}
      />
    </div>
  );
}

export default Dashboard;