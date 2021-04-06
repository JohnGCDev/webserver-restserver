# Web Server + Rest Server
Basic Node REST Server powered by Express.

### Installing

Install needed node packages

```
npm install
```
### Execution

Execute the next command to run this app.

```
npm start
```
Also you'll need an account in [Atlas MongoDB](https://www.mongodb.com/cloud/atlas) and provide a database connection string to "MONGODB_CNN" field in the [example.env file](example.env). This database must contain a collection called "roles" with the following documents:
```
[
    {"rol":"ADMIN_ROLE"},
    {"rol":"USER_ROLE"},
]
```
## Note
This project was inspired by Fernando Herrera (Twitter: @fernando_her85) and its online course: "Node: De cero a experto"