<h1 align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
  <br>discord-music-experience-bot
</h1>
<h4 align="center">An immersive Discord bot for music playback and community engagement.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<p align="center">
  <img src="https://img.shields.io/badge/Framework-Node.js-blue" alt="">
  <img src="https://img.shields.io/badge/Backend-JavaScript,_HTML,_CSS-red" alt="">
  <img src="https://img.shields.io/badge/Library-Discord.js-blue" alt="">
  <img src="https://img.shields.io/badge/Database-MongoDB-black" alt="">
</p>
<p align="center">
  <img src="https://img.shields.io/github/last-commit/spectra-ai-codegen/discord-music-experience-bot?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/spectra-ai-codegen/discord-music-experience-bot?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/spectra-ai-codegen/discord-music-experience-bot?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</p>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📜 License
- 👥 Authors

## 📍 Overview
The repository contains a project called "discord-music-experience-bot" that provides a comprehensive solution to enhance social interaction through shared music experiences in Discord voice channels.

## 📦 Features
|    | Feature           | Description                                                                                                        |
|----|-------------------|--------------------------------------------------------------------------------------------------------------------|
| 🎶 | Play Music    | Play songs from various platforms like YouTube, Spotify, and SoundCloud in voice channels.                        |
| 📻 | Queue Management| Users can add, remove, or reorder songs in the music queue dynamically.                                          |
| 🔊 | Volume Control | Adjust playback volume to suit the ambiance of the server.                                                       |
| ❓ | User Commands  | Easy-to-use commands like !play, !skip, !stop, and !pause for intuitive interactions.                            |
| 🔍 | Song Search    | Effortlessly search for songs by keywords, genres, or artists with autocomplete suggestions.                      |
| ℹ️ | Playback Information| Display current track details including title, artist, and duration, along with the playlist.               |
| 📜 | Custom Playlists| Create and share personal playlists, enhancing community sharing.                                                |
| 🔄 | Cross-Server Functionality| Switch between different voice channels while maintaining playback seamlessly.                       |
| 🔒 | Moderation Controls| Enable server admins to regulate bot functionality, ensuring compliance with community standards.             |

## 📂 Structure
```plaintext
discord-music-experience-bot/
│
├── commands/
│   ├── play.js
│   ├── skip.js
│   ├── stop.js
│   ├── pause.js
│   ├── volume.js
│   ├── queue.js
│   ├── search.js
│   ├── playlist.js
│   └── help.js
│
├── events/
│   ├── message.js
│   ├── guildMemberAdd.js
│   └── ready.js
│
├── services/
│   ├── musicService.js
│   ├── queueService.js
│   ├── userService.js
│   └── playlistService.js
│
├── models/
│   ├── userModel.js
│   ├── playlistModel.js
│   └── songModel.js
│
├── utils/
│   ├── commandHandler.js
│   ├── logger.js
│   └── errorHandler.js
│
├── config/
│   ├── env.config.js
│   └── database.config.js
│
├── routes/
│   ├── api.js
│   └── musicRoutes.js
│
├── middleware/
│   ├── authentication.js
│   ├── permissions.js
│   └── logging.js
│
├── .env
├── package.json
└── README.md
```

## 💻 Installation
### 🔧 Prerequisites
- Node.js
- npm
- MongoDB

### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/spectra-ai-codegen/discord-music-experience-bot.git
   ```
2. Navigate to the project directory:
   ```bash
   cd discord-music-experience-bot
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## 🏗️ Usage
### 🏃‍♂️ Running the Project
1. Start the bot:
   ```bash
   npm start
   ```
2. Invite the bot to your server and enjoy sharing music with your community!

### ⚙️ Configuration
Adjust configuration settings in `.env` to set up database connections and API keys.

## 🌐 Hosting
### 🚀 Deployment Instructions
You can host your bot on cloud platforms such as Heroku, AWS, or DigitalOcean.

1. Install the Heroku CLI:
   ```bash
   npm install -g heroku
   ```
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create a new Heroku app:
   ```bash
   heroku create
   ```
4. Deploy the code:
   ```bash
   git push heroku main
   ```

### 🔑 Environment Variables
- `DB_HOST`: Database host
- `DB_USER`: Database user
- `DB_PASS`: Database password

## 📜 License
This project is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/).

## 👥 Authors
- Drix10 - [GitHub](https://github.com/Drix10)
- Spectra.codes - [Website](https://spectra.codes)

<p align="center">
    <h1 align="center">🌐 Spectra.Codes</h1>
</p>
<p align="center">
    <em>Why only generate Code? When you can generate the whole Repository!</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/Developer-Drix10-red" alt="">
	<img src="https://img.shields.io/badge/Website-Spectra.codes-blue" alt="">
	<img src="https://img.shields.io/badge/Backed_by-Google_&_Microsoft_for_Startups-red" alt="">
	<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
</p>