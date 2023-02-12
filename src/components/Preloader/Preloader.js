import React from "react";

function Preloader() {
  return (
    <section className="preloader">
      <div className="preloader__circle-box">
        <i className="preloader__circle-animation"></i>
      </div>
      <p className="preloader__text">Searching for persons...</p>
    </section>
  );
}

export default Preloader;
