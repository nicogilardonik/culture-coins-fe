<template>
    <div class="login-container">
        <form @submit.prevent="login" class="login-form">
            <h2 class="login-heading">Login</h2>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="form.email" class="form-control" placeholder="Enter your email"
                    required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="form.password" class="form-control"
                    placeholder="Enter your password" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Login</button>
        </form>
    </div>
</template>
  
<script>
export default {
    name: 'Login',

    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.$store.commit('toggleUnfoldable');
            vm.$store.commit('updateSidebarVisible', false);
            vm.$store.commit('setPageTitle', 'Login');
        });
    },

    data() {
        return {
            form: {
                email: '',
                password: ''
            }
        };
    },
    methods: {
        login() {
            console.log('Logging in...');
            console.log('Email:', this.form.email);
            console.log('Password:', this.form.password);
        },

        validate() {
            if (this.email == '') {
                throw 'Please enter a title';
            }

            if (!this.password || this.password.length < 8) {
                throw 'Please enter a password';
            }
        },


    }
};
</script>
  
<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-form {
    max-width: 360px;
    width: 100%;
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
