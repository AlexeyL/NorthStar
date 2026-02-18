export type RetryConfig<T> = {
	fn: () => Promise<T>; // function to retry
	retries?: number; // number of attempts
	delayMs?: number; // delay in ms between retries
	signal?: AbortSignal; // cancellation
	onRetry?: (attempt: number, error: unknown) => void; // optional logging/telemetry
};
