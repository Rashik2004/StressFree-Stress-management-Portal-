const mongoose = require("mongoose");

const buildMongoUri = () => {
  if (process.env.MONGO_URI) {
    return process.env.MONGO_URI;
  }

  const host = process.env.MONGO_HOST || "localhost";
  const port = process.env.MONGO_PORT || "27017";
  const dbName = process.env.MONGO_DB_NAME || "stress-management-portal";
  const username = process.env.MONGO_USERNAME;
  const password = process.env.MONGO_PASSWORD;
  const authSource = process.env.MONGO_AUTH_SOURCE || "admin";

  if (username && password) {
    return `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}:${port}/${dbName}?authSource=${authSource}`;
  }

  return `mongodb://${host}:${port}/${dbName}`;
};

const connectDB = async () => {
  const mongoUri = buildMongoUri();

  try {
    const conn = await mongoose.connect(mongoUri, {});

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Active Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
module.exports.buildMongoUri = buildMongoUri;
