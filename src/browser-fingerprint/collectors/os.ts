export async function getOsSignals(): Promise<Record<string, unknown>> {
    const result: Record<string, unknown> = {};

    if (typeof navigator !== 'undefined') {
        result.platform = navigator.platform;
        result.vendor = navigator.vendor;
        result.language = navigator.language;

        // Timezone
        try {
            result.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch (e) {
            result.timezone = 'unknown';
        }

        // High entropy (experimental, check if available)
        if ('userAgentData' in navigator) {
            // We can't use getHighEntropyValues deeply without async and potentially prompt,
            // so we stick to the basic properties available on the object if any.
            const uaData = (navigator as any).userAgentData;
            result.mobile = uaData.mobile;
            if (uaData.platform) result.uaPlatform = uaData.platform;
            if (uaData.brands) {
                result.brands = uaData.brands.map((b: any) => `${b.brand} v${b.version}`).join(',');
            }
        }
    }

    return result;
}
