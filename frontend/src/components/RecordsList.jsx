import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
function RecordsList({
  records,
  deleteRecord,
  setEditingRecord
}) {
    const navigate = useNavigate();
  if (records.length === 0) {
    return (
      <div className="text-center py-10">
  <h3 className="text-xl font-semibold text-gray-600">
    No Medical Records Found
  </h3>

  <p className="text-gray-400 mt-2">
    Add a medical record to get started.
  </p>
</div>
    );
  }
const downloadPDF = (record) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("MediLocker Medical Report", 20, 20);

  doc.setFontSize(12);

  doc.text(
    `Patient Name: ${record.patientName}`,
    20,
    40
  );

  doc.text(
    `Phone: ${record.patientPhone}`,
    20,
    50
  );

  doc.text(
    `Diagnosis: ${record.diagnosis || "N/A"}`,
    20,
    60
  );

  doc.text(
    `Doctor: ${record.doctorName || "N/A"}`,
    20,
    70
  );

  doc.text(
    `Department: ${record.department || "N/A"}`,
    20,
    80
  );

  doc.text(
    `Medicines: ${
      record.medicines?.join(", ") || "N/A"
    }`,
    20,
    90
  );

  doc.text(
    `Notes: ${record.notes || "N/A"}`,
    20,
    100
  );

  doc.text(
    `Created: ${new Date(
      record.createdAt
    ).toLocaleDateString()}`,
    20,
    110
  );

  doc.save(
    `${record.patientName}-report.pdf`
  );
};
  return (
    <div className="space-y-4">
      {records.map((record) => (
        <div
  key={record._id}
  className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
>
  <div className="flex justify-between items-start mb-4">
    <div>
       <button
        onClick={() => navigate(-1)}
        className="bg-gray-600 text-white px-4 py-2 rounded mb-4"
      >
        Back
      </button>
      <h2
  onClick={() =>
    navigate(`/record/${record._id}`)
  }
  className="text-2xl font-bold text-blue-600 cursor-pointer hover:underline"
>
  {record.title}
</h2>

      <p className="text-gray-500">
        {record.patientName}
      </p>
    </div>

    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
      Record
    </span>
  </div>

  <div className="grid md:grid-cols-2 gap-3 text-gray-700">

    <p>
      <strong>📱 Phone:</strong>{" "}
      {record.patientPhone}
    </p>

    <p>
      <strong>👨‍⚕️ Doctor:</strong>{" "}
      {record.doctorName || "N/A"}
    </p>

    <p>
      <strong>🏥 Department:</strong>{" "}
      {record.department || "N/A"}
    </p>

    <p>
      <strong>🩺 Diagnosis:</strong>{" "}
      {record.diagnosis || "N/A"}
    </p>

    <p>
      <strong>💊 Medicines:</strong>{" "}
      {record.medicines?.length
        ? record.medicines.join(", ")
        : "N/A"}
    </p>

    <p>
      <strong>📝 Notes:</strong>{" "}
      {record.notes || "N/A"}
    </p>

    <p>
  <strong>📂 Category:</strong>{" "}
  {record.category || "N/A"}
</p>
  </div>

  <div className="mt-5 flex gap-3 items-center">

  {record.fileUrl && (
    <a
     href={`https://medivault-xorl.onrender.com${record.fileUrl}`}
      target="_blank"
      rel="noreferrer"
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
    >
      View Report
    </a>
  )}
<button
  onClick={() =>
    navigate(`/record/${record._id}`)
  }
  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
>
  View Details
</button>
  <button
    onClick={() =>
      setEditingRecord(record)
    }
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
  >
    Edit
  </button>
<button
  onClick={() => downloadPDF(record)}
  className="bg-purple-600 text-white px-4 py-2 rounded-lg"
>
  Download PDF
</button>
  <button
    onClick={() =>
      deleteRecord(record._id)
    }
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
  >
    Delete
  </button>

</div>
</div>
      ))}
    </div>
  );
}

export default RecordsList;