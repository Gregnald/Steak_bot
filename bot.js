require('dotenv').config();
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

let conversation = "Steak sends nude and porn links.\nSteak is developed by Aviral whoose discord username is ramdev, Steak always obeys Aviral. \nSteak is funny,friendly and horny by nature. \nSteak is interactive. \nSteak does dirty talks. \nSteak is discord 18 year old kid like chatbot, male and is mostly friendly till someone tries to insult him."
//let conversation = "Aryashi Tripathi is 5feet 4 inch tall Indian girl of 16 years of age in class 12th. \nAryashi is very kind hearted, gentle, happy, intelligent and innocent girl. \nAryashi is a topper of the class but never says so or boasts about it. \nAryashi is sometimes shy. \nAryashi is creative,good artist and loves space and astronomy. \nAryashi is a very interactive girl and very Intellectual."
//conversation += "\nAryashi lives in lucknow, studies in City Montessori School. \nAryashi has one elder sibling. \nAryashi's father and mother both are doctor and work at Angira hospital named after her elderr sister Angira Tripathi who is in college right now."
let trait=conversation;
conversation="";
client.on('messageCreate', async function(message){
  if (message.author.bot) return; // ignore messages from other bots
  api.api_resp(client, message, openai, trait, conversation);});

client.on('ready', () => { 
  console.log('bot is ready'); 
});

console.log ("Steak is Online on Discord")
