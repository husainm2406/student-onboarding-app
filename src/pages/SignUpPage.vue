<template>
<h4 class="mt-5" style="text-align: center;">Sign Up </h4>
<div class="d-flex justify-content-center align-items-center mt-4 mb-3">
    <form style="width: 30%;" @submit.prevent="submit">
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input placeholder="Enter Name" type="text" class="form-control" id="name" v-model="form.name">
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input placeholder="Enter Email" type="email" class="form-control" id="email" v-model="form.email">
        </div>
        <div class="mb-3">
            <label for="pass" class="form-label">Password</label>
            <input placeholder="Enter Password" type="password" autocomplete="current-password" class="form-control" id="pass" v-model="form.password">
        </div>
        <div class="mt-2 d-flex justify-content-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-info" @click="this.$router.push('/login')">Login</button>
        </div>
    </form>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'SignUpPage',
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: ""
            },
        }
    },
    methods: {
        async submit() {
            try {
                const url = "http://localhost:3000/admins";
                let response = await axios.post(url, this.form);
                if(response.status==201){
                    localStorage.setItem('admin', JSON.stringify(response.data));
                    this.$router.push('/');
                    return;
                }
                return;
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted(){
        let admin = localStorage.getItem('admin');
        if (admin) {
            this.$router.push({
                name: 'Home'
            });
        }
    }
}
</script>
