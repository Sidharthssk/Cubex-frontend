import './App.css';
import Navbar from "./components/Navbar";
import Querystate from "./context/Querystate";
import Home from "./components/Home";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
        <Router>
            <Querystate>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Querystate>
        </Router>

    </>
  );
}

export default App;
