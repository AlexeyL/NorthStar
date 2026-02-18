import type { RTKTagTypes } from '@constants/rtkTags';
import type { RetryConfig } from '@utils/rtk/types/retryConfig';

export const rtkService = {
	/**
	 * Default tag builder for list operations.
	 * @param tagType - The type of the tag to build.
	 * @returns An array containing the list tag for the specified type.
	 */
	defaultListTagBuilder: (tagType: (typeof RTKTagTypes)[number]): { type: string; id: string }[] => {
		return rtkService.defaultListTagsBuilder([tagType]);
	},

	/**
	 * Builds a list of tags for RTK Query cache invalidation, supporting multiple tag types.
	 * @param tagTypes Array of tag type strings
	 * @returns Array of tag objects for RTK Query
	 */
	defaultListTagsBuilder: (tagTypes: (typeof RTKTagTypes)[number][]): { type: string; id: string }[] => {
		const tags: { type: string; id: string }[] = [];
		for (const type of tagTypes) {
			tags.push({ type, id: 'LIST' });
		}
		return tags;
	},

	/**
	 * Builds tags for a list of models.
	 * @param tagType - The type of the tag to build.
	 * @param models - An array of models to create tags for.
	 * @param idMapper - Optional function to map each model to its unique identifier. Defaults to model['id'].
	 * @returns An array of tags for the specified models.
	 */
	tagsBuilder: <T>(tagType: (typeof RTKTagTypes)[number], models: T[] | undefined, idMapper?: (model: T) => string): { type: string; id: string }[] => {
		return [
			...rtkService.defaultListTagBuilder(tagType),
			...(models?.map((model) => ({
				type: tagType,
				id: idMapper ? idMapper(model) : (model as any).id.toString(),
			})) ?? []),
		];
	},

	/**
	 * Builds a tag for a specific model.
	 * @param tagType - The type of the tag to build.
	 * @param id - The unique identifier for the model.
	 * @param idMapper - Optional function to map the model to its unique identifier.
	 * @returns An array containing the tag for the specified model.
	 */
	tagBuilder: (tagType: (typeof RTKTagTypes)[number], id: any, idMapper?: (model: any) => string) : { type: string; id: string }[] => {
		return [{ type: tagType, id: idMapper ? idMapper({ id }) : id.toString() }];
	},

	/**
	 * Retry an async function with configurable delay strategy.
	 * @param fn - Async function to execute
	 * @param retries - Max number of retries defaults to 3
	 * @param delayMs - Delay in ms between retries defaults to 1000ms
	 * @param signal - Optional AbortSignal for cancellation
	 * @param onRetry - Optional callback for retry attempts
	 */
	retryWithDelay: async <T>({ fn, retries = 3, delayMs = 1000, signal, onRetry }: RetryConfig<T>): Promise<T> => {
		let lastError: unknown;

		for (let attempt = 0; attempt <= retries; attempt++) {
			if (signal?.aborted) {
				throw new Error('Aborted');
			}

			try {
				return await fn();
			} catch (err) {
				lastError = err;
				if (attempt < retries) {
					onRetry?.(attempt, err);
					await new Promise<void>((res, rej) => {
						const id = setTimeout(res, delayMs * (attempt + 1));
						signal?.addEventListener('abort', () => {
							clearTimeout(id);
							rej(new Error('Aborted'));
						});
					});
				}
			}
		}
		throw lastError;
	},
};
