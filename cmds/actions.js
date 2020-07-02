const Discord = module.require('discord.js');
const fs = require('fs');
var connection;
module.exports.run = async (bot,message,args,connect) => {
    connection = connect
    let user = message.author.username;
    let userid = message.author.id;
    var userData = getUserData()
    var groupData = getGroupData()
    if(userData){
    if(!args[0] && !args[1]){
    var embed = new Discord.MessageEmbed() 
    .setTitle("Список действий.")
    .addFields({name : "Создать группировку.",value : "Стоимость создания - 50000р. ;!actions 1 <название>", inline : false},
    {name : "Добавить игрока в группировку.",value : ";!actions 2 <пинг игрока(через @)>", inline : false},
    {name : "Удалить игрока из группировки.",value : ";!actions 3 <пинг игрока(через @)>", inline : false},
    {name : "Передать деньги.",value : ";!actions 4 <пинг игрока(через @)> <количество денег>", inline : false});
    message.channel.send(embed);
    }else {
        switch(parseInt(args[0])){
            case 1:
                if(args[1]) {
                    if (groupData[""+args[1]]){
                        message.channel.send("<@"+message.author.id+">, Ошибка. Данное название использовать нельзя.")
                    } else if(userData[userid].money - 50000 >= 0){

                        var counter = 0;
                    for (var key in groupData) {
                        counter++;
                    }
                    fullname = ""
                    for(i = 1; i<=args.length-1;i++){
                        fullname = fullname+" "+args[i]
                    }
                    fullname = fullname.trim()
                        groupData[counter+1] = {
                            "name":fullname,"players":[userid],"creator":userid
                        }
                        userData[userid].groupid = counter+1
                        userData[userid].money = userData[userid].money - 50000
                        saveGroupData(groupData)
                        saveUserData(userData)
                        message.channel.send("<@"+message.author.id+">, группировка '"+fullname+"' была успешно создана.")
                    } else{
                        message.channel.send("<@"+message.author.id+">, Ошибка. Не достаточно денег.")
                    }
                } else {
                    message.channel.send("<@"+message.author.id+">, Ошибка. Не хватает аргументов.")
                }
                break;
            case 2:
                if(args[1] && args[1].replace("<@", "").replace(">","").replace("!","") != userid && userData[userid].group != 0 && groupData[userData[userid].groupid].creator == userid) 
                {
                    let affUser = args[1].replace("<@", "").replace(">","").replace("!","")
                    let gid = userData[userid].groupid
    if (groupData[""+gid]){
        groupData[""+gid].players.push(affUser)
        if(groupData[""+userData[affUser].groupid]){
            groupData[""+userData[affUser].groupid].players.splice(groupData[""+userData[affUser].groupid].players.indexOf(affUser),1)
        }
    userData[affUser].groupid = parseInt(gid)
    saveUserData()
    saveGroupData(groupData)
    }
                } else {
                    message.channel.send("<@"+message.author.id+">, Ошибка.")
                }
                break;
            case 3:
                if(args[1] && args[1].replace("<@", "").replace(">","").replace("!","") != userid && userData[userid].group != 0 && groupData[userData[userid].groupid].creator == userid) 
                {
                    console.log("test")
                    let affUser = args[1].replace("<@", "").replace(">","").replace("!","")
                    groupData[""+userData[userid].groupid].players.splice(groupData[""+userData[userid].groupid].players.indexOf(affUser),1)
                    userData[affUser].groupid = 0 
                    saveUserData(userData)
                    saveGroupData(groupData)
                }else {
                    message.channel.send("<@"+message.author.id+">, Ошибка.")
                }
                break;
            case 4:
                if(args[1] && args[2]){
                    let m = parseInt(args[2])
                    let affUser = args[1].replace("<@", "").replace(">","").replace("!","")
                    if(userData[userid].money - m >= 0){
                    userData[userid].money = userData[userid].money - m
                    userData[affUser].money = userData[affUser].money +m
                    saveUserData(userData);
                    } else {
                        message.channel.send("<@"+message.author.id+">, Ошибка. Не достаточно денег.")
                    }
                } else {
                    message.channel.send("<@"+message.author.id+">, Ошибка. Не хватает аргументов.")
                }

        }
}
}else{
    message.channel.send("<@"+userid+">, Вы не зарегистрированы в базе испытуемых! Зарегистрируйтесь при помощи команды ;!start");
}}
module.exports.help = {
    name : "actions"
};
function getUserData(){
    return JSON.parse(fs.readFileSync("./cmds/users.json","utf8"))
};
function getWorkData(){
return JSON.parse(fs.readFileSync("./cmds/workers.json","utf8"))
}
function getGroupData(){
return JSON.parse(fs.readFileSync("./cmds/groups.json","utf8"));
}
function saveUserData(userData){
fs.writeFileSync("cmds/users.json",JSON.stringify(userData),err=>{
    if(err) throw err;
});
};
function saveWorkData(workData){
fs.writeFileSync("cmds/workers.json",JSON.stringify(workData),err=>{
    if(err) throw err;
});
};
function saveGroupData(groupData){
fs.writeFileSync("cmds/groups.json",JSON.stringify(groupData),err=>{
    if(err) throw err;
});
};