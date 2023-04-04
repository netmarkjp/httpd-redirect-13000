import http from 'k6/http';
import { SharedArray } from 'k6/data';

const BASE_URL = 'http://localhost:8080';

const URLS = new SharedArray('urls', function() {
  const urls = [];
  for (const line of open('./.htaccess').split('\n')) {
    const beforeURL = line.split(' ')[2];
    if ( beforeURL == null ) {
      continue;
    }
    urls.push(beforeURL.replace(/"/g, ''));
  }

  return urls;
});

export default function() {
  const url = URLS[Math.floor(Math.random() * URLS.length)];
  console.log(`${BASE_URL}${url}`);
  http.get(`${BASE_URL}${url}`);
}
