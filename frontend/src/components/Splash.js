import React from 'react'
// import { MDBAnimation } from 'mdbreact'
// import logo from "../images/unnamed.png"

function Splash() {

    const fadeOut = (el) => {
        el.style.opacity = 1;
        (function fade() {
          if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
          } else {
            requestAnimationFrame(fade);
          }
        })();
      };
    
      const domReady = (callback) => {
        document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
      };
    
      domReady(() => {
        setTimeout(() => {
          fadeOut(document.querySelector(".splash"))
        }, 1000);
      })
      
    return (
        <div className="splash">
            {/* <MDBAnimation type="pulse" infinite duration="2s">
                <img src={logo} alt="Transparent MDB Logo" height="200px"/>
            </MDBAnimation> */}
            <div className="mx-auto text-center white-text">
                <div className="spinner-grow" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Splash
