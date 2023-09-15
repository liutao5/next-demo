import axios from 'axios';
// config
import { HOST_API_KEY } from '../config-global';
import { signature } from '@/wusuan-api-sign/wusuan_api_sign';
import uuidv4 from './uuidv4';

const axiosInstance = axios.create({
	baseURL: HOST_API_KEY,
	headers: {
		'Content-Type': 'application/json',
	}
});

const request = async (url: string, data?: object, method: string = 'post') => {
	const timestamp = (Date.now()/1000).toFixed();
	const nonce = uuidv4();
	const api_signature = signature(timestamp, nonce);

	return axiosInstance.request({
		url,
		data,
		method,
		headers: {
			'X-Api-Timestamp': timestamp,
			'X-Api-Nonce': nonce,
			'X-Api-Signature': api_signature,
			'X-App-Platform': 'web',
			'X-App-Version': '0.0.1',
		},
	}).then(res => {
		return res.data
	}).catch(err => {
		return err.response.data
	})
}

const get = (url: string, data?: object) => request(url, data, 'get')
const post = (url: string, data?: object) => request(url, data, 'post')

export { axiosInstance, get, post } ;
