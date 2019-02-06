package com.abc.feedservice.controller;

import com.abc.feedservice.model.Tweet;
import com.abc.feedservice.model.TweetLike;
import com.abc.feedservice.repositories.TweetLikeRepository;
import com.abc.feedservice.repositories.TweetRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * @author chetan253 on 1/30/19
 * @apiNote Controller to manage likes of tweets
 */

@RestController
@RequestMapping(value = "/likes")
public class TweetLikeController {
    private static final Logger logger = LoggerFactory.getLogger(TweetLikeController.class);

    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired(required = true)
    TweetLikeRepository tweetLikeRepository;

    @Autowired
    TweetRepository tweetRepository;

    @CrossOrigin
    @RequestMapping(value = "/tweetLike/{userId}/{tweetId}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> likeTweet(@PathVariable String userId, @PathVariable String tweetId) throws JsonProcessingException{
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","Bearer fake-jwt-token");
        if(userId != null && tweetId != null){
            //Update like Count
            Tweet tweet = tweetRepository.getTweetById(tweetId);
            tweet.setLikeCount(tweet.getLikeCount() + 1);
            tweetRepository.save(tweet);
            logger.info("Like count incremented for tweet id : " + tweetId );

            //Add user entry in likes collection
            TweetLike tweetLike = new TweetLike(userId, tweetId, new Date());
            TweetLike savedLike = tweetLikeRepository.save(tweetLike);
            if(savedLike != null) {
                logger.info("User Tweet like entry saved");
                return new ResponseEntity<>(headers, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else{
            logger.error("Invalid initials passed with userId "+  userId + " and tweetId : " +  tweetId );
            return new ResponseEntity<>(objectMapper.writeValueAsString("Bad Request"), HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin
    @RequestMapping(value = "/tweetUnlike/{userId}/{tweetId}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> unlikeTweet(@PathVariable String userId, @PathVariable String tweetId) throws JsonProcessingException{
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","Bearer fake-jwt-token");
        if(userId != null && tweetId != null){
            //Update like Count
            Tweet tweet = tweetRepository.getTweetById(tweetId);
            tweet.setLikeCount(tweet.getLikeCount() - 1);
            tweetRepository.save(tweet);
            logger.info("Like count decremented for tweet id : " + tweetId );

            //Add user entry in likes collection
            TweetLike tweetLike = tweetLikeRepository.getTweetLikeByUserIdAndTweetId(userId, tweetId);
            tweetLikeRepository.delete(tweetLike);
            logger.info("User Tweet like entry removed");

            return new ResponseEntity<>(headers, HttpStatus.OK);
        }
        else{
            logger.error("Invalid initials passed with userId "+  userId + " and tweetId : " +  tweetId );
            return new ResponseEntity<>(objectMapper.writeValueAsString("Bad Request"), HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin
    @RequestMapping(value = "/getByUserId/{userId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getLikesByUserId(@PathVariable String userId) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","Bearer fake-jwt-token");
        if(userId != null){
            List<TweetLike> likes = tweetLikeRepository.getTweetLikesByUserId(userId);
            logger.info("Likes retrieved for user id : "+ userId);
            return new ResponseEntity<>(objectMapper.writeValueAsString(likes), headers, HttpStatus.OK);
        }
        else{
            logger.error("Invalid User id" + userId);
            return new ResponseEntity<>(objectMapper.writeValueAsString("Invalid User id"),HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin
    @RequestMapping(value = "/getByTweetId/{tweetId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getLikesByTweetId(@PathVariable String tweetId) throws JsonProcessingException{
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","Bearer fake-jwt-token");
        if(tweetId != null){
            List<TweetLike> likes = tweetLikeRepository.getTweetLikesByTweetId(tweetId);
            logger.info("Likes retrieved for tweet id : "+ tweetId);
            return new ResponseEntity<>(objectMapper.writeValueAsString(likes), headers, HttpStatus.OK);
        }
        else{
            logger.error("Invalid Tweet Id" + tweetId);
            return new ResponseEntity<>(objectMapper.writeValueAsString("Invalid Tweet id"), HttpStatus.BAD_REQUEST);
        }
    }
}
