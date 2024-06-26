import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './User.css'
import axios from 'axios';
import toast from 'react-hot-toast';

const User = () => {

    
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8000/api/getall')
         
            setUsers(response.data);
        }


        fetchData();


    }, [])
  console.log(users);
 const deleteUser =async (userId) =>{
    await axios.delete(`http://localhost:8000/api/delete/${userId}`)
    .then((res) =>{
       setUsers((prevUser) => prevUser.filter((user) => user._id !== userId) )
       toast.success(res.data.msg,{position:'top-center'})
    }).catch((error) =>{
        console.log(error);
    })
 }

    return (
        <div className='userTable'>
            <Link to={"/add"} className='addBtn'>Add User</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>


                    {
                        users.map((user, index) => {
                            return (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.fname} {user.lname}</td>
                                    <td>{user.email}</td>
                                    <td className='actionBtn'><button onClick={() =>{
                                        deleteUser(user._id)
                                    }}><i className="fa-solid fa-trash"></i>
                                    </button>
                                        <Link to={`/update/` + user._id}><i className="fa-solid fa-pen-to-square"></i></Link></td>
                                </tr>
                            )
                        })
                    }


                </tbody>
            </table>
        </div>
    );
};

export default User;