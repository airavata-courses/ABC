package com.abc.feedservice;

import com.abc.feedservice.model.Tweet;
import com.abc.feedservice.model.TweetLike;
import com.abc.feedservice.repositories.TweetLikeRepository;
import com.abc.feedservice.repositories.TweetRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

/**
 * @author chetan253 on 1/31/19
 * @apiNote Unit Testing for Tweet likes Rest Routes
 */

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TweetLikeControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    TweetLikeRepository tweetLikeRepository;

    @Autowired
    TweetRepository tweetRepository;

    private TweetLike tweetLike;
    private Tweet tweet;
    private String userId;
    private String tweetId;

    @Before
    public void beforeEachTest(){
        tweet = new Tweet();
        tweet.setId("5c5251eca665cce4d27f9911");
        tweet.setUserId("123");
        tweet.setUserName("Tester");
        tweet.setTweetText("My text tweet");
        tweetLike = new TweetLike();
        userId = "1a2b3c";
        tweetId = "5c5251eca665cce4d27f9911";
    }

    @Test
    public void likeTweetTestSuccess(){
        RestTemplate restTemplate = new RestTemplate();
        tweetRepository.save(tweet);
        String baseUrl = "http://localhost:" + port + "/likes/tweetLike/" + userId + "/" + tweetId;

        ResponseEntity<String> result = restTemplate.postForEntity(baseUrl, null, String.class);

        Assert.assertEquals(200, result.getStatusCodeValue());

        tweetRepository.delete(tweet);
        TweetLike testTweetLike = tweetLikeRepository.getTweetLikeByUserIdAndTweetId(userId, tweetId);
        tweetLikeRepository.deleteById(testTweetLike.getId());
    }

    @Test
    public void likeTweeTestFailure(){
        RestTemplate restTemplate = new RestTemplate();
        String baseUrl = "http://localhost:" + port + "/likes/tweetLike/";

        try{
            restTemplate.postForEntity(baseUrl, null, String.class);
            Assert.fail();
        }
        catch (HttpClientErrorException e){
            Assert.assertEquals(404, e.getRawStatusCode());
        }
    }

    @Test
    public void unlikeTweetTestSuccess(){
        RestTemplate restTemplate = new RestTemplate();
        String baseUrl = "http://localhost:" + port + "/likes/tweetUnlike/" + userId + "/" + tweetId;
        tweetRepository.save(tweet);
        tweetLike.setUserId(userId);
        tweetLike.setTweetId(tweetId);
        tweetLikeRepository.save(tweetLike);

        ResponseEntity<String> result = restTemplate.postForEntity(baseUrl, null, String.class);

        Assert.assertEquals(200, result.getStatusCodeValue());
        tweetRepository.delete(tweet);
    }

    @Test
    public void unlikeTweeTestFailure(){
        RestTemplate restTemplate = new RestTemplate();
        String baseUrl = "http://localhost:" + port + "/likes/tweetUnlike/";

        try{
            restTemplate.postForEntity(baseUrl, null, String.class);
            Assert.fail();
        }
        catch (HttpClientErrorException e){
            Assert.assertEquals(404, e.getRawStatusCode());
        }
    }

    @Test
    public void getLikesByUserIdTestSuccess(){
        RestTemplate restTemplate = new RestTemplate();
        String baseUrl = "http://localhost:" + port + "/likes/getByUserId/" + userId;
        tweetLike.setUserId(userId);
        tweetLike.setTweetId(tweetId);
        TweetLike testTweetLike = tweetLikeRepository.save(tweetLike);
        ResponseEntity<String> result = restTemplate.getForEntity(baseUrl, String.class);

        Assert.assertEquals(200, result.getStatusCodeValue());
        Assert.assertEquals(true, result.getBody().contains("userId"));
        Assert.assertEquals(true, result.getBody().contains("tweetId"));
        tweetLikeRepository.deleteById(testTweetLike.getId());
    }

    @Test
    public void getLikesByUserIdTestFailure(){
        RestTemplate restTemplate = new RestTemplate();
        String baseUrl = "http://localhost:" + port + "/likes/getByUserId/";

        try{
            restTemplate.getForEntity(baseUrl, String.class);
            Assert.fail();
        }
        catch (HttpClientErrorException e){
            Assert.assertEquals(404, e.getRawStatusCode());
        }
    }

    @Test
    public void getLikesByTweetIdTestSuccess(){
        RestTemplate restTemplate = new RestTemplate();
        String baseUrl = "http://localhost:" + port + "/likes/getByTweetId/" + tweetId;
        tweetLike.setUserId(userId);
        tweetLike.setTweetId(tweetId);
        TweetLike testTweetLike = tweetLikeRepository.save(tweetLike);
        ResponseEntity<String> result = restTemplate.getForEntity(baseUrl, String.class);

        Assert.assertEquals(200, result.getStatusCodeValue());
        Assert.assertEquals(true, result.getBody().contains("userId"));
        Assert.assertEquals(true, result.getBody().contains("tweetId"));
        tweetLikeRepository.deleteById(testTweetLike.getId());
    }

    @Test
    public void getLikesByTweetIdTestFailure(){
        RestTemplate restTemplate = new RestTemplate();
        String baseUrl = "http://localhost:" + port + "/likes/getByTweetId/";

        try{
            restTemplate.getForEntity(baseUrl, String.class);
            Assert.fail();
        }
        catch (HttpClientErrorException e){
            Assert.assertEquals(404, e.getRawStatusCode());
        }
    }

}
