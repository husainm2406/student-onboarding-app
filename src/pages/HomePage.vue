<template>
    <HeaderComp :setOption="setOption"/>
    <AddStudent v-if="option==='operateStudent'"/>
    <StudentList v-if="option==='listStudent'"/>
</template>

<script>
import HeaderComp from '../components/HeaderComp.vue';
import AddStudent from '../components/AddStudent.vue';
import StudentList from '../components/StudentList.vue';

export default {
    name: 'HomePage',
    components: {
        HeaderComp,
        AddStudent,
        StudentList
    },
    data(){
        return {
            option: 'operateStudent'
        }
    },
    methods: {
        setOption(type){
            this.option = type;
        }
    },
    mounted(){
        let admin = localStorage.getItem('admin');
        console.log('admin',admin);
        if(!admin){this.$router.push({name: 'Login'})}
    }
}
</script>