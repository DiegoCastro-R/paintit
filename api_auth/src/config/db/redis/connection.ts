import redis from "redis";

const client = redis.createClient({
  port: 6380,
  host: "127.0.0.1",
});

client.on("connect", () => {
  console.log("🔌 🔉 Redis connected...");
});

client.on("ready", () => {
  console.log("✅ 🔉 Redis connected and ready to use...");
});

client.on("error", (err) => {
  console.log(`❌ 🔉 ${err.message}`);
});

client.on("end", () => {
  console.log(`🔌 🔉 Redis disconnected...`);
});

process.on("SIGINT", () => {
  client.quit();
});

export default client;
