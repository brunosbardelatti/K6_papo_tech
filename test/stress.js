import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 200 }, // Sobe para 200 usuários em 2 minutos
    { duration: '3m', target: 300 }, // Mantém 300 usuários por 3 minutos
    { duration: '2m', target: 500 }, // Sobe para 500 usuários em 2 minutos
    { duration: '2m', target: 0 },   // Desce para 0 usuários em 2 minutos
  ],
};

export default function () {
  let res = http.get('https://test-api.k6.io/public/crocodiles/');
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 1000ms': (r) => r.timings.duration < 1000,
  });
  
  sleep(1);
}
