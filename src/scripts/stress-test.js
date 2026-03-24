import http from 'k6/http';
import { sleep, check } from 'k6';
import { BASE_URL, stressOptions } from '../config/base.js';

export const options = stressOptions;

export default function () {
    const res = http.get(BASE_URL);

    check(res, {
        'status code é 200': (r) => r.status === 200,
        'tempo de resposta': (r) => r.duration < 2000,
    });

    sleep(1);

}