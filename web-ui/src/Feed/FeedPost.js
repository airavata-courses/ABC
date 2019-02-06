import React from 'react';
import './styles.css';

export function FeedPost (props) {
	console.log(props)
    return(
        <div className="card border-dark mb-3">
            <div className="card-header PostUserInfo">
                <img src="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg" alt="User Placeholder" className ="img-thumbnail rounded-circle" width="50" height="50"/>
                <h5 style={{ padding: 10 }}>{/* props.data.firstName} {props.data.lastName*/ } Username - {props.data.userName}</h5>
            </div>

            <div className="card-body">
                <p className="card-text text-dark"> {props.data.tweetText}</p>

                <button className="btn btn-primary"
                    onClick={props.incrementLike(props.data.id, props.user.username)}
                    disabled={true}>
                    <span className="badge badge-light">
                        {/*props.data.id} {props.user.username*/} (disabled for now) Like
                    </span> 

                </button>
                {/* parseInt(props.data.userId) === props.user.id
                        && <button className="btn btn-danger"
                            onClick={() => {props.onClickDelete(props.data.id)}}
                        >
                            Delete
                        </button> */
                }

            </div>
        </div>
    );
}
