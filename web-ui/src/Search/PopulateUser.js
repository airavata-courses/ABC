import React from "react";
import '../Feed/styles.css'

export function PopulateUser (props) {
    return(
        <div className="card border-dark mb-3">
            <div className="card-header PostUserInfo">
                <img src="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg" alt="User Placeholder" className ="img-thumbnail rounded-circle" width="50" height="50"/>
                <h5 style={{ padding: 10 }}>{props.data.title}</h5>
            </div>

            <div className="card-body">
                <p className="card-text text-dark"> {props.data.tweetText}</p>

                <button className="btn btn-primary"
                    disabled={false}>
                    <span className="badge badge-light">
                        {props.data.id} {props.user.username}
                    </span> Like

                </button>
                {/* parseInt(props.data.userId) === props.user.id
                        && <button className="btn btn-danger"
                            onClick={() => {props.onClickDelete(props.data.id)}}
                        >
                            Delete
                        </button>
                    */
                }

            </div>
        </div>
    );
}
