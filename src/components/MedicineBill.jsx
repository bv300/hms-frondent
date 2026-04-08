import { useLocation } from "react-router-dom";

function MedicineBill() {
  const { state } = useLocation();

  if (!state) return <h2>No Bill Found</h2>;

  return (
    <div>
      <h2>Medicine Bill</h2>

      <p><b>Medicine:</b> {state.medicine_name}</p>
      <p><b>Company:</b> {state.company}</p>
      <p><b>Mfg Date:</b> {state.manufacturing_date}</p>
      <p><b>Expiry Date:</b> {state.expiry_date}</p>
      <p><b>Price:</b> ₹{state.price}</p>
      <p><b>Quantity:</b> {state.quantity}</p>

      <h3>Total: ₹{state.total_price}</h3>
      <p>{new Date(state.date).toLocaleString()}</p>
    </div>
  );
}

export default MedicineBill;
