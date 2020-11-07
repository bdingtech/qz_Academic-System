var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('Header',{attrs:{"title":"考场信息查询","casLogin":_vm.casLogin}}),_vm._v(" "),(this.arrList1.length == 0)?_c('NOdata',{attrs:{"title":"暂无监考数据~"}}):_c('div',{staticClass:"invi"},_vm._l((_vm.arrList1),function(item,index){return _c('div',{key:index,staticClass:"content_in"},[_c('div',{staticClass:"left_box"},[_c('span',{staticClass:"span"},[_vm._v(_vm._s(item.courseName))]),_vm._v(" "),_c('span',[_vm._v("时间："+_vm._s(item.time))]),_vm._v(" "),_c('span',[_vm._v("地点："+_vm._s(item.place))])])])}),0)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-1e780db0","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/teacher/Invigilate/invigilate.vue
// module id = null
// module chunks = 