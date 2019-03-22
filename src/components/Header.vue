<template>
    <nav class="navbar navbar-default">
        <div class="navbar-header">
            <router-link to="/" class="navbar-brand">Stock Trader</router-link>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <router-link to="/portfolio" activeClass="active" tag="li"><a>Portfolio</a></router-link>
                <router-link to="/stocks" activeClass="active" tag="li"><a>Stocks</a></router-link>
            </ul>
            <strong class="navbar-text navbar-right" style="margin-right: 1px">Funds: {{ funds | currency }}</strong>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="#" @click="endDay">End Day</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Save & Load <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="">Save Data</a></li>
                        <li><a href="">Load Data</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    computed: {
        funds() {
            return this.$store.getters.funds;
        }
    },
    methods: {
        ...mapActions({
            randomizeStocks: 'randomizeStocks'
        }),
        endDay() {
            this.randomizeStocks();
        }
    }
}
</script>



