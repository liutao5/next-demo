function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/';

export const PATH_AUTH = {
	root: ROOTS_AUTH,
	login: path(ROOTS_AUTH, '/login'),
	register: path(ROOTS_AUTH, '/register'),
	selectCompany: path(ROOTS_AUTH, '/selectCompany'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
}

export const PATH_DASHBOARD = {
	root: ROOTS_DASHBOARD,
	contract: {
		root: '/contract',
		list: '/contract/list',
		new: '/contract/new',
		view: (id: string) => `/contract/${id}`,
		edit: (id: string) =>  `/contract/${id}/edit`,
	},
	setting: {
		company: '/setting/company',
		companyRegister: '/setting/company/new'
	}
}