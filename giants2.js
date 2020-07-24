const puppeteer = require('puppeteer');
const fs = require('fs');
const URL = 'https://baseball.yahoo.co.jp/npb/teams/1/memberlist?kind=p'; // 製品一覧(iPad)
const DEBUG = 1; // デバッグログなし

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
  if (DEBUG) console.log('[Debug] 1.5秒待機');

  // bbscore
  const bbscore = await picherScorePage.evaluate(
    () => document.querySelector('table > tbody ').innerText
  );
  if (DEBUG) console.log('[Debug] 投手の戦績ページを閉じる');
  await picherScorePage.close();
  console.log(bbscore);
  fs.writeFileSync('./giants_pitchier.txt',bbscore, (err) => {
    if (err) {
      console.log(err);
    }
  });
  await browser.close();
  console.log('[Info] ■■■ 投手成績を取得 End ■■■');
  console.log('コードの整形');
  const str = "apple,banana,orange";
  const replaced = str.replace(',', ' ')
  console.log(replaced) 
})();
