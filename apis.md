# DevTinder APIs

## AuthRouter

- POST /signup
- POST /login
- POST /logout

## ProfileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## ConnectionRequestRouter

<!-- - POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId -->

- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId

## UserRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed
