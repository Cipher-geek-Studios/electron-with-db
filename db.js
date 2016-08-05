var fs = require('fs');
var sql = require('sql.js');
var bfr = fs.readFileSync('./tmp/test.db');
var db = new sql.Database(bfr);
var text
var clear = "";

function showts() {
    shwtb();
}

function shwtb() {
    var dts = db.exec('SELECT * FROM data');
    if (dts.length > 0) {
        var lenth = dts[0].values.length;
        text = "<ul class='list-group'>";
        for (i=0; i<lenth; i++){
            var dbrow = dts[0].values[i];
            var spltarr = String(dbrow).split(',');
            text += "<li class='list-group-item'><input type='checkbox' value = '"+ spltarr[0] +"'/>" + spltarr[1] + "</li>";
        }
        text += "</ul>";
        document.getElementById("list").innerHTML = text;
    }
    else {
        alert("No data to display")
    }
}

function insdb() {
    var txtb = document.getElementById('textss').value;
    db.run("INSERT INTO data (state) VALUES ('" + txtb +"')");
    var data = db.export();
    var buffer = new Buffer(data);
    fs.writeFileSync('./tmp/test.db', buffer);
    shwtb();
}
// Create the table with command.
// function cretb() {
//     db.exec('CREATE TABLE data(state char[50]);');
//     var data = db.export();
//     var buffer = new Buffer(data);
//     fs.writeFileSync('./tmp/test.db', buffer);
//     alert("Table Created")
// }

function deltb() {
    db.exec('DELETE FROM data',[]);
    var data = db.export();
    var buffer = new Buffer(data);
    fs.writeFileSync('./tmp/test.db', buffer);
    alert("All Cleared")
    document.getElementById("list").innerHTML = clear;
}
