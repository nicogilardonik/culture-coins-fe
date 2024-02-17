<template>
    <CCol :sm="12" :md="12" class="p-1">
        <CCard>
            <CCardHeader class="d-flex justify-content-between">
                <div class="d-flex align-self-center">
                    <h4 class="d-inline-block">{{ data.title }}</h4>
                </div>
                <div class="justify-content-center align-self-center">
                    <CTooltip content="Edit" placement="top">
                        <template #toggler="{ on }">
                            <IconPencil color="#f39c12" @click="edit(data._id)" size="1.8rem" class="m-1 custom-cursor"
                                data-toggle="tooltip" data-placement="top" title="Tooltip on top" v-on="on" />
                        </template>
                    </CTooltip>
                    <CTooltip content="Delete" placement="top">
                        <template #toggler="{ on }">
                            <IconTrash color="#e74c3c" @click="deleteTemplate(data._id, data.title)" size="1.8rem"
                                class="m-1 custom-cursor" data-toggle="tooltip" data-placement="top" title="Tooltip on top"
                                v-on="on" />
                        </template>
                    </CTooltip>
                </div>
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
                            <strong>Status: </strong> {{ data.status }} <br>
                            <CButton color="primary" size="sm" class="kibana-font-weight" @click="nextStep(data._id)">
                                Next Step
                            </CButton>

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
                        <div><strong>Updated at : </strong> {{ formatDate(data.updatedAt) }}</div>
                    </CCol>
                </CRow>
            </CCardFooter>
        </CCard>
    </CCol>
</template>

<script>
import { IconPencil, IconTrash } from '@tabler/icons-vue';
import { cilMediaPlay, cilPencil, cilTrash } from '@coreui/icons';
import CustomEditor from '@/components/CustomEditor.vue';
import AskYourCommunityService from '@/components/AskYourCommunity/services/askYourCommunityService';

export default {

    name: "AskYourCommunityCard",

    emits: ['template-deleted', 'edit-template', 'show-support-request'],

    components: {
        IconPencil,
        IconTrash,
        CustomEditor
    },
    props: {
        data: {
            type: Object,
            required: true
        },
    },

    setup() {
        return {
            cilMediaPlay, cilPencil, cilTrash
        };
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


        deleteTemplate(id, title) {
            this.$swal.fire({
                title: 'Borrar template',
                text: `Desea borrar el template ${title}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal.fire(
                        'Borrado',
                        `El template ${title} ha sido borrado.`,
                        'success'
                    );
                    this.$emit('template-deleted', id);
                }
            });
        },
        edit(id) {
            this.$emit('edit-template', id);
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

        async nextStep(id) {
            try {
                await AskYourCommunityService.changeStatus(id);
                this.showSuccess('Status changed successfully');
                this.$emit('show-support-request');
            } catch (error) {
                console.log(error);
                this.showError(error.error ?? error);
            }
        }
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