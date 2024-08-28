import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    scenarios: {
        constant_request_rate: {
            executor: 'constant-arrival-rate',
            // 'rate' define o número de requisições por segundo (RPS)
            // Aqui, é calculado para gerar 50 requisições por segundo (3000 requisições divididas por 60 segundos)
            rate: Math.floor(60/ 60), 
            timeUnit: '1s', 
            duration: '1m', 
            preAllocatedVUs: 50, 
            maxVUs: 100, 
        },
    },
    thresholds: {
        http_req_duration: ['p(99)<400'], 
        checks: ['rate>0.95'],            
    },
};

export default function () {
  let res = http.get('https://test-api.k6.io/public/crocodiles/');
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 1000ms': (r) => r.timings.duration < 1000,
  });
  
  sleep(1);
}