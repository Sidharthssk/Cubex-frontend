import React,{useEffect} from 'react';
import backgroundVideo from "../assets/backgroundVideo.mp4";
import "../styles/Home.css";
import {useNavigate} from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token") === null){
            navigate("/login");
        }
    }, []);

  return (
      <video autoPlay loop muted className="videoTag" style={{width: "100%", height: "100%"}}>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
  );
}

export default Home;