package com.abc.feedservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author chetan253 on 3/2/19
 * @apiNote
 */

@RestController
public class HealthCheck {

    ObjectMapper objectMapper = new ObjectMapper();

    @RequestMapping(path = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String getHealth() throws JsonProcessingException {
        return objectMapper.writeValueAsString("{ \"status\" : \"healthy\"}");
    }
}
