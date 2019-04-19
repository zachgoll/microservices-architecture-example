# Run the app

You will need MongoDB installed on your computer, start the service, create a database, and create a user to interact with that database.  Don't worry if you do not understand all the commands; this tutorial is not a MongoDB tutorial!

```bash 
mongo

use test_db_2

db.createUser(
    {
        user: "yourname",
        pwd: "yourpassword",
        roles: [ "readWrite", "dbAdmin" ]
    }
)
```

```
# Set your environment variables
# Same as above!
export DB_USER=yourname
export DB_PW=yourpassword
```

# Explanation 

In this repository is a microservices software architecture as explained in my blog post: [How to Build a Production Web Application Part 4: Architecture](https://zachgoll.github.io/blog/2019/build-production-web-app-part-4/)

![microservices architecture diagram](microservices.png)

The key element of a microservices architecture is the fact that each microservice is entirely separated from the other microservices.  Usually, the front-end user interface utilizes multiple microservices so that the user does not need to visit several applications to do one simple task.  The true value of this architecture comes when you have a complex application and several teams working on that application.  With the monolithic and layered architectures, all the teams must coordinate their efforts to support and improve the application.  With a microservices architecture, you could have three teams who have never talked to each other face-to-face working on the same application.

This is made possible because the microservices and the user interface all communicate through APIs.  In my example below, they are all communicating through the HTTP protocol (the internet).

Below, I have created a simplistic version of a microservices architecture.  Unfortunately, there is not a great way to demonstrate a microservices architecture because by nature, a microservices architecture is designed for _complex applications_.  You will see the general concept, but until you have gotten your hands dirty, there is no way to appreciate the true value of such an architecture.

## Example

In this overly simplistic representation of a microservices architecture, I have split an "application" (in quotes because it is really a combination of microservices) into two parts: 

1. Microservice #1 - User authentication
    * Register - User can register with an email and password 
    * Sign In - User can sign in with email and password
    * Log out - User can log out
2. Microservice #2 - Game
    * Play game - Once authenticated, user can play a simple game
    * See game results history - Every time the user plays the game, a new record is entered into the database with their score

### Microservice #1 - User Authentication (http://localhost:8081)

_Note: The password authentication is not implemented as you should in a production application; it is solely for demonstration and you should never store your users' passwords in plain text like I am doing here!_

**This microservice is solely responsible for creating and authenticating users.**    



### Microservice #2 - Property Management (http://localhost:8082)

**This microservice is solely responsible for managing the property that each user owns.  A property could be a house or a car.**