import { useState } from "react";
import "./registration.css";
import { useNavigate } from "react-router-dom";

export default function Registeration() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate(); // Create a navigate instance

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.acceptedTerms)
      newErrors.acceptedTerms = "You must accept the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/login"); // Call navigate function to redirect
    }
  };

  return (
    <div className="register-container">

      <div className="register-form">

        <h1>Create your account</h1>

        <p>Fill the form below to Register.</p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <div className="input-field">
              <label>First Name*</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>

            <div className="input-field">
              <label>Last Name*</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>

          </div>

          <div className="input-field">
            <label>Email*</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input-group">

            <div className="input-field">
              <label>Password*</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div className="input-field">
              <label>Confirm Password*</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>

          </div>

          <div className="terms">
            <input type="checkbox" name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange} />
            <label>
              I have read, understood, and accept the <span className="terms-link">terms and conditions</span>.
            </label>
          </div>

          {errors.acceptedTerms && <p className="error">{errors.acceptedTerms}</p>}

          <button type="submit" className={formData.acceptedTerms ? "active-btn" : "disabled-btn"} disabled={!formData.acceptedTerms}>
            Next
          </button>

        </form>

      </div>

      <div className="register-image"></div>
      
    </div>
  );
}
