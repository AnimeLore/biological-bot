const Discord = module.require('discord.js');
const fs = require('fs');
module.exports.run = async (bot,message,args,connection) => {
    let user = message.author.username;
    let userid = message.author.id;
    if(userData[userid]){
    var buyData = require("./cmds/buy.json")
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
    if(!args[0] && !args[1]){
        var embed = new Discord.MessageEmbed() 
        .setTitle("Внешняя база ученых. Магазин.")
        .addFields({name : "Препараты, для увеличения здоровья.",value : ";!store 1", inline : false},
        {name : "Препараты, для уменьшения био. заражения.",value : ";!store 2", inline : false},
        {name : "Препараты, для увеличения сопротивления био. заражению.",value : ";!store 3", inline : false},
        {name : "Карманные аптечки.",value : ";!store 4", inline : false});
        message.channel.send(embed);
    }else if(args[0] && !args[1]){
        switch(parseInt(args[0])){
            case 1:
                var embed = new Discord.MessageEmbed() 
                .setTitle("Внешняя база ученых. Магазин.")
                .addFields({name : "Бинт 150р.",value : "Увеличивает здоровье на 1 единицу. ;!store 1 1", inline : false},
                {name : "Антисептик 300р.",value : "Увеличивает здоровье на 3 единицы, сопротивление на 0.1. ;!store 1 2", inline : false},
                {name : "Крем-гель 'Укрепляющий Mk. I' 500р.",value : "Увеличивает здоровье на 5 единиц, урон био. заражения на 0.5. ;!store 1 3", inline : false},
                {name : "Инъекция 'D-P1' 1200р.",value : "Увеличивает здоровье на 18 единиц, урон био. заражения на 2. ;!store 1 4", inline : false},
                {name : "Инъекция 'D-P2' 2450р.",value : "Увеличивает здоровье на 38 единиц, урон био. заражения на 4. ;!store 1 5", inline : false},
                {name : "Инъекция 'D-B1' 120р.",value : "Увеличивает здоровье на 2 единиц, урон био. заражения на 1. ;!store 1 6", inline : false},
                {name : "Таблетки 'Clear' 5600р.",value : "Увеличивает здоровье на 16 единиц, сопротивление на 2. ;!store 1 7", inline : false},
                {name : "Таблетки 'FastReborn' 560р.",value : "Увеличивает здоровье на 6 единиц, урон био. заражения на 2. ;!store 1 8", inline : false},
                {name : "Морфий. 15600р.",value : "Увеличивает здоровье на 56 единиц. ;!store 1 9", inline : false},);
                message.channel.send(embed);
                break;
            case 2:
                var embed = new Discord.MessageEmbed() 
                .setTitle("Внешняя база ученых. Магазин.")
                .addFields({name : "Специальный фильтр 750р.",value : "Снижает урон био. заражения на 0.5, здоровье на 2. ;!store 2 1", inline : false},
                {name : "Препарат 'B-S1' 4000р.",value : "Снижает урон био. заражения на 2, здоровье на 6. ;!store 2 2", inline : false},
                {name : "Дезинфекция 7000р.",value : "Снижает урон био. заражения на 3, здоровье на 1. ;!store 2 3", inline : false},
                {name : "Инъекция 'D-B-F1' 11000р.",value : "Снижает урон био. заражения на 5, здоровье на 10. ;!store 2 4", inline : false},
                {name : "Инъекция 'D-B-N1' 22300р.",value : "Снижает урон био. заражения на 8, здоровье на 15. ;!store 2 5", inline : false},
                {name : "Неизвестный препарат 120р.",value : "НЕИЗВЕСТНО. ;!store 2 6", inline : false},
                {name : "Таблетки 'UnBi' 43000р.",value : "Снижает урон био. заражения на 15, здоровье на 25. ;!store 2 7", inline : false},
                {name : "Препарат 'FD-R' 5600р.",value : "Снижает урон био. заражения на 18, здоровье на 70. ;!store 2 8", inline : false},
                {name : "Антидот. 256000р.",value : "Снижает урон био. заражения на 50. ;!store 2 9", inline : false},);
                message.channel.send(embed);
                break;
           case 3:
                var embed = new Discord.MessageEmbed() 
                .setTitle("Внешняя база ученых. Магазин.")
                .addFields({name : "Подкладки в одежду 1600р.",value : "Увеличивает сопротивление био. заражению на 1. ;!store 3 1", inline : false},
                {name : "Препарат 'X' 25000р.",value : "Увеличивает сопротивление био. заражению на 5. ;!store 3 2", inline : false},
                {name : "Био. протектор 1 класса. 65000р.",value : "Увеличивает сопротивление био. заражению на 10. ;!store 3 3", inline : false},
                {name : "Био. протектор 5 класса. 150000р.",value : "Увеличивает сопротивление био. заражению на 25. ;!store 3 4", inline : false},);
                message.channel.send(embed);
                break;
            case 4:
                var embed = new Discord.MessageEmbed() 
                .setTitle("Внешняя база ученых. Магазин.")
                .addFields({name : "АИ-Б-1. 15000р.",value : "Увеличивает сопротивление био. заражению на 3, здоровье на 15, уменьшает био. заражение на 1. ;!store 4 1", inline : false},
                {name : "АН-Б-1. 65000р.",value : "Увеличивает сопротивление био. заражению на 10, здоровье на 25, уменьшает био. заражение на 3. ;!store 4 2", inline : false},);
                message.channel.send(embed);
                break;
            default:
                message.channel.send("<@"+message.author.id+">, раздел не найден.")
        }
    }else if (args[0] && args[1]){
        if(parseInt(args[0]) > 0 && parseInt(args[0]) < 5 ){
            if(buyData[""+args[0]][""+args[1]]) {
                if(userData[userid].money - buyData[""+args[0]][""+args[1]].cost >= 0){
                buyD = buyData[""+args[0]][""+args[1]]
                userData[userid].money = userData[userid].money - buyData[""+args[0]][""+args[1]].cost
                if(userData[userid].damage + buyD.bio >= 0) {
                    userData[userid].damage = userData[userid].damage + buyD.bio
                } else {
                    userData[userid].damage = 0
                }
                if(userData[userid].resistance + buyD.resist >= 0){
                userData[userid].resistance = userData[userid].resistance + buyD.resist
                } else {
                    userData[userid].resistance = 0
                }
                if(args[0] == 4){
                    userData[userid].medkitused = userData[userid].medkitused + 1
                }
                if(userData[userid].health + buyD.health >= 11) {
                    userData[userid].health = userData[userid].health + buyD.health
                } else {
                    message.channel.send("<@"+userid+">, Мы вывезли вас из опасной зоны, для того чтобы снова начать участие - напишите ;!start .");
                    delete userData[userid]
                }
                message.channel.send("<@"+message.author.id+">, покупка прошла успешно.")

                if(args[1] == "9" && args[0] == "2"){
                    let member = message.guild.member(message.author)
                    try{
                    member.roles.add('703582619970830348')
                    }catch(err){
                        message.channel.send("<@"+userid+">, Выдача роли 'Под антидотом.' идет только на официальном сервере.")
                        if(err) console.log(err);
                    }
                }
                if(args[1] == "9" && args[0] == "1"){
                    let member = message.guild.member(message.author)
                    try{
                    member.roles.add('703583114085269525')
                    }catch(err){
                        message.channel.send("<@"+userid+">, Выдача роли 'Под морфием.' идет только на официальном сервере.")
                        if(err) console.log(err);
                    }
                }
                for (key in userData){
                    connection.query('REPLACE INTO users SET health = '+userData[key].health+', damage = '+userData[key].damage+', resistance = '+userData[key].resistance+', money = '+userData[key].money+', medkitused = '+userData[key].medkitused+', donate = '+userData[key].donate+', timer = '+userData[key].timer+', groupid = '+userData[key].groupid+', userid = '+key, function(err, results) {
                        if(err) console.log(err);
                        console.log(results);
                    });
            }
                        } else {
                message.channel.send("<@"+message.author.id+">, Не хватает денег.")
            }
            } else {
                message.channel.send("<@"+message.author.id+">, Товар не найден.")
            }
        }
    }
}else {
    message.channel.send("<@"+userid+">, Вы не зарегистрированы в базе испытуемых! Зарегистрируйтесь при помощи команды ;!start");
}};
module.exports.help = {
    name : "store"
};