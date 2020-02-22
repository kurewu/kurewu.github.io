var headercomponent2 = Vue.component('header-component-2', {
    props: ['menuItems'], // pass in the menu from the app
    template: '<div class="my-3"><ul class="list-group"><li class="list-group-item list-group-item-action" v-for="item in menuItems">{{ item  }}</li></ul></div>'
});