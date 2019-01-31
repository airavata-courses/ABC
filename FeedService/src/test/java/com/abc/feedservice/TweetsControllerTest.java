package com.abc.feedservice;

import com.abc.feedservice.model.Tweet;
import com.fasterxml.jackson.databind.ObjectMapper;
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
 * @apiNote Unit testing for Tweet controller Rest Routes
 */

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TweetsControllerTest {

    @Autowired
    ObjectMapper objectMapper;

    private Tweet tweet;

    @LocalServerPort
    int port;

    @Before
    public void before(){
        tweet = new Tweet();
        tweet.setUserId("123");
        tweet.setUserName("Tester");
        tweet.setTweetText("My text tweet");
    }

    @Test
    public void createTweetTestSuccess() {
        RestTemplate restTemplate = new RestTemplate();
        final String baseUrl = "http://localhost:" + port + "/tweet/create";

        ResponseEntity<String> result = restTemplate.postForEntity(baseUrl, tweet, String.class);
        Assert.assertEquals(200, result.getStatusCodeValue());
        Assert.assertEquals(true, result.getBody().contains("dateCreated"));
        Assert.assertEquals(true, result.getBody().contains("My text tweet"));
    }

    @Test
    public void createTweetTestFailure(){
        Tweet blankTweet = new Tweet();
        RestTemplate restTemplate = new RestTemplate();
        final String baseUrl = "http://localhost:" + port + "/tweet/create";

        try{
            restTemplate.postForEntity(baseUrl, blankTweet, String.class);
            Assert.fail();
        }
        catch (HttpClientErrorException e){
            Assert.assertEquals(400, e.getRawStatusCode());
            Assert.assertEquals(true, e.getResponseBodyAsString().contains("Tweet cannot be empty"));
        }
    }

    @Test
    public void getTweetsByUserIdSuccess(){
        RestTemplate restTemplate = new RestTemplate();
        final String baseUrl = "http://localhost:" + port + "/tweet/getById/"+tweet.getUserId();

        ResponseEntity<String> result = restTemplate.getForEntity(baseUrl, String.class);
        Assert.assertEquals(200, result.getStatusCodeValue());
        Assert.assertEquals(true, result.getBody().contains("tweetText"));
        Assert.assertEquals(false, result.getBody().isEmpty());
    }

    @Test
    public void getTweetsByUserIdFailure(){
        RestTemplate restTemplate = new RestTemplate();
        final String baseUrl = "http://localhost:" + port + "/tweet/getById/";

        try{
            restTemplate.getForEntity(baseUrl, String.class);
            Assert.fail();
        }
        catch (HttpClientErrorException e){
            Assert.assertEquals(404, e.getRawStatusCode());
        }
    }
}
