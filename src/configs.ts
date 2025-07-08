require("dotenv").config();

const configs = {
  api: {
    port: process.env.PORT || 8081,
    uri: process.env.MONGO_CONNECTION_URI,
    default_page_count: process.env.DEFAULT_PAGE_COUNT,
  },
  secret_key: process.env.SECRETPRIVATEKEY,
  user_default: {
    name: process.env.MIGRATE_USER_DEFAULT_NAME,
    email: process.env.MIGRATE_USER_DEFAULT_EMAIL,
    password: process.env.MIGRATE_USER_DEFAULT_PASSWORD,
  },
  migrations: {
    uri: process.env.MONGO_CONNECTION_URI,
    db: process.env.MIGRATE_MONGO_DB || "mentoring-db",
  },
};

export default configs;
