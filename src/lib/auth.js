import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;
async function getDB() {
  if (!db) {
    await client.connect();
    db = client.db("MarketPulse_DB");
  }
  return db;
}

const dbInstance = await getDB();

export const auth = betterAuth({
  database: mongodbAdapter(dbInstance, {
    client,
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "buyer",
        required: false,
        input: true,
      },
      phone: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true, 
      },
      address: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true, 
      },
      shopName: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
      shopUsername: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
    },
  },
});