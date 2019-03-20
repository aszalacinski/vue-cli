<template>
    <div>
        <h1>Filters & Mixins</h1>
        <hr>
        <input type="text" v-model="filterText" class="form-control">
        <ul>
            <li v-for="fruit in filteredFruits" :key="fruit">{{ fruit }}</li>
        </ul>
    </div>
</template>

<script>
export default { 
  data() {
    return {
      fruits: ['Apple', 'Banana', 'Mango', 'Melon'],
      filterText: ''
    }
  },
  computed: {
    filteredFruits() {
      return this.fruits.filter((element) => {
        return element.match(this.filterText);
      });
    }
  }

}
</script>

<style>

</style>
