import React, { useEffect, useState } from 'react'
import { MDBAnimation, MDBBtn, MDBInput } from 'mdbreact'
import { customAxios, parkInOutURL } from '../axios'
import { connect } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthCheck from '../components/AuthCheck';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function RFIDScan({token, slot}) {
    <AuthCheck token={token} />
    const [RFID, setRFID] = useState("");
    const [ticket, setTicket] = useState(null)
    const [loading, setLoading] = useState(false);

    const pusher = useHistory()
    useEffect(()=>{
        if (!token) pusher.push("/parkapp/login")
    })

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        customAxios.post(parkInOutURL, {rfid:RFID, slot:slot}, { headers: { Authorization: `Token ${token}` } })
        .then(r=> {
            setLoading(false)
            setTicket(r.data);
            setTimeout(() => {
                setTicket(null)
            }, 10000);
        })
        .catch(e=> {
            setLoading(false)
            toast(e.response.data.message, {type:toast.TYPE.ERROR})
        })
    }
    
    return (
        <div className="container">
            <h2 className="text-center">Park In/Out</h2> 
            <div className="card my-2">
                <form className="card-body" onSubmit={handleSubmit}>
                    <MDBInput label="RFID Code" onChange={e=>setRFID(e.target.value)} required/>
                    <MDBBtn type="submit" block color="elegant">Scan</MDBBtn>
                </form>
            </div>
            {loading && <Loader/>}

            {ticket &&
                <MDBAnimation type="fadeIn" duration="2s">
                <div className="card">
                    <h2 className="text-center">Ticket</h2> 
                    <div className="card-body">
                        <p>{ticket.message}</p>
                        <p>
                            {Object.keys(ticket.booking).map((key,i)=>
                            <p key={i}>{key}: {key === 'slot' && key ? ticket.booking[key]['name']: ticket.booking[key]}</p>)}
                        </p>
                    </div>
                </div>
                </MDBAnimation>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
      token: state.token,
      slot:state.slot,
    };
  };
  
export default connect(mapStateToProps)(RFIDScan)
