<template>
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Delete Student</h5>
        <button ref="close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Are you sure you want to delete ?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" @click="() => {deleteStudent(deleteId); this.$refs.close.click()}">Yes</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">No</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// import bootstrap from 'bootstrap';
export default{
  name: 'ModalComp',
  props: {
    deleteId: String,
    deleteStudent: Function,
  },
  data(){
    return{
      // modal: new bootstrap.Modal(this.$refs.myModal),
    }
  }
}
</script>
