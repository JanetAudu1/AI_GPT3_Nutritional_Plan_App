import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
Write me a twitter thread in the style of Donald Trump with the title below. Make it sound somewhat obnoxious like he does. Use hashtags. Make it sound like he's tweeting from his phone.

Title:
`
const userInput1 = "Condition: "
//const userInput2 = "Cuisine: "

const generateAction = async (req, res) => {
    const userInput3 = `${userInput1}${req.body.userInputCondition}\n`;
    console.log(`user Input: ${userInput3}`);

//    const userInput4 = `${userInput2}${req.body.userInputCuisine}\n`;
//    console.log(`user Input: ${userInput4}`);


    // Run first prompt
    console.log(`API: ${basePromptPrefix}${userInput3}`);
//    console.log(`API: ${basePromptPrefix}${userInput3}${userInput4}`);

    const baseCompletion = await openai.createCompletion({
	model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${userInput3}\n`,
//        prompt: `${basePromptPrefix}${userInput3}${userInput4}\n`,
        temperature: 0.8,
        max_tokens: 250,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
