/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = "stress-management-portal";
const collection = "users";

use(database);

db.createCollection(collection, {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "password"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        email: {
          bsonType: "string",
          pattern: "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",
          description: "must be a valid email string and is required",
        },
        password: {
          bsonType: "string",
          minLength: 6,
          description:
            "must be a string at least 6 characters long and is required",
        },
        stressTriggers: {
          bsonType: "array",
          items: {
            bsonType: "string",
          },
        },
        relaxationMethods: {
          bsonType: "array",
          items: {
            bsonType: "string",
          },
        },
      },
    },
  },
});

db.users.createIndex({ email: 1 }, { unique: true });
console.log("Users collection created with validation rules.");
