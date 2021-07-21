import React, { useEffect, useState } from 'react'
import { customAxios, bookingsURL, userBookingsURL } from '../axios';
import { connect } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import AuthCheck from '../components/AuthCheck';

function ParkHistory({token}) {
    <AuthCheck token={token} />
    const {pathname} = useLocation();
    const [history, setHistory] = useState([]);
    console.log(pathname)
    useEffect(() => {
        const generalHistory =()=>{
            customAxios.get(bookingsURL, { headers: { Authorization: `Token ${token}` }})
            .then(r=>setHistory(r.data))
            .catch(e=>console.log(e))
        }
        const userHistory =()=>{
            customAxios.get(userBookingsURL, { headers: { Authorization: `Token ${token}` }})
            .then(r=>setHistory(r.data))
            .catch(e=>console.log(e))
        }
        if (pathname.includes("parkapp")) generalHistory()
        else userHistory();
        // eslint-disable-next-line 
    }, [token])
    return (
        <div className="container">
        <h2 className="text-center">Parking History</h2>
        {/* filter form */}
            {history.length > 0 ?
            history.map((history, i) => 
            <div className="card my-4" key={i}>
                <div className="card-body">
                    {Object.keys(history).map((key,i)=>
                    <p key={i}><b>{key}:</b> {key === 'slot' && key ?  history[key]['name']: history[key]}</p>)}
                </div>
            </div>
            ) : <h5 className="text-center mt-5">No Parkings yet</h5>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
      token: state.token,
    };
  };
  
export default connect(mapStateToProps)(ParkHistory)