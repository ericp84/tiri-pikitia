import React from 'react';
import {connect} from 'react-redux';
import NavBar from './NavBar';

const Profil = (props) => {
    console.log(props.Username)
    return (
        <>
        <NavBar/>
        <div className="row">
            <div className="col-md-6 mx-auto text-center">
                <h1 className="my-5">Profil de {props.Username}</h1>
                <img src="./purple-flowers.png" alt="purple" className='rounded-circle shadow-lg w-25'/>
                <p className='m-5'>{props.token}</p>
                <h2 className="m-5">{props.Username}</h2>
                <p className='text-muted'><small>coucou</small></p>
                <p>
                    Modifiez votre compte | Modifiez votre mot de passe
                </p>
            </div>
        </div>


{/* 
            <h1 className='text-center mt-5'>Hello {props.Username}</h1>
            <div className="container">
                <img src=".\purple-flowers.png" alt="purple" style={{width: 300}} className=" shadow rounded mx-auto d-block mt-5" />
                <div className='d-flex mt-5 justify-content-center'>
                    <p>Modifier mon profil</p>
                    <p>Changer mon mot de passe</p>
                </div>

            </div> */}

        </>  
    );
};

function mapStateToProps(state) {
    return {Username: state.Username}
}
export default connect (
    mapStateToProps,
    null
)(Profil);