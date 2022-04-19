import React, {useState} from 'react';

const UploadInput = () => {
    const [imageSelected, setImageSelected] = useState ()

    const uploadImage = async() => {
        const formData = new FormData();
        formData.append('file', imageSelected);
        formData.append('upload_preset', 'mi7zvg0s');

        await fetch('https://api.cloudinary.com/v1_1/ericcloud/image/upload', {
            method: "POST",
            body: formData
        })
    };

    return (
        <div>
            <input type="file"
                name="upload-file" 
                onChange={(e)=>{
                setImageSelected(e.target.files[0])
                }}
            />
            <button type='submit' onClick={uploadImage}>upload image</button>
        </div>
    );
};

export default UploadInput;