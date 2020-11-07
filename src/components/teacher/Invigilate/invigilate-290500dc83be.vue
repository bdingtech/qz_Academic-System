function injectStyle (ssrContext) {
  require("!!../../../../node_modules/extract-text-webpack-plugin/dist/loader.js?{\"omit\":1,\"remove\":true,\"publicPath\":\"../../\"}!vue-style-loader!css-loader?{\"sourceMap\":true}!../../../../node_modules/vue-loader/lib/style-compiler/index?{\"vue\":true,\"id\":\"data-v-1e780db0\",\"scoped\":true,\"hasInlineConfig\":false}!less-loader?{\"sourceMap\":true}!sass-resources-loader?{\"resources\":\"C:\\\\Users\\\\Administrator\\\\Desktop\\\\前端\\\\bzb_njwqd\\\\src\\\\assets\\\\css\\\\color.less\"}!../../../../node_modules/vue-loader/lib/selector?type=styles&index=0!./invigilate.vue")
}
var normalizeComponent = require("!../../../../node_modules/vue-loader/lib/component-normalizer")
/* script */
export * from "!!babel-loader!../../../../node_modules/vue-loader/lib/selector?type=script&index=0!./invigilate.vue"
import __vue_script__ from "!!babel-loader!../../../../node_modules/vue-loader/lib/selector?type=script&index=0!./invigilate.vue"
/* template */
import __vue_template__ from "!!../../../../node_modules/vue-loader/lib/template-compiler/index?{\"id\":\"data-v-1e780db0\",\"hasScoped\":true,\"transformToRequire\":{\"video\":[\"src\",\"poster\"],\"source\":\"src\",\"img\":\"src\",\"image\":\"xlink:href\"},\"buble\":{\"transforms\":{}}}!../../../../node_modules/vue-loader/lib/selector?type=template&index=0!./invigilate.vue"
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1e780db0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

export default Component.exports



//////////////////
// WEBPACK FOOTER
// ./src/components/teacher/Invigilate/invigilate.vue
// module id = null
// module chunks = 