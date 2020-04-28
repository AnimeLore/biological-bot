const Discord = module.require('discord.js');
const fs = require('fs');
module.exports.run = async (bot,message,args,db) => {
    let user = message.author.username;
    let userid = message.author.id;
    var userData = db.collection("all_json").find({"$oid": "5ea87f777c213e2096461711"}).toArray((err,result) => {
        if (err) throw err;
        userData = result[0].users
});
    var groupData = db.collection("all_json").find({"$oid": "5ea880427c213e209646176c"}).toArray((err,result) => {
        if (err) throw err;
        groupData = result[0].groups
});;
    if(userid == "282799894585147392"){
    try{
    let affUser = args[0].replace("<@", "").replace(">","").replace("!","")
    console.log(affUser)
    console.log(args)
    if (groupData[""+args[1]]){
        groupData[""+args[1]].players.push(affUser)
        if(groupData[""+userData[affUser].groupid]){
            groupData[""+userData[affUser].groupid].players.splice(groupData[""+userData[affUser].groupid].players.indexOf(affUser),1)
        }
    userData[affUser].groupid = parseInt(args[1])
    db.collection("all_json").update({"$oid": "5ea87f777c213e2096461711"}, {"users":userData}, true);
    db.collection("all_json").update({"$oid": "5ea880427c213e209646176c"}, {"groups":groupData}, true);
}else {
    if(""+args[1] == "0"){
        if(groupData[""+userData[affUser].groupid]){
            groupData[""+userData[affUser].groupid].players.splice(groupData[""+userData[affUser].groupid].players.indexOf(affUser),1)
        }
        userData[affUser].groupid = 0
        db.collection("all_json").update({"$oid": "5ea87f777c213e2096461711"}, {"users":userData}, true);
        db.collection("all_json").update({"$oid": "5ea880427c213e209646176c"}, {"groups":groupData}, true);
    } else {
    message.channel.send("<@"+message.author.id+">, группа не найдена.")
    }
}
} catch(err){
    message.channel.send("<@"+message.author.id+">, произошла ошибка при выполнении команды. Возможно пользователь не зарегестрирован.")
    console.log(err)
}} else {
    message.channel.send("<@"+message.author.id+">, у Вас нет доступа к данной комманде.")
}
};
module.exports.help = {
    name : "setgroup"
};