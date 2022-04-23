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
                <div className="col-md-6 mx-auto d-flex justify-content-center overflow-hidden mt-5 p-5">
                    <article className="pin bg-light rounded shadow w-50 ">
                        <div className="mw-25 rounded-top overflow-hidden align-items-center justify-content-center d-flex">
                            <img src={props.pins.imageName} alt="" className="w-100 rounded" />
                        </div>
                        <div className="p-3 text-center">
                            <h1 className="h5 text-secondary text-decoration-none">{props.pins.title}</h1>
                            <p className="text-muted">
                                <small>
                                    submitted (date) by (user)
                                </small>
                            </p>
                            <p className="text-break">
                            {props.pins.description}
                            </p>
                            <div className="py-3">
                                <a href="pins" className='btn btn-info m-3'>edit</a>
                                <a href="/" className='btn btn-danger m-3' onClick={()=>handleDelete(id)}>delete</a>
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
        pins: state.pins
    }
}

export default connect (
    mapStateToProps,
    null
) (Pins);