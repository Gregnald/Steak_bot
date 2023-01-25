const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  if (message.content.startsWith('!chat')) {
    const input = message.content.slice(6);
    try {
        const response = await fetch('https://steak.onrender.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: input
            })
        });
        if (response.ok) {
            const data = await response.json();
            const parsedData = data.bot.trim();
            message.channel.send(parsedData);
        } else {
            const err = await response.text();
            message.channel.send("Something went wrong");
            console.error(err);
        }
    } catch (err) {
        console.error(err);
        message.channel.send("Something went wrong");
    }
  }
});

client.login('YOUR_BOT_TOKEN');