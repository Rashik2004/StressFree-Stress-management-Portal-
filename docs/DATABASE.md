# Database Schema Documentation

## Database: `stress-management-portal`

### Collection: `users`

Stores user profile information, authentication credentials, and personalization preferences.

| Field               | Type          | Description                             | Constraints                                                          |
| :------------------ | :------------ | :-------------------------------------- | :------------------------------------------------------------------- |
| `_id`               | ObjectId      | Unique identifier                       | Primary Key                                                          |
| `name`              | String        | User's full name                        | Required                                                             |
| `email`             | String        | User's email address                    | Required, Unique, Indexed                                            |
| `password`          | String        | Hashed password (bcrypt)                | Required                                                             |
| `age`               | Number        | User's age                              | Optional                                                             |
| `gender`            | String        | User's gender identifier                | Enum: ['Male', 'Female', 'Non-binary', 'Prefer not to say', 'Other'] |
| `stressTriggers`    | Array<String> | List of user's primary stress sources   |                                                                      |
| `relaxationMethods` | Array<String> | List of preferred relaxation techniques |                                                                      |
| `createdAt`         | Date          | Timestamp of account creation           | Default: Date.now                                                    |

---

_Note: Future collections for Meditations and Progress Logs will be documented here._
