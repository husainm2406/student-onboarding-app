<template>
<ModalComp :deleteId="deleteId" :deleteStudent="deleteStudent" />
<div class="d-flex justify-content-between">
    <div class="dropdown ms-5 mt-3 mb-4">
        <select class="form-select" v-model="category" @change="showByCategory">
            <option selected value="All">All</option>
            <option value="International">International</option>
            <option value="Domestic">Domestic</option>
        </select>
    </div>
    <div class="input-group ms-5 mt-3 me-4 mb-4" style="width: 40%;">
        <input type="text" class="form-control" placeholder="Search student by name" v-model="search" @input="()=>searchByName()">
    </div>
</div>
<div class="container-fluid d-flex flex-wrap justify-content-around" v-if="students.length>0">

    <div v-for="student in students" :key="student.studentId">
        <div class="card m-4" style="width: 30rem; border-radius: 25px;" :style="{backgroundColor: student.studentCategory==='International'?'lightblue':'orange'}">
            <div class="card-body">
                <h4 class="card-title">{{ student.name }}</h4>
                <h5 class="card-subtitle mb-2 text-muted">{{ student.studentCategory }}</h5>
                <hr />
                <p style=" font-weight: 400; text-align: center;">click View for details</p>

                <!-- <ul :style="{backgroundColor: student.studentCategory==='International'?'lightblue':'orange'}">
                    <span class="field">Submitted Documents:-</span>
                    <li class="list-group-item" v-for="(doc, i) in student.submittedDocuments" :key="i">
                        {{ i+1 }}. {{ doc }}
                    </li>
                    <hr />
                    <li class="list-group-item"><span class="field">Student DOB:-</span> {{ student.dob }}</li>
                    <hr />
                    <li class="list-group-item"><span class="field">Father's Name:-</span> {{ student.fatherName}}</li>
                    <hr />
                    <li class="list-group-item"><span class="field">Mother's Name:-</span> {{ student.motherName }}</li>
                    <hr />
                    <li class="list-group-item"><span class="field">Last class score:-</span> {{ student.lastScore }}%</li>
                    <hr />
                </ul> -->
            </div>
            <div class="d-flex justify-content-end me-3">
                <button type="button" class="btn btn-success" @click="this.$router.push(`/edit/${student.studentId}`)">Edit</button>
                <button type="button" class="btn btn-secondary" @click="this.$router.push(`/view/${student.studentId}`)">View</button>
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="deleteId=student.studentId">Delete</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ModalComp from './ModalComp.vue';

export default {
    name: 'StudentList',
    data() {
        return {
            allData: [],
            students: [],
            deleteId: "",
            search: "",
            category: 'All'
        };
    },
    mounted() {
        let studentData = localStorage.getItem('studentArr') ? JSON.parse(localStorage.getItem('studentArr')) : [];
        if (studentData.length > 0) {
            this.allData = this.students = studentData;
        }
    },
    methods: {
        deleteStudent(id) {
            let studentData = JSON.parse(localStorage.getItem('studentArr'));
            let tempArr = studentData.filter((student) => (student.studentId !== id));
            localStorage.setItem('studentArr', JSON.stringify(tempArr));
            this.students = tempArr
        },
        searchByName() {
            this.students = this.allData.filter(student => student.name.toLowerCase().includes(this.search.toLowerCase()));
            console.log(this.students);
        },
        showByCategory() {
            if(this.category === 'All'){
                this.students = this.allData;
            } else if(this.category === 'International'){
                this.students = this.allData.filter(student => student.studentCategory === 'International');
            } else{
                this.students = this.allData.filter(student => student.studentCategory === 'Domestic');
            }
        }
    },
    components: {
        ModalComp
    }
}
</script>

<style scoped>
.btn {
    margin-right: 2.5%;
    margin-bottom: 2%;
}

hr {
    margin: 3%;
}

.field {
    font-weight: 500;
}
</style>
