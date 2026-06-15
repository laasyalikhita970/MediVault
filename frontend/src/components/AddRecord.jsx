import { useState } from "react";
import API from "../services/api";

function AddRecord({ refreshRecords }) {
  const [form, setForm] = useState({
    patientPhone: "",
    patientName: "",
    title: "",
    diagnosis: ""
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

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

    if (file) {
      formData.append(
        "file",
        file
      );
    }

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

    refreshRecords();
  } catch (error) {
    console.log(error);
    alert("Failed");
  }
};

  return (
  <form
    onSubmit={handleSubmit}
    className="space-y-4"
  >
    <h2 className="text-2xl font-bold text-blue-600">
      Add Medical Record
    </h2>

    <input
      name="patientPhone"
      placeholder="Patient Phone"
      value={form.patientPhone}
      onChange={handleChange}
      className="w-full border rounded-lg p-3"
    />

    <input
      name="patientName"
      placeholder="Patient Name"
      value={form.patientName}
      onChange={handleChange}
      className="w-full border rounded-lg p-3"
    />

    <input
      name="title"
      placeholder="Record Title"
      value={form.title}
      onChange={handleChange}
      className="w-full border rounded-lg p-3"
    />

    <input
      name="diagnosis"
      placeholder="Diagnosis"
      value={form.diagnosis}
      onChange={handleChange}
      className="w-full border rounded-lg p-3"
    />

    <input
      type="file"
      onChange={(e) =>
        setFile(e.target.files[0])
      }
      className="w-full border rounded-lg p-3"
    />

    <button
      type="submit"
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
    >
      Add Record
    </button>
  </form>
);
}

export default AddRecord;