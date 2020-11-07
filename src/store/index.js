import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        courseInfo:'',
        allWarnList:[],
        value1:'',
        //空闲教室查询
        freeDate:'',
        freeNode:'',
        freeBuilding:'',
        freeCampus:'',
        // 教学评价
        evaTextList:[
            {evaText:''}
        ],
        //评价历史选项
        evaOptCheck:[],
        loadCheckList:[],
        // 首页权限菜单
        homeMenuList:[]
    }
})
export default store


// WEBPACK FOOTER //
// ./src/store/index.js