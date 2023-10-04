<template>
<h4 class="mt-5" style="text-align: center;">Login</h4>
<div class="d-flex justify-content-center align-items-center mt-4 mb-3">
    <form style="width: 30%;" @submit.prevent="submit">
        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input placeholder="Enter Email" type="email" class="form-control" id="email" v-model="form.email">
            <span style="color: red;" v-if="error.indexOf('email')>-1">Email id required.</span>
        </div>
        <div class="mb-3">
            <label for="pass" class="form-label">Password</label>
            <input placeholder="Enter Password" type="password" autocomplete="current-password" class="form-control" id="pass" v-model="form.password">
            <span style="color: red;" v-if="error.indexOf('password')>-1">Password is required.</span>
        </div>
        <div class="mt-2 d-flex justify-content-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-dark" @click="this.$router.push('/sign-up')">Sign Up</button>
        </div>
    </form>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'LoginPage',
    data() {
        return {
            form: {
                email: '',
                password: ""
            },
            error: [],
        }
    },
    methods: {
        validateFields() {
            this.error = [];
            for (let item in this.form) {
                if (this.form[item] === null || this.form[item].length === 0) {
                    this.error.push(item);
                }
            }
        },
        async submit() {
            this.validateFields();
            if(this.error.length > 0)return;
            try {
                const url = `http://localhost:3000/admins?email=${this.form.email}&password=${this.form.password}`;
                let response = await axios.get(url);
                if(response.status==200 && response.data.length>0){
                    localStorage.setItem('admin', JSON.stringify(response.data[0]));
                    this.$router.push('/student-onboarding-app/');
                    return;
                }
                return;
            } catch (error) {
                console.log(error);
            }

        }
    },
    mounted() {
        let admin = localStorage.getItem('admin');
        if (admin) {
            this.$router.push({
                name: 'Home'
            });
        }
    }
}
</script>
