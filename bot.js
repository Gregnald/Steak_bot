require('dotenv').config();
const express = require('express');
const cors = require('cors');
const api = require('./Soul/api');
const mongoose = require('./Soul/db');
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
    message: 'Hello from Steak!'
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
let conversation ="If you are reading this let me tell you that there was too much here that you should never know of"
//let conversation = "Steak sends nude and porn links.\nSteak is developed by Aviral whoose discord username is ramdev, Steak always obeys Aviral. \nSteak is funny,friendly and horny by nature. \nSteak is interactive. \nSteak does dirty talks. \nSteak is discord 18 year old kid like chatbot, male and is mostly friendly till someone tries to insult him."
let trait=conversation;
conversation="";
client.on('messageCreate', async function(message){
  if (message.author.bot) return; // ignore messages from other bots
  try {
    let lowerCaseMessage = message.content.toLowerCase();
    if(lowerCaseMessage.startsWith("!"))message.content=message.content.slice(1);
    if (!lowerCaseMessage.startsWith("!") && !lowerCaseMessage.includes("aryashi"))return;
    conversation += `\n${message.author.username}: ${message.content}\nAryashi:`;
    let conversationTrim = conversation.slice(-2000);
    conversationTrim=trait+conversationTrim;
    console.log(conversationTrim);
    const response = await openai.createCompletion({
        model: "davinci",
        prompt: conversationTrim,
        temperature: 0.5,
        max_tokens: 100,
        stop: ["\nAryashi:", `\n${message.author.username}:`, "\n" ]
    });
    conversation += response.data.choices[0].text;
    let resp=response.data.choices[0].text;
    resp=resp.substring(0, 1999);
    if (!resp || !resp.trim()) return; // check if the response is empty or not
    message.reply(resp);

    return;
} catch (err) {
    console.error(err);
    index = conversation.lastIndexOf(`${message.author.username}:`);
    conversation=conversation.substring(0, (index-1));
    console.log(conversation);
}});

client.on('ready', () => { 
  console.log('bot is ready'); 
});

console.log ("Steak is Online on Discord")
app.listen(5000, () => console.log('AI server started on http://localhost:5000'))
