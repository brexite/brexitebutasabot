module.exports = {
	name: "spamcfg",
	description: "Help command to show the commands",
	usage: "spamcfg <filename> <long ass text>",
	category: "Game",
  args: true,
  execute: async (bot, message, args) => {
    //this is where the actual code for the command goes
    
    
    const Discord = require('discord.js')
    const fs = require("fs");
    const path = require("path");
    const certPath = path.join(__dirname, '../assets/log.txt');
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    let filename = args[0]
    let text = args.slice(1).join(" ");

    message.delete();

    if (!text.length) {
      message.channel.send("empty input, same joke")
      return;
    }

    text = text.match(/.{1,100}(\s|$)/g);

    var output = [];

    output.push("//CFG Created using brexite but as a bot\n//=========================================================\n")
    output.push("alias\t\""+filename+"\"\t\""+filename+"0\"\n")
    for (var i=0; i<text.length-1; i++) {
      output.push("alias\t\""+filename+i+"\"\t\"say "+text[i].replace(/\\([\s\S])|(")/g,"\\$1$2").trim()+"; alias "+filename+" "+filename+(i+1)+"\"")
    }
    output.push("alias\t\""+filename+i+"\"\t\"say "+text[i].replace(/\\([\s\S])|(")/g,"\\$1$2").trim()+"; alias "+filename+" "+filename+"0\"\n")
    output.push("bind\t\"]\"\t\""+filename+"\"")

    const writeStream = fs.createWriteStream('./output/'+filename+'.cfg');

    const pathName = writeStream.path;

    // write each value of the array on the file breaking line
    output.forEach(value => writeStream.write(`${value}\n`));

    // the finish event is emitted when all data has been flushed from the stream
    writeStream.on('finish', () => {
       console.log(`wrote all the array data to file ${pathName}`);
    });

    // handle the errors on the write process
    writeStream.on('error', (err) => {
        console.error(`There is an error writing the file ${pathName} => ${err}`)
    });

    // close the stream
    writeStream.end();


    let locate = path.join(__dirname, '../output/'+filename+'.cfg')
    message.channel.send("Here is your cfg.", {
      files: [
        locate,
      ]
    });

    sleep(100);

    try {
      fs.unlinkSync(locate);
    } catch (err) {
      console.error(err)
    }
  }
};
