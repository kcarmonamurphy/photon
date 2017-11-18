import { helper } from '@ember/component/helper';

export function thumbnailUri(params) {

	let [ uri ] = params;

	let host = 'http://localhost:4567'

  	return `${host}${uri}?thumbnail=1`;
}

export default helper(thumbnailUri);
