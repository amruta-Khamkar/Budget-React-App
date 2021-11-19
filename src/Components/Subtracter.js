import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { Form, Button, Row, Col, Alert,Table } from 'react-bootstrap';
let exp=0;
export default function Subtracter() {
    const [loger, setLoger] = useState([]);
    const [error, setError] = useState('');
    const [loge, setLoge] = useState(null);
    const[flag,setFlag]=useState({
        index:0,
        update:1
    })
    const amount = useRef('');
    const title = useRef('');
    useEffect(() => {
        if (sessionStorage.getItem('user') != undefined) {
            let items = JSON.parse(sessionStorage.getItem('user'));
            setLoger(items)
        }
    }, [])
   
    const add = (event) => {
        event.preventDefault();
        setError({ msg: '', check: false })
        // let temp = [...loger];//creates a separate memory
        let temp = loger;
        if (parseInt(temp.balance) < parseInt(amount.current.value)) {
            setError({ msg: 'Low Balance', check: true })

        }
        else {
            temp.expense = parseInt(temp.expense) + parseInt(amount.current.value);
            temp.balance = parseInt(temp.total) - parseInt(temp.expense);
            temp.passbook.push({ title: title.current.value, expense: amount.current.value })
            setLoger(temp);
            sessionStorage.setItem('user', JSON.stringify(temp));
        }
    }
    const remover = (i) => {
        const newTodo = loger.passbook.filter((_, index) => index !== i);
        let temp = loger;
        temp.passbook = newTodo;
        for(let i=0;i<temp.passbook.length;i++){
            exp=exp+parseInt(temp.passbook[i].expense);
        }
        temp.expense = exp;
        temp.balance = parseInt(temp.total) - parseInt(temp.expense);
        setLoger(temp);
        sessionStorage.setItem('user', JSON.stringify(temp));
        window.location.reload(false);
    }
     
   const edit = (index) => {
       setFlag({
           index:1,
           update:index
       })
        document.getElementById("title").value = loger.passbook[index].title
        document.getElementById("amount").value = loger.passbook[index].expense;

    }
    const Update = (position) => {
      
 if (window.confirm("Are sure you want to update this?")) {
            console.log("final update")
            let temp = loger;
            temp.passbook[position].title = document.getElementById("title").value;
            temp.passbook[position].expense = document.getElementById("amount").value;
            for(let i=0;i<temp.passbook.length;i++){
                exp=exp+parseInt(temp.passbook[i].expense);
            }
       temp.expense = exp;
            temp.balance = parseInt(temp.total) - parseInt(temp.expense);
            axios.put(`http://localhost:3001/EmpData/${loger.id}`,temp)
            setLoger(temp);
            sessionStorage.setItem('user', JSON.stringify(loger));
            document.getElementById("title").value = " ";
            document.getElementById("amount").value = " ";
            setFlag({
                ...flag,
                index:0
            })
        }
    }
    return (
        <div>
            <form className="blurform my-5"  >
                {error.check ? <Alert variant="danger" onClose={() => setError({ msg: '', check: false })} dismissible>
                    <Alert.Heading>{error.msg}</Alert.Heading>
                </Alert> : ''}
                <Form.Floating className="mb-4">
                    <Form.Control
                    id="title"
                        type="text"
                        placeholder="title"
                        ref={title}
                    />
                    <label>please enter your expense</label>
                </Form.Floating>
                <Form.Floating className="mb-4">
                    <Form.Control
                    id="amount"
                        type="number"
                        placeholder="money"
                        ref={amount}
                    />
                    <label>Enter Amount</label>
                </Form.Floating>
                {
                    flag.index==1?  <Button style={{
                        background: '#E84855', border: 'none', height: "55px", width: '100%', fontSize: '30px'
                    }} type="submit" onClick={()=>Update(flag.update)}>
                       update
                    </Button> :  <Button style={{
                    background: '#E84855', border: 'none', height: "55px", width: '100%', fontSize: '30px'
                }} type="submit" onClick={add}>
                  Add Money to the Budget
                </Button>
                }
              
            </form>
            <Row className="text-center container mx-auto mt-5">
                <Col xs={6} md={4}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-currency-exchange" viewBox="0 0 16 16">
                        <path d="M0 5a5.002 5.002 0 0 0 4.027 4.905 6.46 6.46 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05c0-.046 0-.093.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.46 3.46 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5zm16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787H8.25zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674l.077.018z" />
                    </svg>
                </Col>
                <Col xs={6} md={4}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-credit-card-2-back-fill" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H0V4zm11.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zM0 11v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1H0z" />
                    </svg>
                </Col>
                <Col xs={6} md={4}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-currency-dollar" viewBox="0 0 16 16">
                        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                    </svg>
                </Col>
            </Row>
            <Row className="text-center container mx-auto">
                <Col xs={6} md={4}>
                    <h2 className='text-info'>Budget</h2>
                </Col>
                <Col xs={6} md={4}>
                    <h2 className='text-danger'>expense</h2>
                </Col>
                <Col xs={6} md={4}>
                    <h2 className='text-info'>balance</h2>
                </Col>
            </Row>
            <Row className="text-center container mx-auto">
                <Col xs={6} md={4}>
                    <h2 className='text-info'>{loger.total}</h2>
                </Col>
                <Col xs={6} md={4}>
                    <h2 className='text-danger'>{loger.expense}</h2>
                </Col>
                <Col xs={6} md={4}>
                    <h2 className='text-info'> {loger.balance}</h2>
                </Col>
            </Row>
            {loger &&
                <React.Fragment>
                    <Table bordered hover variant="dark" className="container my-3" >
                        <thead>
                            <tr>
                                <th>S. No.</th>
                                <th>Title</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log(loger.passbook)}
                            <React.Fragment>

                                {loger.passbook!=undefined && loger.passbook.map(((val, i) =>
                                    <tr key={i} >
                                        <th>{i + 1}</th>
                                        <td>{val.title}</td>
                                        <td>{val.expense}</td>
                                        <td> 
                                            <Button onClick={() => remover(i)}>delete</Button>
                                            <Button onClick={() => edit(i)}>update</Button>
                                        
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        </tbody>
                    </Table>
                </React.Fragment>
            }
        </div>
    )
}
