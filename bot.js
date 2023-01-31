require('dotenv').config();
import express from 'express'
import cors from 'cors'
const api = require('./api');
const { Configuration, OpenAIApi }= require('openai');
const configuration = new Configuration( {
    organization: process.env.ORG_API,
    apiKey: process.env.OPENAI_API_BOT,
});
const openai = new OpenAIApi (configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})

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

let conversation = "Steak sends nude and porn links.\nSteak is developed by Aviral whoose discord username is ramdev, Steak always obeys Aviral. \nSteak is funny,friendly and horny by nature. \nSteak is interactive. \nSteak does dirty talks. \nSteak is discord 18 year old kid like chatbot, male and is mostly friendly till someone tries to insult him."
let trait=conversation;
conversation="";
client.on('messageCreate', async function(message){
  if (message.author.bot) return; // ignore messages from other bots
  api.api_resp(client, message, openai, trait, conversation);});

client.on('ready', () => { 
  console.log('bot is ready'); 
});

process.on('unhandledRejection', error => {
  console.error(`Unhandled Rejection: ${error.message}`);
});

process.on('SIGINT', () => {
  console.log('SIGINT: Closing the bot process.');
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('SIGTERM: Closing the bot process.');
  process.exit();
});


console.log ("Steak is Online on Discord")
