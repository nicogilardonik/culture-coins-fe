import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import errorHandler from '@/helpers/errorHandler';
import { ERROR_SEVERITY } from "@/helpers/constants";
import CommonServices from '@/services/commonServices';
import CoreuiVue from '@coreui/vue';
import CIcon from '@coreui/icons-vue';
import { iconsSet as icons } from '@/assets/icons';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';




const app = createApp(App);

addErrorHandlers(app);

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
        //Cargo el perfil del usuario
        let userProfile = await CommonServices.getUserProfile();
        store.commit('setUserProfile', userProfile);

        //Cargo las notificaciones
        loadNotifications();

        //Hago un setInterval para actualizar las notificaciones cada 1 minuto
        setInterval(async function () {
            loadNotifications();
        }, 60000);
    }
    catch (error) {
        console.log(error);
        errorHandler.handleError(error);
    }
}

async function loadNotifications() {
    try {
        let lastNotificacions = await CommonServices.getLastNotificacions();
      
        let index = 0;
        let intervalId = setInterval(function () {
            if (index >= lastNotificacions.length) {
                clearInterval(intervalId);
                return;
            }
    
            let ln = lastNotificacions[index];
            let notification = {
                title: "New Recogniton!",
                message: `${ln.userFrom} has recognized  ${ln.userTo} for ${ln.category}`,
                autoHide: true
            };
            store.commit('addNotification', notification);
    
            index++;
        }, 800);
    } catch (error) {
        console.error(error);
        errorHandler.handleError(error);
    }
}

function addErrorHandlers(app) {
    app.config.errorHandler = (err) => {
        err.errorSeverity = ERROR_SEVERITY.CRITICAL;
        errorHandler.handleError(err);
    };
    window.addEventListener('unhandledrejection', event => {
        event.reason.errorSeverity = ERROR_SEVERITY.CRITICAL;
        errorHandler.handleError(event.reason);
        event.preventDefault();
    });
}


