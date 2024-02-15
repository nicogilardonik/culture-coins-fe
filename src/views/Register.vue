<template></template>
<script>

export default{
    name: 'Register',
    data(){
        return{
        form: {
            email: '',
            password: '',
            confirmPassword: ''
        }
        }
    },
    methods: {
        register(){
        console.log('Registering...')
        }
    }
}

</script>
<style scoped></style>
