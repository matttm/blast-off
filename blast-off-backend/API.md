# API
this document defines the API for the backend.

## HTTP
### Authentication
#### Logging In
- URL
```
/api/session
```
- Method
```
POST
```
- Request
A valid request will contain a username and password in the request body.
```javascript
{
    username: username,
    password: password
}
```
- Response
There will be nothing in the response body, but if the username and password correspond to an existing user, a status of ```201``` and a cookie containing a JWT will be returned. If the credentials do not match, then a status of ```401``` will be returned.
#### Logging Out
- URL
```
/api/session
```
- Method
```
DELETE
```
- Request
There are no requirements for this request.
- Response
The response removes the session cookie, if it exists.
## WS
