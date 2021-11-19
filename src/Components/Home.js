import React, { useState, useEffect } from 'react'
import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const client = axios.create({
    baseURL: "http://localhost:3001/EmpData"
})
export default function Home() {
    const [loger, setLoger] = useState([]);
    const navigate = useNavigate();
    const jupadate = async () => {
        if (sessionStorage.getItem('user') != undefined) {
            let items = JSON.parse(sessionStorage.getItem('user'));
            setLoger(items)
        }
        await client.put(`${loger.id}`, loger)
        navigate('/')

    }
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#">
                        <img
                            alt=""
                            src="https://www.freeiconspng.com/thumbs/calculator-icon/calculator-icon-4.png"
                            width="35"
                            height="35"
                            className="d-inline-block align-top"
                        />{' '}
                        <h2 style={{ display: 'inline', color: 'white' }}>Budget Calculator</h2>
                    </Navbar.Brand>
                    <Nav className='mx-auto'>

                        {/* <Link to="/" className="nav-link text-light" >{`welcome :  ${JSON.parse(sessionStorage.getItem("user")).name}`}</Link> */}
                        <Link to="/home/add" className="nav-link text-light" >Add Money</Link>
                        <Link to="/home/sub" className="nav-link text-light mx-5" >Add Expenses</Link>
                        <Button variant='warning' className="ms-5" onClick={jupadate}> Log Out</Button>
                    </Nav>

                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}
