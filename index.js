import { configDotenv } from "dotenv";
import client from "./discordClient.js";

configDotenv( { path: "./.env"});
client.login(process.env.BOT_TOKEN);















