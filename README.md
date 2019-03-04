# ABC - Feed Service 
[![Build Status](http://149.165.156.122:8080/buildStatus/icon?job=develop-feed-service)](http://149.165.156.122:8080/job/develop-feed-service/)

This microservice will help users manage tweets and generate the feed based on users they follow. 

### Tweets API's:

1.  Create Tweet (method = POST, endpoint='/tweet/create/'):

    ```
    POST : http://localhost:8080/tweet/create/
    
    Request Body:
    {
      "userId":"1",
      "userName" :"ab",
      "tweetText" : "Hello"
    }
    
    Response Body:
    {
      "_id" : "5c59282a2ad5c62ef6fc69e0",
      "userId" : "1",
      "userName" : "ab",
      "tweetText" : "Hello",
      "dateCreated" : 1549346858921,
      "likeCount" : 0,
    }
    ```
   
2.  Get Tweets (method = GET, endpoint='/tweet/getByUserId/{userId}'):
    
    Calling this API will return the array of tweets ordered by date created in descendin order.
    ```
    GET : http://localhost:8080/tweet/getByUserId/{userId}
    
    Response Body:
    [
        {
            "id": "5c5928a52ad5c62ef6fc69e1",
            "userId": "1",
            "userName": "ab",
            "tweetText": "Test tweet",
            "dateCreated": 1549346981096,
            "likeCount": 0
        },
        .
        .
    ]
    
    ```

3.  Update Tweet
    
    Update Tweet (method = PUT, endpoint='/tweet/updateTweet')
    
    ```
    PUT : http://localhost:8080/tweet/updateTweet/

    Request Body:
    {
        "id": "5c59282a2ad5c62ef6fc69e0",
        "userId": "1",
        "userName": "ab",
        "tweetText": "updated content",
        "dateCreated": 1549346858921,
        "likeCount": 0
    }
    
    Response Body:
    {
        "id": "5c59282a2ad5c62ef6fc69e0",
        "userId": "1",
        "userName": "ab",
        "tweetText": "updated content",
        "dateCreated": 1549346858921,
        "likeCount": 0
    }
    ```
   
4.  Delete Tweet (method = DELETE, endpoint='/tweet/deleteByTweetId/{tweetId}')

    ```
    DELETE : http://localhost:8080/tweet/deleteByTweetId/5c59282a2ad5c62ef6fc69e0
    
    Response Body:
    Tweet deleted successfully
    ```

### Tweet Likes API's

1.  Like Tweet (method = POST, endpoint='/likes/tweetLike/{userId}/{tweetId}')

    ```
    POST : http://localhost:8080/likes/tweetLike/1/5c59282a2ad5c62ef6fc69e0
    ```
    
2.  Unlike Tweet (method = POST, endpoint='/likes/tweetUnlike/{userId}/{tweetId}')

    ```
    POST : http://localhost:8080/likes/tweetUnlike/1/5c59282a2ad5c62ef6fc69e0
    ```

3.  Get Likes by UserId (method = GET, endpoint='/likes/getByUserId/{userId}')

    ```
    GET : http://localhost:8080/likes/getByUserId/1
    
    Response Body:
    [
        {
            "id": "5c5935b02ad5c62f8b22308a",
            "userId": "1",
            "tweetId": "5c59282a2ad5c62ef6fc69e0",
            "dateCreated": 1549350320531
        },
        .
        .
    ]
    ```

4.  Get Likes by Tweet Id (method = GET, endpoint='/likes/getByTweetId/{tweetId}')

    ```
    GET : http://localhost:8080/likes/getByUserId/1
    
    Response Body:
    [
        {
            "id": "5c5935b02ad5c62f8b22308a",
            "userId": "1",
            "tweetId": "5c59282a2ad5c62ef6fc69e0",
            "dateCreated": 1549350320531
        },
        .
        .
    ]
    ```
