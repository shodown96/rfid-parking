import { MDBBtn, MDBInput } from 'mdbreact'
import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { accountTypeSet, authSuccess } from "../store/actions";
import { connect } from "react-redux";
import Loader from './Loader';
import { toast } from 'react-toastify';
import { customAxios, registerURL } from '../axios';

const Register = ({authSuccess, accountTypeSet}) => {
    const history = useHistory();
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.id]:e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(form)
        setLoading(true);
        customAxios.post(registerURL, form)
        .then(r => {
            setLoading(false);
            toast("Registration Successful", {type:toast.TYPE.SUCCESS});
            authSuccess(r.data.key);
            accountTypeSet("user",r.data.key)
            history.push("/user/profile")
            
        })
        .catch(e =>{
            setLoading(false);
            toast(JSON.stringify(e.response.data), {type:toast.TYPE.ERROR})
        })
     }
    return (
        <div className="container mt-n3">
            <form onSubmit={handleSubmit}>
                <h2 className="text-center">Register</h2>
                {loading && <Loader/>}
                <MDBInput label="First Name" id="first_name" onChange={handleChange} required />
                <MDBInput label="Last Name" id="last_name" onChange={handleChange} required />
                <MDBInput label="Email" id="email" onChange={handleChange} required />
                <MDBInput label="Username" id="username" onChange={handleChange} required />
                <MDBInput label="Password" id="password1" type="password" onChange={handleChange} required />
                <MDBInput label="Confirm Password" id="password2" type="password" onChange={handleChange} required />
                <MDBInput label="Phone" id="phone" onChange={handleChange} required />
                <MDBInput label="Age" id="age" onChange={handleChange} required />
                <MDBBtn type="submit" block color="elegant">Register</MDBBtn>
                <p className="text-center mt-2">Don't Have an Account? <Link to="/user/login">Login</Link></p>
            </form>
            <div className="text-center text-black-50 pb-4">
                <Link to="/" >Home</Link>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      token: state.token,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        authSuccess: (token)=> dispatch(authSuccess(token)),
        accountTypeSet: (account_type, token) => accountTypeSet(account_type, token)
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Register)
