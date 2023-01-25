const Discord = require('discord.js');
const { Configuration, OpenAIApi }= require('openai');
const configuration = new Configuration( {
    organization: "org-2O3sEvnP6YoHlOz5g1ptlAx7",
    apiKey: "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",
});
const openai = new OpenAIApi (configuration);

// set up openai API key
openai.apiKey = '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';

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
client.login('ODU5NzczOTkzOTYyNDM4NjY2.GDaAOc.tN2k-hjTEyAybcJFOd7H4d3Q65WbvY8ZUxjS3s');

/*client.on('message', async message => {
  if (message.author.bot) return; // ignore messages from other bots

  // use openai to generate a response to the message
  const response = await openai.Completion.create({
    prompt: message.content,
    model: 'text-davinci-003',
    temperature: 0.7,
  });

  // send the response back to the channel
  message.channel.send(response.choices[0].text);
});
*/

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