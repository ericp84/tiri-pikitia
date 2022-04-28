import React from 'react';
import {connect} from 'react-redux';
import NavBar from './NavBar';
const gravatar = require('gravatar');

const Profil = (props) => {
    let gravatarUrl = gravatar.url(props.email)+'?s=500&d=identicon'
    console.log(gravatarUrl)
    return (
        <>
            <NavBar/>
            <div className="row">
                <div className="col-md-6 mx-auto text-center">
                    <h1 className="my-5">Profil de {props.Username}</h1>
                    <img src={gravatarUrl} alt="purple" className=' rounded-circle shadow-lg w-25'/>
                    <h2 className="m-5">{props.Username}</h2>
                    <h2 className="m-5">{props.email}</h2>
                    <p className='text-muted'><small>compte actif depuis le (date)</small></p>
                    <p className='btn btn-warning m-3 w-25'>Modifier votre compte </p>
                    <p className='btn btn-warning m-3 w-25'>Changer votre mot de passe </p>
                </div>
            </div>
        </>  
    );
};

function mapStateToProps(state) {
    return {
        Username: state.Username,
        token: state.token,
        email: state.email
    }
    
}
export default connect (
    mapStateToProps,
    null
)(Profil);