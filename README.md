# ABC

### User API

1. Create User (method = POST, endpoint = '/user')
```
POST : http://localhost:3000/user

Request Body:
{
    "userName": "johndoe",
    "name": "John Doe",
    "bio": "I'm Doe...John Doe",
    "dob": "1 Jan 1990",
    "location": "New York"
}

Response Body:
{
    "user": {
        "userId": "c4836160-2914-11e9-8b00-99a430df561b",
        "userName": "johndoe",
        "name": "John Doe",
        "bio": "I'm Doe...John Doe",
        "dob": "1990-01-01T05:00:00.000Z",
        "location": "New York",
        "updatedAt": "2019-02-05T07:08:13.831Z",
        "createdAt": "2019-02-05T07:08:13.831Z"
    }
}
```

2. Get User (method = GET, endpoint = '/user/{userId}')
```
GET : http://localhost:3000/user/c4836160-2914-11e9-8b00-99a430df561b

Response Body:
{
    "user": {
        "userId": "c4836160-2914-11e9-8b00-99a430df561b",
        "userName": "johnnydoe",
        "name": "John Doe",
        "bio": "I'm Doe...John Doe",
        "dob": "1990-01-01T05:00:00.000Z",
        "location": "New York",
        "createdAt": "2019-02-05T07:08:13.000Z",
        "updatedAt": "2019-02-05T07:08:13.000Z"
    }
}
```

3. Update User (method = PATCH, endpoint = '/user')
```
PATCH : http://localhost:3000/user

Request Body:
{
    "userId": "c4836160-2914-11e9-8b00-99a430df561b",
    "location": "San Fransisco"
}

Response Body:
{}
```

4. Delete User (method = DELETE, endpoint = '/user')
```
DELETE : http://localhost:3000/user

Request Body:
{
    "userId": "c4836160-2914-11e9-8b00-99a430df561b"
}

Response Body:
{
    "deletedCount": 1
}
```

5. Follow User (method = POST, endpoint = '/user/follow')
```
POST : http://localhost:3000/user/follow

Request Body:
{
    "follower": "a23f3ff1-4805-42bb-95be-68ec2172a2a8",
    "following": "a0e96fe0-29c5-11e9-85fd-c324d3f355d6"
}

Response Body:
{
    "follow": {
        "id": 3,
        "follower": "a23f3ff1-4805-42bb-95be-68ec2172a2a8",
        "following": "a0e96fe0-29c5-11e9-85fd-c324d3f355d6",
        "updatedAt": "2019-02-06T04:31:39.559Z",
        "createdAt": "2019-02-06T04:31:39.559Z"
    }
}
```

6. Unfollow User (method = DELETE, endpoint = '/user/follow')
```
DELETE : http://localhost:3000/user/follow

Request Body: 
{
    "follower": "a23f3ff1-4805-42bb-95be-68ec2172a2a8",
    "following": "a0e96fe0-29c5-11e9-85fd-c324d3f355d6"
}

Response Body:
{}

Status code: 202
```

7. Get followers of a user (method = GET, endpoint = '/user/{userId}/followers')
```
GET http://localhost:3000/user/a23f3ff1-4805-42bb-95be-68ec2172a2a8/followers

Response Body:
{
    "count": 2,
    "followers": [
        {
            "userId": "a0e96fe0-29c5-11e9-85fd-c324d3f355d6",
            "createdAt": "2019-02-06T04:38:10.000Z"
        },
        {
            "userId": "a3d42ca3-cdc4-4104-a85f-613dea768418",
            "createdAt": "2019-02-06T04:38:58.000Z"
        }
    ]
}
```

8. Get users following given user (method = GET, endpoint = '/user/{userId}/following')
```
GET http://localhost:3000/user/a23f3ff1-4805-42bb-95be-68ec2172a2a8/following

Response Body:
{
    "count": 2,
    "following": [
        {
            "userId": "a0e96fe0-29c5-11e9-85fd-c324d3f355d6",
            "createdAt": "2019-02-06T04:38:20.000Z"
        },
        {
            "userId": "a3d42ca3-cdc4-4104-a85f-613dea768418",
            "createdAt": "2019-02-06T04:38:47.000Z"
        }
    ]
}
```

9. Search users by partial userName (method = GET, endpoint = '/user/search/{partialUserName}')
```
GET http://localhost:3000/user/search/john

Response Body:
{
    "searchResult": [
        {
            "userId": "2938ndudhnkwj3nrkjnsdf",
            "userName": "johndoe",
            "name": "jogn Doe",
            "bio": "I'm Doe...Jane Doe",
            "dob": "2019-02-04T00:00:00.000Z",
            "location": "California, USA",
            "createdAt": "2019-02-06T01:54:54.000Z",
            "updatedAt": "2019-02-06T01:54:54.000Z"
        },
        {
            "userId": "d28ea3de-46f9-44c3-b8cc-28376fe38505",
            "userName": "johnasadcghdoe",
            "name": "John Doe",
            "bio": "I'm Doe...John Doe",
            "dob": "1990-01-01T05:00:00.000Z",
            "location": "New York",
            "createdAt": "2019-02-06T05:51:00.000Z",
            "updatedAt": "2019-02-06T05:51:00.000Z"
        }
    ]
}
```
