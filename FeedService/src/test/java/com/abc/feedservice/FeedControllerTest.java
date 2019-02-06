package com.abc.feedservice;

import com.abc.feedservice.model.Tweet;
import com.abc.feedservice.repositories.TweetRepository;
import com.abc.feedservice.services.FeedService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

/**
 * @author chetan253 on 2/6/19
 * @apiNote
 */

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FeedControllerTest {
    @Autowired
    FeedService feedService;

    @Autowired
    TweetRepository tweetRepository;

    @LocalServerPort
    int port;

    @Test
    public void createFeedTest(){
        Tweet tweet1 = new Tweet();
        tweet1.setUserId("1");
        tweet1.setUserName("name1");
        tweet1.setTweetText("Hola!!");

        Tweet tweet2 = new Tweet();
        tweet2.setUserId("2");
        tweet2.setUserName("name2");
        tweet2.setTweetText("Hola!!");

        tweetRepository.save(tweet1);
        tweetRepository.save(tweet2);

        List<String> userFollowId = Arrays.asList(new String[]{"1", "2"});
        List<Tweet>  feed = feedService.createFeed(userFollowId);

        Assert.assertEquals(2, feed.size());

        tweetRepository.delete(tweet1);
        tweetRepository.delete(tweet2);
    }
}
