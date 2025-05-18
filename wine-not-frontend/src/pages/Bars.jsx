import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Bars() {
    const [bars, setBars] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/bars")
            .then((res) => res.json())
            .then((data) => setBars(data));
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Bars à Prague</h2>
            <ul>
                {bars.map((bar) => (
                    <li key={bar._id} className="mb-2">
                        <Link to={`/bars/${bar._id}`} className="text-blue-600 hover:underline">
                            {bar.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}