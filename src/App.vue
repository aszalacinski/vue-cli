<template>
  <div class="container">
    <app-header :quoteCount="quotes.length" :maxQuotes="maxQuotes"></app-header>
    <app-new-quote @quoteAdded="newQuote"></app-new-quote>
    <app-quote-grid :quotes="quotes" @quoteDeleted="deleteQuote"></app-quote-grid>
    <div class="row">
      <div class="col-sm-12 text-center">
        <div class="alert alert-info">Info: Click on a quote to delete it</div>
      </div>
    </div>
  </div>
</template>

<script>
import QuoteGrid from './components/QuoteGrid.vue';
import NewQuote from './components/NewQuote.vue';
import Header from './components/Header.vue';


export default { 
  data: function() {
    return {
      quotes: [
        'Just a quote to see something'
      ],
      maxQuotes: 10
    }
  },
  components: {
    appQuoteGrid: QuoteGrid,
    appNewQuote: NewQuote,
    appHeader: Header
  },
  methods: {
    newQuote: function (quote) {
      if(this.quotes.length >= this.maxQuotes) {
        return alert('Please delete quotes first');
      }
      this.quotes.push(quote);
    },
    deleteQuote: function(index) {
      this.quotes.splice(index, 1);
    }
  }
}
</script>

<style>

</style>
