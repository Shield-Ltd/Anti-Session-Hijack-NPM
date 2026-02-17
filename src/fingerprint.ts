import { FingerprintResult, FingerprintComponent } from './browser-fingerprint/types';
import { getHardwareSignals } from './browser-fingerprint/collectors/hardware';
import { getOsSignals } from './browser-fingerprint/collectors/os';
import { getCanvasSignal } from './browser-fingerprint/collectors/canvas';
import { getWebGLSignal } from './browser-fingerprint/collectors/webgl';
import { getAudioSignal } from './browser-fingerprint/collectors/audio';
import { getFontsSignal } from './browser-fingerprint/collectors/fonts';
import { getMathSignal } from './browser-fingerprint/collectors/math';
import { sha256 } from './browser-fingerprint/utils/hasher';

export async function generateFingerprint(): Promise<FingerprintResult> {
    /* const startTime = Date.now(); */
    const components: Record<string, FingerprintComponent> = {};

    const collect = async (key: string, fn: () => Promise<unknown>) => {
        const t0 = performance.now();
        try {
            const value = await fn();
            components[key] = {
                value,
                duration: performance.now() - t0
            };
        } catch (e) {
            components[key] = {
                value: { error: (e as Error).message },
                duration: performance.now() - t0
            };
        }
    };

    await Promise.all([
        collect('hardware', getHardwareSignals),
        collect('os', getOsSignals),
        collect('canvas', getCanvasSignal),
        collect('webgl', getWebGLSignal),
        collect('audio', getAudioSignal),
        collect('fonts', getFontsSignal),
        collect('math', getMathSignal)
    ]);

    // Stable sorting of keys for deterministic hash
    const sortedKeys = Object.keys(components).sort();
    const canonicalString = sortedKeys.map(k => {
        const val = components[k].value;
        return typeof val === 'object' ? JSON.stringify(val) : String(val);
    }).join('|||'); // Separator

    const id = await sha256(canonicalString);

    return {
        id,
        components,
        version: "1.0.0",
        time: Date.now()
    };
}