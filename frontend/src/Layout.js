import React from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import Navbar from './components/Navbar'
import ParkHistory from './ParkApp/ParkHistory'
import RFIDScan from './ParkApp/RFIDScan'
import Login from './components/Login'
import PaymentHistory from './UserApp/PaymentHistory'
import Profile from './UserApp/Profile'
import Slots from './components/Slots'
import UpdateBalance from './UserApp/UpdateBalance'
import Register from './components/Register'


function Layout() {
    return (
        <div className="mt-10 pt-10 pb-4">
            <Navbar/>
            <Route exact path="/register" component={Register}/>

            <Route exact path="/parkapp/slots" component={Slots}/>
            <Route exact path="/parkapp/parking-history" component={ParkHistory}/>
            <Route exact path="/parkapp/rfid" component={RFIDScan}/>
            <Route exact path="/parkapp/login" component={Login}/>

            <Route exact path="/user/profile" component={Profile}/>
            <Route exact path="/user/update-balance" component={UpdateBalance}/>
            <Route exact path="/user/parking-history" component={ParkHistory}/>
            <Route exact path="/user/payment-history" component={PaymentHistory}/>
            <Route exact path="/user/slots" component={Slots}/>
            <Route exact path="/user/login" component={Login}/>
            
        </div>
    )
}

export default Layout
