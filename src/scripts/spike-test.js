import http from 'k6/http';
import { sleep, check } from 'k6';
import { BASE_URL, stressOptions } from '../config/base.js';

export const options = spikeOptions;

export default function () {
    const url = `${BASE_URL}/api/recommendations`;

    const res = http.get(url);

    check(res, {
        'status é 200': (r) => r.status === 200,
        'recomendação recebida': (r) => r.body.includes('pizza'),
    });

    sleep(1);
}