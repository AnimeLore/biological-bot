const Discord = module.require('discord.js');
const fs = require('fs');
module.exports.run = async (bot,message,args,connection) => {
    let user = message.author.username;
    let userid = message.author.id;
    var userData = getUserData()
    if(!userData[userid]) {
        message.channel.send("Здравствуйте <@"+userid+">. Очень даже хорошо, что вы решили принять участие в нашем исследовании! Суть исследования заключается в том, что Вы, как и остальные испытуемые отправляетесь в особую зону с высоким био. заражением. В самой зоне есть множество способов заработать и деньги, полученные с заработка Вы сможете потратить на специальные препараты для поддержания здоровья или же для защиты от био. заражения. В случае если уровень вашего здоровья будет ниже 10%, мы немедленно эвакуируем Вас, после чего Вы сможете участвовать в исследовании заново.")
        userData[userid] = {
            health : 100,
            damage : 25,
            resistance : 0,
            money : 1000,
            medkitused : 0,
            donate : 0,
            timer : 3600,
            groupid : 0
        }
        saveUserData(userData)
    } else {
        message.channel.send("Здравствуйте <@"+userid+">. Вы уже принимаете участие в данном исследовании.")
    }
};
module.exports.help = {
    name : "start"
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