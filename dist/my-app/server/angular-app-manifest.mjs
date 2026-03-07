
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
    'index.csr.html': {size: 24405, hash: '25507b49a972fc765371328a123ccf204681b572becdb18733b3b392344d0490', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1044, hash: '0d889bdd46db4f5cde6fb01653919e0fba22601fe253c86b1af5d63ef3351ba8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/diplomas/index.html': {size: 49607, hash: '92b0fecf55962e1440004e2ccfa07e5f15e30079265c926726369539da3349e7', text: () => import('./assets-chunks/dashboard_diplomas_index_html.mjs').then(m => m.default)},
    'auth/forgot-password/index.html': {size: 42219, hash: '52f7a5b476e7eabdb25969ffdddb75178ce4de0db50bdeacc9f4b91e7b579ef6', text: () => import('./assets-chunks/auth_forgot-password_index_html.mjs').then(m => m.default)},
    'auth/verify-email/index.html': {size: 40027, hash: 'e91f2140789d449bc13354f03f525965310f18db47085d07a12d4eb941344ab7', text: () => import('./assets-chunks/auth_verify-email_index_html.mjs').then(m => m.default)},
    'auth/create-password/index.html': {size: 43778, hash: 'edc7445c97207cc80ba38d64ba273268815457a436db9b138bce2afb81ad1d9f', text: () => import('./assets-chunks/auth_create-password_index_html.mjs').then(m => m.default)},
    'dashboard/account/index.html': {size: 51098, hash: '63aee8d1557ba7e0a1654cabcb2f756acb0e0c8fe45700631e110a71ce1b5736', text: () => import('./assets-chunks/dashboard_account_index_html.mjs').then(m => m.default)},
    'auth/verify-otp/index.html': {size: 43366, hash: '43239519d2c43eb9fb5c600f13e49ae1d78c7f834d6441ffc58fc94ae82008b5', text: () => import('./assets-chunks/auth_verify-otp_index_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 44169, hash: '4ef043d002347122324ef53802d5ba9ccc2e3ea0a3ab803d8641aa056fa0b4d3', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'auth/register/index.html': {size: 47660, hash: '4325e91848071a94f837311755e14d673baa20cfc4b69d61fac495376b5f2fc3', text: () => import('./assets-chunks/auth_register_index_html.mjs').then(m => m.default)},
    'styles-AWBETX43.css': {size: 44629, hash: 'J90W+1IKjkU', text: () => import('./assets-chunks/styles-AWBETX43_css.mjs').then(m => m.default)}
  },
};
