import axios from 'axios';

const request = axios.create({
	baseURL: process.env.API_URL,
	timeout: 1000,
});

export default request;
