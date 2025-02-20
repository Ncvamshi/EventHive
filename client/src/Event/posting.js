import React, { useState } from "react";

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    rate: "",
    logo: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/events/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add event");
      }

      alert("Event added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding event");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Event Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </label>
      <label>
        Company:
        <input type="text" name="company" value={formData.company} onChange={handleChange} required />
      </label>
      <label>
        Rate:
        <input type="text" name="rate" value={formData.rate} onChange={handleChange} required />
      </label>
      <label>
        Logo URL:
        <input type="text" name="logo" value={formData.logo} onChange={handleChange} />
      </label>
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </label>
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEventForm;
