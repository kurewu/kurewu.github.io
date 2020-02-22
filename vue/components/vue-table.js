Vue.component('vueModal', function (resolve, reject) {
  $.get("components/vue-modal.html").then(function (res) {
    resolve({
      template: res,
      props: ['id', 'title', 'record'],
      data: function () {    
        return {
           modify_record: JSON.parse(JSON.stringify(this.record)) 
        }
      },
      mounted: function () {   
      
        $('#' + this.id).on('hidden.bs.modal', function (e) {
          console.log('hide');
        })
       
        $('#' + this.id).on('shown.bs.modal', function (e) {
          console.log('show');  
        })
      },
      watch: {
        record: function () {
          this.modify_record = JSON.parse(JSON.stringify(this.record));
        }
      },
      methods:{
        onSaveChange: function(){
          this.$emit('modalSaveChange', this.modify_record);
        }
      }
    })
  });
});

Vue.component('vueTable', function (resolve, reject) {
  // 可以请求一个html文件，既然存放模板还是html文件存放比较好
  //https://segmentfault.com/q/1010000008545235/a-1020000008550089
  $.get("components/vue-table.html").then(function (res) {
    resolve({
      template: res,
      props: ['columns', 'items'],
      data: function () {
        return {
          modalTitle: "test",
          tableName: "hello world",
          selectRecord: { "index": -1, "item": {} },
          recordItems: JSON.parse(JSON.stringify(this.items))
        }
      },
      watch: {
        items: function(){
          this.recordItems = JSON.parse(JSON.stringify(this.items));
        }
      },
      methods: {
        detailclick: function (index, event) {
          this.modalTitle = index;
          this.selectRecord = { "index": index, "item": this.recordItems[index] };
          
          $("#test").modal('show');
          //console.log(event.target.tagName);
        },
        SaveChange : function(record){
          //父組件和子組件溝通
          //https://jeremysu0131.github.io/Vue-js-%E7%88%B6%E5%AD%90%E7%B5%84%E4%BB%B6%E6%BA%9D%E9%80%9A-emit-on/
          this.tableName = record.index;
          this.recordItems[record.index] = JSON.parse(JSON.stringify(record.item));
          console.log('SaveChange');
        },
        IsShowTable: function(){
         
          //console.log($.isEmptyObject(this.recordItems));
          if(Object.keys(this.recordItems).length === 0) {
            return false;
          }
          return true;
        }
      }
    })
  });
});
