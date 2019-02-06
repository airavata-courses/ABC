package com.abc.feedservice;

import static org.assertj.core.api.Assertions.assertThat;

import com.abc.feedservice.controller.TweetLikeController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FeedServiceApplicationTests {

    @Autowired
    TweetLikeController tweetLikeController;

    @Test
    public void contextLoads() {
        assertThat(tweetLikeController).isNotNull();
    }

}

