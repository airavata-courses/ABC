import React from "react";
import "./styles.css";

export function FeedPost (props) {
    return(
        <div className="card border-dark mb-3">
            <div className="card-header PostUserInfo">
                <img src="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg" alt="User Placeholder" className ="img-thumbnail rounded-circle" width="50" height="50"/>
                <h5 style={{ padding: 10 }}>{props.data.title}</h5>
            </div>

            <div className="card-body">
                <p className="card-text text-dark"> {props.data.body}</p>

                <button className="btn btn-primary" onClick={props.onClickMethod} disabled={false}>
                    <span className="badge badge-light">
                        {props.data.id}
                    </span> Like
                </button>
            </div>
        </div>
    );
}
