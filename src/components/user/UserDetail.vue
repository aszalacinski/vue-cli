<template>
    <div>
        <h3>Some User Details</h3>
        <p>User loaded has ID: {{ id }} </p>
        <router-link tag="button" :to="link" class="btn btn-primary">Edit User</router-link>
    </div>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            link: { 
                name: 'userEdit', 
                query: { 
                    locale: 'en', 
                    q: 100 
                },
                hash: '#data'
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        // NOTE: Cannot acess component details directly; component hasn't been created
        if(true) {            
            next();
        } else {
            next(false);
        }

        //next(false);
        //next('/path');
        //next({obj: details});
        //next(vm => { vm.link}); // YOU CAN access vm via a callback... AFTER this beforeRouteEnter runs
    }
}
</script>
