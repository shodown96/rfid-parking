import { MDBBtn, MDBInput } from 'mdbreact'
import React, { useState } from 'react'
import { Link, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { authSuccess, setSlot } from "../store/actions";
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import { customAxios, loginURL } from '../axios';
import Loader from "./Loader"

const Login = ({setSlot, authSuccess}) => {
    const [loading, setLoading] = useState(false)
    const {pathname} = useLocation();
    const history = useHistory();
    const [form, setForm] = useState({
        username:"",
        password:"",
        slot:"",
    })

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.id]:e.target.value
        })
    }

     const handleSubmit = e => {
        e.preventDefault();
        console.log(form)
        const { username, password } = form;
        setLoading(true);
        customAxios.post(loginURL, {username,password})
        .then(r => {
            setLoading(false);
            toast("Login Successful", {type:toast.TYPE.SUCCESS});
            authSuccess(r.data.key);
            setSlot(form.slot, r.data.key);
            if(pathname.includes("user")) history.push("/user/profile")
            else {
                history.push("/parkapp/rfid")
            }

            
        })
        .catch(e =>{
            console.log(e)
            setLoading(false);
            toast('Unable to login with provided credentials', {type:toast.TYPE.ERROR})
        })
     }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2 className="text-center">Login</h2> 
                    
                {loading && <Loader/>}
                <MDBInput label="Username" id="username" onChange={handleChange} required />
                <MDBInput label="Password" id="password" type="password" onChange={handleChange} required />
                {pathname.includes("parkapp") && <MDBInput label="Slot" id="slot" onChange={handleChange} required />}
                <MDBBtn type="submit" block color="elegant">Login</MDBBtn>
                {pathname.includes("user") && 
                <p className="text-center mt-2">Don't Have an Account? <Link to="/register">Register</Link></p>}
                {/* {pathname.includes("parkapp") && <p className="text-center text-black-50"><Link to="/">GoHome</Link></p>} */}
            </form>
            <div className="text-center text-black-50 fixed-bottom pb-4">
                <Link to="/" >Home</Link>
            </div>
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
      setSlot: (slot, token) => dispatch(setSlot(slot, token)),
      authSuccess: (token)=> dispatch(authSuccess(token))
    };
  };
  
export default connect(null, mapDispatchToProps)(Login)
