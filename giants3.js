const puppeteer = require('puppeteer');
const fs = require('fs');
const URL = 'https://baseball.yahoo.co.jp/npb/teams/1/memberlist?kind=p'; // 製品一覧(iPad)
const DEBUG = 1; // デバッグログなし
var data_arr =[];

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
  var header = Header.replace(regExp, '').split('\t');
  console.log(header);
  //TBL_DATA取得
  const bbscore = await picherScorePage.evaluate(
    () => document.querySelector('table > tbody ').innerText
  );
  var datas = bbscore.split('\n');
  console.log('datas:'+datas);
  for (var data of datas) {
    data_arr.push(data.split('\t'));
    console.log(data)
  }

  for(var data of datas){
      for(var num in header){
        console.log(header[num]+':'+data_arr[num]);
      }
  }

  if (DEBUG) console.log('[Debug] 投手の戦績ページを閉じる');
  await picherScorePage.close();
  await browser.close();
  console.log('[Info] ■■■ 投手成績を取得 End ■■■');
})();

var formatter = () => {};
