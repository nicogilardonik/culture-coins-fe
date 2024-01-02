<template>
    <CToaster placement="top-end" visible>
        <CToast v-for="(toast, index) in toasts" v-bind:key="index" visible :autohide="toast.autoHide">
            <CToastHeader closeButton>
                <!-- <CIcon icon="cil-menu" size="lg" /> -->
                <IconInfoCircle v-if="toast.toastType == TOAST_TYPE.INFO" color="#3399ff" class="me-2" />
                <IconExclamationCircle v-else v-bind:color="getIconColor(toast.toastType)" class="me-2" />
                <span class="me-auto fw-bold">{{ toast.title }}</span>
            </CToastHeader>
            <CToastBody>
                {{ toast.content }}
            </CToastBody>
        </CToast>
    </CToaster>
</template>
<script>

import { mapState } from 'vuex';
import { IconInfoCircle, IconExclamationCircle } from '@tabler/icons-vue';

export default {

    components: {
        IconInfoCircle,
        IconExclamationCircle
    },

    data() {
        return {
            TOAST_TYPE: {
                ERROR: 0,
                WARNING: 1,
                INFO: 2,
            },
            toasts: []
        };
    },
    computed: mapState(['lastCriticalError', 'lastError', 'lastWarning', 'lastNotificacion']),
    watch: {
        lastError(newError) {
            newError.content = newError.message;
            newError.toastType = this.TOAST_TYPE.ERROR;
            this.toasts.push(newError);
        },
        lastWarning(newWarning) {
            newWarning.content = newWarning.message;
            newWarning.toastType = this.TOAST_TYPE.WARNING;
            this.toasts.push(newWarning);
        },
        lastNotificacion(newMessage) {
            newMessage.content = newMessage.message;
            newMessage.toastType = this.TOAST_TYPE.INFO;
            this.toasts.push(newMessage);
        },
        lastCriticalError(newError) {
            this.$swal.fire({
                icon: 'error',
                title: newError.title,
                text: newError.message,
            });
        }
    },
    methods: {
        getIconColor(toastType) {
            switch (toastType) {
                case this.TOAST_TYPE.INFO:
                    return "#3399ff";
                case this.TOAST_TYPE.ERROR:
                    return "#e55353";
                case this.TOAST_TYPE.WARNING:
                    return "#ffcc00";
                default:
                    return "#000";
            }
        },
    },
};
</script>
