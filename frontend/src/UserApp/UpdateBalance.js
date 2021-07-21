import React, { useEffect, useState } from 'react'
import { MDBBtn, MDBInput } from 'mdbreact'
import { toast } from 'react-toastify';
import AuthCheck from '../components/AuthCheck';
import { connect } from 'react-redux';
import { customAxios, topUpURL, userDetailURL } from '../axios';

function UpdateBalance({token}) {
    <AuthCheck token={token} />
    const [amount, setAmount] = useState("")
    const [form, setForm] = useState({

    })
    
    const handleChange = e => {
        setForm({
            ...form,
            [e.target.id]:e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault();
        // toast("Balance Updated", {"type":toast.TYPE.SUCCESS});
        // toast("Balance:"+amount, {"type":toast.TYPE.SUCCESS});
        customAxios.post(topUpURL, form, { headers: { Authorization: `Token ${token}` }})
        .then(r => toast("Balance Updated", {"type":toast.TYPE.SUCCESS}))
        .catch(e=> toast(e.response.data.message, {"type":toast.TYPE.ERROR}))

        
    }
    useEffect(()=>{
        customAxios.get(userDetailURL, { headers: { Authorization: `Token ${token}` }})
        .then(r=>{
            setAmount(r.data.profile.balance)
            setForm({email:r.data.email})
        })
        .catch(e=>console.log(e))
    }, [token])

    return (
        <div className="container">
                <h2 className="text-center">Update Balance</h2>
                <p><b>Balance:</b> &#8358;{amount}</p>
            <div className="card my-2">
                <form className="card-body" onSubmit={handleSubmit}>
                    <MDBInput label="Amount" id="amount" onChange={handleChange} required/>
                    <MDBInput label="Card No" id="number" onChange={handleChange} required/>
                    <MDBInput label="CVV" id="cvv" onChange={handleChange} required/>
                    <div className="row mx-0 w-100">
                        <div className="col-xs-6 mr-1">
                            <MDBInput label="MM" size="md" id="expiry_month" onChange={handleChange} required/>
                        </div>
                        <div className="col-xs-6">
                            <MDBInput label="YYYY" size="md" id="expiry_year" onChange={handleChange} required/>
                        </div>
                    </div>
                    <MDBInput label="Pin" type="password" id="pin" onChange={handleChange} required/>
                    <MDBBtn type="submit" block color="elegant">Recharge</MDBBtn>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      token: state.token,
    };
  };
  
export default connect(mapStateToProps)(UpdateBalance)
