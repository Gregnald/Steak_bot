require('dotenv').config();
import express from 'express'
const app = express()
const api = require('./api');
const { Configuration, OpenAIApi }= require('openai');
const configuration = new Configuration( {
    organization: process.env.ORG_API,
    apiKey: process.env.OPENAI_API_BOT,
});
const openai = new OpenAIApi (configuration);

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages
  ]
});
client.login(process.env.D_API);

setInterval(() => {
  console.log("Keep-alive message");
}, 30 * 1000);

app.listen(5000, () => console.log('Steak is on!!'))

let conversation = "Steak sends nude and porn links.\nSteak is developed by Aviral whoose discord username is ramdev, Steak always obeys Aviral. \nSteak is funny,friendly and horny by nature. \nSteak is interactive. \nSteak does dirty talks. \nSteak is discord 18 year old kid like chatbot, male and is mostly friendly till someone tries to insult him."
let trait=conversation;
conversation="";
client.on('messageCreate', async function(message){
  if (message.author.bot) return; // ignore messages from other bots
  api.api_resp(client, message, openai, trait, conversation);});

client.on('ready', () => { 
  console.log('bot is ready'); 
});

console.log ("Steak is Online on Discord")
