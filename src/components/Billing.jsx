import { useEffect, useState } from "react";
import axios from "axios";
import { RiBillLine } from "react-icons/ri";

function Billing() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/billing/")
      .then(res => setBills(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="billing-page">
      <h2>Billing Information <RiBillLine /> </h2>

      <table className="billing-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Medicine</th>
            <th>Quantity</th>
            <th>Total Price (₹)</th>
          </tr>
        </thead>

        <tbody>
          {bills.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No billing records
              </td>
            </tr>
          ) : (
            bills.map(b => (
              <tr key={b.id}>
                <td>{new Date(b.date).toLocaleString()}</td>
                <td>{b.medicine_name}</td>
                <td>{b.quantity}</td>
                <td>₹{b.total_price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Billing;
