import axios from 'axios';
// config
import { HOST_API_KEY } from '../config-global';
import uuidv4 from './uuidv4';

const axiosInstance = axios.create({
	baseURL: HOST_API_KEY,
	headers: {
		'Content-Type': 'application/json',
	}
});

const request = async (url: string, data?: object, method: string = 'post', options?: any) => {
	const timestamp = (Date.now()/1000).toFixed();
	const nonce = uuidv4();

	return axiosInstance.request({
		url,
		data,
		method,
	}).then(res => {
		return res.data
	}).catch(err => {
		return err.response.data
	})
}

const get = (url: string, data?: object) => request(url, data, 'get')
const post = (url: string, data?: object, options?: any) => request(url, data, 'post', options)

export { axiosInstance, get, post } ;
