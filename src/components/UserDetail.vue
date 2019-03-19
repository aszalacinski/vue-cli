<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <p>User Name: {{ switchName() }}</p>
        <button @click="resetName">Reset Name</button>
        <button @click="resetFn()">Reset Name</button>
    </div>
</template>

<script>
    export default {
        props: {
            myName: {
                type: String
            },
            resetFn: {
                type: Function
            }
        },
        methods: {
            switchName: function() {
                return this.myName.split("").reverse().join("");
            },
            resetName: function() {
                this.myName = 'Aarron';
                this.$emit('nameWasReset', this.myName);
            }
        }
    }
</script>

<style scoped>
    div {
        background-color: lightcoral;
    }
</style>
