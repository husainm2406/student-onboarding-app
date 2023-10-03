<template>
<h5 style="text-align: center;">Onboarding Form(View)</h5><br />
<div class="d-flex justify-content-center mt-2 mb-3">
    <form @submit.prevent="saveData()">
        <!-- name -->
        <div class="mb-2 row">
            <label for="name" class="custom-label form-label">Student Name</label>
            <div class="col-sm-12">
                <input disabled type="text" class="form-control" id="name" v-model.trim="form.name">
            </div>
        </div>
        <!-- category -->
        <div class="mb-2 row">
            <label for="category" class="col-sm-2 col-form-label">Category</label>
            <div class="col-sm-12">
                <select disabled class="form-select" v-model="form.studentCategory" @change="getRequiredDocs" id="category">
                    <option disabled selected value="Category">Category</option>
                    <option value="International">International</option>
                    <option value="Domestic">Domestic</option>
                </select>
            </div>
        </div>
        <!-- documents -->
        <div v-if="(form.studentCategory!=='Category')">
            <label for="documents" class="col-sm-2 col-form-label">Documents</label>
            <div v-for="(value, key) in form.submittedDocuments" :key="key">
                <div class="form-check" style="margin-left: 27%;">
                    <input disabled :value="value" class="form-check-input" type="checkbox" :id="'flexCheckChecked' + key" v-model="form.submittedDocuments">
                    <label class="form-check-label " :for="'flexCheckChecked'+key">
                        {{value}} <span style="color: red ;" v-if="value">*</span>
                    </label>
                </div>
            </div>
        </div>
        <!-- dob -->
        <div class="mb-2 row">
            <label for="dob" class="custom-label form-label">DOB</label>
            <div class="col-sm-12">
                <input disabled type="date" class="form-control" id="dob" v-model="form.dob">
            </div>
        </div>
        <!-- father's name -->
        <div class="mb-2 row">
            <label for="fatherName" class="custom-label form-label">Father's Name</label>
            <div class="col-sm-12">
                <input disabled type="text" class="form-control" id="fatherName" v-model.trim="form.fatherName">
            </div>
        </div>
        <!-- mother's name -->
        <div class="mb-2 row">
            <label for="motherName" class="custom-label form-label">Mother's Name</label>
            <div class="col-sm-12">
                <input disabled type="text" class="form-control" id="motherName" v-model.trim="form.motherName">
            </div>
        </div>
        <!-- last class score -->
        <div class="mb-2 row">
            <label for="lastScore" class="custom-label form-label">Last class score</label>
            <div class="col-sm-12">
                <input disabled v-bind:min="0" v-bind:max="100" type="number" class="form-control" id="lastScore" v-model.number="form.lastScore">
            </div>
        </div>
        <!-- submit btn -->
        <div class="mt-2 d-flex justify-content-center">
            <button disabled type="submit" class="btn btn-primary mx-2">Onboard</button>
        </div>
    </form>
</div>
</template>

    
<script>
import {
    useRoute
} from 'vue-router';
export default {
    name: "ViewStudent",
    data() {
        return {
            form: {},
        };
    },
    mounted() {
        const id = useRoute().params.id;
        let studentArr = localStorage.getItem('studentArr');
        studentArr = JSON.parse(studentArr);
        let tempStudent = studentArr.filter((student) => student.studentId === id);
        this.form = tempStudent[0];
    },
}
</script>

    
<style scoped>
    </style>
