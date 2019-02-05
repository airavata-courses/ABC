package com.abc.feedservice.controller;

import com.abc.feedservice.model.Tweet;
import com.abc.feedservice.repositories.TweetRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @CrossOrigin
    @RequestMapping(value = "/create", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createTweet(@RequestBody Tweet tweet) throws JsonProcessingException {
        if(tweet != null && tweet.getUserId() != null){
            tweet.setDateCreated(new Date());
            tweet.setLikeCount(0);
            Tweet savedTweet = tweetRepository.save(tweet);

            if(savedTweet != null) {
                logger.info("Tweet Saved : " + objectMapper.writeValueAsString(tweet));
                return new ResponseEntity<>(objectMapper.writeValueAsString(tweet), HttpStatus.OK);
            }
        }
        logger.error("Null Tweet creation attempted with body "  + objectMapper.writeValueAsString(tweet));
        return new ResponseEntity<>("Tweet cannot be empty", HttpStatus.BAD_REQUEST);
    }

    //Get user tweets for logged in user as well
    @CrossOrigin
    @RequestMapping(value = "/getByUserId/{userId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getTweetsByUserId(@PathVariable String userId) throws JsonProcessingException {
        if (userId != null && userId.length() > 0) {
            List<Tweet> tweets = tweetRepository.getTweetsByUserIdOrderByDateCreatedDesc(userId);

            logger.info("Tweets retrieved successfully for user Id : " + userId);

            return new ResponseEntity<>(objectMapper.writeValueAsString(tweets), HttpStatus.OK);
        } else {
            logger.error("Invalid user id");
            return new ResponseEntity<>(objectMapper.writeValueAsString("Invalid User id"), HttpStatus.BAD_REQUEST);
        }
    }

    //Update the tweet text
    @CrossOrigin
    @RequestMapping(value = "/updateTweet", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateTweet(@RequestBody Tweet tweet) throws JsonProcessingException {
        if(tweet != null && tweet.getId() != null){
            Tweet updatedTweet = tweetRepository.save(tweet);

            if(updatedTweet != null) {
                logger.info("Tweet updated successfully");
                return new ResponseEntity<>(objectMapper.writeValueAsString(tweet), HttpStatus.OK);
            }
        }
        logger.error("Tweet modification failed for tweet : "+ objectMapper.writeValueAsString(tweet));
        return new ResponseEntity<>(objectMapper.writeValueAsString("Tweet modification failed"), HttpStatus.BAD_REQUEST);
    }

    //Delete tweet
    @CrossOrigin
    @RequestMapping(value = "/deleteByTweetId/{tweetId}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteTweet(@PathVariable String tweetId) throws JsonProcessingException{
        if(tweetId != null && tweetId.length() > 0){
            Tweet tweet = tweetRepository.findById(tweetId).orElse(null);

            if(tweet == null){
                logger.error("Tweet not found with tweet id "+ tweetId);
                return new ResponseEntity<>(objectMapper.writeValueAsString("Tweet not found"), HttpStatus.NOT_FOUND);
            }

            tweetRepository.delete(tweet);

            logger.info("Tweet deleted successfully");

            return new ResponseEntity<>(objectMapper.writeValueAsString("Tweet deleted successfully"), HttpStatus.OK);
        }
        else{
            logger.error("Tweet deletion unsuccessful");
            return new ResponseEntity<>(objectMapper.writeValueAsString("Tweet deletion unsuccessful"), HttpStatus.BAD_REQUEST);
        }
    }
}
