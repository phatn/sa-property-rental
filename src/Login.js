import './App.css';
import {useState} from "react";
import axios from "axios";
import Constants from "./Constants";
import {useNavigate} from "react-router";
import {storeToken} from "./Utils";


export default function Login(props) {

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const nav = useNavigate();

    const inputChanged = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        });
    }

    const login = async () => {
        const {email, password} = loginForm;
        const response = await axios.post('http://35.193.240.176/uaa', { email, password });
        if(response.data.accessToken) {
            storeToken(response.data.accessToken);
            nav('/property-list');
        }
    }

    const onKeyPressed = (e) => {
        if (e.charCode === 13) {
            login();
        }
    }

    return (
        <div className="login-top">
            <div className="row login">
                <form className="form-login">
                    <div className="form-outline mb-4">
                        <input type="email" name="email" id="form2Example1" className="form-control" onChange={inputChanged}/>
                        <label className="form-label" htmlFor="form2Example1">Email address</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="password" name="password" id="form2Example2" className="form-control" onChange={inputChanged} onKeyPress={onKeyPressed}/>
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                    </div>

                    <button type="button" onClick={login} className="btn btn-primary btn-block mb-4">Sign in</button>

                </form>
            </div>
        </div>
    )
}