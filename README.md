# uber-video

## API Documentation

### POST `/users/register`

Registers a new user.

#### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters.
- `email` (string, required): Must be a valid email.
- `password` (string, required): Minimum 6 characters.

#### Responses

- **201 Created**

  - User registered successfully.
  - Example:
    ```json
    {
      "success": true,
      "message": "User registered successfully",
      "user": {
        "_id": "user_id",
        "firstname": "John",
        "lastname": "Doe",
        "email": "john.doe@example.com",
        "createdAt": "...",
        "updatedAt": "..."
      },
      "token": "jwt_token"
    }
    ```

- **400 Bad Request**
  - Validation failed.
  - Example:
    ```json
    {
      "success": false,
      "errors": [
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        }
      ]
    }
    ```

#### Notes

- The password is hashed before storing.
- The response includes a JWT token
