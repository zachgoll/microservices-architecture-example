# Run the app

You will need MongoDB installed on your computer, start the service, create a database, and create a user to interact with that database.  Don't worry if you do not understand all the commands; this tutorial is not a MongoDB tutorial!

```bash 
mongo

use test_db

db.create(
    {
        user: "yourname",
        pwd: "yourpassword",
        roles: [ "readWrite", "dbAdmin" ]
    }
)

db.createCollection("users")

db.users.insert( { name: "Zach", email: "zach@email.com", profileUrl: "https://someurl.com/image.png" })
```

```
# Set your environment variables
# Same as above!
export DB_USER=yourname
export DB_PW=yourpassword

# Start the app
npm install 
npm run start 
```

# Explanation 

In this repository is a microservices software architecture as explained in my blog post: [How to Build a Production Web Application Part 4: Architecture](https://zachgoll.github.io/blog/2019/build-production-web-app-part-4/)

![microservices architecture diagram](microservices.png)

## Example

Let's say you are working on a user profile page where the user has a name, email, and photo.  Throughout this example, I will show you how the layers interact to get the user data _from the database to the web page_.

I will be using ExpressJS and MongoDB to demonstrate.

### Microservice #1 - User Management

**This microservice is solely responsible for creating, modifying, and deleting users.**

### Microservice #2 - Property Management

**This microservice is solely responsible for managing the property that each user owns.  A property could be a house or a car.**