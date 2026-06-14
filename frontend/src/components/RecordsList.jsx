function RecordsList({ records, deleteRecord }) {
  return (
    <div>
      <h2>Medical Records</h2>

      {records.map((record) => (
        <div
          key={record._id}
          style={{
            border: "1px solid black",
            padding: "10px",
            margin: "10px"
          }}
        >
          <h3>{record.patientName}</h3>

          <p>{record.patientPhone}</p>

          <p>{record.title}</p>

          <p>{record.diagnosis}</p>

          <button
            onClick={() =>
              deleteRecord(record._id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default RecordsList;