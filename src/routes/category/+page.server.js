/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { categorys } from './data.js'


export function load() {
	return {
		// @ts-expect-error
		categories: categorys.map((category) => ({
			name: category.name,
            categoryid: category._id
		}))
	};
}

