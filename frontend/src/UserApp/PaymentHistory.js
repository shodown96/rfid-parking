import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { customAxios, transactionsURL } from '../axios'
import AuthCheck from '../components/AuthCheck';

function PaymentHistory({token}) {
    
    <AuthCheck token={token} />
    const [history, setHistory] = useState([])
    useEffect(()=>{
        customAxios.get(transactionsURL, { headers: { Authorization: `Token ${token}` }} )
        .then(r=>setHistory(r.data))
        .catch(e=>console.log(e))
    },[token])
    
    return (
        <div className="container">
        <h2 className="text-center">Payment History</h2>
        {/* filter form */}
            {history.length > 0 ?
            history.map((history, i) => 
            <div className="card my-4" key={i}>
                <div className="card-body">
                    {Object.keys(history).map((key,i)=>
                    <p key={i}><b>{key}:</b> {history[key]}</p>)}
                </div>
            </div>
            )
            :
            <h5 className="text-center mt-5">No Transactions yet</h5>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
      token: state.token,
    };
  };
  
export default connect(mapStateToProps)(PaymentHistory)