import React, { useState } from "react";
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css";
function Flight() {

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [offer, setOffer] = useState("");
    const [flights, setFlights] = useState("");

    const [date, setDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [datas, setDatas] = useState({});

    const [submit, setSubmit] = useState(false);
    const [message, setMessage] = useState(false);
    const [value, setValue] = useState(false);
console.log(datas.message)



    const handleSubmit = () => {
        fetch(`http://localhost:4000/api/viewBooking?from=${from}&to=${to}&date=${date}`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            },
        })
            .then((response) => response.json())
            .then((response) => {
                setData(response?.data)
                setMessage(response)
                setSubmit(true)

            })
    }
    const handleClick = (e) => {

        const reg = {
            offer: offer
        }

        fetch(`http://localhost:4000/api/createBooking?flights=${flights}`, {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("Authorization"),
                "Content-Type": "application/json",
                "Access-Control-Allow-Orgin": "*"
            },
            body: JSON.stringify(reg)

        })
            .then((response) => response.json())
            .then((response) => {
                setDatas(response)
                setValue(true)

            })
    }
    return (
        <div>
            {!value && (
                <div>
                    {!submit && (
                        <div>
                            <div> Search For flights</div><br></br>
                            <label>From</label>
                            <input type="text" className=" mx-4" placeholder="Enter The Destination" name="from" onChange={(e) => setFrom(e.target.value)}></input><br></br><br></br>
                            <label>To</label>
                            <input className=" mx-5" type="text" placeholder="Enter The Arrival" name="to" onChange={(e) => setTo(e.target.value)}></input><br></br><br></br>
                            {/* <div className="d-flex "> <label>Date</label> <div className=" px-5">  <DatePicker selected={date} onChange={(date) => setDate(moment(date).format("YYYY-MM-DD"))} />
            </div></div> <br></br><br></br> */}
                            <label>Date</label>
                            <input className=" mx-5" type="date" name="date" value={moment(date).format("YYYY-MM-DD")} onChange={(e) => setDate(e.target.value)}></input><br></br><br></br>


                            <button onClick={handleSubmit}>Search</button>
                        </div>
                    )}

                    {submit && (
                        <div>
                            <div>{message.message}</div>

                            <label>Coupon Code</label>
                            <input type="text" name="offer" onChange={(e) => setOffer(e.target.value)}></input><br></br><br></br>

                            {
                                data?.map((a, index) =>
                                    <div key={index}>
                                        <div>Tickets Available</div>
                                        <div className="d-flex ">From :{a.from} </div>
                                        <div className="d-flex">TO : {a.to}</div>
                                        <div className="d-flex"> Destination :{moment(a.deportDate).format("YYYY-MM-DD")} {moment(a.deportDate).format("HH:MM")} </div>
                                        <div className="d-flex"> Arrival :{moment(a.arrivalDate).format("YYYY-MM-DD")} {moment(a.arrivalDate).format("HH:MM")} </div>
                                        <div>Amount:{a.amount}</div>
                                        <button key={a._id} onClick={() => setFlights(a._id)}>Tickets</button>

                                        <button onClick={handleClick}>Book Now</button>
                                    </div>

                                )
                            }

                        </div>
                    )}
                    

                </div>

            )}
            {value && (
                <div>
                  
                    <div>{datas.message} </div>

                </div>
            )}

        </div>

    )
}
export default Flight;