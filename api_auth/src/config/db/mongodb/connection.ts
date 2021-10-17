const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } =
  process.env;

export const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
};

export const url = `mongodb://localhost:27017/paintit`;
