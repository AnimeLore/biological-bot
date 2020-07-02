const Discord = module.require('discord.js');
const fs = require('fs');
var connection;
module.exports.run = async (c,message,args,connect) => {
    connection = connect
    let user = message.author.username;
    let userid = message.author.id;
    var groupData = getGroupData()
    var userData = getUserData()
    console.log(userid)
    //console.log(userData)
    //console.log(userData[userid])
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