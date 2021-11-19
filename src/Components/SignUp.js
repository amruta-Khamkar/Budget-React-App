import React, { useRef, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
// const CryptoJS = require("crypto-js");
import CryptoJS from 'crypto-js'
import axios from 'axios';
const client = axios.create({
    baseURL: "http://localhost:3001/EmpData"
})
const regForName = RegExp(/^[A-Z a-z]{4,29}$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
const regForUser = RegExp(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/);
export default function SignUp() {
    const [error, setError] = useState('');
    const name = useRef('');
    const user = useRef('');
    const email = useRef('');
    const pass1 = useRef('');
    const pass2 = useRef('');
    const navigate = useNavigate();
    const register = (event) => {
        event.preventDefault();
        setError({ msg: '', check: false })
        if (name.current.value == '' || user.current.value == '' || email.current.value == '' || pass1.current.value == '' || pass2.current.value == '') {
            setError({ msg: 'Missing Field', check: true })
        }
        else if (!regForName.test(name.current.value)) {
            setError({ msg: 'Enter a Proper Name', check: true })

        }
        else if (!regForUser.test(user.current.value)) {
            setError({ msg: 'Enter alphanumeric user id', check: true })

        }
        else if (!regForEmail.test(email.current.value)) {
            setError({ msg: 'Enter vaild email address', check: true })

        }
        else if (!regForPass.test(pass1.current.value)) {
            setError({ msg: 'enter a password with atleast one special character and numeriv value  (6-16) ', check: true })

        }
        else if (pass2.current.value != pass1.current.value) {
            setError({ msg: 'password not match', check: true })

        }
        else {
            const cipherPass = CryptoJS.AES.encrypt(JSON.stringify(pass1.current.value), user.current.value).toString();
            let newUser = { name: name.current.value, user: user.current.value, email: email.current.value, password: cipherPass, total: 0, passbook: [], expense: 0, balance: 0 };
            client.post('', newUser);
            alert('Registered Successfully')
            navigate('/')
        }
    }
    return (
        <div style={{ height: "100vh", background: "linear-gradient(to right, #414345, #232526)" }}>
            <h1 className='title'>Sign Up</h1>

            <form className="blurform" onSubmit={register}>
                {error.check ? <Alert variant="danger" onClose={() => setError({ msg: '', check: false })} dismissible>
                    <Alert.Heading>{error.msg}</Alert.Heading>
                </Alert> : ''}
                <Form.Floating className="mb-2">
                    <Form.Control
                        type="text"
                        placeholder="Paras Saxena"
                        ref={name}
                    />
                    <label>Name</label>
                </Form.Floating>
                <Form.Floating className="mb-2">
                    <Form.Control
                        type="text"
                        placeholder="paras42337"
                        ref={user}
                    />
                    <label>User ID</label>
                </Form.Floating>
                <Form.Floating className="mb-2">
                    <Form.Control
                        type="text"
                        placeholder="paras@gmail.com"
                        ref={email}
                    />
                    <label>Email ID</label>
                </Form.Floating>
                <Form.Floating className="mb-2">
                    <Form.Control
                        type="password"
                        placeholder="Paras@123"
                        ref={pass1}
                    />
                    <label>Create Password</label>
                </Form.Floating>
                <Form.Floating className="mb-2">
                    <Form.Control
                        type="password"
                        placeholder="Paras@123"
                        ref={pass2}
                    />
                    <label>R-Password</label>
                </Form.Floating>
                <Button style={{
                    background: '#E84855', border: 'none', height: "55px", width: '100%', fontSize: '30px'
                }} type="submit">
                    Register
                </Button>
            </form>
            <br />
            <h6>Have an account? <Link to="/">Log in</Link></h6>
        </div>
    )
}
