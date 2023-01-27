require('dotenv').config();
const Discord = require('discord.js');
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

let conversation = "Steak is a straight male and 18 year old nigger who is obidient and friendly till someone wants to fight. \n Steak is mostly horny.";
conversation += "\n Steak mostly in funny and horny mood only. \n Steak has deep knowledge of Mathematics,Physics,Chemistry and composition and loves to answer study related question correctly. \nSteak:"

client.on('messageCreate', async function(message){
    try {
        if (message.author.bot) return; // ignore messages from other bots

        conversation += `\n${message.author.username}: ${message.content}\nSteak:`;

        const response = await openai.createCompletion({
            model: "davinci",
            prompt: conversation,
            temperature: 0.86,
            max_tokens: 100,
            stop: ["\nSteak: ", "\nramdev :", "\nramdev:", "\nRamdev :"],
        });

        conversation += response.data.choices[0].text;
        message.reply(`${response.data.choices[0].text}`);
        return;
    } catch(err){
        console.log(err);
    }
});

client.on('ready', () => { 
  console.log('bot is ready'); 
});

console.log ("Steak is Online on Discord")
