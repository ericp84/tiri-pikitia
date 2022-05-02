import React from 'react';
import {connect} from 'react-redux';
import NavBar from './NavBar';
const gravatar = require('gravatar');
// let date = new Date();
// let nd = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
// console.log(nd)
const Profil = (props) => {
    // const utc = new Date(props.date)
    // utc.setUTCHours(0)
    // let x = Date.now()
    // let diffdays = (x - utc) / (24* 36000 * 1000) 
    // console.log(diffdays)

    let gravatarUrl = gravatar.url(props.email)+'?s=500&d=identicon'
    return (
        <>
            <NavBar/>
            <div className="row">
                <div className="col-md-6 mx-auto text-center">
                    <h1 className="my-5">Profil de {props.Username}</h1>
                    <img src={gravatarUrl} alt="purple" className=' rounded-circle shadow-lg w-25'/>
                    <p><small><a href="https://fr.gravatar.com/" className='text-decoration-none text-muted'> créez votre propre avatar ici !</a></small></p>
                    <h2 className="m-5">{props.Username}</h2>
                    <h2 className="m-5">{props.email}</h2>
                    <p className='text-muted'><small>compte actif depuis le {props.date} </small></p>
                    <p className='btn btn-warning m-3 w-25'>Modifier votre compte </p>
                    <a href="/reset-password" className='btn btn-warning m-3 w-25' >Changer votre mot de passe </a>
                </div>
            </div>
        </>  
    );
};

function mapStateToProps(state) {
    return {
        Username: state.Username,
        token: state.token,
        email: state.email,
        date: state.date
    }
    
}
export default connect (
    mapStateToProps,
    null
)(Profil);