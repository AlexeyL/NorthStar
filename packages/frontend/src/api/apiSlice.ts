// Import the RTK Query methods from the React-specific entry point
import { RTKTagTypes } from '@constants/rtkTags';
import { createApi } from '@reduxjs/toolkit/query/react';
import { appBaseQuery } from './appBaseQuery';

// Define our single API slice object
export const apiSlice = createApi({
	// The cache reducer expects to be added at `state.api` (already default - this is optional)
	reducerPath: 'api',
	// All of our requests will have URLs starting with base api URL
	baseQuery: appBaseQuery(),
	// The "tagTypes" are used for invalidation and refetching
	tagTypes: RTKTagTypes,
	// The "endpoints" represent operations and requests for this server are implemented in its own slices
	endpoints: () => ({}),
});
