import React from 'react';
import Navbar from './NavBar';

const ForgotPass = () => {
    return (
        <>
        <Navbar/>
        <h1 className='text-center mt-5'>Mot de passe oublié ? 🤔</h1>
        <p className='text-center text-muted'><small>Vous allez recevoir un mail de réinitialisation, n'oubliez pas de vérifier vos spams ! </small></p>
        <div className="row">
            <div className="col-md-6 mx-auto m-5">
                <form>
                    <div className="form-group mt-5">
                        <label htmlFor="email">Adresse mail 📧</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            name="email"  
                            placeholder="Adresse mail"
                        />
                    </div>                                    
                    <div className="d-grid gap-2">
                        <button  style={{borderRadius: 50}} type="submit" className="btn btn-primary mt-5"  >Valider les modifications</button>
                    </div>
                </form>
            </div>
        </div>
    </>

    );
};

export default ForgotPass;