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

  thresholds: {
    http_req_duration: ['p(95)<2000'], 
    http_req_failed: ['rate<0.05'],    
  },
};

export const spikeOptions = {
  stages: [
    { duration: '40s', target: 500 }, 
    { duration: '50s', target: 0 },   
  ],

  thresholds: {    
    http_req_failed: ['rate<0.01'],
  },
  
};