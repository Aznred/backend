import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BarDetail() {
    const { id } = useParams();
    const [bar, setBar] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/bars/${id}`)
            .then((res) => res.json())
            .then((data) => setBar(data));
    }, [id]);

    if (!bar) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">{bar.name}</h2>
            <p className="mt-2">{bar.description}</p>
        </div>
    );
}
