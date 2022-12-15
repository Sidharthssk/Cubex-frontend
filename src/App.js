import './App.css';
import Navbar from "./components/Navbar";
import Querystate from "./context/Querystate";
import Home from "./components/Home";
import CreateEvent from "./components/CreateEvent";
import EventDetails from "./components/EventDetails";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
        <Router>
            <Querystate>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/createEvent" element={<CreateEvent />} />
                    <Route path="/eventdetails/:id" element={<EventDetails />} />
                </Routes>
            </Querystate>
        </Router>

    </>
  );
}

export default App;
