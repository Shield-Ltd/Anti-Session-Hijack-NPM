export async function getAudioSignal(): Promise<string> {
    if (typeof window === 'undefined') return 'server';

    // @ts-ignore
    const AudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    if (!AudioContext) return 'unsupported';

    const context = new AudioContext(1, 44100, 44100);
    const oscillator = context.createOscillator();
    oscillator.type = 'triangle';
    oscillator.frequency.value = 10000;

    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -50;
    compressor.knee.value = 40;
    compressor.ratio.value = 12;
    // compressor.reduction is read-only in modern implementations and returns a float, not an AudioParam
    // compressor.reduction.value = -20;
    compressor.attack.value = 0;
    compressor.release.value = 0.25;

    oscillator.connect(compressor);
    compressor.connect(context.destination);

    oscillator.start(0);
    const renderPromise = new Promise<string>((resolve) => {
        context.oncomplete = (event: any) => {
            const buffer = event.renderedBuffer;
            const data = buffer.getChannelData(0);
            let sum = 0;
            for (let i = 0; i < data.length; i++) {
                sum += Math.abs(data[i]);
            }
            resolve(sum.toString());
        };
    });

    context.startRendering();
    return renderPromise;
}
