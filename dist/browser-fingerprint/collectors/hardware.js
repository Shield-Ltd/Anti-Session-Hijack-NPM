export async function getHardwareSignals() {
    const result = {};
    if (typeof navigator !== 'undefined') {
        if ('hardwareConcurrency' in navigator) {
            result.concurrency = navigator.hardwareConcurrency;
        }
        if ('deviceMemory' in navigator) {
            result.memory = navigator.deviceMemory;
        }
        if ('maxTouchPoints' in navigator) {
            result.touchPoints = navigator.maxTouchPoints;
        }
    }
    return result;
}
