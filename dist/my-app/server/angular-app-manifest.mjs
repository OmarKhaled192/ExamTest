
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/auth/login",
    "route": "/"
  },
  {
    "renderMode": 2,
    "redirectTo": "/auth/login",
    "route": "/auth"
  },
  {
    "renderMode": 2,
    "route": "/auth/login"
  },
  {
    "renderMode": 2,
    "route": "/auth/register"
  },
  {
    "renderMode": 2,
    "route": "/auth/verify-email"
  },
  {
    "renderMode": 2,
    "route": "/auth/verify-otp"
  },
  {
    "renderMode": 2,
    "route": "/auth/forgot-password"
  },
  {
    "renderMode": 2,
    "route": "/auth/reset-password"
  },
  {
    "renderMode": 2,
    "redirectTo": "/dashboard/diplomas",
    "route": "/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/dashboard/diplomas"
  },
  {
    "renderMode": 0,
    "route": "/dashboard/diplomas/*/exams"
  },
  {
    "renderMode": 0,
    "route": "/dashboard/diplomas/*/exams/*/questions"
  },
  {
    "renderMode": 2,
    "route": "/dashboard/account"
  },
  {
    "renderMode": 2,
    "redirectTo": "/auth/login",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 25463, hash: '100bfd45400ea2791df85d39328283da17cc152ae10dfe1d1afc02f07aeac27a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1035, hash: '459f9da10936f7c4753c869ae7d30fb8493834049eccef02b7e5f5e0840b11fe', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/diplomas/index.html': {size: 255, hash: '5234ad79cf291c29ba8d07c20adde4a3127024cc986f9539e639dc7c44a33e9b', text: () => import('./assets-chunks/dashboard_diplomas_index_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 44940, hash: '1b09c84e17eee54f456b94432cc6e7f9571006867a190f1e8afbbefa665db7e1', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'auth/reset-password/index.html': {size: 44116, hash: '34826f55c4a3adca2d75ab90c55369aee265290c4f9c2dc1dc5f8f0611be3f76', text: () => import('./assets-chunks/auth_reset-password_index_html.mjs').then(m => m.default)},
    'auth/register/index.html': {size: 45970, hash: '5ec70a85bf7122f81d10e805a21283468892ec33596ed046b297b57b8e64f35a', text: () => import('./assets-chunks/auth_register_index_html.mjs').then(m => m.default)},
    'dashboard/account/index.html': {size: 255, hash: '5234ad79cf291c29ba8d07c20adde4a3127024cc986f9539e639dc7c44a33e9b', text: () => import('./assets-chunks/dashboard_account_index_html.mjs').then(m => m.default)},
    'auth/forgot-password/index.html': {size: 43349, hash: 'cc4704fcf1f805773589b035eacad4f0c52d85a311758713f7ccb92f0724b5e8', text: () => import('./assets-chunks/auth_forgot-password_index_html.mjs').then(m => m.default)},
    'auth/verify-email/index.html': {size: 41131, hash: '745f5fbe221f0c39635b6c999d23b094f3a97b9a600765395797b0e34f37f827', text: () => import('./assets-chunks/auth_verify-email_index_html.mjs').then(m => m.default)},
    'auth/verify-otp/index.html': {size: 44528, hash: '5aac38b0f507f54ae831a98704451861b85b87c7c18b3bdda6d403cc6f240b20', text: () => import('./assets-chunks/auth_verify-otp_index_html.mjs').then(m => m.default)},
    'styles-HSM3PU3E.css': {size: 48388, hash: 'nkMST1IyjIM', text: () => import('./assets-chunks/styles-HSM3PU3E_css.mjs').then(m => m.default)}
  },
};
