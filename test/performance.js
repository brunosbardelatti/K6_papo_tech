import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 50 }, // Sobe para 50 usuários em 30 segundos
    { duration: '1m', target: 50 },  // Mantém 50 usuários por 1 minuto
    { duration: '30s', target: 0 },  // Desce para 0 usuários em 30 segundos
  ],
};

export default function () {
  let res = http.get('https://test-api.k6.io/public/crocodiles/');
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1);
}
