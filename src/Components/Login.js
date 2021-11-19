import React, { useRef, useEffect, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import SocialButton from "./SocialButton";
import { Link, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js'
import axios from 'axios';
import { SocialIcon } from 'react-social-icons';
const client = axios.create({
    baseURL: "http://localhost:3001/EmpData"
})
export default function Login() {
    const email = useRef(null);
    const pass = useRef(null);
    const [error, setError] = useState(null);
    const [empList, setEmpList] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        client.get()
            .then(res => { setEmpList(res.data) })
        sessionStorage.removeItem('user')

    }, [])
    const handleSocialLogin = async (user) => {
        console.log(user._profile);
        let e = await empList.find(x => x.email === user._profile.email)
        let eindex = empList.indexOf(e);
        if (eindex + 1) {
            sessionStorage.setItem('user', JSON.stringify(empList[eindex]));
            navigate('/home/add')
        }
        else {
            let newUser = { id: empList.length + 1, name: user._profile.firstName + user._profile.lastName, user: user._profile.id, email: user._profile.email, password: "loged", total: 0, passbook: [], expense: 0, balance: 0 };
            client.post('', newUser);
            sessionStorage.setItem('user', JSON.stringify(newUser));
            navigate('/home/add')
        }

    };
    const handleSocialLoginFailure = (err) => {
        console.error(err);
    };
    const validate = async (event) => {
        event.preventDefault();
        setError({ msg: '', check: false })
        let e = await empList.find(x => x.email === email.current.value)
        let eindex = empList.indexOf(e);
        if (eindex + 1) {
            const bytes = CryptoJS.AES.decrypt(empList[eindex].password, empList[eindex].user);
            const decryptedPass = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            if (decryptedPass === pass.current.value) {
                sessionStorage.setItem('user', JSON.stringify(empList[eindex]));
                alert('done')
                navigate('/home/add')
            }
            else {
                setError({ msg: 'password not match', check: true })

            }
        }
        else {
            setError({ msg: 'Enter vaild email address', check: true })

        }
    }

    return (
        <div style={{ height: "100vh", background: "linear-gradient(to right, #414345, #232526)" }}>
            <h1 className='title'>Log in</h1>
            <form className="blurform" onSubmit={validate}>
                {error && error.check && <Alert variant="danger" onClose={() => setError({ msg: '', check: false })} dismissible>
                    <Alert.Heading>{error.msg}</Alert.Heading>
                </Alert>}
                <Form.Floating className="mb-4">
                    <Form.Control
                        type="email"
                        placeholder="paras@gmail.com"
                        ref={email}
                    />
                    <label>Email ID</label>
                </Form.Floating>
                <Form.Floating className="mb-4">
                    <Form.Control
                        type="password"
                        placeholder="Paras@123"
                        ref={pass}
                    />
                    <label>Create Password</label>
                </Form.Floating>
                <Button style={{
                    background: '#E84855', border: 'none', height: "55px", width: '100%', fontSize: '30px'
                }} type="submit">
                    Login
                </Button>
            </form>

            <div style={{ width: "35%", margin: "0 auto", padding: 10 }}>
                <SocialButton
                    provider="facebook"
                    appId="421486192823061"
                    onLoginSuccess={handleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure}
                    className="btn btn-primary  w-100 my-4"
                    style={{ background: 'white', border: 'none',color:"black", height: "55px", fontSize: '30px' }}
                >
                    Login with facebook<SocialIcon network="facebook" />
                
                </SocialButton>
                <SocialButton
                    provider="google"
                    appId="1037363085127-oleb96q178chc62acem4luibpd3m7lqd.apps.googleusercontent.com"
                    onLoginSuccess={handleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure}
                    className="btn btn-light w-100 mb-4"
                    style={{ border: 'none', height: "55px", fontSize: '30px' }}
                >
                    Login with google <SocialIcon network="google" />
                </SocialButton>
                <h6>Don't have an account? <Link to='/sign'>Sign up</Link></h6>
            </div>
        </div>
    )
}
