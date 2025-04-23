import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Student = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/users")
      .then((res) => {
        console.log("✅ Data fetched:", res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("❌ Error fetching data:", err);
        setError("Failed to load data. Please check server.");
      });
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/student/${id}`);
      setUsers(users.filter((user) => user.id !== id)); // ✅ Optimized UI update without reloading
    } catch (err) {
      console.error("❌ Error deleting student:", err);
    }
  };

  return (
    <div className="d-flex w-100 vh-100 bg-primary justify-content-between align-items-center p-4">
      <div className="container p-4 bg-white rounded shadow">
        <Link to="/create" className="btn btn-success mb-3">
          ADD +
        </Link>
        {error && <p className="text-danger">{error}</p>}
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Section</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link to={`Update/${user.id}`} className="btn btn-primary ">
                      Update
                    </Link>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
