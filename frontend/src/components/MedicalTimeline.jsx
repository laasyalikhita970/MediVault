function MedicalTimeline({ records }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        Medical History Timeline
      </h2>

      {records.map((record) => (
        <div
          key={record._id}
          className="border-l-4 border-blue-600 pl-4 mb-4"
        >
          <p className="text-gray-500">
            {new Date(
              record.createdAt
            ).toLocaleDateString()}
          </p>

          <h3 className="font-bold">
            {record.title}
          </h3>

          <p>
            {record.diagnosis || "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MedicalTimeline;