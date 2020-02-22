Vue.component('prompt-component', {
    template: `
            
            <div><p>{{message}}</p>
            <button class="btn btn-circle btn-secondary" @click="sayHi">Say Hi!</button></div>
            
    `,   
    data: function () {
      return {
        message: 'Hello World!'
      }
    },
    methods: {
      sayHi: function () {
        alert('Hi');
      }
    }
  });
  