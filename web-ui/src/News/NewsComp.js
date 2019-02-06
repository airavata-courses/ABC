import React from "react";
import "./styles.css";

export function NewsComp (props) {
    console.log("FROM NEWS-COMP"); 
    console.log(props); 
    return(
        <div>
                <p className="card-text text-dark">{props.data.author}</p>
        </div>
    );
}
