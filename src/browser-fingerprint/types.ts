export interface SignalCollector {
    name: string;
    collect(): Promise<unknown>;
}

export interface FingerprintComponent {
    value: unknown;
    duration: number; // ms taken to collect
}

export interface FingerprintResult {
    id: string;
    components: Record<string, FingerprintComponent>;
    version: string;
    time: number; // timestamp
}
