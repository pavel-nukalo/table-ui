<template>
<div>  
  <div class="d-flex">  
    <div class="ml-auto">
      <button type="button" class="btn btn-outline-danger" :disabled="!selectedProducts.length" @click="deleteProducts">
        Delete
      </button>
    </div>
    
    <div class="ml-2">
      <select class="custom-select" v-model.number="itemsPerPage">
        <option value="10">10 Per Page</option>
        <option value="15">15 Per Page</option>
        <option value="20">20  Per Page</option>
      </select>      
    </div>
    
    <div class="ml-2">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li :class="'page-item' + (startPageRange > 0 ? '' : ' disabled')">
            <a class="page-link" href="#" @click="previousPage">
              <i class="fas fa-chevron-left"></i>
            </a>
          </li>
          
          <li class="page-item disabled">
            <a class="page-link" href="#">
              {{visibleProducts.length ? startPageRange + 1 : 0}}...{{startPageRange + visibleProducts.length}} of {{count}}
            </a>
          </li>
          <li :class="'page-item' + (count >= (startPageRange + visibleProducts.length + 1) ? '' : ' disabled')">
            <a class="page-link" href="#" @click="nextPage">
              <i class="fas fa-chevron-right"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    
    <div class="ml-2">
      <div class="dropdown d-inline-block">
        <button type="button" class="btn border dropdown-toggle" data-toggle="dropdown">
          {{headers.filter(h => h.visible).length}} columns selected
          <span class="glyphicon glyphicon-cog"></span>
        </button>
      
        <ul class="dropdown-menu w-100" @click.stop>
          <li class="p-2">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="header_checkbox_all" v-model="allHeadersSelected">
              <label class="custom-control-label" for="header_checkbox_all">Select all</label>
            </div>
          </li>
          
          <li v-for="(header, i) in headers" :key="i" class="p-2">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" :id="'header_checkbox' + i" v-model="header.visible">
              <label class="custom-control-label" :for="'header_checkbox' + i">{{header.text}}</label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
    
  <table class="table table-striped">
    <thead>
      <tr>
        <th v-if="visibleHeaders.length">Select</th>
        
        <th v-for="(header, i) in visibleHeaders" :key="i">
          {{header.text}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(product, i) in visibleProducts" :key="i">
        <td v-if="visibleHeaders.length">
          <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" :id="'product_checkbox' + i" :value="product" v-model="selectedProducts">
            <label class="custom-control-label" :for="'product_checkbox' + i"></label>
          </div>
        </td>
        
        <td v-for="(header, j) in visibleHeaders" :key="`${i}${j}`">
          {{product[header.value]}}
        </td>
      </tr>
      
      <tr v-if="!visibleProducts.length">
        <td class="text-center" colspan="7">No data available</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  data() {
    return {
      itemsPerPage: 10,
      startPageRange: 0,
      headers: [
        {
          text: 'Product (100g serving)',
          value: 'product',
          visible: true
        },
        {
          text: 'Calories',
          value: 'calories',
          visible: true
        },
        {
          text: 'Fat (g)',
          value: 'fat',
          visible: true
        },
        {
          text: 'Carbs (g)',
          value: 'carbs',
          visible: true
        },
        {
          text: 'Protein (g)',
          value: 'protein',
          visible: true
        },
        {
          text: 'Iron (%)',
          value: 'iron',
          visible: true
        }
      ],
      selectedProducts: []
    }
  },
  computed: {
    allHeadersSelected: {
      get() {
        return this.headers.filter(h => h.visible).length === this.headers.length;
      },
      set(val) {
        return this.headers.forEach(h => h.visible = val);
      }
    },
    visibleHeaders() {
      return this.headers.filter(h => h.visible);
    },
    visibleProducts() {
      const endPageRange = this.startPageRange + this.itemsPerPage;
      return this.$store.getters.getProducts.filter((p, i) => i >= this.startPageRange && i < endPageRange);
    },
    count() {
      return this.$store.getters.getProducts.length;
    }
  },
  methods: {
    previousPage() {
      this.startPageRange -= this.itemsPerPage;
      if (this.startPageRange < 0) this.startPageRange = 0;
    },
    nextPage() {
      this.startPageRange += this.itemsPerPage;
      if (this.startPageRange >= this.count) this.startPageRange = this.count - 1;
    },
    deleteProducts() {
      this.$store.dispatch('deleteProducts', this.selectedProducts);
      this.selectedProducts = [];
    }
  }
}
</script>

<style>
  
</style>