import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Createstudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate(); // ✅ Fix: Call useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/users", { name, email, age })
      .then((res) => {
        console.log("✅ Student added successfully:", res);
        navigate("/"); // ✅ Fix: Properly navigate after success
      })
      .catch((err) => console.error("❌ Error adding student:", err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add Student</h2>
          <div className="mb-2">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label>Age</label>
            <input
              type="number"
              placeholder="Enter Age"
              className="form-control"
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          {/* ✅ Fix: Correct button syntax */}
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createstudent;
