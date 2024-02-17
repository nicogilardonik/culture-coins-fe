<template>
    <div class="register-container">
        <form class="register-form">
            <h2 class="register-heading">Register</h2>
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" v-model="firstName" class="form-control" placeholder="Enter your first name"
                    required>
            </div>
            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" v-model="lastName" class="form-control" placeholder="Enter your last name"
                    required>
            </div>
            <div class="form-group">
                <label for="nickName">Nick Name</label>
                <input type="text" id="nickName" v-model="nickName" class="form-control" placeholder="Enter your nick name"
                    required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" class="form-control" placeholder="Enter your email" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" class="form-control"
                    placeholder="Enter your password" required>
            </div>
            <div class="form-group">
                <label for="nickName">Confirm Password</label>
                <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control"
                    placeholder=" Confirm your password" required>
            </div>
            <button type="button" class="btn btn-primary btn-block" @click="register">Register</button>
        </form>
    </div>
</template>
  
<script>

import CommonService from '@/services/commonServices'
import {RegisterModel} from '@/components/Auth/models/RegisterModel'

export default {
    name: 'Login',

    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.$store.commit('toggleUnfoldable');
            vm.$store.commit('updateSidebarVisible', false);
            vm.$store.commit('setPageTitle', 'Register');
        });
    },

    data() {
        return {
            firstName: '',
            lastName: '',
            nickName: '',
            email: '',
            password: '',
            confirmPassword: ''

        };
    },
    methods: {

        async register() {
            try {
                this.validate();
                let registerModel = new RegisterModel(this.firstName, this.lastName, this.nickName, this.email, this.password);
                 let response = await CommonService.register(registerModel);
                  console.log(response);
            } catch (error) {
                let errorMessage = error.error? error.error : error.message ? error.message : error;
                this.showError(errorMessage);
            }
        },

        validate() {
            if (!this.firstName) {
                throw 'Please enter a first name';
            }
            if (!this.lastName) {
                throw 'Please enter a last name';
            }
            if (!this.nickName) {
                throw 'Please enter a nick name';
            }
            if (!/\S+@\S+\.\S+/.test(this.email)) {
                throw 'Please enter a valid email';
            }
            if (!this.password || this.password.length < 8) {
                throw 'Please enter a password';
            }
            if (this.password !== this.confirmPassword) {
                throw 'Password and repit password not match';
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


    }
};
</script>
  
<style scoped>
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.register-form {
    max-width: 360px;
    width: 100%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.register-heading {
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
