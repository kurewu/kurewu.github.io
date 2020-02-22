Vue.component('vueDatetimepicker', {
    template: `            

        <div class='input-group date'>
            <input type='text' class="form-control" v-model="pickDate"/>                
            <span class="input-group-append">
                <span class="input-group-text"><i class="fa fa-calendar"></i></span>
            </span>
        </div>
       
    `,
    props: ['value'],   
    data: function () {
      return {
        pickDate : this.value
      }
    },
    watch: {
        value: function (value) { 
            $(this.$el).data("DateTimePicker").date(value);      
        } 
    },
    mounted() {      
        let vm = this;
   
        let dp = $(this.$el).datetimepicker({
            locale: 'zh-tw',
            //defaultDate: moment(),
            format: 'YYYY/MM/DD HH:mm:ss',
            showClose: true,
            allowInputToggle: false
        })
        dp.data("DateTimePicker").date(this.value);      

        dp.on("dp.change", function (e) {
            vm.$emit('input', e.date);
        }); 
    }
  });
  