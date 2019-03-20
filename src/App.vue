<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Filters & Mixins</h1>
        <p>{{ text | toUppercase | toLowercase }}</p>
        <hr>
        <input type="text" v-model="filterText" class="form-control">
        <ul>
          <li v-for="fruit in filteredFruits" :key="fruit">{{ fruit }}</li>
        </ul>
        <hr>
        <app-list></app-list>
      </div>
    </div>
  </div>
</template>

<script>
import List from './List.vue';
import { fruitMixin } from './fruitMixin';

export default { 
  data() {
    return {
      text: 'Hello there!',
    }
  },
  filters: {
    toUppercase(value) {
      return value.toUpperCase();
    }
  },
  components: {
    appList: List
  },
  mixins: [fruitMixin],
  created() {
    console.log('App Created');
  }

}
</script>

<style>

</style>
