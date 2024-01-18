<template>
    <CCol :sm="12" :md="12" class="p-1">
        <CCard>
            <CCardHeader class="d-flex justify-content-between">
                <div class="d-flex align-self-center">
                    <h4 class="d-inline-block"> By: {{ data.userFromNickName }}</h4>
                </div>
                <h4>To: {{ data.userToNickName }}</h4>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol sm="6" md="6" lg="8" xl="10">
                        <div>
                            <div class="custom-display">
                                <CustomEditor :value="data.message" :readOnly="true"></CustomEditor>
                            </div>
                            <!-- <div class="" ref="requestMessage"></div> -->
                        </div>
                    </CCol>

                    <CCol sm="6" md="6" lg="4" xl="2" class="">
                        <div>
                            <strong>Value: </strong> {{ data.category }} <br>
                            <strong>Behaviors: </strong>
                            <ul class="pl-3">
                                <li v-for="(subCategory, index) in data.subCategory" :key="index">{{ subCategory }}</li>
                            </ul>
                        </div>
                    </CCol>

                </CRow>
            </CCardBody>

            <CCardFooter class="pt-0 pb-0">
                <CRow>
                    <CCol sm="12" md="6" class="custom-font-size">
                        <div><strong>Created at : </strong> {{ formatDate(data.createdAt) }}</div>
                    </CCol>
                    <CCol v-if="data.updatedAt" sm="12" md="6" class="custom-font-size d-flex justify-content-end">
                        <div><strong>From : </strong> FROM</div>
                    </CCol>
                </CRow>
            </CCardFooter>
        </CCard>
    </CCol>
</template>

<script>

import CustomEditor from '@/components/CustomEditor.vue';

export default {

    name: "MyRecognitionsCard",

    components: {
        CustomEditor
    },
    props: {
        data: {
            type: Object,
            required: true
        },
    },


    mounted() {
        this.adjustMaxLength();
        window.addEventListener('resize', this.adjustMaxLength);
    },

    data() {
        return {
            showFullMessage: false,
            maxMessageLength: 100,
            showMenu: false,
            executionStatus: '',
            countExecution: 0,
            lastExecutionDate: '',
            showFormExecution: false
        };
    },

    computed: {
        truncatedMessage() {
            if (this.data.message.length <= this.maxMessageLength) {
                return this.data.message;
            }
            let truncated = this.data.message.substring(0, this.maxMessageLength - 10) + "...";
            return truncated;
        },
        channelsList() {
            if (!this.data.channels) return '';
            return this.data.channels
                .filter(channel => channel !== 'general')
                .map(channel => channel.toUpperCase())
                .join(', ');
        },
    },

    methods: {
        getDataToShow(executions) {
            if (executions.length) {
                //me guardo la ultima execution (que es la primera)
                let lastExecution = executions.shift();
                this.executionStatus = lastExecution.status;
                this.lastExecutionDate = lastExecution.creationDate;
            } else {
                this.executionStatus = '';
                this.lastExecutionDate = '';
            }
        },

        toggleMessage() {
            this.showFullMessage = !this.showFullMessage;
        },
        adjustMaxLength() {

            const width = window.innerWidth;
            if (width <= 576) {
                this.maxMessageLength = 700;
            } else if (width <= 768) {
                this.maxMessageLength = 150;
            } else {
                this.maxMessageLength = 300;
            }
        },

        showSuccess(text) {
            this.$swal.fire({
                title: 'Success!',
                text: text,
                icon: 'success',
                confirmButtonText: 'Ok',
            });
        },
        showError(text) {
            this.$swal.fire({
                title: 'Error!',
                text: text,
                icon: 'error',
                confirmButtonText: 'Ok',
            });
        },

        formatDate(date) {
            const d = new Date(date);
            const day = d.getDate().toString().padStart(2, '0');
            const month = (d.getMonth() + 1).toString().padStart(2, '0');
            const year = d.getFullYear();
            const hour = d.getHours().toString().padStart(2, '0');
            const minutes = d.getMinutes().toString().padStart(2, '0');
            return `${day}/${month}/${year} ${hour}:${minutes}`;
        },

    },
};
</script>


<style scoped>
.text-truncate {
    overflow: hidden;
    white-space: nowrap;
}

.show-more-text {
    cursor: pointer;
    color: blue;
}

.custom-cursor:hover {
    cursor: pointer;
    color: grey;
}

.text-container {
    word-wrap: break-word;
    white-space: normal;
    max-width: 700px;
    overflow-y: auto;
    max-height: 200px;
}

.custom-display {
    display: contents;
}

.custom-font-size {
    font-size: smaller;
}
</style>