<template>
    <div class="login-container">
        <div class="form-container">
            <form class="login-form">
                <h2 class="login-heading">Login</h2>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" class="form-control" placeholder="Enter your email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" class="form-control"
                        placeholder="Enter your password" required>
                </div>
                <button type="button" class="btn btn-primary btn-block" @click="login">Login</button>
                <p>Don't you have an account? <router-link class="link-style" to="/register">Create Account</router-link> </p>
            </form>
        </div>
    </div>
</template>

<script>

import CommonService from '@/services/commonServices'

export default {
    name: 'Login',

    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.$store.commit('toggleUnfoldable');
            vm.$store.commit('updateSidebarVisible', false);
            vm.$store.commit('updateShowToggleSidebar', false);
            vm.$store.commit('setPageTitle', 'Login');
        });
    },

    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {

        async login() {
            try {
                this.validate();
                let response = await CommonService.login(this.email, this.password);
                this.setTokenAndProfile(response);
                this.$store.commit('toggleUnfoldable');
                //this.$store.commit('updateSidebarVisible', true);
                this.$store.commit('updateShowToggleSidebar', true);
                this.showSuccess(response.message);
            } catch (error) {
                let errorMessage = error.error ? error.error : error.message ? error.message : error;
                this.showError(errorMessage);
            }
        },

        validate() {
            if (!/\S+@\S+\.\S+/.test(this.email)) {
                throw 'Please enter a valid email';
            }
            if (!this.password || this.password.length < 8) {
                throw 'Please enter a password';
            }
        },

        async setTokenAndProfile(response) {
            localStorage.setItem('token', response.token);
            let userProfile = await CommonService.getUserProfile();
            this.$store.commit('setUserProfile', userProfile);
            this.$router.push('/MiInfogain/LastActivity');
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
    }
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10%;
}

.form-container {
    max-width: 360px;
    width: 100%;
}

.login-form {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.login-heading {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-weight: bold;
}

.form-control {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
}

.btn-primary:hover {
    background-color: #0056b3;
}
</style>
