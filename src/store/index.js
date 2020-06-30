import Vue from 'vue';
import Vuex from 'vuex';
import { get, set } from '@/utils/vuex';
import { getProducts, deleteProducts } from '@/api/request';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    processing: false,
    error: null,
    products: []
  },

  getters: {
    getProducts: get('products'),
    getProcessing: get('processing'),
    getError: get('error'),
  },

  mutations: {
    setProducts: set('products'),
    setProcessing: set('processing'),
    setError: set('error'),
  },

  actions: {
    getProducts: async ({ commit }) => {
      commit('setProcessing', true);
      commit('setError', null);

      try {
        const products = await getProducts();
        commit('setProducts', products);
      } catch (e) {
        commit('setProducts', []);
        commit('setError', 'An error occurred while loading the product list!');
      }

      commit('setProcessing', false);
    },

    deleteProducts: async ({ commit, getters }, list) => {
      commit('setProcessing', true);
      commit('setError', null);

      try {
        await deleteProducts();
        const products = getters.getProducts.filter(p => !list.some(l => p.id === l.id));
        commit('setProducts', products);
      } catch (e) {
        commit('setError', 'An error occurred while deleting items!');
      }

      commit('setProcessing', false);
    }
  },
  modules: {}
});