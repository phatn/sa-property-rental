import {useEffect, useState} from "react";
import axios from "axios";
import './App.css';
import {useNavigate} from "react-router";
import Constants from "./Constants";

export default function PropertyList(props) {

    const nav = useNavigate();

    const [properties, setProperties] = useState(null);


    const loadProperties = async () => {
        const url = `${Constants.PROPERTY_URL}`;
        const response = await axios.get(`${url}/properties`);
        setProperties(response.data);
    }

    const reserve = (id) => {
        nav("/property-detail/" + id)
    }

    useEffect(() => {
        loadProperties();
    }, [])

    return (
        <div className="property-detail-top">
            {!properties ? <div><h2>Property list is loading...</h2></div> : properties.map(p => {
                return (
                    <div key={p.id} className="card border-primary mb-3 ">
                        <div className="row-cols-1">
                            <div className="card-header">{p.type}</div>
                            <div className="card-body text-primary">
                                <h5 className="card-title">Price: ${p.pricePerNight}</h5>
                                <p className="card-text">{p.description}</p>
                                <p className="card-text">Address: {p.address.street}, {p.address.city}, {p.address.state}, {p.address.zipCode}</p>
                                <p><button className="btn btn-primary" onClick={() => reserve(p.id)}>Detail</button></p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}