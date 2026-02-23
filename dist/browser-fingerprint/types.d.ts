export interface SignalCollector {
    name: string;
    collect(): Promise<unknown>;
}
export interface FingerprintComponent {
    value: unknown;
}
export interface FingerprintResult {
    id: string;
    components: Record<string, FingerprintComponent>;
    version: string;
    time: number;
}
