import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <h3>About Us</h3>
          <p>
          HealTrack is your trusted companion on the journey to optimal health.
          Our innovative platform empowers individuals to take control of their
           well-being by providing comprehensive tools for tracking and 
           managing health data. Whether you're managing a chronic condition,
           or simply prioritizing your overall wellness, 
           HealTrack offers personalized insights and support every step of the way. 
           With intuitive features and user-friendly design, navigating your path to 
           wellness has never been easier. Join us on this transformative journey and 
           discover how HealTrack can help you map your way to a healthier, happier life.
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
