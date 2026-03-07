
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/ExamTest/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/ExamTest/auth/login",
    "route": "/ExamTest"
  },
  {
    "renderMode": 2,
    "redirectTo": "/ExamTest/auth/login",
    "route": "/ExamTest/auth"
  },
  {
    "renderMode": 2,
    "route": "/ExamTest/auth/login"
  },
  {
    "renderMode": 2,
    "route": "/ExamTest/auth/register"
  },
  {
    "renderMode": 2,
    "route": "/ExamTest/auth/verify-email"
  },
  {
    "renderMode": 2,
    "route": "/ExamTest/auth/verify-otp"
  },
  {
    "renderMode": 2,
    "route": "/ExamTest/auth/forgot-password"
  },
  {
    "renderMode": 2,
    "route": "/ExamTest/auth/create-password"
  },
  {
    "renderMode": 2,
    "redirectTo": "/ExamTest/dashboard/diplomas",
    "route": "/ExamTest/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/ExamTest/dashboard/diplomas"
  },
  {
    "renderMode": 0,
    "route": "/ExamTest/dashboard/diplomas/*/exams"
  },
  {
    "renderMode": 0,
    "route": "/ExamTest/dashboard/diplomas/*/exams/*/questions"
  },
  {
    "renderMode": 2,
    "route": "/ExamTest/dashboard/account"
  },
  {
    "renderMode": 2,
    "redirectTo": "/ExamTest/auth/login",
    "route": "/ExamTest/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 25429, hash: '643664c1934c5582c5d660a4c219c018d3baa6d4b3e28f0044fd09122c0ed829', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1044, hash: '5d3a2d9714010db49a6941c5ec691b54c885a748ef6826959d7c87b6f2c437e1', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'auth/create-password/index.html': {size: 44856, hash: '1db403cb141e086767e868b6d875cb89c7201e2a751c43c3969f27d97fae058a', text: () => import('./assets-chunks/auth_create-password_index_html.mjs').then(m => m.default)},
    'auth/register/index.html': {size: 48738, hash: 'cc05fb0bb949541048a740986336a64faa8ecf6a2a27676c5e6c9a878df6fcf0', text: () => import('./assets-chunks/auth_register_index_html.mjs').then(m => m.default)},
    'auth/forgot-password/index.html': {size: 43292, hash: '1be47565587e5084b3b24d10afeb3d7246412db6103a826783d4d803f8db47af', text: () => import('./assets-chunks/auth_forgot-password_index_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 45247, hash: '30ed11a826d8513a45afa62dc34ed8cefa67e1afbafff88b3836d8e70b2f7654', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'auth/verify-email/index.html': {size: 41105, hash: 'baf863cc25c0bfd710ac3211c995256c756312fe82e63038ccb563daf32b8e87', text: () => import('./assets-chunks/auth_verify-email_index_html.mjs').then(m => m.default)},
    'auth/verify-otp/index.html': {size: 44444, hash: 'b96c3c0a1e93205f4894045168fcb27b19490d6a6b785d85668f5e5ce0cca423', text: () => import('./assets-chunks/auth_verify-otp_index_html.mjs').then(m => m.default)},
    'dashboard/account/index.html': {size: 52185, hash: '749a4068a6988417a69c32cc05d979477b05657b261e81b2d9f6945cf81d4e79', text: () => import('./assets-chunks/dashboard_account_index_html.mjs').then(m => m.default)},
    'dashboard/diplomas/index.html': {size: 50685, hash: '5c429d861e3c5992f63375dc6477cdaa4f8fdda0b34f131f5558d0f016efe672', text: () => import('./assets-chunks/dashboard_diplomas_index_html.mjs').then(m => m.default)},
    'styles-ZQ7U6XH6.css': {size: 48034, hash: 'SxVDIY3Lvok', text: () => import('./assets-chunks/styles-ZQ7U6XH6_css.mjs').then(m => m.default)}
  },
};
