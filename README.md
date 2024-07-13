# DSA Bot

A simple Discord bot built with `discord.js` that allows users to ask about their DSA queries in natural language and get well formed responses with examples.

## Features
- `Hey DSA bot, {your query}` message is replied with the accurate response using the google gemini API.
- `/leetcode` command to read and respond with the user's LeetCode profile details and save it to DB. ( under development)
- more features to be released soon.

## Prerequisites

- Node.js (v16.6.0 or higher)
- npm (v7.20.0 or higher)
- Discord bot token
- Discord client ID
- Gemini API key

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/git-Suyash/DSA_bot.git
   cd DSA_bot

2. Install the dependencies

    ```bash
    npm install

3. Create a `.env` file and add the relevant environment variables.

## Usage

1. Ensure to have the developer mode on in Discord and authorize the bot.

2. Run the start script

    ```bash
    npm start

## Directory Structure

├── commands/utilities<br>
├── models<br>
├── app.js<br>
├── discordClient.js<br>
├── .env<br>
└── index.js

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like.

As this is an experimental project, advices and pointers would be valuable and appreciated.

## Author

[@git-Suyash](https://github.com/git-Suyash)