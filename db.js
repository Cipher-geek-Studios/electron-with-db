var fs = require('fs');
var sql = require('sql.js');
var bfr = fs.readFileSync('./db/test.db');
var db = new sql.Database(bfr);
window.$ = window.jQuery = require('jquery');
var text
var clear = "";

function showts() {
    shwtb();
}
$('body').on('click', '.badge', function() {
    var conf = confirm("Are you sure wanted to delete this item from the list");
    if (conf){
        var id = this.id;
        db.exec("DELETE FROM data WHERE id='"+ id +"'");
        var data = db.export();
        var buffer = new Buffer(data);
        fs.writeFileSync('./db/test.db', buffer);
        alert('Item Deleted');
        shwtb();
    }
});
function shwtb() {
    var dts = db.exec('SELECT * FROM data');
    if (dts.length > 0) {
        var lenth = dts[0].values.length;
        text = "<ul class='list-group'>";
        for (i=0; i<lenth; i++){
            var dbrow = dts[0].values[i];
            var spltarr = String(dbrow).split(',');
            text += "<li class='list-group-item'><span class='badge' id = '"+ spltarr[0] +"'>"+ 'Delete &#9864;' +"</span><input id='checklist' type='checkbox' value = '"+ spltarr[0] +"'/>" + "&nbsp&nbsp&nbsp"+ spltarr[1] + "</li>";
        }
        text += "</ul>";
        document.getElementById("list").innerHTML = text;
    }
    else {
        document.getElementById("list").innerHTML = clear;
    }
}

function insdb() {
    var txtb = document.getElementById('textss').value;
    db.run("INSERT INTO data (state) VALUES ('" + txtb +"')");
    var data = db.export();
    var buffer = new Buffer(data);
    fs.writeFileSync('./db/test.db', buffer);
    document.getElementById('textss').value = null;
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
    var conf = confirm("Are you sure wanted to delete all items from the tabel");
    if (conf){
        db.exec('DELETE FROM data',[]);
        var data = db.export();
        var buffer = new Buffer(data);
        fs.writeFileSync('./db/test.db', buffer);
        alert("All Cleared")
        document.getElementById("list").innerHTML = clear;
    }
}

function delitem() {
    var checkedValues = $('input[id="checklist"]:checked').map(function() {
        return this.value;
    }).get();
    if (checkedValues.length > 0) {
        var checvaspl = String(checkedValues).split(',');
        var conf = confirm("Are you sure wanted to delete "+checkedValues.length+" items from the list");
        if (conf){
            for (j=0; j<checvaspl.length; j++){
                db.exec("DELETE FROM data WHERE id='"+ checvaspl[j] +"'");
                var data = db.export();
                var buffer = new Buffer(data);
                fs.writeFileSync('./db/test.db', buffer);
            }
        shwtb();
        }
    }
    else {
        alert("Check the items to delete from the list");
    }
}
