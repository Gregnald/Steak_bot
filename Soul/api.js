async function api_resp(client, message, openai, trait, conversation) {
    try {
        if (message.author.bot) return; // ignore messages from other bots
        let lowerCaseMessage = message.content.toLowerCase();
        if(lowerCaseMessage.startsWith("!"))message.content=message.content.slice(1);
        if (!lowerCaseMessage.startsWith("!") && !lowerCaseMessage.includes("steak"))return;
        conversation += `\n${message.author.username}: ${message.content}\nSteak:`;
        console.log(conversation);
        const response = await openai.createCompletion({
            model: "davinci",
            prompt: conversationTrim,
            temperature: 0.6,
            max_tokens: 100,
            stop: ["\nSteak:", `\n${message.author.username}:`, "\n\n" ]
        });
        conversation += response.data.choices[0].text;
        let resp= response.data.choices[0].text;
        resp=resp.substring(0, 1999);
        message.reply(resp);
        return;
    } catch (err) {
        console.error(err);
        index = conversation.lastIndexOf(`${message.author.username}:`);
        conversation=conversation.substring(0, (index-1));
        console.log(conversation);
    }
}
module.exports = {
api_resp
};
