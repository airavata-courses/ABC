package com.abc.feedservice.controller;

import com.abc.feedservice.model.Tweet;
import com.abc.feedservice.repositories.TweetRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.org.apache.regexp.internal.RE;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author chetan253 on 1/30/19
 * @apiNote Controller to Create, Fetch and Modify tweets
 */

@RestController
@RequestMapping(value = "/tweet")
public class TweetsController {

    private static final Logger logger = LoggerFactory.getLogger(TweetsController.class);
    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    TweetRepository tweetRepository;

    //Create new Tweet
    @RequestMapping(value = "/create", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createTweet(@RequestBody Tweet tweet) throws JsonProcessingException {
        if(tweet != null && tweet.getUserId() != null){
            tweet.setDateCreated(new Date());
            tweet.setLikeCount(0);

            tweetRepository.save(tweet);

            logger.info("Tweet Saved : " + objectMapper.writeValueAsString(tweet));

            return new ResponseEntity<>(objectMapper.writeValueAsString(tweet), HttpStatus.OK);
        }
        else {
            logger.error("Null Tweet creation attempted with body "  + objectMapper.writeValueAsString(tweet));

            return new ResponseEntity<>("Tweet cannot be empty", HttpStatus.BAD_REQUEST);
        }
    }

    //Get user tweets for logged in user as well
    @RequestMapping(value = "/getById/{userId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getTweetsByUserId(@PathVariable String userId) throws JsonProcessingException {
        if (userId != null) {
            List<Tweet> tweets = tweetRepository.getTweetsByUserId(userId);

            logger.info("Tweets retrieved successfully for user Id : " + userId);

            return new ResponseEntity<>(objectMapper.writeValueAsString(tweets), HttpStatus.OK);
        } else {
            logger.error("Null userId passed for getting tweets");
            return new ResponseEntity<>(objectMapper.writeValueAsString("User Id cannot be empty"), HttpStatus.BAD_REQUEST);
        }
    }
}
