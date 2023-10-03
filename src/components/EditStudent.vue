<template>
<h5 style="text-align: center;">Onboarding Form(Edit)</h5><br />
<div class="d-flex justify-content-center mt-2 mb-3">
    <form @submit.prevent="saveData()">
        <!-- name -->
        <div class="mb-2 row">
            <label for="name" class="custom-label form-label">Student Name</label>
            <div class="col-sm-12">
                <input type="text" class="form-control" id="name" v-model.trim="form.name">
                <span style="color: red;" v-if="error.indexOf('name')>-1">Enter non-empty valid name.</span>
            </div>
        </div>
        <!-- category -->
        <div class="mb-2 row">
            <label for="category" class="col-sm-2 col-form-label">Category</label>
            <div class="col-sm-12">
                <select class="form-select" v-model="form.studentCategory" @change="getRequiredDocs" id="category">
                    <option disabled selected value="Category">Category</option>
                    <option value="International">International</option>
                    <option value="Domestic">Domestic</option>
                </select>
                <span style="color: red;" v-if="error.indexOf('studentCategory')>-1">Select a category from the list.</span>
            </div>
        </div>
        <!-- documents -->
        <div v-if="(form.studentCategory!=='Category' && reqDocuments!==null)">
            <label for="documents" class="col-sm-2 col-form-label">Documents</label>
            <div v-for="(value, key) in reqDocuments" :key="key">
                <div class="form-check" style="margin-left: 27%;">
                    <input :value="key" class="form-check-input" type="checkbox" :id="'flexCheckChecked' + key" v-model="form.submittedDocuments">
                    <label class="form-check-label " :for="'flexCheckChecked'+key">
                        {{key}} <span style="color: red ;" v-if="value">*</span>
                    </label>
                    <span style="color: red;" v-if="form.submittedDocuments.indexOf(key)==-1 && value && reqDocumentsFlag">Required</span>
                </div>
            </div>
        </div>
        <!-- dob -->
        <div class="mb-2 row">
            <label for="dob" class="custom-label form-label">DOB</label>
            <div class="col-sm-12">
                <input type="date" class="form-control" id="dob" v-model="form.dob">
                <span style="color: red;" v-if="error.indexOf('dob')>-1">Enter a valid dob.</span>
            </div>
        </div>
        <!-- father's name -->
        <div class="mb-2 row">
            <label for="fatherName" class="custom-label form-label">Father's Name</label>
            <div class="col-sm-12">
                <input type="text" class="form-control" id="fatherName" v-model.trim="form.fatherName">
                <span style="color: red;" v-if="error.indexOf('fatherName')>-1">Enter a valid non-empty name.</span>
            </div>
        </div>
        <!-- mother's name -->
        <div class="mb-2 row">
            <label for="motherName" class="custom-label form-label">Mother's Name</label>
            <div class="col-sm-12">
                <input type="text" class="form-control" id="motherName" v-model.trim="form.motherName">
                <span style="color: red;" v-if="error.indexOf('motherName')>-1">Enter a valid non-empty name.</span>
            </div>
        </div>
        <!-- last class score -->
        <div class="mb-2 row">
            <label for="lastScore" class="custom-label form-label">Last class score</label>
            <div class="col-sm-12">
                <input v-bind:min="0" v-bind:max="100" type="number" class="form-control" id="lastScore" v-model.number="form.lastScore">
                <span style="color: red;" v-if="error.indexOf('lastScore')>-1">Enter a valid score between 0-100.</span>
            </div>
        </div>
        <!-- submit btn -->
        <div class="mt-2 d-flex justify-content-center">
            <button type="submit" class="btn btn-primary mx-2">Onboard</button>
            <button type="button" class="btn btn-info mx-2" v-on:click="clearData">Clear</button>
        </div>
    </form>
</div>
</template>

    
<script>
import {
    useRoute
} from 'vue-router';
import axios from 'axios';
export default {
    name: "EditStudent",
    data() {
        return {
            form: {},
            reqDocuments: null,
            error: [],
            reqDocumentsFlag: false,
        };
    },
    mounted() {
        const id = useRoute().params.id;
        let studentArr = localStorage.getItem('studentArr');
        studentArr = JSON.parse(studentArr);
        let tempStudent = studentArr.filter((student) => student.studentId === id);
        this.form = tempStudent[0];
        this.getRequiredDocs();
    },
    methods: {
        async getRequiredDocs() {
            let url = "http://localhost:3000/";
            if (this.form.studentCategory === 'International') {
                url += 'international_docs';
            } else if (this.form.studentCategory === 'Domestic') {
                url += 'domestic_docs';
            }
            let response = await axios.get(url);
            this.reqDocuments = response.data;
        },
        clearData() {
            this.form.studentCategory = 'Category';
            this.form.name = this.form.dob = this.form.fatherName = this.form.motherName = this.form.lastScore = null;
            this.error = [];
            this.reqDocumentsFlag = false;

        },
        validateFields() {
            this.error = [];
            for (let item in this.form) {
                if (this.form[item] === null || this.form[item].length === 0 || this.form[item] === 'Category') {
                    this.error.push(item);
                }
            }
        },
        saveData() {
            this.validateFields();
            this.reqDocumentsFlag = true;
            if (this.error.length > 0) {
                return;
            }
            if(this.form.studentCategory==='International' && this.form.submittedDocuments.length<6){
                return;
            }
            if(this.form.studentCategory==='Domestic' && this.form.submittedDocuments.length<4){
                return;
            }
            const data = {
                studentId: this.form.studentId,
                name: this.form.name,
                studentCategory: this.form.studentCategory,
                submittedDocuments: this.form.submittedDocuments,
                dob: this.form.dob,
                fatherName: this.form.fatherName,
                motherName: this.form.motherName,
                lastScore: this.form.lastScore
            };
            let studentArr = JSON.parse(localStorage.getItem('studentArr'));
            let finalArr = studentArr.filter((student) => student.studentId !== this.form.studentId);
            finalArr.push(data);
            localStorage.setItem('studentArr', JSON.stringify(finalArr));
            this.clearData();
        },
    },
}
</script>

    
<style scoped>
    </style>
