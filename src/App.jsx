import { useState } from "react";
import "./App.css";

function App() {
  const [employee, setEmployee] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [filter, setFilter] = useState("");

  const [leaves, setLeaves] = useState([]);

  const addLeave = () => {
    if (!employee || !reason || !date) {
      alert("Fill all fields");
      return;
    }

    setLeaves([
      ...leaves,
      {
        employee,
        reason,
        date,
        status,
      },
    ]);

    setEmployee("");
    setReason("");
    setDate("");
    setStatus("Pending");
  };

  const deleteLeave = (index) => {
    setLeaves(leaves.filter((_, i) => i !== index));
  };

  const filteredLeaves = leaves.filter((leave) =>
    leave.employee.toLowerCase().includes(filter.toLowerCase())
  );

  const approved = leaves.filter(
    (leave) => leave.status === "Approved"
  ).length;

  const pending = leaves.filter(
    (leave) => leave.status === "Pending"
  ).length;

  const rejected = leaves.filter(
    (leave) => leave.status === "Rejected"
  ).length;

  return (
    <div className="container">
      <h1>HR Employee Leave Management Tool</h1>

      <div className="dashboard">
        <div className="card total">
          <h2>{leaves.length}</h2>
          <p>Total Requests</p>
        </div>

        <div className="card approved">
          <h2>{approved}</h2>
          <p>Approved</p>
        </div>

        <div className="card pending">
          <h2>{pending}</h2>
          <p>Pending</p>
        </div>

        <div className="card rejected">
          <h2>{rejected}</h2>
          <p>Rejected</p>
        </div>
      </div>

      <div className="form">
        <input
          type="text"
          placeholder="Employee Name"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
        />

        <input
          type="text"
          placeholder="Leave Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>

        <button onClick={addLeave}>
          Apply Leave
        </button>
      </div>

      <input
        className="filter"
        type="text"
        placeholder="Filter Employee"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Reason</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredLeaves.map((leave, index) => (
            <tr key={index}>
              <td>{leave.employee}</td>
              <td>{leave.reason}</td>
              <td>{leave.date}</td>
              <td>{leave.status}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteLeave(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;