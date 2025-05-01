/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { categorys } from '../data.js';

export function load({ params }) {
	const cats = categorys.find((cat) => cat.name === params.name);
	console.log(categorys)
	return {
		cats
	};
}

