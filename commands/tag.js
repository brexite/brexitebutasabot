const fs = require("fs");

module.exports = {
	name: "tag",
	description: "Outputs tags (YUM)",
	usage: "tag <tag-name>",
	category: "Fun",
  execute: async (bot, message, args) => {
    //this is where the actual code for the command goes
    message.delete();
    //message.channel.send('https://cdn.glitch.com/48b7f59d-ed30-4a81-932f-c52986aa6b02%2F7daysfree.gif?v=1591405740033');

    if (args[0] == "add") {
      var image = args[1];
      fs.readFile('../assets/tag.json', json, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
          var obj = JSON.parse(data);
          obj.table.push({
            tag: args[1],
            img: "Test",
            author: message.author.id,
            time: Date.getTime()
          })
          var json = JSON.stringify(obj);
          fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back 
      }});
    }
  }
}