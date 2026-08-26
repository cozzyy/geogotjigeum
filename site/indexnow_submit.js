// IndexNow 제출 스크립트 (2026-08 기획안 4-6절: Bing Webmaster + IndexNow 등록)
//
// 무엇을 하는 스크립트인가:
//   IndexNow는 Bing·Yandex 등이 함께 쓰는 "URL이 바뀌었으니 다시 크롤링해달라"는 공용 프로토콜이다.
//   Bing Webmaster Tools 로그인이나 별도 승인 없이도, 이 사이트 루트에 놓인 키 파일
//   (48fab9be607d79156a9c5da1746eb288.txt, 이 키는 그 파일 안의 값과 반드시 같아야 인증됨)
//   하나만으로 즉시 사용할 수 있다 — 그래서 이 부분은 개발자(소넷) 선에서 바로 준비했다.
//
// 실제 배포 후 사용법 (사이트가 https://geugotjigeum.com 으로 떠 있는 상태에서):
//   node indexnow_submit.js                → sitemap.xml에 있는 전체 URL을 제출
//   node indexnow_submit.js /works/glory/  → 방금 바뀐 특정 URL만 제출(신규/수정 작품 배포 후 추천)
//
// 이 스크립트는 배포 전(zip 상태)에는 실행해도 의미가 없다 — geugotjigeum.com에 아직
// 반영되지 않은 URL을 제출하는 셈이라 IndexNow가 실제로 그 페이지를 가져가 확인하지 못한다.
// 매 배포(Netlify 업로드) 직후 한 번 실행하는 루틴으로 쓰면 된다.
const https = require('https');
const fs = require('fs');
const path = require('path');

const HOST = 'geugotjigeum.com';
const KEY = '48fab9be607d79156a9c5da1746eb288';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

function urlsFromSitemap(){
  const xml = fs.readFileSync(path.join(__dirname, 'sitemap.xml'), 'utf8');
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
  return matches.map(m => m[1].trim());
}

function submit(urlList){
  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList
  });
  const req = https.request({
    hostname: 'api.indexnow.org',
    path: '/indexnow',
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(body) }
  }, res => {
    console.log('IndexNow 응답 상태 코드:', res.statusCode, res.statusCode === 200 || res.statusCode === 202 ? '(성공)' : '(실패 — URL/키 파일이 실제로 배포됐는지 확인)');
    res.on('data', () => {});
  });
  req.on('error', e => console.error('IndexNow 요청 실패:', e.message));
  req.write(body);
  req.end();
}

const argUrl = process.argv[2];
const urlList = argUrl ? [argUrl.startsWith('http') ? argUrl : `https://${HOST}${argUrl}`] : urlsFromSitemap();
console.log('제출할 URL', urlList.length, '개:', urlList.slice(0, 3).join(', ') + (urlList.length > 3 ? ' 외' : ''));
submit(urlList);
