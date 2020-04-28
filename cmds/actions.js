const Discord = module.require('discord.js');
const fs = require('fs');
module.exports.run = async (bot,message,args,db) => {
    let user = message.author.username;
    let userid = message.author.id;
    if(userData){
    var userData = db.collection("all_json").find({"$oid": "5ea87f777c213e2096461711"}).toArray(err,result => {
        if (err) throw err;
        userData = result[0].users
});
    var groupData = db.collection("all_json").find({"$oid": "5ea880427c213e209646176c"}).toArray(err,result => {
        if (err) throw err;
        groupData = result[0].groups
});;
    if(!args[0] && !args[1]){
    var embed = new Discord.MessageEmbed() 
    .setTitle("Список действий.")
    .addFields({name : "Создать группировку.",value : "Стоимость создания - 50000р. ;!actions 1 <название>", inline : false},
    {name : "Добавить игрока в группировку.",value : ";!actions 2 <пинг игрока(через @)>", inline : false},
    {name : "Удалить игрока из группировки.",value : ";!actions 3 <пинг игрока(через @)>", inline : false},
    {name : "Передать деньги.",value : ";!actions 4 <пинг игрока(через @)> <количество денег>", inline : false});
    message.channel.send(embed);
    }else {
        switch(parseInt(args[0])){
            case 1:
                if(args[1]) {
                    if (groupData[""+args[1]]){
                        message.channel.send("<@"+message.author.id+">, Ошибка. Данное название использовать нельзя.")
                    } else if(userData[userid].money - 50000 >= 0){

                        var counter = 0;
                    for (var key in groupData) {
                        counter++;
                    }
                        groupData[counter+1] = {
                            "name":args[1],"players":[userid],"creator":userid
                        }
                        db.collection("all_json").update({"$oid": "5ea880427c213e209646176c"}, {"groups":groupData}, true);
                    } else{
                        message.channel.send("<@"+message.author.id+">, Ошибка. Не достаточно денег.")
                    }
                } else {
                    message.channel.send("<@"+message.author.id+">, Ошибка. Не хватает аргументов.")
                }
                break;
            case 2:
                if(args[1] && args[1].replace("<@", "").replace(">","").replace("!","") != userid && userData[userid].group != 0 && groupData[userData[userid].groupid].creator == userid) 
                {
                    let affUser = args[1].replace("<@", "").replace(">","").replace("!","")
                    let gid = userData[userid].groupid
    if (groupData[""+gid]){
        groupData[""+gid].players.push(affUser)
        if(groupData[""+userData[affUser].groupid]){
            groupData[""+userData[affUser].groupid].players.splice(groupData[""+userData[affUser].groupid].players.indexOf(affUser),1)
        }
    userData[affUser].groupid = parseInt(gid)
    db.collection("all_json").update({"$oid": "5ea87f777c213e2096461711"}, {"users":userData}, true);
    db.collection("all_json").update({"$oid": "5ea880427c213e209646176c"}, {"groups":groupData}, true);
}
                } else {
                    message.channel.send("<@"+message.author.id+">, Ошибка.")
                }
                break;
            case 3:
                if(args[1] && args[1].replace("<@", "").replace(">","").replace("!","") != userid && userData[userid].group != 0 && groupData[userData[userid].groupid].creator == userid) 
                {
                    console.log("test")
                    let affUser = args[1].replace("<@", "").replace(">","").replace("!","")
                    groupData[""+userData[userid].groupid].players.splice(groupData[""+userData[userid].groupid].players.indexOf(affUser),1)
                    userData[affUser].groupid = 0 
                    db.collection("all_json").update({"$oid": "5ea87f777c213e2096461711"}, {"users":userData}, true);
                    db.collection("all_json").update({"$oid": "5ea880427c213e209646176c"}, {"groups":groupData}, true);
                }else {
                    message.channel.send("<@"+message.author.id+">, Ошибка.")
                }
                break;
            case 4:
                if(args[1] && args[2]){
                    let m = parseInt(args[2])
                    let affUser = args[1].replace("<@", "").replace(">","").replace("!","")
                    if(userData[userid].money - m >= 0){
                    userData[userid].money = userData[userid].money - m
                    userData[affUser].money = userData[affUser].money +m
                    db.collection("all_json").update({"$oid": "5ea87f777c213e2096461711"}, {"users":userData}, true);
                    } else {
                        message.channel.send("<@"+message.author.id+">, Ошибка. Не достаточно денег.")
                    }
                } else {
                    message.channel.send("<@"+message.author.id+">, Ошибка. Не хватает аргументов.")
                }

        }
}
}else{
    message.channel.send("<@"+userid+">, Вы не зарегистрированы в базе испытуемых! Зарегистрируйтесь при помощи команды ;!start");
}}
module.exports.help = {
    name : "actions"
};