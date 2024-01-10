import { httpGet, httpPost, httpPut, httpDel } from 'boot/axios';
import { ref, readonly } from 'vue';
import { Search } from './Search';

let ORNumberDetails = ref(null);
/**
 * A request that is used to fetch all or numbers from the database
 *
 * @returns Array
 */
let SetORNumbers = ref([]);
let GetORNumbers = readonly(SetORNumbers);

const FetchORNumbers = () => {
	return new Promise((resolve, reject) => {
		httpGet(`orNumbers`, {
			success(response) {
				response.data.status === 'success' && (SetORNumbers.value = response.data.data);

				resolve(response.data);
			},
			catch(response) {
				reject(response);
			},
		});
	});
};

/**
 * A request that is used to fetch a specific or number from the database
 *
 * @returns Array
 */

const FetchORNumber = (payload) => {
	return new Promise((resolve, reject) => {
		httpGet(
			`polanguiTreasury/orNumbers`,
			{
				success(response) {
					response.data.status === 'success' && (ORNumberDetails.value = response.data.data[0]);

					resolve(response.data);
				},
				catch(response) {
					reject(response);
				},
			},
			payload
		);
	});
};

/**
 * A request that is used to insert a new range of or numbers to the database
 *
 * @param {*} payload
 * @returns Object
 */

const InsertNewRange = (payload) => {
	return new Promise((resolve, reject) => {
		httpPost('polanguiTreasury/orNumbers', payload, {
			success(response) {
				resolve(response.data);
			},
			catch(response) {
				reject(response);
			},
		});
	});
};

/**
 * A request that is used to update a range of or numbers to the database
 *
 * @param {*} payload
 * @returns Object
 */
let ORNumbersSearchResult = ref([]);
const UpdateORRange = (payload) => {
	return new Promise((resolve, reject) => {
		httpPut(`polanguiTreasury/orNumbers/${payload.params.id}`, payload.params, {
			success(response) {
				if (response.data.status === 'success') {
					/**
					 * Update Search list row if some data have changed
					 */
					ORNumbersSearchResult.value = JSON.parse(JSON.stringify(ORNumbersSearchResult.value));
					if (Search.value.length) {
						let ornumber = {
							...payload.params,
							...payload.readableOptions,
						};

						let objectIndex = ORNumbersSearchResult.value.findIndex((t) => t.id === ornumber.id);
						Object.keys(ORNumbersSearchResult.value[objectIndex]).forEach((key) => {
							ornumber[key] && (ORNumbersSearchResult.value[objectIndex][key] = ornumber[key]);
						});
					}
				}
				resolve(response.data);
			},
			catch(response) {
				reject(response);
			},
		});
	});
};

const DeleteORRange = (payload) => {
	return new Promise((resolve, reject) => {
		httpDel(`polanguiTreasury/orNumbers/${payload.id}`, payload, {
			success(response) {
				if (response.data.status === 'success') {
					let objectIndex = SetORNumbers.value.findIndex((b) => b.id === payload.id);
					objectIndex !== -1 && SetORNumbers.value.splice(objectIndex, 1);
				}
				resolve(response.data);
			},
			catch(response) {
				reject(response);
			},
		});
	});
};

/**
 * A request that is used to fetch all fund types from database
 *
 * @returns Array
 */
let SetFundTypes = ref([]);
let GetFundTypes = readonly(SetFundTypes);
const FetchFundType = () => {
	return new Promise((resolve, reject) => {
		httpGet(`polanguiTreasury/fundType`, {
			success(response) {
				response.data.status === 'success' && (SetFundTypes.value = response.data.data);

				resolve(response.data);
			},
			catch(response) {
				reject(response);
			},
		});
	});
};

/**
 * A request that is used to fetch all form types from database
 *
 * @returns Array
 */
let SetFormTypes = ref([]);
let GetFormTypes = readonly(SetFormTypes);
const FetchFormType = () => {
	return new Promise((resolve, reject) => {
		httpGet(`polanguiTreasury/formType`, {
			success(response) {
				response.data.status === 'success' && (SetFormTypes.value = response.data.data);

				resolve(response.data);
			},
			catch(response) {
				reject(response);
			},
		});
	});
};

export {
	GetORNumbers,
	FetchORNumbers,
	InsertNewRange,
	UpdateORRange,
	DeleteORRange,
	ORNumbersSearchResult,
	FetchFundType,
	GetFundTypes,
	FetchFormType,
	GetFormTypes,
	FetchORNumber,
	ORNumberDetails,
};
