const Discord = module.require('discord.js');
const fs = require('fs');
module.exports.run = async (bot,message,args) => {
    let user = message.author.username;
    let userid = message.author.id;
    if(userData[userid]){
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
        var userData = results1
    });
    var workData;
connection.query(`SELECT * FROM workers`, function(err, results) {
    if(err) console.log(err);
    let results1 = {}
    for(let i = 0; i < results.length; i++){
    let results2 = JSON.stringify(results[i])
    eval("results2 =" + results2)
    results1[results2.userid] = {
        timer : results2.timer,
        id : results2.id
    }
}
    workData = results1
});
    if(workData[userid]){
        message.channel.send("<@"+message.author.id+">, Вы уже находитесь на задании.")
    }else {
    switch(parseInt(args[0])){
        case 1:
            workData[userid] = {
                id : 1,
                timer : 7200
            }
            message.channel.send("<@"+message.author.id+">, отлично! Нам как раз необходимо проверить пару аномальных полей. На выходе из ВБУ вам выдадут все снаряжение. И еще - мы заплатим Вам лишь 10% от общей суммы, на которую вы соберете артефактов.")
            break;
        case 2:
            workData[userid] = {
                id : 2,
                timer : 1800
            }
            message.channel.send("<@"+message.author.id+">, отлично! Нам как раз необходимо проверить парочку сталкерских троп. На выходе из ВБУ вам выдадут все снаряжение.")
            break;
        case 3:
            workData[userid] = {
                id : 3,
                timer : 13500
            }
            message.channel.send("<@"+message.author.id+">, отлично! Нам как раз необходимо установить парочку сканеров в аномальных местах. На выходе из ВБУ вам выдадут все снаряжение.")
            break;
        case 4:
            workData[userid] = {
                id : 4,
                timer : 4800
            }
            message.channel.send("<@"+message.author.id+">, отлично! Нам как раз необходимо сделать замеры в некоторых местах. На выходе из ВБУ вам выдадут все снаряжение.")
            break;
        default:
            var embed = new Discord.MessageEmbed() 
                .setTitle("Внешняя база ученых. Список работы.")
                .addFields(
                {name : "Исследования аномалий. 2ч.",value : "Исследования аномальные полей на наличие артефактов. => ;!work 1", inline : false},
                {name : "Проверка троп. 30мин.",value : "Проверка сталкерских троп на наличие новых аномалий. => ;!work 2", inline : false},
                {name : "Установка сканнеров в специальных зонах. 3ч 45мин.",value : "Установка сканнеров в зонах аномальной активности. => ;!work 3", inline : false},
                {name : "Ручные замеры в опасных зонах. 1ч 20мин.",value : "Ручные замеры в местах, где приборы не работают => ;!work 4", inline : false}
                );
                message.channel.send(embed);
                break;
    }
    for(key in workData){
        connection.query('REPLACE INTO workers SET userid = '+key+', id = '+workData[key].id+', timer = '+workData[key].timer, function(err, results) {
            if(err) console.log(err);
            console.log(results);
        });}
}

} else {
    message.channel.send("<@"+userid+">, Вы не зарегистрированы в базе испытуемых! Зарегистрируйтесь при помощи команды ;!start");
};
}
module.exports.help = {
    name : "work"
};