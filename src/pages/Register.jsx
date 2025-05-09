import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig"; // Ensure correct Firebase config
import bcrypt from "bcryptjs";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    prn: "",
    email: "",
    password: "",
    phone: "",
    profile_pic: "",
    user_type: "student",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      const studentRef = doc(db, "Students", formData.prn);
      await setDoc(studentRef, {
        ...formData,
        password: hashedPassword, // Store hashed password
      });
      alert("Registration successful");
    } catch (error) {
      console.error("Error registering student: ", error);
      alert("Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Student Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="prn" placeholder="PRN" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="profile_pic" placeholder="Profile Picture URL" onChange={handleChange} className="w-full p-2 border rounded" />
        <select name="user_type" onChange={handleChange} className="w-full p-2 border rounded">
          <option value="student">User</option> 
          <option value="admin">Canteen Owner</option>
          <option value="admin">Printing Owner</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;