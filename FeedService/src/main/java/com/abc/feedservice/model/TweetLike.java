package com.abc.feedservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * @author chetan253 on 1/30/19
 * @apiNote Model for storing tweet likes made by user
 */

@Document(collection = "tweetLikes")
public class TweetLike {

    @Id
    private String id;

    private String userId;
    private String tweetId;
    private Date dateCreated;

    public TweetLike(){

    }

    public TweetLike(String userId, String tweetId, Date dateCreated) {
        this.userId = userId;
        this.tweetId = tweetId;
        this.dateCreated = dateCreated;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTweetId() {
        return tweetId;
    }

    public void setTweetId(String tweetId) {
        this.tweetId = tweetId;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

}
