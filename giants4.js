const puppeteer = require('puppeteer');
const fs = require('fs');
const URL = 'https://baseball.yahoo.co.jp/npb/teams/1/memberlist?kind=p'; // 製品一覧(iPad)
const DEBUG = 1; // デバッグログなし
var header; //投手のヘッダー
var data_arr = []; //投手の成績

//mainロジック
(async () => {
  console.log('[Info]投手の戦績のスクレイピング開始');

  if (DEBUG) console.log('[Debug] Chromium起動');
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
  });
  console.log(`[Info] 投手の戦績ページに遷移：${URL}`);
  const picherScorePage = await browser.newPage();
  await picherScorePage.goto(URL);
  //Header作成
  if (DEBUG) console.log('[Debug] 1.5秒待機');
  var Header = await picherScorePage.evaluate(
    () => document.querySelector('table > thead ').innerText
  );
  var regExp = new RegExp('\n', 'g');
  header = Header.replace(regExp, '').split('\t');
  //TBL_DATA取得
  const bbscore = await picherScorePage.evaluate(
    () => document.querySelector('table > tbody ').innerText
  );
  var datas = bbscore.split('\n');
  for (var data of datas) {
    data = data.split('\t');
    data_arr.push(data);
    console.log(data);
  }

  if (DEBUG) console.log('[Debug] 投手の戦績ページを閉じる');
  await picherScorePage.close();
  await browser.close();
  console.log('[Info] ■■■ 投手成績を取得 End ■■■');
  console.log(data_arr[0]); //csvファイルを作成
  fs.writeFileSync('./giants_pitchier.csv', header, (err) => {
    if (err) {
      console.log(err);
    }
  });
  fs.appendFileSync('./giants_pitchier.csv', '\n', (err) => {
    if (err) {
      console.log(err);
    }
  });
  
  fs.appendFileSync('./giants_pitchier.txt', '\n', (err) => {
    if (err) {
      console.log(err);
    }
  });

//   for (var records of data_arr) {
//       console.log(records);
//     fs.appendFile('./giants_pitchier.csv', records, (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   }
})();
