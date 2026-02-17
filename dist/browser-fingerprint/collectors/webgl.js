export async function getWebGLSignal() {
    const result = {};
    if (typeof document === 'undefined')
        return result;
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl)
        return result;
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
        result.vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
        result.renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    }
    return result;
}
