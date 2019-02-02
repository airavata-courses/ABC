package com.abc.feedservice.repositories;

import com.abc.feedservice.model.Tweet;
import com.abc.feedservice.model.TweetLike;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

/**
 * @author chetan253 on 1/30/19
 * @apiNote
 */

public interface TweetLikeRepository extends MongoRepository<TweetLike, String> {
    List<TweetLike> getTweetLikesByTweetId(String tweetId);
    List<TweetLike> getTweetLikesByUserId(String userId);
    TweetLike getTweetLikeByUserIdAndTweetId(String userId, String tweetId);
}
