import { MDBBtn, MDBInput } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { customAxios, passwordChangeURL, userDetailURL } from '../axios'
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import AuthCheck from '../components/AuthCheck';

function Profile({token}) {
    <AuthCheck token={token} />
    const config = { headers: { Authorization: `Token ${token}` }}
    const [profile, setProfile] = useState(null)
    const [passwords, setPasswords] = useState()
    useEffect(()=>{
        customAxios.get(userDetailURL, { headers: { Authorization: `Token ${token}` }})
        .then(r=>setProfile(r.data))
        .catch(e=>console.log(e))
    }, [token])
    
    // const handleChange = e => {
    //     setProfile({
    //         ...profile,
    //         [e.target.id]:e.target.value
    //     })
    // }
    const handleChange2 = e => {
        setPasswords({
            ...passwords,
            [e.target.id]:e.target.value
        })
    }
    const handleSubmit1 = e => {
        e.preventDefault();
        toast("Profile Updated", {"type":toast.TYPE.SUCCESS});
    }
    const handleSubmit2 = e => {
        e.preventDefault();
        // toast("Password Changed", {"type":toast.TYPE.SUCCESS});
        customAxios.post(passwordChangeURL, passwords, config)
        .then(r => toast(r.data.detail, {type:toast.TYPE.SUCCESS}) )
        .catch(e=> toast(e.response.data.new_password2.toString(), {type:toast.TYPE.ERROR}) )
    }
    return (
        <div className="container ">
            <h2 className="text-center">Profile</h2> 
            <div className="card my-2 mb-4">
                <form className="card-body" onSubmit={handleSubmit1}>
                    <MDBInput label="Name" id="name" value={profile?.first_name +" "+ profile?.last_name} disabled/>
                    <MDBInput label="Email" id="email" value={profile?.email} disabled/>
                    <MDBInput label="Username" id="email" value={profile?.username} disabled/>
                    <MDBInput label="Age" id="email" value={profile?.profile.age} disabled/>
                    <MDBInput label="Phone" id="phone" value={profile?.profile.phone} disabled/>
                    {/* <MDBBtn block color="elegant" type="submit">Update</MDBBtn> */}
                </form>
            </div>

            <h2 className="text-center">Change Password</h2> 
            <div className="card">
                <form className="card-body" onSubmit={handleSubmit2}>
                    <MDBInput type="password" label="New Password" id="new_password1" onChange={handleChange2} required/>
                    <MDBInput type="password" label="Confirm Password" id="new_password2" onChange={handleChange2} required/>
                    <MDBBtn block color="elegant" type="submit">Change Password</MDBBtn>
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
  
export default connect(mapStateToProps)(Profile)
