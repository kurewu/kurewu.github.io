const userRequest = axios.create({
  baseURL: '',
  headers: { 'Content-Type': 'application/json' },
});

function GetTableData() {

    userRequest.interceptors.request.use(function (config) {
      // Do something before request is sent
      console.log("pre-send");
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    return userRequest({
        url: 'json/tableData.json',
        method: 'get',
        timeout: 8000,
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.data)
        .catch(err => console.error(err))
}

function bs4Loading() {
  $.ajax({
      type: "get",
      url: "",
      data: "data",
      dataType: "json",
      contentType: 'application/json; charset=utf-8',
      beforeSend: function () {
          $('#selector').button('loading');
      },
      complete: function () {       
          setTimeout(() => {
              $('#selector').button('reset');
          }, 2000);
      },
  });
}

Vue.directive('demo', {
    bind: function (el, binding, vnode) {
        var s = JSON.stringify;
        el.innerHTML =
            'name: ' + s(binding.name) + '<br>' +
            'value: ' + s(binding.value) + '<br>' +
            'expression: ' + s(binding.expression) + '<br>' +
            'argument: ' + s(binding.arg) + '<br>' +
            'modifiers: ' + s(binding.modifiers) + '<br>' +
            'vnode keys: ' + Object.keys(vnode).join(', ');
    }
});

Vue.directive('pin', {
    bind: function (el, binding, vnode) {
        el.style.position = 'fixed'
        var s = (binding.arg == 'left' ? 'left' : 'top')
        el.style[s] = binding.value + 'px'
    }
});

// Loading button plugin (removed from BS4)
(function($) {
    $.fn.button = function(action) {
      if (action === 'loading' && this.data('loading-text')) {
        this.data('original-text', this.html()).html(this.data('loading-text')).prop('disabled', true);
      }
      if (action === 'reset' && this.data('original-text')) {
        this.html(this.data('original-text')).prop('disabled', false);
      }
    };
  }(jQuery));	