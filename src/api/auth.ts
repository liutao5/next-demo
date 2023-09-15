import { ICompanyBase } from "@/@types/company"
import { get, post } from "@/utils/axios"
import MD5 from "crypto-js/md5"

export const mobileCheck = (mobile: string) => {
	return get(`/mobile/check/${mobile}`)
}

export const smsGet = (mobile: string) => {
	return post('/sms/reg', { mobile })
}

export const smsCheck = (mobile: string, code: number) => {
	return post('/sms/reg/check', { mobile, code })
}

export const register = (mobile: string, code: number, password: string) => {
	return post("/reg", {
		mobile,
		password: MD5(password).toString(),
		code,
	});
}

export const login = (mobile: string, password: string) => {
	return post("/login", {
		mobile,
		password: MD5(password).toString(),
	})
}

export const userGet = () => {
	return get("/user")
}

export const companyNew = (data: ICompanyBase) => {
	return post('/company', data)
}