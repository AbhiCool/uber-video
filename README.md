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

---

### POST `/users/login`

Logs in a user.

#### Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

- `email` (string, required): Must be a valid email.
- `password` (string, required): Minimum 6 characters.

#### Responses

- **200 OK**

  - Login successful.
  - Example:
    ```json
    {
      "success": true,
      "messsage": "logged in successfully",
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
          "msg": "Invalid email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

- **404 Not Found**
  - Invalid email or password.
  - Example:
    ```json
    {
      "success": false,
      "message": "Invalid email or password"
    }
    ```

---

### GET `/users/profile`

Returns the authenticated user's profile.

#### Headers

- `Authorization: Bearer <token>` (or cookie `token`)

#### Responses

- **200 OK**

  - Example:
    ```json
    {
      "_id": "user_id",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com",
      "createdAt": "...",
      "updatedAt": "..."
    }
    ```

- **401 Unauthorized**
  - Example:
    ```json
    {
      "success": false,
      "message": "Unauthorized"
    }
    ```

---

### GET `/users/logout`

Logs out the authenticated user by blacklisting the current token.

#### Headers

- `Authorization: Bearer <token>` (or cookie `token`)

#### Responses

- **200 OK**

  - Example:
    ```json
    {
      "success": true,
      "message": "Logged out successfully"
    }
    ```

- **401 Unauthorized**
  - Example:
    ```json
    {
      "success": false,
      "message": "Unauthorized"
    }
    ```

---

#### Notes

- The password is hashed before storing.
- The response includes a JWT token for authentication.
- All `/users/profile` and `/users/logout` endpoints require authentication via JWT token.
