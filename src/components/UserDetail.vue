<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <p>User Name: {{ switchName() }}</p>
        <p>User Age: {{ userAge }}</p>
        <button @click="resetName">Reset Name</button>
        <button @click="resetFn()">Reset Name</button>
    </div>
</template>

<script>
    import { eventBus } from '../main';

    export default {
        props: {
            myName: {
                type: String
            },
            resetFn: {
                type: Function
            },
            userAge: Number
        },
        methods: {
            switchName: function() {
                return this.myName.split("").reverse().join("");
            },
            resetName: function() {
                this.myName = 'Aarron';
                this.$emit('nameWasReset', this.myName);
            }
        },
        created: function() {
            eventBus.$on('ageWasEdited', (age) => {
                this.userAge = age;
            });
        }

    }
</script>

<style scoped>
    div {
        background-color: lightcoral;
    }
</style>
