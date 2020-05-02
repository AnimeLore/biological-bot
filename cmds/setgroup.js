const Discord = module.require('discord.js');
const fs = require('fs');
module.exports.run = async (bot,message,args) => {
    let user = message.author.username;
    let userid = message.author.id;
    var userData;
    connection.query(`SELECT * FROM users`, function(err, results) {
        if(err) console.log(err);
        let results1 = {}
        for(let i = 0; i < results.length; i++){
        let results2 = JSON.stringify(results[i])
        eval("results2 =" + results2)
        results1[results2.userid] = {
            health : results2.health,
            damage : results2.damage,
            resistance : results2.resistance,
            money : results2.money,
            medkitused : results2.medkitused,
            donate : results2.donate,
            timer : results2.timer,
            groupid : results2.groupid
        }
    }
        userData = results1
    });
    var groupData;
connection.query(`SELECT * FROM groups`, function(err, results) {
    if(err) console.log(err);
    let results1 = {}
    for(let i = 0; i < results.length; i++){
    let results2 = JSON.stringify(results[i])
    eval("results2 =" + results2)
    eval("results2.players = "+results2.players)
    results1[results2.id] = {
        name : results2.name,
        players : results2.players,
        creator : results2.creator
    }
}
    groupData = results1
});
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
    for (key in userData){
        connection.query('REPLACE INTO users SET health = '+userData[key].health+', damage = '+userData[key].damage+', resistance = '+userData[key].resistance+', money = '+userData[key].money+', medkitused = '+userData[key].medkitused+', donate = '+userData[key].donate+', timer = '+userData[key].timer+', groupid = '+userData[key].groupid+', userid = '+key, function(err, results) {
            if(err) console.log(err);
            console.log(results);
        });
    }
    for (sgid in groupData){
    connection.query('REPLACE INTO groups SET id = '+sgid+', name = '+groupData["" + sgid].name+', players = '+groupData["" + sgid].players+'creator = '+groupData["" + sgid].creator, function(err, results) {
        if(err) console.log(err);
        console.log(results);
    });
}
}else {
    if(""+args[1] == "0"){
        if(groupData[""+userData[affUser].groupid]){
            groupData[""+userData[affUser].groupid].players.splice(groupData[""+userData[affUser].groupid].players.indexOf(affUser),1)
        }
        userData[affUser].groupid = 0
        for (key in userData){
            connection.query('REPLACE INTO users SET health = '+userData[key].health+', damage = '+userData[key].damage+', resistance = '+userData[key].resistance+', money = '+userData[key].money+', medkitused = '+userData[key].medkitused+', donate = '+userData[key].donate+', timer = '+userData[key].timer+', groupid = '+userData[key].groupid+', userid = '+key, function(err, results) {
                if(err) console.log(err);
                console.log(results);
            });
    }
    for (sgid in groupData){
        connection.query('REPLACE INTO groups SET id = '+sgid+', name = '+groupData["" + sgid].name+', players = '+groupData["" + sgid].players+'creator = '+groupData["" + sgid].creator, function(err, results) {
            if(err) console.log(err);
            console.log(results);
        });
    }
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