import { NavBar } from "./NavBar";
import cls from '../CSSfiles/SignUp.module.css'
import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
let localConnection=require("./localhostConfig");

const SignUp=()=>{
    let navigate=useNavigate();
    let [userName,setName]=useState("");
    let [password,setPassword]=useState("");
    let [email,setEmail]=useState("");
    let [input_status,setInputStatus]=useState(false);
    let [registervalue,setRegisterStatus]=useState(false);
    let [registrystatus,setregistryStatus]=useState(false);
    let [userNotification,setNotification]=useState(true);
    let [result,setResult]=useState({});
    let signUp=async ()=>{
        setRegisterStatus(true);
       if(userName==="" || password==="" || email===""){
        setInputStatus(true);
       }
       else{
        
        result= await fetch(`${localConnection}/signup`,{
            method:"post",
            body:JSON.stringify({
                username:userName,
                password:password,
                email:email
            }),
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(result){
            result=await result.json();
            localStorage.setItem("stduser",JSON.stringify({name:result.username,email:result.email}));
            localStorage.setItem("forgotUser",JSON.stringify({name:result.username,email:result.email}));

            setResult(result);
        setregistryStatus(true);
        setTimeout(()=>{
            setEmail("");
            setName("");
            setPassword("");
            setRegisterStatus(false);
            navigate("/");
        },2000)
        }
       
       }
        
    }
    useEffect(()=>{
    },[result])

   useEffect(()=>{
    setNotification(true);
   },[])   
    return(
        <div>
            {userNotification?<><div className={cls.launchDescription}></div>
            <div className={cls.whiteDivs}>
                <span onClick={()=>{setNotification(false)}} className={cls.cross}>&#x2716;</span>
                <div>Dear user,</div>
                <div>Use your personal Gmail account so that you are notified more about our services for smooth experience of our services.Any further recommendations are welcomed.(Currently this website is being improved and new features are yet to be added .Sorry for all inconvenience if any)</div>
            </div></>:<></>}
           <NavBar></NavBar>
           <div className={cls.signUpContainerMainDiv}>
             <div className={cls.userDetailsInfo}>
                <div className={cls.userContainer}>
                    <div className={cls.label}>User Name</div>
                    <div><input className={cls.userinputs} value={userName} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Enter User Name"/></div>
                    {input_status && userName==="" ? <div className={cls.errMess}>User Name Missing</div>:<></>}
                </div>

                <div className={`${cls.userContainer} ${cls.newInput}`}>
                    <div className={cls.label}>Pasword</div>
                    <div><input className={cls.userinputs} value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Enter Password"/></div>
                    {input_status && password==="" ? <div className={cls.errMess}>Password Empty</div>:<></>}

                </div>

                <div className={`${cls.userContainer} ${cls.newInput}`}>
                    <div className={cls.label}>Email </div>
                    
                    <div><input className={cls.userinputs} value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Enter Email"/></div>
                    {input_status && email==="" ? <div className={cls.errMess}>Email empty</div>:<></>}

                </div>
                {registervalue?<div className={cls.CheckingData}>{registrystatus?"Registered":"Not registered till now"}</div>:<></>}
                <div className={cls.btnLogin}><button onClick={signUp}>Sign Up</button></div>
             </div>
           </div>
        </div>
    )
}
export{SignUp}
