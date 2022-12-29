import './App.css';
import Navbar from "./components/Navbar";
import Querystate from "./context/Querystate";
import Home from "./components/Home";
import CreateEvent from "./components/CreateEvent";
import EventDetails from "./components/EventDetails";
import Participants from "./components/Participants";
import ParticipantDetails from "./components/ParticipantDetails";
import Login from "./components/Login";
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
                    <Route path="/participants" element={<Participants />} />
                    <Route path="/participantdetails/:id" element={<ParticipantDetails />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Querystate>
        </Router>

    </>
  );
}

export default App;
