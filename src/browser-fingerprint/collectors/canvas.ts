export async function getCanvasSignal(): Promise<string> {
    if (typeof document === 'undefined') return 'server';

    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 50;

    const ctx = canvas.getContext('2d');
    if (!ctx) return 'unsupported';

    // Text with different specificities
    const txt = 'BrowserLeaks, <canvas> 1.0 \ud83d\ude03';
    ctx.textBaseline = 'top';
    ctx.font = '14px "Arial"';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText(txt, 4, 17);

    // Drawing a curve
    ctx.strokeStyle = 'rgba(255,0,255,0.8)'; // Magenta with alpha
    ctx.lineWidth = 2; // Check line width rendering
    ctx.beginPath();
    ctx.moveTo(10, 30);
    ctx.bezierCurveTo(20, 10, 40, 45, 60, 25); // Complex curve
    ctx.stroke();

    // Winding rule test
    ctx.beginPath();
    ctx.arc(80, 35, 10, 0, Math.PI * 2, true);
    ctx.arc(80, 35, 5, 0, Math.PI * 2, true);
    ctx.fillStyle = 'evenodd'; // Winding rule
    ctx.fill('evenodd');

    return canvas.toDataURL();
}
