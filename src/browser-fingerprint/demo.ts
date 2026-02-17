import { generateFingerprint } from '../index';

(async () => {
    const start = performance.now();
    try {
        const result = await generateFingerprint();
        const end = performance.now();

        document.getElementById('fp-id')!.textContent = result.id;
        document.getElementById('time-taken')!.textContent = `${(end - start).toFixed(2)}ms`;
        document.getElementById('details')!.textContent = JSON.stringify(result.components, null, 2);
    } catch (e) {
        document.getElementById('fp-id')!.textContent = 'Error';
        document.getElementById('details')!.textContent = String(e);
    }
})();
