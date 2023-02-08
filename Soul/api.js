async function api_resp(client, message, openai, trait, conversation) {
    try {
        let lowerCaseMessage = message.content.toLowerCase();
        if(lowerCaseMessage.startsWith("!"))message.content=message.content.slice(1);
        if (!lowerCaseMessage.startsWith("!") && !lowerCaseMessage.includes("steak"))return;
        conversation += `\n${message.author.username}: ${message.content}\nSteak:`;
        let conversationTrim = conversation.slice(-2000);
        conversationTrim=trait+conversationTrim;
        console.log(conversationTrim);
        const response = await openai.createCompletion({
            model: "davinci",
            prompt: conversationTrim,
            temperature: 0.5,
            max_tokens: 100,
            stop: ["\nSteak:", `\n${message.author.username}:`, "\n\n" ]
        });
        conversation += response.data.choices[0].text;
        let resp=response.data.choices[0].text;
        resp=resp.substring(0, 1999);
        message.reply(resp);
        index = conversation.lastIndexOf(`${message.author.username}:`);
        conversation=conversation.substring(0, (index-1));
        console.log(conversation);
        return;
    } catch (err) {
        console.error(err);
    }
}
module.exports = {
api_resp
};
