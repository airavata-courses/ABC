package com.abc.feedservice.controller;

import com.abc.feedservice.model.Tweet;
import com.abc.feedservice.model.TweetLike;
import com.abc.feedservice.repositories.TweetLikeRepository;
import com.abc.feedservice.repositories.TweetRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.deploy.net.HttpResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

/**
 * @author chetan253 on 1/30/19
 * @apiNote
 */

@RestController
@RequestMapping(value = "/likes")
public class TweetLikeController {
    private static final Logger logger = LoggerFactory.getLogger(TweetLikeController.class);

    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    TweetLikeRepository tweetLikeRepository;

    @Autowired
    TweetRepository tweetRepository;

    @RequestMapping(value = "/tweetLike/{userId}/{tweetId}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> likeTweet(@PathVariable String userId, @PathVariable String tweetId){
        if(userId != null && tweetId != null){
            //Update like Count
            Tweet tweet = tweetRepository.getTweetById(tweetId);
            tweet.setLikeCount(tweet.getLikeCount() + 1);
            tweetRepository.save(tweet);
            logger.info("Like count incremented for tweet id : " + tweetId );

            //Add user entry in likes collection
            TweetLike tweetLike = new TweetLike(userId, tweetId, new Date());
            tweetLikeRepository.save(tweetLike);
            logger.info("User Tweet like entry saved");

            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            logger.error("Invalid initials passed with userId "+  userId + " and tweetId : " +  tweetId );
            return new ResponseEntity<>("Bad Request", HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/tweetUnlike/{userId}/{tweetId}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> unlikeTweet(@PathVariable String userId, @PathVariable String tweetId){
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

            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            logger.error("Invalid initials passed with userId "+  userId + " and tweetId : " +  tweetId );
            return new ResponseEntity<>("Bad Request", HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/getByUserId/{userId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TweetLike>> getLikesByUserId(@PathVariable String userId){
        if(userId != null){
            List<TweetLike> likes = tweetLikeRepository.getTweetLikesByUserId(userId);
            logger.info("Likes retrieved for user id : "+ userId);
            return new ResponseEntity<>(likes, HttpStatus.OK);
        }
        else{
            logger.error("Invalid User Id" + userId);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/getByTweetId/{tweetId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TweetLike>> getLikesByTweetId(@PathVariable String tweetId){
        if(tweetId != null){
            List<TweetLike> likes = tweetLikeRepository.getTweetLikesByUserId(tweetId);
            logger.info("Likes retrieved for tweet id : "+ tweetId);
            return new ResponseEntity<>(likes, HttpStatus.OK);
        }
        else{
            logger.error("Invalid Tweet Id" + tweetId);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
