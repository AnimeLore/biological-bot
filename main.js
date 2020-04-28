const Discord = require('discord.js');
const c = new Discord.Client();
var Config = require("./cfg.json");
const MongoClient = require('mongodb').MongoClient;
var dbClient = new MongoClient("mongodb://heroku_wckj39c7:heroku_wckj39c7@ds163016.mlab.com:63016/", { useNewUrlParser: true })
c.commands = new Discord.Collection;
const fs = require('fs');
var i = 0;
function random(min, max){
    min = min+1
    return Math.floor(Math.random() * (max - min)) + min;
}
var token = process.env.TOKEN;
var prefix = Config.prefix;
dbClient.connect((err,client) => {
    if(err) throw err;
    const db = client.db("heroku_wckj39c7")
var timer_work = c.setInterval(function () {    
    var userData = db.collection("all_json").find({"$oid": "5ea87f777c213e2096461711"}).toArray((err,result) => {
        if (err) throw err;
        userData = result[0].users
    });
    var workData = db.collection("all_json").find({"$oid": "5ea87faa7c213e2096461716"}).toArray((err,result) => {
        if (err) throw err;
        workData = result[0].workers
    });;
    //var message = new Discord.Message(c,"TextChannel")
    for(key in workData){
        workData[key]["timer"] = workData[key]["timer"] - 60
        var userid = key
        if( workData[key]["timer"] == 0){ 
            switch(workData[key].id){
                case 1:
                    var anomaly_type = random(0, 6)
                    var anomaly_many = random(0,5)
                    var anomaly_art = db.collection("all_json").find({"$oid": "5ea87fd37c213e209646171b"}).toArray((err,result) => {
                        if (err) throw err;
                        anomaly_art = result[0].artefacts
                    });;
                    var art_arr = ""
                    var cost = 0
                    var counter = 0;
                    for (var key in anomaly_art[""+anomaly_type]) {
                        counter++;
                    }
                    for(i = 1; i<=anomaly_many;i++){
                        curart = random(0,counter)
                        art_arr = art_arr + "```"+anomaly_art[""+anomaly_type][""+curart].name + "``` "
                        cost = cost + anomaly_art[""+anomaly_type][""+curart].cost
                    }
                    art_arr.replace(/\s$/,'')
                    var thing_id = random(0,10)
                    var thing_obj = {
                        health : 0,
                        bio : 0,
                        resist : 0,
                        money : 0
                    }
                    var thing = ""
                    switch(thing_id){
                        case 1:
                            thing_obj.health = random(0,51)*-1
                            thing = "По дороге на Вас напали мутанты и Вы смогли от них отбиться. Однако, один из них смог поранить вас, и снял вам "+thing_obj.health+" здоровья."
                            break;
                        case 2:
                            thing_obj.bio = random(0,6)*-1
                            thing = "По дороге Вы попали в зону высокого био. заражения, и повысили урон от био. заражения на "+thing_obj.bio
                            break;
                        case 3:
                            thing_obj.money = random(0,userData[userid].money)*-1
                            thing = "По дороге Вас остановили мародеры и забрали " + thing_obj.money + " рублей."
                            break;
                        case 4:
                            thing_obj.health = random(0,60)
                            thing = "Возле базы Вы заметили труп и осмотрев его нашли АИ-1. Использовав ее, Вы повысили уровень своего здоровья на "+thing_obj.health
                            break;
                        case 5:
                            thing_obj.resist = random(0,10)
                            thing = "Возле базы Вы заметили труп и осмотрев его нашли странный био. протектор. Использовав его, Вы повысили уровень сопротивления био. заражению на "+thing_obj.resist
                            break;
                        case 6:
                            thing = "-"
                            break;
                        case 7:
                            thing = "-"
                            break;
                        case 8:
                            thing = "-"
                            break;
                        case 9:
                            thing = "-"
                            break;
                        case 10:
                            thing = "-"
                            break;
                    };
                    var embed = new Discord.MessageEmbed() 
                    .setTitle("Отчет об работе. Работа - Аномальное поле.")
                    .addFields({name : "Тип обнаруженной аномалии:",value : anomaly_art[""+anomaly_type]["0"], inline : false},
                    {name : "Обнаруженные артефакты:",value : art_arr, inline : false},
                    {name : "Полученные деньги (10% от всей суммы)",value : cost*0.1, inline : false},
                    {name : "Необычное происшествие по дороге:",value : thing, inline : false});
                    var channel = c.channels.cache.get('703580927141478450');
                    channel.send("<@"+userid+">")
                    channel.send(embed);
                    userData[userid].money = userData[userid].money+cost*0.1;
                    if(userData[userid].damage + thing_obj.bio >= 0) {
                        userData[userid].damage = userData[userid].damage + thing_obj.bio
                    } else {
                        userData[userid].damage = 0
                    };
                    if(userData[userid].resistance + thing_obj.resist >= 0){
                    userData[userid].resistance = userData[userid].resistance + thing_obj.resist
                    } else {
                        userData[userid].resistance = 0
                    };
                    if(userData[userid].money + thing_obj.money >= 0){
                        userData[userid].money = userData[userid].money + thing_obj.money
                        } else {
                            userData[userid].money = 0
                        };
                    if(userData[userid].health + thing_obj.health >= 11) {
                        userData[userid].health = userData[userid].health + thing_obj.health
                    } else {
                        channel.send("<@"+userid+">, Мы вывезли вас из опасной зоны, для того чтобы снова начать участие - напишите ;!start .");
                        delete userData[userid]
                    }
                    break;
                case 2:
                    var thing_id = random(0,10)
                    var thing_obj = {
                        health : 0,
                        bio : 0,
                        resist : 0,
                        money : 1200
                    }
                    var thing = ""
                    switch(thing_id){
                        case 1:
                            thing_obj.health = thing_obj.health + random(0,51)*-1
                            thing = "По дороге на Вас напали мутанты и Вы смогли от них отбиться. Однако, один из них смог поранить вас, и снял вам "+thing_obj.health+" здоровья."
                            break;
                        case 2:
                            thing_obj.bio = thing_obj.bio + random(0,6)
                            thing = "По дороге Вы попали в зону высокого био. заражения, и повысили урон от био. заражения на "+thing_obj.bio
                            break;
                        case 3:
                            thing_obj.money = thing_obj.money + random(0,userData[userid].money)*-1
                            thing = "По дороге Вас остановили мародеры и забрали " + thing_obj.money + " рублей."
                            break;
                        case 4:
                            thing_obj.health = thing_obj.health + random(0,60)
                            thing = "Возле базы Вы заметили труп и осмотрев его нашли АИ-1. Использовав ее, Вы повысили уровень своего здоровья на "+thing_obj.health
                            break;
                        case 5:
                            thing_obj.resist = thing_obj.resist + random(0,10)
                            thing = "Возле базы Вы заметили труп и осмотрев его нашли странный био. протектор. Использовав его, Вы повысили уровень сопротивления био. заражению на "+thing_obj.resist
                            break;
                        case 6:
                            thing_obj.health = thing_obj.health + random(0,60)*-1
                            thing = "По дороге Вы попали в трамплин, но смогли приземлиться в кусты. По итогу Вашего трюка Вы потеряли " +thing_obj.health + " очков здоровья."
                            break;
                        case 7:
                            thing = "-"
                            break;
                        case 8:
                            thing = "-"
                            break;
                        case 9:
                            thing = "-"
                            break;
                        case 10:
                            thing = "-"
                            break;
                    };
                    var embed = new Discord.MessageEmbed() 
                    .setTitle("Отчет об работе. Работа - Сталкерские тропы.")
                    .addFields({name : "Статус проверки троп:",value : "```Проверенно```", inline : false},
                    {name : "Полученные деньги:",value : 1200, inline : false},
                    {name : "Необычное происшествие по дороге:",value : thing, inline : false});
                    var channel = c.channels.cache.get('703580927141478450');
                    channel.send("<@"+userid+">")
                    channel.send(embed);
                    if(userData[userid].damage + thing_obj.bio >= 0) {
                        userData[userid].damage = userData[userid].damage + thing_obj.bio
                    } else {
                        userData[userid].damage = 0
                    };
                    if(userData[userid].resistance + thing_obj.resist >= 0){
                    userData[userid].resistance = userData[userid].resistance + thing_obj.resist
                    } else {
                        userData[userid].resistance = 0
                    };
                    if(userData[userid].money + thing_obj.money >= 0){
                        userData[userid].money = userData[userid].money + thing_obj.money
                        } else {
                            userData[userid].money = 0
                        };
                    if(userData[userid].health + thing_obj.health >= 11) {
                        userData[userid].health = userData[userid].health + thing_obj.health
                    } else {
                        channel.send("<@"+userid+">, Мы вывезли вас из опасной зоны, для того чтобы снова начать участие - напишите ;!start .");
                        delete userData[userid]
                    }
                    break;
                case 3:
                    var thing_id = random(0,10)
                    var thing_obj = {
                        health : 0,
                        bio : 0,
                        resist : 0,
                        money : 500
                    }
                    var thing = ""
                    switch(thing_id){
                        case 1:
                            thing_obj.health = thing_obj.health + random(0,51)*-1
                            thing = "По дороге на Вас напали мутанты и Вы смогли от них отбиться. Однако, один из них смог поранить вас, и снял вам "+thing_obj.health+" здоровья."
                            break;
                        case 2:
                            thing_obj.bio = thing_obj.bio + random(0,6)
                            thing = "По дороге Вы попали в зону высокого био. заражения, и повысили урон от био. заражения на "+thing_obj.bio
                            break;
                        case 3:
                            thing_obj.money = thing_obj.money + random(0,userData[userid].money)*-1
                            thing = "По дороге Вас остановили мародеры и забрали " + thing_obj.money + " рублей."
                            break;
                        case 4:
                            thing_obj.health = thing_obj.health + random(0,60)
                            thing = "Возле базы Вы заметили труп и осмотрев его нашли АИ-1. Использовав ее, Вы повысили уровень своего здоровья на "+thing_obj.health
                            break;
                        case 5:
                            thing_obj.resist = thing_obj.resist + random(0,10)
                            thing = "Возле базы Вы заметили труп и осмотрев его нашли странный био. протектор. Использовав его, Вы повысили уровень сопротивления био. заражению на "+thing_obj.resist
                            break;
                        case 6:
                            thing_obj.health = thing_obj.health + random(0,60)*-1
                            thing = "По дороге Вы попали в трамплин, но смогли приземлиться в кусты. По итогу Вашего трюка Вы потеряли " +thing_obj.health + " очков здоровья."
                            break;
                        case 7:
                            thing = "-"
                            break;
                        case 8:
                            thing = "-"
                            break;
                        case 9:
                            thing = "-"
                            break;
                        case 10:
                            thing = "-"
                            break;
                    };
                    var embed = new Discord.MessageEmbed() 
                    .setTitle("Отчет об работе. Работа - Установка сканеров.")
                    .addFields({name : "Статус установки сканеров:",value : "```Установлены```", inline : false},
                    {name : "Полученные деньги:",value : 500, inline : false},
                    {name : "Необычное происшествие по дороге:",value : thing, inline : false});
                    var channel = c.channels.cache.get('703580927141478450');
                    channel.send("<@"+userid+">")
                    channel.send(embed);
                    if(userData[userid].damage + thing_obj.bio >= 0) {
                        userData[userid].damage = userData[userid].damage + thing_obj.bio
                    } else {
                        userData[userid].damage = 0
                    };
                    if(userData[userid].resistance + thing_obj.resist >= 0){
                    userData[userid].resistance = userData[userid].resistance + thing_obj.resist
                    } else {
                        userData[userid].resistance = 0
                    };
                    if(userData[userid].money + thing_obj.money >= 0){
                        userData[userid].money = userData[userid].money + thing_obj.money
                        } else {
                            userData[userid].money = 0
                        };
                    if(userData[userid].health + thing_obj.health >= 11) {
                        userData[userid].health = userData[userid].health + thing_obj.health
                    } else {
                        channel.send("<@"+userid+">, Мы вывезли вас из опасной зоны, для того чтобы снова начать участие - напишите ;!start .");
                        delete userData[userid]
                    }
                    break;
                case 4:
                    var thing_id = random(0,10)
                    var thing_obj = {
                        health : 0,
                        bio : 0,
                        resist : 0,
                        money : 1000
                    }
                    var thing = ""
                    switch(thing_id){
                        case 1:
                            thing_obj.health = thing_obj.health + random(0,51)*-1
                            thing = "По дороге на Вас напали мутанты и Вы смогли от них отбиться. Однако, один из них смог поранить вас, и снял вам "+thing_obj.health+" здоровья."
                            break;
                        case 2:
                            thing_obj.bio = thing_obj.bio + random(0,6)
                            thing = "По дороге Вы попали в зону высокого био. заражения, и повысили урон от био. заражения на "+thing_obj.bio
                            break;
                        case 3:
                            thing_obj.money = thing_obj.money + random(0,userData[userid].money)*-1
                            thing = "По дороге Вас остановили мародеры и забрали " + thing_obj.money + " рублей."
                            break;
                        case 4:
                            thing_obj.health = thing_obj.health + random(0,60)
                            thing = "Возле базы Вы заметили труп и осмотрев его нашли АИ-1. Использовав ее, Вы повысили уровень своего здоровья на "+thing_obj.health
                            break;
                        case 5:
                            thing_obj.resist = thing_obj.resist + random(0,10)
                            thing = "Возле базы Вы заметили труп и осмотрев его нашли странный био. протектор. Использовав его, Вы повысили уровень сопротивления био. заражению на "+thing_obj.resist
                            break;
                        case 6:
                            thing_obj.health = thing_obj.health + random(0,60)*-1
                            thing = "По дороге Вы попали в трамплин, но смогли приземлиться в кусты. По итогу Вашего трюка Вы потеряли " +thing_obj.health + " очков здоровья."
                            break;
                        case 7:
                            thing = "-"
                            break;
                        case 8:
                            thing = "-"
                            break;
                        case 9:
                            thing = "-"
                            break;
                        case 10:
                            thing = "-"
                            break;
                    };
                    var embed = new Discord.MessageEmbed() 
                    .setTitle("Отчет об работе. Работа - Ручные замеры.")
                    .addFields({name : "Статус проведения ручных замеров:",value : "```Выполнено```", inline : false},
                    {name : "Полученные деньги:",value : 1000, inline : false},
                    {name : "Необычное происшествие по дороге:",value : thing, inline : false});
                    var channel = c.channels.cache.get('703580927141478450');
                    channel.send("<@"+userid+">")
                    channel.send(embed);
                    if(userData[userid].damage + thing_obj.bio >= 0) {
                        userData[userid].damage = userData[userid].damage + thing_obj.bio
                    } else {
                        userData[userid].damage = 0
                    };
                    if(userData[userid].resistance + thing_obj.resist >= 0){
                    userData[userid].resistance = userData[userid].resistance + thing_obj.resist
                    } else {
                        userData[userid].resistance = 0
                    };
                    if(userData[userid].money + thing_obj.money >= 0){
                        userData[userid].money = userData[userid].money + thing_obj.money
                        } else {
                            userData[userid].money = 0
                        };
                    if(userData[userid].health + thing_obj.health >= 11) {
                        userData[userid].health = userData[userid].health + thing_obj.health
                    } else {
                        channel.send("<@"+userid+">, Мы вывезли вас из опасной зоны, для того чтобы снова начать участие - напишите ;!start .");
                        delete userData[userid]
                    }
                    break;
            }
            delete workData[userid]
        }

    db.collection("all_json").update({"$oid": "5ea87f777c213e2096461711"}, {"users":userData}, true);
    db.collection("all_json").update({"$oid": "5ea87faa7c213e2096461716"}, {"workers":workData}, true);
}
},60000);
var timer = c.setInterval(function () {   
    var userData = db.collection("all_json").find({"$oid": "5ea87f777c213e2096461711"}).toArray((err,result) => {
        if (err) throw err;
        userData = result[0].users
});
    //var message = new Discord.Message(c,"TextChannel")
    for(key in userData){
        userData[key]["timer"] = userData[key]["timer"] - 60
        if (userData[key]["timer"] === 0)
        { 
            if(userData[key]["resistance"] !== 0) { 
                userData[key]["health"] = userData[key]["health"] - (userData[key]["damage"] - (userData[key]["damage"] * (userData[key]["resistance"]/100)))
            } else {
                userData[key]["health"] = userData[key]["health"] - userData[key]["damage"]
            }
            if(userData[key]["health"] <= 10){
                const channel = c.channels.cache.get('703580927141478450');
                channel.send("<@"+key+">, Мы вывезли вас из опасной зоны, для того чтобы снова начать участие - напишите ;!start .");
               // c.guilds.get('703582411656658944').channels.get("703580927141478450").send("<@"+key+">, Мы вывезли вас из опасной зоны, для того чтобы снова начать участие - напишите ;!start .")
               delete userData[key]
            } else {
                userData[key]["timer"] = 3600
            }
        } 
        db.collection("all_json").update({"$oid": "5ea87f777c213e2096461711"}, {"users":userData}, true);
    }
},60000)//время
c.on('ready', () => {
  console.log(`Бот запущен как ${c.user.tag}!`);
});
fs.readdir('./cmds/',(err,files)=>{
    if(err) console.log(err);
    var jsfiles = files.filter(f=>f.split(".").pop() === "js");
    if(jsfiles.length <= 0) console.log("net comand suchara");
    console.log('nashel '+jsfiles.length+", suchara");
    jsfiles.forEach((f,i)=>{
        var props = require("./cmds/"+f);
        c.commands.set(props.help.name,props)
    })
})
c.on('message', async message => {
    var mText = message.content
    var user = message.author.username;
    var userid = message.author.id;
    var mArray = mText.split(" ")
    var comm = mArray[0].toLowerCase()
    var args = mArray.slice(1);
    if(!mText.startsWith(prefix)) return;
    var cmd = c.commands.get(comm.slice(prefix.length))
    args = args.filter(element => element !== "")
    if(cmd) cmd.run(c,message,args,db);
});

})
c.login(token);

