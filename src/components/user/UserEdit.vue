<template>
    <div>
        <h3>Edit the User</h3>
        <p>Editing User {{ id }}</p>
        <p>Locale: {{ $route.query.locale }}</p>
        <p>Analytics: {{ $route.query.q }}</p>
        <hr>
        <button class="btn btn-primary" @click="confirmed = true">Confirm</button>
        <div style="height: 700px"></div>
        <p id="data">Some extra data</p>
    </div>
</template>
<script>
export default {
    props: ['id'],
    data() {
        return {
            confirmed : false
        }
    },
    beforeRouteLeave(to, from, next) {
        if(this.confirmed) {
            next();
        } else {
            if(confirm('Are you sure?')) {
                next();
            } else {
                next(false);
            }
        }
    }
}
</script>
