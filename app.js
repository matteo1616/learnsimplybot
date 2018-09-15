const discord   = require('discord.js')
const bot       = new discord.Client()
const request   = require("request")
const fetch     = require('node-fetch');
const fs        = require("fs");
const translate = require('google-translate-api');
const prefix  = "?"
const helpCommand = `
**?help** => Affiche la liste des commandes \n
**?version** => Affiche la version de @Learn_Simply \n
**?quote** => Affiche une citation au hasard \n
**?memes** => Affiche un meme au hasard\n
`

function quoteRandom (message) {
    fetch("https://talaikis.com/api/quotes/")
    .then(res => res.json())
    .then(body => {
        let nbrQuote   = body.length
        let nbrRandom  = Math.floor(Math.random() * nbrQuote)
            let author = body[nbrRandom].author
            translate(body[nbrRandom].quote , {to: 'fr'}).then(res => {
                let content = res.text
                const embed = new discord.RichEmbed()
                    .setColor('#1099fb')
                    .setDescription(`  _"${content}"_ \n \n **${author}**  `)
                    .setFooter('Citation par https://www.talaikis.com/quotes')

                message.channel.send({embed})
            })
    })
}

function getMemes (message) {
    fetch('https://api.imgflip.com/get_memes')
    .then(res => res.json())
    .then(dns => dns.data.memes)
    .then(dns => {
        let nbrRandom = Math.floor(Math.random() * dns.length)
        const embed = new discord.RichEmbed()
            .setTitle('Meme by Imgflip.com')
            .setColor('#1099fb')
            .setDescription(dns[nbrRandom].name)
            .setImage(dns[nbrRandom].url)
            

        message.channel.send({embed})
    })
    
}

bot.on('message', message => {
    if(message.content.startsWith(prefix + "quote")) {
        quoteRandom(message)
    }
    if(message.content.startsWith(prefix + "version")) {
        const embed = new discord.RichEmbed()
            .setTitle("Version du bot Learn Simply")
            .setColor('#1099fb')
            .setDescription('v0.1.2')
        message.channel.send({embed})
    }
    if(message.content.startsWith(prefix + "help")) {
        const embed = new discord.RichEmbed()
            .setTitle("Liste des commandes")
            .setAuthor("Matt", "https://learnsimply.alwaysdata.net/image/logo.png")
            .setColor('#1099fb')
            .setDescription(helpCommand)
        message.channel.send({embed})
    }
    if(message.content.startsWith('<@488344783836807201>')) {
        const embed = new discord.RichEmbed()
            .setTitle("Liste des commandes")
            .setAuthor("Matt", "https://learnsimply.alwaysdata.net/image/logo.png")
            .setColor('#1099fb')
            .setDescription(helpCommand)
        message.channel.send({embed})
    }
    if(message.content.startsWith(prefix + "memes")) {
        getMemes(message)
        // const embeb
    }
})

bot.login(process.env.TOKEN)
