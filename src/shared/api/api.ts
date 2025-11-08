import type { Endpoint } from "./types";

const BASE_URL = 'https://rickandmortyapi.com/api';

type Api = {
	[key in Endpoint]: {
		list: (arg0?: number) => string;
		detailed: (arg0: number | string) => string;
	};
};

export const endpoints = ['characters', 'locations', 'episodes'];

export const api: Api = {
	characters: {
		list: (page = 1) => `${BASE_URL}/character?page=${page}`,
		detailed: id => `${BASE_URL}/character/${id}`,
	},
	locations: {
		list: (page = 1) => `${BASE_URL}/location?page=${page}`,
		detailed: id => `${BASE_URL}/location/${id}`,
	},
	episodes: {
		list: (page = 1) => `${BASE_URL}/episode?page=${page}`,
		detailed: id => `${BASE_URL}/episode/${id}`,
	},
};
