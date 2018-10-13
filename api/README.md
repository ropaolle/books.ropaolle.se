# API

npm install --save express mongoose body-parser
npm install --save-dev nodemon


## Setup Mongodb

```bash
# Bash /etc/mongod.conf
docker exec -it mongo-db bash

# Add user
mongo --username root --password "ez0A16fUyHgS" --authenticationDatabase admin
use books
db.createUser( { user: "book", pwd: "ez0A16fUyHgS", roles: [ { role: "readWrite", db: "books" } ] } )
```