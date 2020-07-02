const mysql = require("sync-mysql");
const connection = new mysql({
  host: "q7cxv1zwcdlw7699.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
  user: "ank5d1vagrtoctau",
  database: "itk2pws4wklje8ao",
  password: "p073xlnvhojp6y2k",
  port : "3306"
});
function getUserData(){
  let results = connection.query(`SELECT * FROM users`)
  let userData = {}
  for(let i = 0; i < results.length; i++){
    let results2 = JSON.stringify(results[i])
    eval("results2 =" + results2)
    userData[results2.userid] = {
              health : results2.health,
              damage : results2.damage,
              resistance : results2.resistance,
              money : results2.money,
              medkitused : results2.medkitused,
              donate : results2.donate,
              timer : results2.timer,
              groupid : results2.groupid
          }
      console.log(userData)
      }
      return userData
};
let userid = "282799894585147392"
console.log(connection.query(`SELECT * FROM users`))
function saveUserData(userData){
for (key in userData){
  connection.query('REPLACE INTO users SET health = '+userData[key].health+', damage = '+userData[key].damage+', resistance = '+userData[key].resistance+', money = '+userData[key].money+', medkitused = '+userData[key].medkitused+', donate = '+userData[key].donate+', timer = '+userData[key].timer+', groupid = '+userData[key].groupid+', userid = '+key);
}};

