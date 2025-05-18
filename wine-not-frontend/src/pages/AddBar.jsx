import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddBar() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/api/bars/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description })
        })
            .then((res) => res.json())
            .then(() => navigate("/bars"));
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Ajouter un bar</h2>
            <input
                className="border p-2 w-full"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <textarea
                className="border p-2 w-full"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Ajouter
            </button>
        </form>
    );
}