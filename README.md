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
* Generate a client ID in [Google Sign-In](https://developers.google.com/identity/sign-in/web/sign-in) for websites, then put it on "GOOGLE_CLIENT_ID" field in the [example.env](example.env) file.
* A [Cloudinary](https://cloudinary.com/) account, generate an API Environment variable and put it on "CLOUDINARY_URL" field in the [example.env](example.env) file.
* Finally, rename the [example.env](example.env) file to .env

## Execution

Execute the next command to run this app.

```
npm start
```

## Note
This project was inspired by Fernando Herrera (Twitter: [@fernando_her85](https://twitter.com/fernando_her85)) and its online course: "Node: De cero a experto ( Edición 2021 )"