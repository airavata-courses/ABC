package com.abc.feedservice.services;

import com.abc.feedservice.model.Tweet;
import com.abc.feedservice.repositories.TweetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author chetan253 on 2/5/19
 * @apiNote
 */

@Component
public class FeedService {

    @Autowired
    TweetRepository tweetRepository;

    public List<Tweet> createFeed(List<String> userFollowIds){
        return tweetRepository.findTweetsByUserIdInOrderByDateCreatedDesc(userFollowIds);
    }
}
