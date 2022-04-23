import React, {useState, useEffect} from 'react';
import {Card} from 'react-bootstrap';
import {connect} from 'react-redux';
import NavBar from './NavBar';


const Home = (props) => {
    const [Pins, setPins] = useState([]);
    const [id, setId] = useState()

    useEffect(()=> {
        const pini = async() => {
            const pinstart = await fetch ('http://192.168.1.105:3000/recuppins')
            const displayPins = await pinstart.json();
            setPins(displayPins.savedPin);
        }
        pini()
    }, [])
    let pin;
    Pins.length === 0 ? pin = <div className="col-md-6 mx-auto text-center"><p>pas de pins à afficher</p></div> : pin = Pins.map((p) => {
        return (
        <Card className="rounded shadow p-3 bg-light rounded" style={{ width: '15rem', margin: 25 }} key={p._id}>
            <Card.Img variant="top" src={p.imageName}  style={{borderBottomRightRadius: "0.25rem", borderBottomLeftRadius: "0.25rem"}}/>
            <Card.Body style={{display: "flex", flexDirection: "column"}}>
            <Card.Title  className='text-truncate' style={{marginLeft: 5}}>{p.title}</Card.Title>
            <Card.Text className='text-muted text-truncate' style={{marginLeft: 5}}>{p.description}</Card.Text>
            <a className="btn btn-success" href={`/pins/${id}`} onClick={()=>{
                setId(p._id)
                props.addPins(p)
                }}>voir</a>
            </Card.Body>
        </Card>

        )
    })
    console.log(id)
    return (
        <>
        <NavBar/>
            <h1 className='text-center m-5'>Découvrez les meilleurs pins du monde {props.Username} ! 🌎</h1>
                <div className="row">
                    <div className="col-md-8 d-flex justify-content-center w-100 mt-5 flex-wrap">
                        {pin}
                    </div>
                </div>
        </>
    );
};
function mapDispatchToProps(dispatch) {
    return {
        addPins: function(pin) {
            dispatch({type: 'addPins', pin: pin})
        }
    }
}
function mapStateToProps(state) {
    return{Username : state.Username,
    token: state.token}
}
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Home);
