import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cls from '../CSSfiles/NavBar.module.css';

const NavBar=()=>{
    let navigate=useNavigate()
    let logoutUser=()=>{
        localStorage.removeItem("stduser");
        navigate("/signup");
    }
    let [showCount,setCount]=useState(1);
    let [navigators,setStatus]=useState(true);
    let auth=localStorage.getItem("stduser");
    let toShowNavigators=()=>{
    setCount(showCount+1);
   
      showCount%2===0?setStatus(true):setStatus(false)
    }
    return(
        <div className={cls.NAVbarDiv}>
           <div className={cls.logo}><span>u</span><span className={cls.jex}>JEX</span></div>
           <span onClick={()=>{toShowNavigators()}} className={cls.threeBar}>&#8801;</span>

           <div className={cls.noUserSignPageOnwindow}>
            {auth?<> <div className={cls.signupDiv}><Link to="/">Home</Link></div>
            <div className={cls.signupDiv}><Link to="/complains">Complains</Link></div>
            {/* <div className={cls.signupDiv}><Link to="/login">Contact</Link></div> */}
            <div className={cls.signupDiv}><button className={cls.logoutbtn} onClick={logoutUser}>Logout</button></div>

           </>:<> <div className={cls.signupDiv}><Link to="/signup">Sign Up</Link></div>
            <div ><Link to="/login">Login</Link></div></>}
           </div>


           {navigators?<></>:<><div className={cls.noUserSignPage}>
            {auth?<> <div className={cls.signupDiv}><Link to="/">Home</Link></div>
            <div className={cls.signupDiv}><Link to="/complains">Complains</Link></div>
            {/* <div className={cls.signupDiv}><Link to="/login">Contact</Link></div> */}
            <div className={cls.signupDiv}><button className={cls.logoutbtn} onClick={logoutUser}>Logout</button></div>

           </>:<> <div className={cls.signupDiv}><Link to="/signup">Sign Up</Link></div>
            <div ><Link to="/login">Login</Link></div></>}
           
           

           </div></>}
        </div>
    )
}
export {NavBar}