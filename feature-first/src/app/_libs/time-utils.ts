export function getDifferentTime(startTime: any, endTime: any, input: string) {
    let inputTrim = input.trim().toLowerCase();
    inputTrim = inputTrim.replace(/\s+/g, '').trim();
    let divider = 1;
    if (inputTrim.endsWith('s') || 'seconds'.includes(inputTrim)) {
        divider = 1; // 1 (seconds)
    }
    if (inputTrim.endsWith('m') || 'minutes'.includes(inputTrim)) {
        divider = 60; // 60 (minutes)
    }
    if (inputTrim.endsWith('h') || 'hours'.includes(inputTrim)) {
        divider = 60 * 60; // 60 * 60 (hours)
    }
    if (inputTrim.endsWith('d') || 'days'.includes(inputTrim)) {
        divider = 60 * 60 * 24; // 60 * 60 * 24 (days)
    }
    const differentTime = (endTime.getTime() - startTime.getTime()) / (divider * 1000);
    const differentTimeFixed = Number(differentTime.toFixed(3));
    return differentTimeFixed;
}

export function getMaxAge(input: string) {
    if (!input) return 0;
    if (input.trim() === '') return 0;
    let inputTrim = input.trim().toLowerCase();
    inputTrim = inputTrim.replace(/\s+/g, '').trim();
    if (inputTrim.endsWith('s') || 'seconds'.includes(inputTrim)) {
        return Number(inputTrim.replace(/s|seconds/ig, '').trim()); // 60s = 60seconds = 60 (60 seconds)
    }
    if (inputTrim.endsWith('m') || 'minutes'.includes(inputTrim)) {
        return 60 * Number(inputTrim.replace(/m|minutes/ig, '').trim()); // 5m = 5minutes = 60 * 5 (5 minutes | 300 seconds)
    }
    if (inputTrim.endsWith('h') || 'hours'.includes(inputTrim)) {
        return 60 * 60 * Number(inputTrim.replace(/h|hours/ig, '').trim()); // 10h = 10hours = 60 * 60 * 10 (10 hours)
    }
    if (inputTrim.endsWith('d') || 'days'.includes(inputTrim)) {
        return 60 * 60 * 24 * Number(inputTrim.replace(/d|days/ig, '').trim()); // 20d = 20days = 60 * 60 * 24 * 20 (20 days)
    }
    return Number(inputTrim.replace(/[^0-9]+/g, '').trim());
}
