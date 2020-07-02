const Discord = module.require('discord.js');
const fs = require('fs');
var connection;
module.exports.run = async (bot,message,args,connect) => {
    connection = connect
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
fs.writeFileSync("cmds/groups.json",JSON.stringify(workData),err=>{
    if(err) throw err;
});
};