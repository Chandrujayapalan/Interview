import React, { useState } from "react";
import { history } from "./Serivce/index";


function Login() {
   
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    // const [submit, setSubmit] = useState(false);



    const handleSubmit = () => {
        let reg = {
            userName: userName,
            password: password,
        }
        fetch("http://localhost:4000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Orgin": "*",

            },
            body: JSON.stringify(reg)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data?.message === "password does not match") {
                    alert(" password does not match")
                } else if (data?.message === "user Not found") {
                    alert("user not found")
                } else {
                   history.push("/Flight")
                }
                localStorage.setItem("Authorization" ,`Bearer ${data?.data}`)
            })
    }
    return (
        <div>
            <div> Login</div>
            <label>Email</label>
            <input type="email" placeholder="Enter The Email" name="userName" onChange={(e) => setUserName(e.target.value)}></input><br></br>
            <label>Password</label>
            <input type="password" placeholder="Enter The password" name="password" onChange={(e) => setPassword(e.target.value)}></input><br></br>
            <button onClick={handleSubmit}>Login</button>
        </div>
    )
}
export default Login;