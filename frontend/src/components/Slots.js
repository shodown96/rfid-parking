import React, { useEffect, useState } from 'react'
import { customAxios, slotsURL } from '../axios';

function Slots() {
    // const h = [
    //     {
    //         name:'Abraham', 
    //         location:'location',
    //         available:true
    //     },
    //     {
    //         name:'Abraham', 
    //         location:'location',
    //         available:false
    //     },
    //     {
    //         name:'Abraham', 
    //         location:'location',
    //         available:true
    //     }
    // ]
    const [slots, setSlots] = useState([]);
    useEffect(() => {
        customAxios.get(slotsURL)
        .then(r=>setSlots(r.data))
        .catch(e=>console.log(e))
    }, [])
    return (
        <div className="container">
        <h2 className="text-center">Slots</h2>
        {/* filter form */}
            {slots.length > 0 &&
            slots.map((slot, i) => 
            <div className="card my-4" key={i}>
                <div className="card-body">
                    <p><b>Name:</b> {slot.name}</p>
                    <p><b>Location:</b> {slot.location}</p>
                    <p>{slot.available ? "Avalaible" : "Not Available"}</p>
                </div>
            </div>
            )}
        </div>
    )
}

export default Slots
