import { useState } from "react";
import API from "../services/api";

function AddRecord({ refreshRecords }) {
  const [form, setForm] = useState({
    patientPhone: "",
    patientName: "",
    title: "",
    diagnosis: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/records",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Record Added");

      setForm({
        patientPhone: "",
        patientName: "",
        title: "",
        diagnosis: ""
      });

      refreshRecords();
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Medical Record</h2>

      <input
        name="patientPhone"
        placeholder="Patient Phone"
        value={form.patientPhone}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="patientName"
        placeholder="Patient Name"
        value={form.patientName}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="diagnosis"
        placeholder="Diagnosis"
        value={form.diagnosis}
        onChange={handleChange}
      />

      <br /><br />

      <button type="submit">
        Add Record
      </button>
    </form>
  );
}

export default AddRecord;