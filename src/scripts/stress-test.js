import http from 'k6/http';
import { sleep, check } from 'k6';
import { BASE_URL, stressOptions } from '../config/base.js';

export const options = stressOptions;

export default function () {
    const url = `${BASE_URL}/api/recommendations`;

    const res = http.get(url);

    check(res, {
        'status code é 200': (r) => r.status === 200,
        'tempo de resposta amigável': (r) => r.duration < 1500,
    });

    sleep(1);

}