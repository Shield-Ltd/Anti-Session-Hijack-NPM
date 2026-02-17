export async function getHardwareSignals(): Promise<Record<string, unknown>> {
    const result: Record<string, unknown> = {};

    if (typeof navigator !== 'undefined') {
        if ('hardwareConcurrency' in navigator) {
            result.concurrency = (navigator as any).hardwareConcurrency;
        }
        if ('deviceMemory' in navigator) {
            result.memory = (navigator as any).deviceMemory;
        }
        if ('maxTouchPoints' in navigator) {
            result.touchPoints = navigator.maxTouchPoints;
        }
    }

    return result;
}
