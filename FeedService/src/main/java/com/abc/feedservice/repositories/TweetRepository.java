package com.abc.feedservice.repositories;

import com.abc.feedservice.model.Tweet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * @author chetan253 on 1/30/19
 * @apiNote Tweets Repository to interact with database
 */


public interface TweetRepository extends MongoRepository<Tweet, String> {
    List<Tweet> getTweetsByUserIdOrderByDateCreatedDesc(String userId);
    Tweet getTweetById(String tweetId);
    Optional<Tweet> findById(String tweetId);
    List<Tweet> findTweetsByUserIdInOrderByDateCreatedDesc(List<String> userFollowIds);
}
