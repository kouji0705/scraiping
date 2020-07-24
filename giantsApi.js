const express = require('express'),
  app = express(),
  fs = require('fs'),
  csvSync = require('csv-parse/lib/sync'),
  Pitcher = require('./Pitcher'),
  file = './giants_pitchier.csv';
var data = fs.readFileSync(file),
  res = csvSync(data),
  pitcherarr = [];

//初期化
for (var youso of res) {
  pitcherarr.push(
    new Pitcher(
      youso[0],
      youso[1],
      youso[2],
      youso[3],
      youso[4],
      youso[5],
      youso[6],
      youso[7],
      youso[8],
      youso[9],
      youso[10],
      youso[11],
      youso[12],
      youso[13],
      youso[14],
      youso[15],
      youso[16],
      youso[17],
      youso[18],
      youso[19],
      youso[20],
      youso[21],
      youso[22],
      youso[23],
      youso[24],
      youso[25],
      youso[26],
      youso[27]
    )
  );
}
// console.log(pitcherarr[0].era);

app.get('/', (req, res) => {
  res.render('./index.ejs', {
    title: 'Posted',
    content: pitcherarr[0].era,
  });
});

app.post('/', (req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(`{ "player":${pitcherarr[0].player}  }`);
});

app.listen(3000);
