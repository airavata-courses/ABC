import React from "react";
import "./styles.css";

export function NewsComp (props) {
    return(
        <div>
            <a className="card-text text-dark" href={props.data.url} target="_blank">{props.data.title}</a>
            <hr/>
        </div>
    );
}
