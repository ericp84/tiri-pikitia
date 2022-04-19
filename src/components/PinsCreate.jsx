import React, {useState} from 'react';
import Navbar from './NavBar';
import {connect} from 'react-redux';
import Add from './UploadInput'

const PinsCreate = (props) => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [imageName, setImageName] = useState();
    const [imageSelected] = useState();

    const pinsCreation = async () => {
        const formData = new FormData();
        formData.append('file', {
            type:'image/jpeg',
        });

        // await fetch('https://api.cloudinary.com/v1_1/ericcloud/image/upload', {
        //     method: "POST",
        //     body: formData
        // })
        await fetch('http://192.168.1.105:3000/pins', {
            method:'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `title=${title}&description=${description}&imageName=${imageName}&userId=${props.token}`
        })
        


    }
    console.log('title', title)
    console.log('description', description)
    console.log('imageSelected', imageSelected)


    return (
        <>
        <Navbar/>
        <Add/>

        <div className="row">
                <div className="col-md-6 mx-auto m-5">
                    <h1 className='text-center mb-5'>{props.Username} c'est le moment de créer votre plus beau pin ! 💓 </h1>
                    <form>
                        <input type="file"
                        className='form-control'
                        id='file'
                        name='file'
                        onChange={(e)=>
                            setImageName(e.target.value)
                        }
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
                            <a href="/" className='btn btn-success mt-5' style={{borderRadius: 50}} onClick={pinsCreation}>Créer le Pin</a>
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