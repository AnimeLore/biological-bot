const Discord = module.require('discord.js');
const fs = require('fs');
module.exports.run = async (c,message,args) => {
    let user = message.author.username;
    let userid = message.author.id;
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