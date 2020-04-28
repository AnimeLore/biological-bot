const Discord = module.require('discord.js');
const fs = require('fs');
module.exports.run = async (bot,message,args,db) => {
    let user = message.author.username;
    let userid = message.author.id;
    var userData = db.collection("all_json").find({"$oid": "5ea87f777c213e2096461711"}).toArray((err,result) => {
        if (err) throw err;
        userData = result[0].users
});
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
        db.collection("all_json").update({"$oid": "5ea87f777c213e2096461711"}, {"users":userData}, true);
    } else {
        message.channel.send("Здравствуйте <@"+userid+">. Вы уже принимаете участие в данном исследовании.")
    }
};
module.exports.help = {
    name : "start"
};