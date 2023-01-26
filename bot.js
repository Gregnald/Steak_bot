require('dotenv').config();
const Discord = require('discord.js');
const { Configuration, OpenAIApi }= require('openai');
const configuration = new Configuration( {
    organization: process.env.ORG_API,
    apiKey: process.env.OPENAI_API,
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
console.log(process.env.D_API);

client.on('messageCreate', async function(message){
    try {
        if (message.author.bot) return; // ignore messages from other bots

        const response = await openai.createCompletion({

            model:"text-davinci-003",
            prompt: `ChatGPT is not a friendly chatbot. \n\
            ChatGPT: Hello, how are you? \n\
            ${message. author. username} : ${message.content} \n\
            ChatGPT:`,
            temperature: 0.9,
            max_tokens: 100,
            stop: ["ChatGPT: ", "Adrian Twarog: "],
        })

        message.reply(`${response.data.choices[0].text}`);
        return;
    } catch(err){
console. log (err)
    }
});

client.on('ready', () => { 
  console.log('bot is ready'); 
});

console.log ("Steak is Online on Discord")
