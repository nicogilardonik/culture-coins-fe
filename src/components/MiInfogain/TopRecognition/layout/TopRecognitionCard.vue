<template>

<CCard class="m-1">
    <CCardHeader>
        <h4 class="card-title">{{ recognition._id }} {{ recognition.count }}</h4>
    </CCardHeader>
    <CCardBody>
        <h3>Last recognition</h3>
        <b>Sender: </b> <strong>{{ recognition.userFromNickName }}</strong> destination <strong>{{ recognition.userToNickName }}</strong> <br>
        <b>Created at:</b> {{ formatDate(recognition.createdAt) }} <br>
        <b>Message:</b> <span v-html="removePTags(recognition.message)"></span>
    </CCardBody>
</CCard>

</template>
<script>
 export default {
    name: 'TopRecognitionCard',
    props: {
        recognition: {
            type: Object,
            required: true
        }
    },
    methods: {
        formatDate(date) {
            const d = new Date(date);
            const day = d.getDate().toString().padStart(2, '0');
            const month = (d.getMonth() + 1).toString().padStart(2, '0');
            const year = d.getFullYear();
            const hour = d.getHours().toString().padStart(2, '0');
            const minutes = d.getMinutes().toString().padStart(2, '0');
            return `${day}/${month}/${year} ${hour}:${minutes}`;
        },
        removePTags(message) {
            return message.replace(/<\/?p>/g, '').trim();
        }
    }
 }

</script>
<style></style>