import { useEffect, useState } from "react";
import axios from "axios";
import { AiFillMedicineBox } from "react-icons/ai";

function MedicineSale() {
    const [medicines, setMedicines] = useState([]);
    const [sale, setSale] = useState({ medicine: "", quantity: "" });

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/medicines/")
            .then(res => setMedicines(res.data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (sale.quantity < 1 || sale.quantity > 1000) {
            alert("Quantity must be between 1 and 1000");
            return;
        }
        
        axios.post("http://127.0.0.1:8000/medicines/sale/", sale)
            .then(() => {
                alert("Sale completed");
                setSale({
                    medicine: "",
                    quantity: ""
                });
            })
            .catch(err => alert(err.response?.data?.error || "Stock Out"));
    };

    return (
        <div className="medi">
            <div className="medicine-sale">
                <h2>Sell Medicine <AiFillMedicineBox /></h2>

                <form onSubmit={handleSubmit}>
                    <select onChange={e => setSale({ ...sale, medicine: e.target.value })}>
                        <option>Select Medicine</option>
                        {medicines.map(m => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Quantity"
                        min="1"
                        max="1000"
                        value={sale.quantity}
                        onChange={e => {
                            const value = Number(e.target.value);
                            if (value >= 1 && value <= 1000) {
                                setSale({ ...sale, quantity: value });
                            }
                        }}
                        required
                    />


                    <button>Sell</button>
                </form>
            </div>
        </div>
    );
}

export default MedicineSale;
