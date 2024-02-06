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
        //Cargar token del back y perfil del usuario
        console.log("token inicio", store.state.token);
        if (store.state.token != undefined && store.state.token != null) {
            const hash = window.location.hash;
            const params = new URLSearchParams(hash.substr(hash.indexOf('?')));
            const token = params.get('token');
            store.commit('setToken', token);
            let userProfile = await CommonServices.getUserProfile();
            store.commit('setUserProfile', userProfile);
            console.log("token dentro de if", store.state.token);
        }
        console.log("token final", store.state.token);
        

        

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
                message: `${ln.userFromNickName} has recognized  ${ln.userToNickName} for ${ln.category}`,
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


