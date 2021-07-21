import { MDBBtn } from 'mdbreact'
import React from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import Splash from './Splash'
import IMG from "../images/logo.png"
function Home() {
    return (
        <div>
                <Splash/>
            <div className="d-flex flex-column mt-5 pt-5 px-4 justify-content-between">
                {/* <h2 className="text-center mb-4">
                    RFID ParkApp
                </h2> */}
                <div className="d-flex justify-content-center">
                    <img src={IMG} alt="" className="img-fluid avatar"/>
                </div>
                <NavLink to="/user/login">
                    <MDBBtn block className="mb-4" color="elegant">UserApp</MDBBtn>
                </NavLink>
                <NavLink to="/parkapp/login">
                    <MDBBtn block className="mb-4" color="elegant">ParkApp</MDBBtn>
                </NavLink>
            </div>
        </div>
    )
}

export default Home
