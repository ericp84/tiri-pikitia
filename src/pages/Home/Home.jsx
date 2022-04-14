import React, {useState, useEffect} from 'react';
import {Card, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import NavBar from '../../components/NavBar';


const Home = (props) => {
    const [Pins, setPins] = useState([]);

    useEffect(()=> {
        const pini = async() => {
            const pinstart = await fetch ('http://192.168.1.105:3000/recuppins')
            const displayPins = await pinstart.json();
            setPins(displayPins.savedPin)
        }
        pini()
    }, [])
    console.log(Pins.length)
    let pin;
    Pins.length === 0 ? pin = <div className="col-md-6 mx-auto text-center"><p>pas de pins à afficher</p></div> : pin = Pins.map((p, i) => {
        return (
        <Card className="rounded shadow p-3 bg-light rounded" style={{ width: '15rem', margin: 25 }} key={i}>
            <Card.Img variant="top" src={p.URL}  style={{borderBottomRightRadius: "0.25rem", borderBottomLeftRadius: "0.25rem"}}/>
            <Card.Body style={{display: "flex", flexDirection: "column"}}>
            <Card.Title style={{marginLeft: 5}}>{p.title}</Card.Title>
            <Card.Text className='text-muted' style={{marginLeft: 5}}>{p.description}</Card.Text>
            <Button variant="success">Voir</Button>
            </Card.Body>
        </Card>

        )
    })
    console.log("props.Username deconnexion =>",props.Username)
    console.log("props.token deconnexion =>",props.token)
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
function mapStateToProps(state) {
    return{Username : state.Username,
    token: state.token}
}
export default connect (
    mapStateToProps,
    null
)(Home);
