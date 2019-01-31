package com.abc.feedservice.repositories;

import com.abc.feedservice.model.Tweet;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * @author chetan253 on 1/30/19
 * @apiNote Tweets Repository to interact with database
 */


public interface TweetRepository extends MongoRepository<Tweet, String> {
    public List<Tweet> getTweetsByUserId(String userId);
    public Tweet getTweetById(String tweetId);
}
