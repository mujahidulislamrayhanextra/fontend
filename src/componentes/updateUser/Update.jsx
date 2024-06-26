import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './update.css'
import axios from 'axios';
import toast from 'react-hot-toast';

const Update = () => {
    const navigate = useNavigate()
    const { id } = useParams();

    const users = {
        fname: '',
        lname: '',
        email: '',
        password: '',
    }

    const [user, setUser] = useState(users)


    const inputChangeHandler = (e) => {
          const {name,value} = e.target;
          setUser({...user,[name]:value})
          console.log(user);
    }
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/getone/${id}`)
        .then((res) => {
          setUser(res.data)
        })
        .catch((error) =>{
            console.log(error);
        })
    },[id])


const submitForm = async(e) =>{
    e.preventDefault()
    await axios.put(`http://localhost:8000/api/update/${id}`,user)
    .then((res) => {
    toast.success(res.data.msg,{position:'top-center'})
    navigate('/')
    }).catch(error => console.log(error))
}

    return (
        <div className='addUser'>
            <Link to={'/'}  >Back</Link>
            <h3>
                Update User
            </h3>
            <form className='addUserForm' onSubmit={submitForm} >
                <div className='inputGroup'>

                    <label htmlFor="fname">First Name</label>
                    <input type="text" value={user.fname} onChange={inputChangeHandler} id='fname' name='fname' autoComplete='off' placeholder='First Name' />

                </div>

                <div className="inputGroup">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text"  value={user.lname} onChange={inputChangeHandler}  id='lname' name='lname' autoComplete='off' placeholder='Last Name' />
                </div>

                <div className="inputGroup">
                    <label htmlFor="email"> Your Email</label>
                    <input type="email"  value={user.email} onChange={inputChangeHandler}  id='email' name='email' autoComplete='off' placeholder='email' />
                </div>

                <div className="inputGroup">
                    <button type="submit">Update User</button>
                </div>
            </form>
        </div>
    );
};

export default Update;