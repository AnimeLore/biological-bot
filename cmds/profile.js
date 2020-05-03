const Discord = module.require('discord.js');
const fs = require('fs');
var connection;
module.exports.run = async (c,message,args,connect) => {
    connection = connect
    let user = message.author.username;
    let userid = message.author.id;
    var groupData = getGroupData()
    var userData = getUserData()

    if(userData[userid] !== undefined) {
        if(groupData[""+userData[userid].groupid]){
            userGroup = groupData[""+userData[userid].groupid].name;
        } else {
            userGroup = "-"
        }
    const embed = new Discord.MessageEmbed() 
        .setTitle("Профиль игрока "+user)
        .addFields({name : "Количество здоровья: ",value : userData[userid].health, inline : true},
        {name : "Урон био. заражения/час: ",value : userData[userid].damage, inline : true},
        {name : "Сопротивление заражению: ",value : userData[userid].resistance, inline : true},
        {name : "Количество денег на счету: ",value : userData[userid].money, inline : true},
        {name : "Использовано аптечек: ",value : userData[userid].medkitused, inline : true},
        {name : "Количество спец. вакцин: ",value : userData[userid].donate, inline :  true},
        {name : "Группировка:", value : userGroup, inline : true});
      message.channel.send(embed);
    } else {
        message.channel.send("<@"+userid+">, Вы не зарегистрированы в базе испытуемых! Зарегистрируйтесь при помощи команды ;!start");
        
    };
};
module.exports.help = {
    name : "profile"
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