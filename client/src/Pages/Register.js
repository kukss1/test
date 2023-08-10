import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/userData';
import SimpleSider from '../components/Siders/SimpleSider';
import '../components/Register/Register.css';

function Register({ history }) {
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({
        name: null,
        lastName: null,
        gender: null,
        phoneNumber: '',
        email: "",
        password: "",
        repeatPassword: ""
    });

    const handleChanges = (e) => {
        e.preventDefault();
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleSubmitReg = (e) => {
        e.preventDefault();
        setLoading(true);
        registerUser(userData)
            .then(res => {
                if (!res.error) {
                    history.push('/auth/login')
                } else {
                    setLoading(false);
                    setError(res.error);
                    setAlertShow(true);
                }
            }).catch(err => console.error('error from register: ', err))
    }

    return (
        <>
            <SimpleSider />
            <div className="reg_auth-form">
                <h1 className="auth_heading">Sign Up</h1>
                <form className="login_form_wrapper" onSubmit={handleSubmitReg}>
                    {alertShow &&
                        <div className="alert alert-danger" role="alert">
                            <p>{error}</p>
                        </div>
                    }
                    <div>
                        <div className="login_input_wrapper">
                            <label htmlFor="name">Name *</label>
                            <input type="text" name="name" id="name" placeholder="Ivan Ivanov" onChange={handleChanges} required />
                            <p className="form-text muted">The name can be your real one or a username.</p>
                        </div>
                        <div className="login_input_wrapper">
                            <label htmlFor="lastName">Last Name *</label>
                            <input type="text" name="lastName" id="lastName" placeholder="Ivanov" onChange={handleChanges} />
                        </div>
                        <div className="login_input_wrapper">
                            <label htmlFor="gender">Gender</label>
                            <select className='gender_select' defaultValue="not specified" name="gender" id="gender" onChange={handleChanges}>
                                <option value="male">male</option>
                                <option value="female">female</option>
                                <option value="not specified">not specified</option>
                            </select>
                        </div>
                    </div>
                    <div className="login_input_wrapper">
                        <label htmlFor="phoneNumber">Phone Number *</label>
                        <input type="text" name="phoneNumber" id="phoneNumber" placeholder="+374XXXXXX" onChange={handleChanges} required />
                        <p className="form-text muted">Phone Number should be a valid AM number.</p>
                    </div>
                    <div className="login_input_wrapper">
                        <label htmlFor="email">Email address *</label>
                        <input type="email" name="email" id="email" placeholder="ivan@abv.bg" onChange={handleChanges} required />
                    </div>
                    <div className="password_wrapper">
                        <label htmlFor="password">Password *</label>
                        <input type="password" name="password" id="password" placeholder="Password" onChange={handleChanges} required />
                        <p className="form-text muted">Your password must be 8-20 characters long</p>
                    </div>
                    <div className="password_wrapper">
                        <label htmlFor="repeatPassword">Repeat Password *</label>
                        <input type="password" name="repeatPassword" id="repeatPassword" placeholder="Repeat password" onChange={handleChanges} required />
                    </div>
                    {loading ?
                        <button className="wait_btn" disabled>
                            Please wait... <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        </button>
                        :
                        <button type="submit" className="login_sign_btn">Գրանցվել</button>
                    }
                    <p className="bottom-msg-paragraph">Ունեք անձնական էջ <Link to="/auth/login">Մուտք</Link>!</p>
                </form>
            </div>
        </>
    )
}

export default Register;
