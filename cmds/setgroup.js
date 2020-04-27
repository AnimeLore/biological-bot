const Discord = module.require('discord.js');
const fs = require('fs');
module.exports.run = async (bot,message,args) => {
    let user = message.author.username;
    let userid = message.author.id;
    let userData = JSON.parse(fs.readFileSync("./cmds/users.json","utf8"));
    let groupData = JSON.parse(fs.readFileSync("./cmds/groups.json","utf8"));
    if(userid == "282799894585147392"){
    try{
    let affUser = args[0].replace("<@", "").replace(">","").replace("!","")
    console.log(affUser)
    console.log(args)
    if (groupData[""+args[1]]){
        groupData[""+args[1]].players.push(affUser)
        if(groupData[""+userData[affUser].groupid]){
            groupData[""+userData[affUser].groupid].players.splice(groupData[""+userData[affUser].groupid].players.indexOf(affUser),1)
        }
    userData[affUser].groupid = parseInt(args[1])
    fs.writeFileSync("cmds/users.json",JSON.stringify(userData),(err)=>{
        if(err) console.log(err);
    });
    fs.writeFileSync("cmds/groups.json",JSON.stringify(groupData),(err)=>{
        if(err) console.log(err);
    });
}else {
    if(""+args[1] == "0"){
        if(groupData[""+userData[affUser].groupid]){
            groupData[""+userData[affUser].groupid].players.splice(groupData[""+userData[affUser].groupid].players.indexOf(affUser),1)
        }
        userData[affUser].groupid = 0
        fs.writeFileSync("cmds/users.json",JSON.stringify(userData),(err)=>{
            if(err) console.log(err);
        });
        fs.writeFileSync("cmds/groups.json",JSON.stringify(groupData),(err)=>{
            if(err) console.log(err);
        });
    } else {
    message.channel.send("<@"+message.author.id+">, группа не найдена.")
    }
}
} catch(err){
    message.channel.send("<@"+message.author.id+">, произошла ошибка при выполнении команды. Возможно пользователь не зарегестрирован.")
    console.log(err)
}} else {
    message.channel.send("<@"+message.author.id+">, у Вас нет доступа к данной комманде.")
}
};
module.exports.help = {
    name : "setgroup"
};