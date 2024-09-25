import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import Subjects from "./pages/Subjects";
import Teachers from "./pages/Teachers";
import Students from "./pages/Students";
import Grades from './pages/Grades'
function App() {
  return(
<Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/subjects" element={<Subjects />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/students" element={<Students />} />
                <Route path="/grades" element={<Grades />} />
            </Routes>
        </Router>
  )
}

export default App;
