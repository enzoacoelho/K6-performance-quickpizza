export const BASE_URL = __ENV.BASE_URL || 'https://quickpizza.grafana.com';

export const smokeOptions = {
    vus: 2,
    duration: '10s',
};

export const stressOptions = {
  stages: [
    { duration: '1m', target: 200 }, // rump-up de 1 até 200 virtual users em 1 minuto
    { duration: '5m', target: 200 }, // mantém as 200 VUs durante 5 minutos
    { duration: '1m', target: 0 }, // ramp-down de 200 VUs até 0 em 1 minuto
  ],
};

export const spikeOptions = {
  stages: [
    { duration: '2m', target: 800 }, 
    { duration: '10s', target: 0 },   
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // No pico, aceitamos até 1s de lentidão
    http_req_failed: ['rate<0.05'],    // No pico, aceitamos até 5% de erro
  },
};