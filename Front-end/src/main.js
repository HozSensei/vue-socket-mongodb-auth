import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { createAuth0 } from '@auth0/auth0-vue';

createApp(App)
    .use(store)
    .use(router)
    .use(
        createAuth0({
            domain: 'XXXX',
            client_id: 'XXXX',
            redirect_uri: 'http://localhost:8080'
        })
    )
    .mount('#app')
