package com.abc.feedservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

/**
 * @author chetan253 on 1/30/19
 * @apiNote Model for storing tweets created by user
 */

@Document(collection = "tweets")
public class Tweet {

    @Id
    private String id;

    private String userId;
    private String userName;
    private String tweetText;
    private Date dateCreated;
    private long likeCount;
    private List<String> likedUsers;

    public Tweet(){

    }

    public Tweet(String id, String userId, String userName, String tweetText, Date dateCreated, long likeCount) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.tweetText = tweetText;
        this.dateCreated = dateCreated;
        this.likeCount = likeCount;
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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getTweetText() {
        return tweetText;
    }

    public void setTweetText(String tweetText) {
        this.tweetText = tweetText;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public long getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(long likeCount) {
        this.likeCount = likeCount;
    }

    public List<String> getLikedUsers() {
        return likedUsers;
    }

    public void setLikedUsers(List<String> likedUsers) {
        this.likedUsers = likedUsers;
    }


    @Override
    public String toString() {
        return "Tweet{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", userName='" + userName + '\'' +
                ", tweetText='" + tweetText + '\'' +
                ", dateCreated=" + dateCreated +
                ", likeCount=" + likeCount +
                ", likedUsers=" + likedUsers +
                '}';
    }
}
