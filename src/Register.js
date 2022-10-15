import React, { useState } from "react";


function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState('');
    const [submit, setSubmit] = useState(false);

    const [data, setData] = useState([]);


    const handleSubmit = () => {
        let reg = {
            name: name,
            email: email,
            phone: phone,
            password: password,
            userType: userType
        }
        setSubmit(true)
        fetch("http://localhost:4000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Orgin": "*"
            },
            body: JSON.stringify(reg)
        })
            .then((response) => response.json())
            .then((response) => setData(response)
)
    }
    return (
        <div>
            {!submit && (
                <div>
                    <div> Register</div>
                    <label>Name</label>
                    <input type="text" placeholder="Enter The Name" name="name" onChange={(e) => setName(e.target.value)}></input><br></br>
                    <label>Email</label>
                    <input type="email" placeholder="Enter The Email" name="email" onChange={(e) => setEmail(e.target.value)}></input><br></br>
                    <label>Phone Number</label>
                    <input type="text" placeholder="Enter The Phone Number" name="phone" onChange={(e) => setPhone(e.target.value)}></input><br></br>
                    <label>Password</label>
                    <input type="password" placeholder="Enter The password" name="password" onChange={(e) => setPassword(e.target.value)}></input><br></br>
                    <label>UserType</label>
                    <input type="number" placeholder="Enter The 2 to User" name="userType" onChange={(e) => setUserType(e.target.value)}></input><br></br>
                    <button onClick={handleSubmit}>Register Now</button>
                </div>
            )}
            {submit && (
                <div>
                    {data.message}
                </div>




)}
          
        </div>
    )
}
export default Register;