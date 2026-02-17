export async function getMathSignal() {
    const result = {};
    // Floating point math stability check
    // Different engines/optimizations might produce slightly different result for complex ops
    result.math1 = 1.0 / 3.0; // Simple
    result.math2 = Math.PI;
    result.math3 = Math.cos(Math.PI);
    // Fails on some very old browsers or aggressive privacy configs
    result.mathTan = Math.tan(-1e300) + Math.tanh(-1e300) + Math.exp(-1e300) + Math.expm1(-1e300);
    return result;
}
