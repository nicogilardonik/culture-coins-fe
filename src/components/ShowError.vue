<template>
    <CToaster placement="top-end" visible>
        <CToast v-for="(toast, index) in toasts" v-bind:key="index" visible :autohide="toast.autoHide">
            <CToastHeader closeButton>
                <i v-if="toast.toastType == TOAST_TYPE.ERROR" class='ti ti-alert-octagon-filled toasts-error-icon me-2' />
                <i v-if="toast.toastType == TOAST_TYPE.WARNING" class='ti ti-alert-triangle-filled toasts-warning-icon me-2' />
                <i v-if="toast.toastType == TOAST_TYPE.INFO" class='ti ti-info-circle-filled toasts-info-icon me-2' />
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
export default {

    data() {
        return {
            TOAST_TYPE: {
                ERROR: 0,
                WARNING: 1,
                INFO: 2,
            },
            toasts: []
        }
    },
    computed: mapState(['lastCriticalError', 'lastError', 'lastWarning', 'lastMessage']),
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
        lastMessage(newMessage) {
            newMessage.content = newMessage.message;
            newMessage.toastType = this.TOAST_TYPE.INFO;
            this.toasts.push(newMessage);
        },
        lastCriticalError(newError) {
            this.$swal.fire({
                icon: 'error',
                title: newError.title,
                text:  newError.message,
            });
        }
    }
}

</script>

