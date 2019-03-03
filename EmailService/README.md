This microservice provides a rest endpoints and RabbitMQ client to deliver messages using gmail client

### User API

1. Send Welcome email (method = POST, endpoint = '/sendWelcomeEmail/')
```
POST : http://localhost:3002/sendWelcomeEmail/

Request Body:
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
