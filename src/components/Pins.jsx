import React, { useState } from 'react';
import Navbar from './NavBar';
import { connect } from 'react-redux';

const Pins = (props) => {
    const [id] = useState(props.pins._id);
    console.log(id)

        const handleDelete = async (id) => {
       await fetch(`http://192.168.1.105:3000/pins/${id}`, {
           method: 'DELETE'
       })
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
                                    submitted (date) by {props.Username}
                                </small>
                            </p>
                            <p className="text-break">
                            {props.pins.description}
                            </p>
                            <div className="">
                                <a href="pins" className='btn btn-primary  m-2 w-25'>Edit </a>
                                <a href="/" className='btn btn-warning  m-2 w-25' onClick={()=>handleDelete(id)}>Delete</a>
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
        Username: state.Username
    }
}

export default connect (
    mapStateToProps,
    null
) (Pins);