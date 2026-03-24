import http from 'k6/http';
import { sleep, check } from 'k6';
import { BASE_URL, spikeOptions } from '../config/base.js';

export const options = spikeOptions;

export default function () {
    const res = http.get(BASE_URL);

    check(res, {
        'status é 200': (r) => r.status === 200,
        
    });

    sleep(1);
}