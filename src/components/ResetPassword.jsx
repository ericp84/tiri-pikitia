import React from 'react';
import Navbar from './NavBar';

const ResetPassword = () => {
    return (
        <>
            <Navbar/>
            <h1 className='text-center mt-5'>Rénitialisez votre mot de passe 🔑</h1>
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
                        <div className="form-group mt-5">
                            <label htmlFor="email">Ancien Mot de passe 🗝️</label>
                            <input 
                                type="oldPassword" 
                                className="form-control" 
                                id="oldPassword" 
                                name="oldPassword"  
                                placeholder="ancien mot de passe"
                            />
                        </div>
                        <div className="form-group mt-5">
                            <label htmlFor="email">Nouveau Mot de passe 🗝️</label>
                            <input 
                                type="newPassword" 
                                className="form-control" 
                                id="newPassword" 
                                name="newPassword"  
                                placeholder="nouveau mot de passe"
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

export default ResetPassword;