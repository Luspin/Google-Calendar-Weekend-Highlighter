// ==UserScript==
// @name        Weekend Column Highlighter for Google Calendar
// @namespace   Violentmonkey Scripts
// @match       https://calendar.google.com/calendar/u/0/r/week*
// @grant       none
// @version     0.1
// @author      Luís Pinto
// @description 07/28/2023
// ==/UserScript==

const pageLoadCheckInterval = 1; // in seconds
let lastUrl = location.href;

new MutationObserver(() => {
    const url = location.href;

    if (url !== lastUrl) {
        lastUrl = url;
        console.log('URL changed');
        colorizeWeekendColumns("CSwPJc");
    }
}).observe(document, { subtree: true, childList: true });

// a simple sleep() function, that takes any number of millisseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// wait for the page to finish loading, which seems to happen when an "GrxScd EIlDfe" element class is loaded.
async function waitForPageLoad() {
    // we will retry this operation 10 times, only timing out after for 30 seconds have elapsed
    for (let i = 0; i <= 10; i++) {
        // console.log(`Waiting for ${pageLoadCheckInterval} seconds…`);
        await sleep(pageLoadCheckInterval * 1000);

        // have we found the "pageLoadSignal" element?
        const pageLoadSignal = document.getElementsByClassName("VfPpkd-Jh9lGc");

        if (pageLoadSignal[0]) {
            // console.log('Found the "pageLoadSignal" element.');
            break;
        }
    }
}

async function colorizeWeekendColumns(className) {
    // wait until we find the "pageLoadSignal" element
    await waitForPageLoad();

    const calendarColumns = document.getElementsByClassName(className);
    const saturdayColumn = calendarColumns.length - 2;
    const sundayColumn = calendarColumns.length - 1;

    calendarColumns[saturdayColumn].style.backgroundColor = "WhiteSmoke";
    calendarColumns[sundayColumn].style.backgroundColor = "WhiteSmoke";

    const calendarHeaders = document.getElementsByClassName("rpCPrc");
    const saturdayHeader = calendarHeaders.length - 2;
    const sundayHeader = calendarHeaders.length - 1;

    calendarHeaders[saturdayHeader].style.backgroundColor = "WhiteSmoke";
    calendarHeaders[sundayHeader].style.backgroundColor = "WhiteSmoke";

    const calendarSubHeaders = document.getElementsByClassName("eADW5d");
    const saturdaySubHeader = calendarSubHeaders.length - 2;
    const sundaySubHeader = calendarSubHeaders.length - 1;

    calendarSubHeaders[saturdaySubHeader].style.backgroundColor = "WhiteSmoke";
    calendarSubHeaders[sundaySubHeader].style.backgroundColor = "WhiteSmoke";
}

colorizeWeekendColumns("YvjgZe");