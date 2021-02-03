import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {

     const [bookData, setbookData] = useState([])
     const [loggedInUser, setLoggedInUser] = useContext(UserContext)

     useEffect(() =>{
         fetch('http://localhost:5000/booking?email='+loggedInUser.email,{
             method: 'GET',
             headers:{
                 'Content-Type' : 'application/json',
                 authorization : `Bearer ${sessionStorage.getItem('token')}`
             }
         })
         .then(result => result.json())
         .then(data => setbookData(data))
     })
     
    return (
        <div>
           <h3>Total booking {bookData.length}</h3>
           {
               bookData.map(book => <li key={book._id}>{book.displayName} {book.email} {new Date(book.CheekIn).toDateString('dd/MM/yyyy')} {book.CheckOut}</li>)
           }
        </div>
    );
};

export default Bookings;