import React from "react";
import "./Friend.css";

const Friend = props => (
    <div className = "FCard" >
        value = {props.id}
        onClick = {() => props.handleClick(props.id)}
    
        <div className = "img-container">
        <img alt = {props.name} src = {props.image}/>
        </div>
    </div>
);

export default Friend;