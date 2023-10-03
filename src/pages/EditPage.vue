<template>
    <HeaderComp :setOption="setOption"/>
    <EditStudent v-if="option==='operateStudent'"/>
    <StudentList v-if="option==='listStudent'"/>
</template>

<script>
import HeaderComp from '../components/HeaderComp.vue';
import EditStudent from '../components/EditStudent.vue';
import StudentList from '../components/StudentList.vue';

export default {
    name: 'EditPage',
    components: {
        HeaderComp,
        EditStudent,
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