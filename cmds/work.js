const Discord = module.require('discord.js');
const fs = require('fs');
module.exports.run = async (bot,message,args, db) => {
    let user = message.author.username;
    let userid = message.author.id;
    if(userData[userid]){
    var buyData = db.collection("all_json").find({"$oid": "5ea87ff37c213e209646171e"}).toArray((err,result) => {
        if (err) throw err;
        buyData = result[0].buy
});;
    var userData = db.collection("all_json").find({"$oid": "5ea87f777c213e2096461711"}).toArray((err,result) => {
        if (err) throw err;
        userData = result[0].users
});
    var workData = db.collection("all_json").find({"$oid": "5ea87faa7c213e2096461716"}).toArray((err,result) => {
        if (err) throw err;
        workData = result[0].workers
});;
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
    db.collection("all_json").update({"$oid": "5ea87faa7c213e2096461716"}, {"workers":workData}, true);
}

} else {
    message.channel.send("<@"+userid+">, Вы не зарегистрированы в базе испытуемых! Зарегистрируйтесь при помощи команды ;!start");
};
}
module.exports.help = {
    name : "work"
};