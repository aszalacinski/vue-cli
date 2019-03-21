import User from "./components/user/User.vue";
import Home from "./components/Home.vue";
import UserStart from "./components/user/UserStart.vue";
import UserDetail from "./components/user/UserDetail.vue";
import UserEdit from "./components/user/UserEdit.vue";

export const routes = [
         { path: "", component: Home, name: 'home' },
         {
           path: "/user",
           component: User,
           children: [
             { path: "", component: UserStart },
             { path: ":id", component: UserDetail, props: true },
             { path: ":id/edit", component: UserEdit, props: true, name: 'userEdit' }
           ]
         }
       ];
