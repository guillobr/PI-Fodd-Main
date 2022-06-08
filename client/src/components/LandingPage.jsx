import React from "react";
import { Link } from "react-router-dom"
import './LandingPage.css';


export default function LandingPage() {
    return(
        <div className="landing">
            <h1 className="welcomeMsg">Welcome To The Recipes Book</h1>
            <Link to = "/home">
                <button className="homeButton">Start</button>
            </Link>
        </div>
    )
}