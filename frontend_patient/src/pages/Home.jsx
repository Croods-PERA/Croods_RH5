import React, { useContext } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";

const Home = () => {
  return (
    <>
      <Hero
        title={
          <>
            HealTrack <br /> <p>Mapping Your Way to Wellness</p>
          </>
        }
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.jpg"} />
    </>
  );
};

export default Home;