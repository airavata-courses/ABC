package com.abc.feedservice.controller;

import com.abc.feedservice.model.Tweet;
import com.abc.feedservice.services.FeedService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author chetan253 on 2/5/19
 * @apiNote
 */

@RestController
@RequestMapping(value = "/feed")
public class FeedController {

    private static final Logger logger = LoggerFactory.getLogger(FeedController.class);
    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    FeedService feedService;

    @CrossOrigin
    @RequestMapping(value = "/create/{userId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createFeed(@PathVariable String userId) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","Bearer fake-jwt-token");
        if(userId != null){
            RestTemplate restTemplate = new RestTemplate();
            String baseURL = "http://localhost:3000/user/"+ userId +"/following";
            ResponseEntity<String> result = restTemplate.getForEntity(baseURL, String.class);

            JSONArray arr = new JSONArray(result.getBody());

            List<String> userFollowingIds = new ArrayList<String>();
            for(int i = 0; i < arr.length(); i++){
                JSONObject ob = arr.getJSONObject(i);
                userFollowingIds.add(ob.get("userId").toString());
            }
            userFollowingIds.add(userId);
            List<Tweet> feed = feedService.createFeed(userFollowingIds);
            logger.info(objectMapper.writeValueAsString(feed));
            return new ResponseEntity<>(objectMapper.writeValueAsString(feed), headers, HttpStatus.OK);
        }

        return new ResponseEntity<>(headers, HttpStatus.BAD_REQUEST);
    }


}
