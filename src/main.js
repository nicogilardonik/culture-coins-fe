import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import CommonServices from '@/services/commonServices';
import CoreuiVue from '@coreui/vue';
import CIcon from '@coreui/icons-vue';
import { iconsSet as icons } from '@/assets/icons';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';




const app = createApp(App);
app.use(store);
await initilizeData();
app.use(router);
app.use(CoreuiVue);

app.provide('icons', icons);
app.component('CIcon', CIcon);
app.use(VueSweetalert2);

app.mount('#app');



async function initilizeData() {
    try {
        //Cargo el perfil del usuario y los projectos
        let userProfile = await CommonServices.getUserProfile();
        store.commit('setUserProfile', userProfile);
    }
    catch (error) {
        console.log(error);
        //TODO: manejador de errores generico
    }
}


