<template>
<div class="container-fluid">
    <div class="d-flex justify-content-between" style="margin: 1%;">
        <h2>On Boarding App</h2>
        <div class="d-flex">
            <h3>
                <UserIcon class="me-2" style="height: 40px; width: 40px;" />Hello, {{ adminName }}
            </h3>
            <button style="height: 40px; width: 80px;" class="btn btn-danger ms-2 me-2" @click="logout">Logout</button>
        </div>
    </div>
    <div class="btn-group mt-4 ms-4" role="group">
        <input value="operateStudent" type="radio" class="btn-check" name="btnradio" id="btnradio1" v-model="option" autocomplete="off" checked>
        <label class="btn btn-outline-primary" for="btnradio1">Onboarding Form</label>

        <input value="listStudent" type="radio" class="btn-check" name="btnradio" id="btnradio2" v-model="option" autocomplete="off">
        <label class="btn btn-outline-primary" for="btnradio2">List Students</label>
    </div>
</div>
</template>

<script>
import {
    UserIcon
} from '@heroicons/vue/20/solid';
export default {
    name: 'HeaderComp',
    components: {
        UserIcon,
    },
    props: {
        setOption: Function
    },
    data() {
        return {
            option: 'operateStudent',
            adminName: ''
        }
    },
    watch: {
        option(curVal) {
            console.log(this.option);
            this.setOption(curVal);
        }
    },
    mounted() {
        let admin = localStorage.getItem('admin');
        if (admin) {
            admin = JSON.parse(admin);
            this.adminName = admin.name;
        }
    },
    methods: {
        logout(){
            localStorage.removeItem('admin');
            this.$router.push('/login')
        }
    }
};
</script>

<style>
</style>
