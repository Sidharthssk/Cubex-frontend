import React from 'react';
import backgroundVideo from "../assets/backgroundVideo.mp4";
import "../styles/Home.css";

function Home() {

  return (
      <video autoPlay loop muted className="videoTag" style={{width: "100%", height: "100%"}}>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
  );
}

export default Home;