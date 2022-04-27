import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Navbar from './NavBar';
import {useNavigate} from 'react-router-dom';


const PinsEdit = (props) => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [imageName, setImageName] = useState('');
    const [imageSelected, setImageSelected] = useState();  

    let nav = useNavigate();

    const handleChange = async(e) => {
        e.preventDefault()
        await fetch(`http://192.168.1.105:3000/pins_edit/${props.pins._id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `title=${title}&description=${description}&imageName=${imageName}`
        })
        nav('/')
    }

    useEffect(()=> {
        const pinsCreation =  async () => {
        const formData = new FormData();
        formData.append('file', imageSelected);

        const uploadRequest = await fetch(
            'http://192.168.1.105:3000/upload', 
            {
                method:'POST',
                body: formData
            })
            const uploadResponse = await uploadRequest.json()
            setImageName(uploadResponse.cloudres.secure_url)
        }
        pinsCreation()
    }, [imageSelected])


    return (
        <>
            <Navbar/>
            <div className="row">
                <div className="col-md-6 mx-auto m-5">
                    <h1 className='text-center mb-5'> Modifiez votre pin {props.pins._id}</h1>
                    <form>
                        <input type="file"
                        name='file'
                        onChange={(e)=>setImageSelected(e.target.files[0])}                      
                        />
                        <div className="form-group mt-3">
                            <label htmlFor="titre">Nouveau titre</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="titre" 
                                name="titre" 
                                placeholder="Titre de votre pin"
                                onChange={(e)=>setTitle(e.target.value)} 
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
                                onChange={(e)=>setDescription(e.target.value)} 
                                />

                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className='btn btn-warning mt-5' style={{borderRadius: 50}} onClick={handleChange}>Valider les modifications du pin</button>
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
