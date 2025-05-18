import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../wine-not-frontend/src/pages/Home";
import Bars from "../wine-not-frontend/src/pages/Bars";
import BarDetail from "../wine-not-frontend/src/pages/BarDetail";
import AddBar from "../wine-not-frontend/src/pages/AddBar";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bars" element={<Bars />} />
                <Route path="/bars/:id" element={<BarDetail />} />
                <Route path="/add-bar" element={<AddBar />} />
            </Routes>
        </Router>
    );
}

export default App;