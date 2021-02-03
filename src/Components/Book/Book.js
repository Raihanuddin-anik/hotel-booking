import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import Bookings from '../Bookings/Bookings';


const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = useState({
        CheekIn: new Date(),
        CheckOut: new Date()
    })
    console.log(selectedDate)

    const handleCheckInDate = (date) => {
        
       const newDatesIn = {...selectedDate}
       newDatesIn.CheekIn = date
       setSelectedDate(newDatesIn)
    };
    
    const handleCheckOutDate = (date) => {
        const newDatesOut = {...selectedDate.CheckOut}
        newDatesOut.CheekOut = date
        setSelectedDate(newDatesOut)
     };

     const BookingServer = () =>{
        const BookingData = {...loggedInUser, ...selectedDate}
        fetch("http://localhost:5000/addBooking",{
            method:"POST",
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify(BookingData)
        })
        .then( res => res.json()
        .then(data => {
            console.log(data)
        }))
     }
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Hello,{loggedInUser.displayName} Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>


            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={selectedDate.CheekIn}
                        onChange={handleCheckInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="MM/dd/yyyy"
                        value={selectedDate.CheckOut}
                        onChange={handleCheckOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                
                </Grid>
                <Button onClick={()=>BookingServer()} variant="contained" color="primary">
                        Selct Date
                    </Button>
            </MuiPickersUtilsProvider>
            <Bookings></Bookings>
        </div>
    );
};

export default Book;