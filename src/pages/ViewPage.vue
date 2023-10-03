<template>
    <HeaderComp :setOption="setOption"/>
    <ViewStudent v-if="option==='operateStudent'"/>
    <StudentList v-if="option==='listStudent'"/>
</template>

<script>
import HeaderComp from '../components/HeaderComp.vue';
import ViewStudent from '../components/ViewStudent.vue';
import StudentList from '../components/StudentList.vue';

export default {
    name: 'EditPage',
    components: {
        HeaderComp,
        ViewStudent,
        StudentList
    },
    data(){
        return {
            option: 'operateStudent',
        }
    },
    methods: {
        setOption(type){
            this.option = type;
        }
    },
}
</script>