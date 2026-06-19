import { useState, useEffect } from "react";
import API from "../services/api";

function AddRecord({
  refreshRecords,
  editingRecord,
  setEditingRecord
}) {
  const [form, setForm] = useState({
  patientPhone: "",
  patientName: "",
  title: "",
  category: "",
  diagnosis: ""
});
  const [file, setFile] = useState(null);
  useEffect(() => {
  if (editingRecord) {
    setForm({
      patientPhone:
        editingRecord.patientPhone || "",
      patientName:
        editingRecord.patientName || "",
      title:
        editingRecord.title || "",
      category:
        editingRecord.category || "",
      diagnosis:
        editingRecord.diagnosis || ""
    });
  }
}, [editingRecord]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
    if (
    !form.patientPhone ||
    !form.patientName ||
    !form.title ||
    !form.diagnosis
  ) {
    alert("Please fill all required fields");
    return;
  }
if (form.patientPhone.length !== 10) {
  alert("Phone number must be 10 digits");
  return;
}
if (!file && !editingRecord) {
  alert("Please upload a medical file");
  return;
}

  try {
    const token =
      localStorage.getItem("token");

    const formData =
      new FormData();

    formData.append(
      "patientPhone",
      form.patientPhone
    );

    formData.append(
      "patientName",
      form.patientName
    );

    formData.append(
      "title",
      form.title
    );

    formData.append(
      "diagnosis",
      form.diagnosis
    );
    formData.append(
  "category",
  form.category
);

    if (file) {
      formData.append(
        "file",
        file
      );
    }

    if (editingRecord) {
  await API.put(
    `/records/${editingRecord._id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  alert("Record Updated");

  setEditingRecord(null);
} else {
  await API.post(
    "/records",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  alert("Record Added");
}
      

    refreshRecords();
    setForm({
  patientPhone: "",
  patientName: "",
  title: "",
  diagnosis: ""
});

setFile(null);
  } catch (error) {
    console.log(error);
    alert("Failed");
  }
};

  return (
  <form
  onSubmit={handleSubmit}
  className="space-y-5 max-w-3xl mx-auto"
>
   <h2 className="text-3xl font-bold text-blue-600 mb-4">
  {editingRecord
    ? "Edit Medical Record"
    : "Add Medical Record"}
</h2>

<p className="text-gray-500 mb-6">
  Enter patient information and upload reports.
</p>

    <div>
  <label className="block mb-1 font-medium">
    Patient Phone
  </label>

  <input
  name="patientPhone"
  required
    value={form.patientPhone}
    onChange={handleChange}
    className="w-full border rounded-lg p-3"
    placeholder="Enter patient phone"
  />
</div>

<div>
  <label className="block mb-1 font-medium">
    Patient Name
  </label>

  <input
  name="patientName"
  required
    value={form.patientName}
    onChange={handleChange}
    className="w-full border rounded-lg p-3"
    placeholder="Enter patient name"
  />
</div>

<div>
  <label className="block mb-1 font-medium">
    Record Title
  </label>
  <input
  type="text"
  name="title"
  value={form.title}
  onChange={handleChange}
  className="w-full border rounded-lg p-3 mb-4"
  placeholder="Enter record title"
/>
<div>
  <label className="block mb-1 font-medium">
    Record Category
  </label>

  <select
    name="category"
    value={form.category}
    onChange={handleChange}
    className="w-full border rounded-lg p-3"
  >
    <option value="">
      Select Category
    </option>

    <option value="Prescription">
      Prescription
    </option>

    <option value="Blood Test">
      Blood Test
    </option>

    <option value="X-Ray">
      X-Ray
    </option>

    <option value="MRI">
      MRI
    </option>

    <option value="Vaccination">
      Vaccination
    </option>
  </select>
</div>
  
</div>

<div>
  <label className="block mb-1 font-medium">
    Diagnosis
  </label>

 <input
  name="diagnosis"
  required
    value={form.diagnosis}
    onChange={handleChange}
    className="w-full border rounded-lg p-3"
    placeholder="Enter diagnosis"
  />
</div>

<div>
  <label className="block mb-1 font-medium">
    Upload Medical File
  </label>

  {editingRecord?.fileUrl && (
    <a
      href={`http://localhost:5000${editingRecord.fileUrl}`}
      target="_blank"
      rel="noreferrer"
      className="text-blue-600 underline block mb-2"
    >
      View Existing Report
    </a>
  )}

  <input
    type="file"
    onChange={(e) =>
      setFile(e.target.files[0])
    }
    className="w-full border rounded-lg p-3"
  />
</div>

    <button
      type="submit"
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
    >
     {editingRecord
  ? "Update Record"
  : "Add Record"}
    </button>
  </form>
);
}

export default AddRecord;