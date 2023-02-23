import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import Vloading from './components/VLoading.vue';

const app = createApp(App);


app.component("VLoading", Vloading);

app.use(createPinia());
app.use(router);

app.mount('#app');
