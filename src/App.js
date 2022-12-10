import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Querystate from "./context/Querystate";

function App() {
  return (
    <>
        <Querystate>
      <Navbar />
        <Card />
        </Querystate>
    </>
  );
}

export default App;
