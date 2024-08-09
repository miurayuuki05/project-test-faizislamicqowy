import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import React from "react";
import Posts from "./components/Posts";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Posts />
    </div>  
  );
}
