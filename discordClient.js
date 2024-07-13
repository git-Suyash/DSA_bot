import { configDotenv } from 'dotenv';
import { Client, GatewayIntentBits, REST, Routes, Collection } from 'discord.js';
import runAIModel from "./app.js";
import { readdirSync } from 'fs';
import * as path from "path";
import { fileURLToPath, pathToFileURL } from 'url';

configDotenv({ path: './.env' });
const TOKEN = process.env.BOT_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = readdirSync(foldersPath);

(async () => {
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const fileUrl = pathToFileURL(filePath).href;
            // Dynamically import the command module
            const command = await import(fileUrl);

            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    // console.log(client.commands);
    const body = client.commands.map(command => {
        return {
            name: command.data.name,
            description: command.data.description,
        };
    });

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), 
        { body: body });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();




client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});



// client.on('messageCreate', async (message) => {
//     if (!message.content || message.author.username == 'DSA bot') return;
//     try {
//         await message.reply("msg reply");
//     }
//     catch (err) {
//         console.log(err);
//     }
// })

client.on('messageCreate', async (message) => {
    //console.log(message);
    if (!message.content || message.author.username == 'DSA bot' || !message.content.toLowerCase().startsWith("hey dsa bot")) return;
    try {
        const response = (await runAIModel(message.content)).response.text();
        await message.reply(response);
    } catch (err) {
        console.log(err);
        await message.reply("EHH I DON'T KNOW");
    }
});

client.on('interactionCreate',async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
    try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.on('error', err => {
    console.log(err);
})

export default client;