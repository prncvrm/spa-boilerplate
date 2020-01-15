import 'zone.js';
import * as singleSpa from 'single-spa';
import { GlobalEventDistributor } from './globalEventDistributor'
import { loadApp } from './helper'

async function init() {
    const globalEventDistributor = new GlobalEventDistributor();

    // app1: The URL "/app1/..." is being redirected to "http://localhost:9001/..." this is done by the webpack proxy (webpack.config.js)
    await loadApp('nav', '/nav', '/nav/singleSpaEntry.js', '/nav/store.js', globalEventDistributor);

    singleSpa.start();
}

init();

