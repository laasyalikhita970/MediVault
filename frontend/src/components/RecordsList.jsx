function RecordsList({
  records,
  deleteRecord,
  setEditingRecord
}) {
  if (records.length === 0) {
    return (
      <p className="text-gray-500">
        No Records Found
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {records.map((record) => (
        <div
          key={record._id}
          className="border rounded-xl p-5 shadow-sm"
        >
          <h2 className="text-xl font-bold text-blue-600">
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
            <strong>Doctor:</strong>{" "}
            {record.doctorName}
          </p>

          <p>
            <strong>Department:</strong>{" "}
            {record.department}
          </p>

          <p>
            <strong>Diagnosis:</strong>{" "}
            {record.diagnosis}
          </p>

          <p>
            <strong>Medicines:</strong>{" "}
            {record.medicines?.join(", ")}
          </p>

          <p>
            <strong>Notes:</strong>{" "}
            {record.notes}
          </p>

         <div className="mt-4 flex gap-3">
  <button
  onClick={() =>
    setEditingRecord(record)
  }
  className="bg-blue-600 text-white px-4 py-2 rounded"
>
  Edit
</button>

  <button
    onClick={() =>
      deleteRecord(record._id)
    }
    className="bg-red-500 text-white px-4 py-2 rounded"
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