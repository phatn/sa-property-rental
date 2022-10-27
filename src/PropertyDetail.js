import {useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import './App.css'
import {getEmailFromToken, getToken} from './Utils'
import {Link} from "react-router-dom";
import Constants from "./Constants";


export default function PropertyDetail(props) {

    const params = useParams();
    const [night, setNight] = useState(1);

    const [reserveText, setReserveText] = useState('Reserve');

    const [paymentTypes, setPaymentTypes] = useState(null);

    const [paymentType, setPaymentType] = useState('');

    const onPaymentTypeChanged = (e) => {
        setPaymentType(e.target.value);
    }

    const getPaymentTypes = async () => {
        const email = getEmailFromToken();
        const url  = `${Constants.BACK_END_URL}/accounts/${email}`;
        const config = {
            headers: {
                Authorization: 'Bearer ' + getToken()
            }
        };
        const response = await axios.get(url, config);
        setPaymentTypes(response.data);
    }

    const [property, setProperty] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const reserve = async () => {

        const reservation = {
            propertyId: property.id,
            paymentType: paymentType,
            price: property.pricePerNight,
            night: night
        }
        const config = {
            headers: {
                Authorization: 'Bearer ' + getToken()
            }
        };
        const url = `${Constants.BACK_END_URL}/api/reservations`;
        const response =  await axios.post(url, reservation, config);
        if(response.data) {
            setReserveText("Reserved");
            setDisabled(true);
        }
    }

    const onNightChanged = (e) => {
        if(e.target.value > 0) {
            setNight(e.target.value);
        }

    }

    const loadProperty = async (id) => {
        const url = `${Constants.BACK_END_URL}/properties/${id}`;
        const response = await axios.get(url);
        setProperty(response.data);
    }

    useEffect(() => {
        loadProperty(params.id);
        getPaymentTypes();
    }, [])

    return (
        <div className="property-detail-top">
            {!property ? <div><h2>Property is loading...</h2></div> :
                    <div className="card border-primary mb-3">
                        <div className="card-header">
                            <p className='property-type'>{property.type}</p>
                            <p className='property-list-link'><Link to='/property-list'>Property List</Link></p>
                        </div>
                        <div className="card-body text-primary">
                            <h5 className="card-title">Price: ${property.pricePerNight}</h5>
                            <p className="card-text">{property.description}</p>
                            <p className="card-text">Address: {property.address.street}, {property.address.city}, {property.address.state}, {property.address.zipCode}</p>
                            <p>Night: <input type="number" name="night" onChange={onNightChanged} value={night}/> </p>
                            <p>Payment Type:
                                <select name="paymentType" onChange={onPaymentTypeChanged}>
                                    <option value="SELECT">--Select--</option>
                                    {!paymentTypes ? null :
                                        paymentTypes.map(p => {
                                            return (
                                                <option key={p} value={p}>{p}</option>
                                            )
                                        })
                                    }
                                </select>
                            </p>
                            <p><button disabled={disabled} className="btn btn-primary" onClick={reserve}>{reserveText}</button></p>
                        </div>
                </div>
            }
        </div>
    )
}