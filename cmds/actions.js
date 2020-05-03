const Discord = module.require('discord.js');
const fs = require('fs');
var connection;
module.exports.run = async (bot,message,args,connect) => {
    connection = connect
    let user = message.author.username;
    let userid = message.author.id;
    if(userData){
        var userData = getUserData()
    
        var groupData = getGroupData()
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
                        groupData[counter+1] = {
                            "name":args[1],"players":[userid],"creator":userid
                        }
                        userData[userid].money = userData[userid].money - 50000
                        saveGroupData(groupData)
                        saveUserData(userData)
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
    let results = connection.query(`SELECT * FROM users`)
    let userData = {}
    for(let i = 0; i < results.length; i++){
      let results2 = JSON.stringify(results[i])
      eval("results2 =" + results2)
      userData[results2.userid] = {
                health : results2.health,
                damage : results2.damage,
                resistance : results2.resistance,
                money : results2.money,
                medkitused : results2.medkitused,
                donate : results2.donate,
                timer : results2.timer,
                groupid : results2.groupid
            }
        console.log(userData)
        }
        return userData
};
function getWorkData(){
    let results = connection.query(`SELECT * FROM workers`)
    let workData = {}
    for(let i = 0; i < results.length; i++){
        let results2 = JSON.stringify(results[i])
        eval("results2 =" + results2)
        workData[results2.userid] = {
            timer : results2.timer,
            id : results2.id
        }
    }
    return workData
}
function getGroupData(){
    let results = connection.query(`SELECT * FROM groups`)
    let groupData = {}
    for(let i = 0; i < results.length; i++){
        let results2 = JSON.stringify(results[i])
        eval("results2 =" + results2)
        eval("results2.players = "+results2.players)
        groupData[results2.id] = {
            name : results2.name,
            players : results2.players,
            creator : results2.creator
        }
    }
    return groupData
}
function saveUserData(userData){
    for (key in userData){
        connection.query('REPLACE INTO users SET health = '+userData[key].health+', damage = '+userData[key].damage+', resistance = '+userData[key].resistance+', money = '+userData[key].money+', medkitused = '+userData[key].medkitused+', donate = '+userData[key].donate+', timer = '+userData[key].timer+', groupid = '+userData[key].groupid+', userid = '+key);
}};
function saveWorkData(workData){
    for(key in workData){
        connection.query('REPLACE INTO workers SET userid = '+key+', id = '+workData[key].id+', timer = '+workData[key].timer)
}};
function saveGroupData(groupData){
  for (sgid in groupData){
    connection.query('REPLACE INTO groups SET id = '+sgid+', name = '+groupData["" + sgid].name+', players = '+groupData["" + sgid].players+'creator = '+groupData["" + sgid].creator);
}};