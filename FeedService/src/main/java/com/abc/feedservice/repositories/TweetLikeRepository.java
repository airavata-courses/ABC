package com.abc.feedservice.repositories;

import com.abc.feedservice.model.TweetLike;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * @author chetan253 on 1/30/19
 * @apiNote
 */

public interface TweetLikeRepository extends MongoRepository<TweetLike, String> {
    public List<TweetLike> getTweetLikesByTweetId(String tweetId);
    public List<TweetLike> getTweetLikesByUserId(String userId);
    public TweetLike getTweetLikeByUserIdAndTweetId(String userId, String tweetId);
}
