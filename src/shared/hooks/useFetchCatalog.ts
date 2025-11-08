import { useEffect, useState } from 'react';

interface UseFetchResult<T> {
	data: T | null;
	loading: boolean;
	error: null | string;
	hasMore: boolean;
}

export const useFetch = <T>(url: string | null): UseFetchResult<T> => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [hasMore, setHasMore] = useState<boolean>(false);

	useEffect(() => {
		if (!url) return;

		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);
				setHasMore(false);

				const res = await fetch(url);

				if (!res.ok) {
					throw new Error(`HTTP ${res.status}: ${res.statusText ? res.statusText : 'Unknown error'}`);
				}

				const data: T = await res.json();

				setData(data);
			} catch (err) {
				console.log(error);
				setError(err instanceof Error ? err.message : 'Unknown error');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return {
		data,
		loading,
		error,
		hasMore,
	};
};
