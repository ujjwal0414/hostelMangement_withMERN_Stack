import React from "react";
import { NavBar } from "./NavBar";
import cls from "../CSSfiles/LaunchPage.module.css"
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";
const LaunchPage=()=>{
    let navigate=useNavigate();
    let redirectToRateMess=()=>{
        navigate("/ratemessfood");

    }
    let redirectToComplainForm=()=>{
        navigate("/complainform");
    }
    return(
        
        <div>
            <NavBar></NavBar>
            <div className={cls.launcherMainDiv}>
                <div className={cls.descriptionDiv}>
                    <p>Dear User,</p>
                    <p>This website has been created keeping in mind the various issues a student faces during their day to day life or their stay in the campus .</p>
                    <p>This web service helps to lodge complains againt the indivdual or any hostel or academic related problems or any authority here chossing their identity as they want .</p>
                </div>
                <div className={cls.cardsContainer}>
                <div className={cls.CardDiv}><div className={cls.imageHolder}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDXlu35C_h7-1evZ2Xm8syVoT-8xwKltov0yBOHm07P5QyeKfh6OUCf9B5iqyw0Om4s7U&usqp=CAU" alt="pix"/></div>
                <div className={cls.ratefoodDesc}>Very few likes Mess food but do we have an option , No? Therefore its our responsibilty too that we assure what we eat is well prepared for us.If you want torate services Here we are!</div>
                <div className={cls.rateBtn}>
                    <button onClick={redirectToRateMess}>Rate Now !</button>
                </div>
                </div>
                
                <div className={cls.CardDiv}><div className={cls.imageHolder}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt1Ab7eeB_5nDD35waXoG7MpjDjpYCacrKFg&usqp=CAU" alt="pix"/></div>
                
                <div className={cls.ratefoodDesc}>Being a student majority people lives in hostels and where they have to manage with daily inforseend circumstances and it might be poossible that they are not able to report physically .Here they can do so!</div>
                <div className={cls.rateBtn}>
                    <button onClick={redirectToComplainForm}>Complain</button>
                </div>
                </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
export {LaunchPage}
