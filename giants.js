const puppeteer = require('puppeteer');
const path = require('path');
const URL = 'https://baseball.yahoo.co.jp/npb/teams/1/memberlist?kind=p'; // 製品一覧(iPad)
const PATH = './out/sports';
const DEBUG = 1; // デバッグログなし
// const DEBUG = 1; // デバッグログあり

// 各製品ページを開き、製品情報を取得
const getItemInfo = async (browser, href) => {
  console.log(`[Info] 投手の戦績ページに遷移：${href}`);

  if (DEBUG) console.log('[Debug] 新しいタブを開き、製品ページに移動');
  const picherScorePage = await browser.newPage();
  await picherScorePage.goto(href, { waitUntil: 'domcontentloaded' });
  if (DEBUG) console.log('[Debug] 1.5秒待機');

  // OS種類
  const bbscore = await childPage.evaluate(
    () =>
      document.querySelector(
        'table > tbody '
      ).innerText
  );
  // ネットワーク接続タイプ 
  // const itemNetwork = await childPage.evaluate(
  //   () =>
  //     document.querySelector(
  //       'table > tbody > tr:nth-child(2) td:nth-child(4)'
  //     ).innerText
  // );

  // return [itemOs, itemNetwork];
        return bbscore;

};

//mainロジック
(async () => {
  console.log('[Info]投手の戦績のスクレイピング開始');

  if (DEBUG) console.log('[Debug] Chromium起動');
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
  });

  const page = await browser.newPage();
  const itemTitle = await childPage.evaluate(
    () => document.querySelector('#titleBox h2').innerText
  );
  console.log(`[Info] 製品名：${itemTitle}`);

  const itemOs = await childPage.evaluate(
    () =>
      document.querySelector(
        '#mainLeft > table > tbody > tr:nth-child(2) td:nth-child(2)'
      ).innerText
  );

  for (const href of hrefs) {
    if (DEBUG) console.log('[Debug] 各製品ページを開き、製品情報を取得');
    items.push(await getItemInfo(browser, href));
  }
  console.log('[Info] ■■■ 価格.com売れ筋製品を取得 End ■■■');
})();
