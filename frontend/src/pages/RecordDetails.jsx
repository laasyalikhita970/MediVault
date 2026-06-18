import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function RecordDetails() {
  const { id } = useParams();

  const [record, setRecord] =
    useState(null);

  useEffect(() => {
    loadRecord();
  }, []);

  const loadRecord = async () => {
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
    return <h2>Loading...</h2>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-6">

        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Medical Record Details
        </h1>

        <p>
          <strong>Patient:</strong>{" "}
          {record.patientName}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {record.patientPhone}
        </p>

        <p>
          <strong>Title:</strong>{" "}
          {record.title}
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
          <strong>Medicines:</strong>{" "}
          {record.medicines?.length
            ? record.medicines.join(", ")
            : "N/A"}
        </p>

        <p>
          <strong>Notes:</strong>{" "}
          {record.notes || "N/A"}
        </p>

        <p>
          <strong>Created:</strong>{" "}
          {new Date(
            record.createdAt
          ).toLocaleDateString()}
        </p>

        {record.fileUrl && (
          <a
            href={`http://localhost:5000${record.fileUrl}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            View Report
          </a>
        )}

      </div>
    </div>
  );
}

export default RecordDetails;