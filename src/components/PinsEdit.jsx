import React, {useState} from 'react';
import { connect } from 'react-redux';
import Navbar from './NavBar';


const PinsEdit = (props) => {
    const [id, setId] = useState(props.pins._id)

    return (
        <>
            <Navbar/>
            <div className="row">
                <div className="col-md-6 mx-auto m-5">
                    <h1 className='text-center mb-5'> Modifiez votre pin {props.pins._id}</h1>
                    <form>
                        <input type="file"
                        name='file'
                        />
                        <div className="form-group mt-3">
                            <label htmlFor="titre">Nouveau titre</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="titre" 
                                name="titre" 
                                placeholder="Titre de votre pin" 
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="description">Nouvelle description </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="description" 
                                name="description" 
                                placeholder="description"
                                style={{height: 100}}
                                />

                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className='btn btn-warning mt-5' style={{borderRadius: 50}} >Valider les modifications du pin</button>
                        </div>
                    </form>
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

export default connect(
    mapStateToProps,
    null
)(PinsEdit);
