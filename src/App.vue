<template>
<div class="container mt-5" id="app">
  <h1>Table UI</h1>
  
  <hr>
  
  <div class="d-flex align-items-center">     
    <button type="button" class="btn btn-primary" @click="load">Load data</button>
    
    <div v-if="processing" class="spinner-border text-primary ml-3" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  
  <div v-if="error" class="alert alert-danger mt-3" role="alert">
    {{error}}
  </div>
  
  <table-ui class="mt-3 p-3 bg-white rounded shadow" />
</div>
</template>

<script>
import TableUI from './components/TableUI.vue';


export default {
  components: {
    'table-ui': TableUI
  },
  computed: {
    error() {
      return this.$store.getters.getError;
    },
    
    processing() {
      return this.$store.getters.getProcessing;
    }
  },
  methods: {
    load() {
      this.$store.dispatch('getProducts');
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
