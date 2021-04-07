# Web Server + Rest Server
Basic Node REST Server powered by Express.

## Installing

Install needed node packages

```
npm install
```
## Needed Settings

You'll need:
* An account in [Atlas MongoDB](https://www.mongodb.com/cloud/atlas) and provide a database connection string to "MONGODB_CNN" field in the [example.env](example.env) file. This database must contain a collection called "roles" with the following documents:
```
[
    {"rol":"ADMIN_ROLE"},
    {"rol":"USER_ROLE"},
    {"rol":"VENTAS_ROLE"},
]
```
* A custom private or public key in order to generate JWT. Write it in the "SECRETORPRIVATEKEY" field in the [example.env](example.env) file.
* Finally, rename the [example.env](example.env) file to .env

## Execution

Execute the next command to run this app.

```
npm start
```

## Note
This project was inspired by Fernando Herrera (Twitter: @fernando_her85) and its online course: "Node: De cero a experto"