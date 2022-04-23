import React, {useEffect, useState} from 'react';
import Navbar from './NavBar';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const PinsCreate =  (props) => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [imageName, setImageName] = useState('');
    const [imageSelected, setImageSelected] = useState();

    let nav = useNavigate();

        const pinsCreation =  async (e) => {
            e.preventDefault()
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

    console.log("imageName reques cloudinary == ", imageName )


    const handlePins = async(e) => {
        e.preventDefault()

        await fetch(
            'http://192.168.1.105:3000/pins', 
            {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `title=${title}&description=${description}&imageName=${imageName}`
            }
        )
        nav('/')      
    }                 


    return (
        <>
        <Navbar/>
            <div className="row">
                <div className="col-md-6 mx-auto m-5">
                    <h1 className='text-center mb-5'>{props.Username} c'est le moment de créer votre plus beau pin ! 💓 </h1>
                    <form>
                        <input type="file"
                        name='file'
                        onChange={(e)=>setImageSelected(e.target.files[0])}                      
                        />
                        <div className="form-group mt-3">
                            <label htmlFor="titre">Titre</label>
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
                            <label htmlFor="description">Description </label>
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
                            <button type="submit" className='btn btn-success mt-5' style={{borderRadius: 50}} onClick={handlePins} >Créer le Pin</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
function mapStateToProps (state) {
    return {Username: state.Username}
}

export default connect (
    mapStateToProps,
    null
)(PinsCreate);