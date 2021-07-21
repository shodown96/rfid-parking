import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
  MDBNav,
  MDBNavbarBrand,
} from "mdbreact";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import { logout } from "../store/actions";

function Navbar(props) {
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState(false);
  
  const {pathname} = useLocation();
  console.log()
  const toggleCollapse = () => {
    setOpened(!opened);
  };
  const changeBackground = () => {
    if (window.scrollY >= 50 || window.innerWidth <= 767){
        setActive(true)
    }
    else {
      setActive(false)
      setOpened(false)
    }
  }

  window.addEventListener("scroll", changeBackground)
  window.addEventListener("resize", changeBackground)
  window.addEventListener("load", changeBackground)

  const handleLogout = e => {
    props.logout()
  }
  return (
    <div>
      <div className={opened ? "overlay opened" : "overlay"} onClick={toggleCollapse}>
      </div>
        <MDBNav className={opened ? "sidebar flex-column opened z-depth-4" : "sidebar flex-column"}>
        <MDBNavbarNav left>
                <div className="sidebar-header py-5 elegant-color">
                
                </div>

              {pathname.includes("parkapp") &&
                <>
                <MDBNavItem>
                    <MDBNavLink  onClick={toggleCollapse} to="/parkapp/rfid">RFID Scan</MDBNavLink>
                  </MDBNavItem>

                  <MDBNavItem>
                    <MDBNavLink  onClick={toggleCollapse} to="/parkapp/parking-history">Parking History</MDBNavLink>
                  </MDBNavItem>

                  <MDBNavItem>
                      <MDBNavLink  onClick={toggleCollapse} to="/parkapp/slots">Parking Slots</MDBNavLink>
                  </MDBNavItem>

                  <MDBNavItem>
                  {/* eslint-disable-next-line  */}
                  <MDBNavLink  onClick={toggleCollapse} to="/" onClick={handleLogout}>Logout</MDBNavLink>
                  </MDBNavItem>
                </>
              }

              {pathname.includes("user") &&
                <>
                <MDBNavItem>
                  <MDBNavLink  onClick={toggleCollapse} to="/user/profile">Profile</MDBNavLink>
                </MDBNavItem>

                <MDBNavItem>
                  <MDBNavLink  onClick={toggleCollapse} to="/user/parking-history">Parking History</MDBNavLink>
                </MDBNavItem>

                <MDBNavItem>
                  <MDBNavLink  onClick={toggleCollapse} to="/user/payment-history">Payment History</MDBNavLink>
                </MDBNavItem>

                <MDBNavItem>
                    <MDBNavLink  onClick={toggleCollapse} to="/user/slots">Parking Slots</MDBNavLink>
                </MDBNavItem>
                  
                <MDBNavItem>
                  <MDBNavLink  onClick={toggleCollapse} to="/user/update-balance">Update Balance</MDBNavLink>
                </MDBNavItem>

                <MDBNavItem>
                  {/* eslint-disable-next-line  */}
                  <MDBNavLink  onClick={toggleCollapse} to="/" onClick={handleLogout}>Logout</MDBNavLink>
                </MDBNavItem>
                </>
              }
              </MDBNavbarNav>
        </MDBNav>

      <MDBNavbar color="elegant-color" dark expand="md" fixed="top" className={ active ? "nav active ": "nav"}>
          {!pathname.includes("login") && !pathname.includes("register") && <MDBIcon onClick={toggleCollapse} className="navbar-toggler" icon="bars fa-2x"/> }
          <MDBNavbarBrand className="mr-auto">
          RFID ParkApp
        </MDBNavbarBrand>
      </MDBNavbar>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(null, mapDispatchToProps)(Navbar)
// Att.lmu.edu.ng/assets/passport/reg_no.JPG