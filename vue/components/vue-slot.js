var slotComponentP = Vue.component('slot-component-p', {
    props: ['menuItems'], // pass in the menu from the app
    template: 
    `
        <button><slot></slot></button>
    `
});

var slotComponentC = Vue.component('slot-component-c', {
    props: ['menuItems'], // pass in the menu from the app
    template: 
    `
        
    `
});