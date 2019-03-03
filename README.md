# ABC - User Management Service [![Build Status](http://149.165.156.122:8080/buildStatus/icon?job=develop-user-management-service)](http://149.165.156.122:8080/job/develop-user-management-service/)

This microservice helps to manage user data, followers and following relationships

### User API

1. Create User (method = POST, endpoint = '/users/')
```
POST : http://localhost:3000/users/

Request Body:
{
    "userName": "johndoe",
    "password": "admin123"
    "firstName": "John",
    "lastName": "Doe",
    "bio": "I'm Doe...John Doe",
    "dob": "1 Jan 1990",
    "location": "New York"
}

Response Body:
{
    "user": {
        "userId": "c4836160-2914-11e9-8b00-99a430df561b",
        "userName": "johndoe",
        "firstName": "John",
        "lastName": "Doe",
        "bio": "I'm Doe...John Doe",
        "dob": "1990-01-01T05:00:00.000Z",
        "location": "New York",
        "updatedAt": "2019-02-05T07:08:13.831Z",
        "createdAt": "2019-02-05T07:08:13.831Z"
    }
}
```

2. Get User (method = GET, endpoint = '/users/{userId}')
```
GET : http://localhost:3000/users/c4836160-2914-11e9-8b00-99a430df561b

Response Body:
{
    "user": {
        "userId": "c4836160-2914-11e9-8b00-99a430df561b",
        "userName": "johnnydoe",
        "firstName": "John",
        "lastName": "Doe",
        "bio": "I'm Doe...John Doe",
        "dob": "1990-01-01T05:00:00.000Z",
        "location": "New York",
        "createdAt": "2019-02-05T07:08:13.000Z",
        "updatedAt": "2019-02-05T07:08:13.000Z"
    }
}
```

3. Update User (method = PATCH, endpoint = '/users/')
```
PATCH : http://localhost:3000/users/

Request Body:
{
    "userId": "c4836160-2914-11e9-8b00-99a430df561b",
    "location": "San Fransisco"
}

Response Body:
{}
```

4. Delete User (method = DELETE, endpoint = '/users/')
```
DELETE : http://localhost:3000/users/

Request Body:
{
    "userId": "c4836160-2914-11e9-8b00-99a430df561b"
}

Response Body:
{
    "deletedCount": 1
}
```

5. Follow User (method = POST, endpoint = '/relation/user/follow')
```
POST : http://localhost:3000/relation/user/follow

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

6. Unfollow User (method = DELETE, endpoint = '/relation/user/follow')
```
DELETE : http://localhost:3000/relation/user/follow

Request Body: 
{
    "follower": "a23f3ff1-4805-42bb-95be-68ec2172a2a8",
    "following": "a0e96fe0-29c5-11e9-85fd-c324d3f355d6"
}

Response Body:
{}

Status code: 202
```

7. Get followers of a user (method = GET, endpoint = '/relation/user/{userId}/followers')
```
GET http://localhost:3000/relation/user/a23f3ff1-4805-42bb-95be-68ec2172a2a8/followers

Response Body:
[
    {
        "userId": "a0e96fe0-29c5-11e9-85fd-c324d3f355d6",
        "firstName": "Jane",
        "lastName": "Doe",
        "createdAt": "2019-02-06T04:38:10.000Z"
    },
    {
        "userId": "a3d42ca3-cdc4-4104-a85f-613dea768418",
        "firstName": "James",
        "lastName": "Doe",
        "createdAt": "2019-02-06T04:38:58.000Z"
    },
    .
    .
]
```

8. Get users following given user (method = GET, endpoint = '/relation/user/{userId}/following')
```
GET http://localhost:3000/relation/user/a23f3ff1-4805-42bb-95be-68ec2172a2a8/following

Response Body:
[
    {
        "userId": "a0e96fe0-29c5-11e9-85fd-c324d3f355d6",
        "firstName": "James",
        "lastName": "Doe",
        "createdAt": "2019-02-06T04:38:20.000Z"
    },
    {
        "userId": "a3d42ca3-cdc4-4104-a85f-613dea768418",
        "firstName": "Jane",
        "lastName": "Doe",
        "createdAt": "2019-02-06T04:38:47.000Z"
    },
    .
    .
]
```

9. Search users by partial userName (method = GET, endpoint = '/users/search')
```
GET http://localhost:3000/users/search

Request Body:
{
    "userId": "7e4fdd8c-f148-44fc-a187-283c0e142c41",
    "searchQuery": "doe"
}

Response Body:
[
    {
        "userId": "e7c602fd-a191-44ee-8cdd-854612c12dfa",
        "userName": "johndoe",
        "firstName": "John",
        "lastName": "Doe",
        "bio": "John",
        "dob": "1988-12-01T05:00:00.000Z",
        "location": "California",
        "createdAt": "2019-02-06T07:37:21.000Z",
        "updatedAt": "2019-02-06T07:37:21.000Z",
        "following": false
    },
    {
        "userId": "a4abd8c6-e46f-4fc1-bc0b-65dc4413cd07",
        "userName": "janedoe",
        "firstName": "Jane",
        "lastName": "Doe",
        "bio": "I'm Doe..Jane Doe",
        "dob": "1978-12-01T05:00:00.000Z",
        "location": "New York",
        "createdAt": "2019-02-06T07:40:20.000Z",
        "updatedAt": "2019-02-06T07:40:20.000Z",
        "following": true
    },
    .
    .
]
```

10. Login (method = POST, endpoint = '/users/login')
```
POST http://localhost:3000/users/login
{
    "userName": "abcd",
    "password": "abcd"
}

Response Body (success):
{
    "userId": "a4abd8c6-e46f-4fc1-bc0b-65dc4413cd07",
    "userName": "janedoe",
    "firstName": "Jane",
    "lastName": "Doe",
    "bio": "I'm Doe..Jane Doe",
    "dob": "1978-12-01T05:00:00.000Z",
    "location": "New York",
    "createdAt": "2019-02-06T07:40:20.000Z",
    "updatedAt": "2019-02-06T07:40:20.000Z",
    "following": true
}

Response Body (failure):
{
    "error": {
        "name": "Invalid credentials"
    }
}
```
