import http from 'k6/http';
import { sleep, check } from 'k6';
import { BASE_URL, smokeOptions, stressOptions } from '../config/base.js';

export const options = smokeOptions;

export default function () {
    const res = http.get(BASE_URL);

    check(res, {
        'Status code deve ser 200': (r) => r.status === 200
    })
}