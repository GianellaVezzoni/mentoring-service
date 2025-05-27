# Password Setup Endpoints

This document describes the three password setup endpoints that have been implemented following the existing architecture.

## Endpoints

### 1. Generate Password Reset Link

**POST** `/api/v1/password-setup/generate-link`

Generates a password reset token and sends an email with the reset link to the user.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Password reset link sent to email",
  "data": {
    "message": "Password reset link sent to email"
  }
}
```

### 2. Validate Password Reset Token

**POST** `/api/v1/password-setup/validate-token`

Validates if a password reset token is valid and not expired.

**Request Body:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**

```json
{
  "success": true,
  "message": "Token is valid",
  "data": {
    "isValid": true,
    "email": "user@example.com"
  }
}
```

### 3. Set New Password

**POST** `/api/v1/password-setup/set-password`

Sets a new password for the user using a valid reset token.

**Request Body:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "newPassword": "newSecurePassword123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Password updated successfully",
  "data": {
    "message": "Password updated successfully"
  }
}
```

## Architecture

The implementation follows the existing clean architecture pattern:

### Core Layer (Domain)

- **Actions**: `GeneratePasswordResetLinkAction`, `ValidatePasswordResetTokenAction`, `SetPasswordAction`
- **Services**: `ITokenService`, `IEmailService`
- **Repository**: Extended `IUserRepository` with `getOneByEmail` and `updatePassword` methods

### Infrastructure Layer

- **Services**: `JwtTokenService`, `NodemailerEmailService`
- **Controllers**: `PasswordSetupControllers`
- **Routes**: `PasswordSetupRoutes`
- **Repository**: Extended `MongoUserRepository` with new methods

### Dependencies

- **JWT**: Uses `jsonwebtoken` for token generation and validation
- **Email**: Mock implementation (logs to console) - ready for real email service integration
- **Password Hashing**: Uses existing `BcryptHashService`

## Environment Variables

Make sure to set the following environment variables:

```env
JWT_SECRET=your-jwt-secret-key
FRONTEND_URL=http://localhost:3000
```

## Security Features

1. **Token Expiration**: Tokens expire after 1 hour
2. **Token Type Validation**: Only 'password-reset' type tokens are accepted
3. **User Existence Check**: Validates user exists before generating tokens
4. **Password Hashing**: New passwords are hashed using bcrypt
5. **Token Invalidation**: Tokens are invalidated after successful password reset

## Error Handling

The endpoints handle the following error cases:

- User not found (404)
- Invalid or expired tokens (400)
- Missing required fields (400)
- General server errors (500)
