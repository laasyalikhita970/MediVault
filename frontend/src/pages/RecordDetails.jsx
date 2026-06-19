import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function RecordDetails() {
  const { id } = useParams();

  const [record, setRecord] =
    useState(null);

  useEffect(() => {
    fetchRecord();
  }, []);

  const fetchRecord = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await API.get(
        `/records/details/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setRecord(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!record)
    return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-xl p-6">

        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          {record.title}
        </h1>

        <p><strong>Patient:</strong> {record.patientName}</p>
        <p><strong>Phone:</strong> {record.patientPhone}</p>
        <p><strong>Doctor:</strong> {record.doctorName || "N/A"}</p>
        <p><strong>Department:</strong> {record.department || "N/A"}</p>
        <p><strong>Diagnosis:</strong> {record.diagnosis || "N/A"}</p>

        <p>
          <strong>Medicines:</strong>{" "}
          {record.medicines?.join(", ") || "N/A"}
        </p>

        <p>
          <strong>Notes:</strong>{" "}
          {record.notes || "N/A"}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(
            record.createdAt
          ).toLocaleDateString()}
        </p>

      </div>
    </div>
  );
}

export default RecordDetails;