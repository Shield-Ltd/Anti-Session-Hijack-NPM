export async function getFontsSignal(): Promise<string[]> {
    if (typeof document === 'undefined') return [];

    const fontList = [
        'Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia',
        'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black',
        'Impact', 'Segoe UI', 'Roboto', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue'
    ];

    const baseFonts = ['monospace', 'sans-serif', 'serif'];
    const testString = 'mmmmmmmmmmlli';
    const testSize = '72px';

    const span = document.createElement('span');
    span.style.position = 'absolute';
    span.style.left = '-9999px';
    span.style.fontSize = testSize;
    span.innerHTML = testString;
    document.body.appendChild(span);

    const defaultDims: Record<string, { width: number, height: number }> = {};

    for (const base of baseFonts) {
        span.style.fontFamily = base;
        defaultDims[base] = {
            width: span.offsetWidth,
            height: span.offsetHeight
        };
    }

    const detected: string[] = [];

    for (const font of fontList) {
        let detectedCount = 0;
        for (const base of baseFonts) {
            span.style.fontFamily = `'${font}', ${base}`;
            const currentWidth = span.offsetWidth;
            const currentHeight = span.offsetHeight;
            if (currentWidth !== defaultDims[base].width || currentHeight !== defaultDims[base].height) {
                detectedCount++;
            }
        }
        if (detectedCount >= 1) { // If it differs from at least one base, it's likely present
            detected.push(font);
        }
    }

    document.body.removeChild(span);
    return detected;
}
