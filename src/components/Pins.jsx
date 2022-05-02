import React, { useState } from 'react';
import Navbar from './NavBar';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';


const Pins = (props) => {
    const [id] = useState(props.pins._id);
    let nav = useNavigate();

    const handleDelete = async (id) => {
        await fetch(`http://192.168.1.105:3000/pins/${id}`, {
            method: 'DELETE'
        })
        nav("/");
    }

   const handleChange = async () => {
       await fetch(`http://192.168.1.105:3000/pins_edit/${id}`, {
           method: 'PUT'
       }
       )
   }

    return (
        <>
        <Navbar/>
            <h1 className='text-center m-5'>{props.pins.title}</h1>
            <div className="row">
                <div className="col-md-6 mx-auto d-flex justify-content-center overflow-hidden p-3 bg-light w-25">
                    <article className="pin bg-light rounded shadow w-100 ">
                        <div className=" rounded-top overflow-hidden align-items-center justify-content-center d-flex">
                            <img src={props.pins.imageName} alt="Pin-img" className="w-100 rounded" />
                        </div>
                        <div className="p-3 text-center">
                            <h4 className="text-truncate">{props.pins.title}</h4>
                            <p className="text-muted">
                                <small>
                                    submitted {props.date} by {props.Username}
                                </small>
                            </p>
                            <p className="text-break">
                            {props.pins.description}
                            </p>
                            <div className="">
                                <a href={`/pins_edit/${id}`} className='btn btn-primary  m-2 w-25' onClick={()=>handleChange()}>Edit </a>
                                <button className='btn btn-warning  m-2 w-25' onClick={()=>handleDelete(id)}>Delete</button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>  
        </>
    );
};
function mapStateToProps(state) {
    return {
        pins: state.pins,
        Username: state.Username,
        date: state.date
    }
}

export default connect (
    mapStateToProps,
    null
) (Pins);