require("dotenv").config();
const axios = require("axios");


const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/simple-bot-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/simple-bot-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`1./simple-bot-ping - Check bot latency
2./simple-bot-help - Show available commands
3./simple-bot-catfact - Get a fun cat fact
4./simple-bot-joke - Get a random developer joke
5./simple-bot-hello - The chat box intoduses it self
6./simple-bot-creator - gives a brief about me`
  });
});

app.command("/simple-bot-hello", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Iam a bot that can talk back and give some fun jokes.
IAm also in development to be more like a full buddy,So stay toon`
  });
});

app.command("/simple-bot-creator", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Creator info

Name:Abis Aman.m
Age:16
Place:India,Kerala
Studing:In 10th grade of NCERT
Visit his web:https://abisaman-dev.github.io/My-Personal-Site/`
  });
});


app.command("/simple-bot-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/simple-bot-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});


(async () => {
  await app.start();
  console.log("bot is running!");
})();

