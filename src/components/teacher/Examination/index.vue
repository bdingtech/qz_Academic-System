<template>
  <div>
    <Header title="考务" type="0" route="/homeIndex" :casLogin="casLogin"></Header>
		<NOdata title="暂无数据" v-if="resetList.length == 0"></NOdata>
    <div class="bod" v-else>
      <div class="content" v-for="(item,index) in resetList" :key="index" @click="fn1(item.path)">
        <div class="left_box">
          <span class="sp">{{item.name}}</span>
        </div>
        <div class="right_box">
          <i></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '../../../utils/axios'
export default {
  data() {
    return {
      Identity:sessionStorage.getItem('Identity'),
      casLogin: sessionStorage.getItem('casLogin'),
      changeList: [
        { name: '监考查询', path: 'invigilate' ,url:'js_kw_jkcx'},
        { name: '监考调代', path: 'examSearch' ,url:'js_kw_jktd'},
        { name: '随堂考试', path: 'classList' ,url:'js_kw_stks'},
      ],
      i_id:'',
      resetList:[]
    }
  },
  methods: {
    async Change(){
      const params = {
        xx0101id: sessionStorage.getItem('schoolCode'),
        type: this.Identity == '2' ? '0' : '',
        isqy: '',
        key: 'qzkj'
      }
      const res = await Api.getHomeMenuApi(params)
      if(res.data.length > 0){
        res.data.forEach(item => {
          if(item.url == 'js_kw'){
            this.i_id = item.i_id
          }
        });
      }
      this.getAuth()
    },
    async getAuth(){
      const params = {
        I_ID:this.i_id
      }
      const res = await Api.getSubMenu(params)
      this.resetList = res.data
      if(res.data.length > 0){
        this.resetList.forEach(item => {
          this.changeList.forEach(list => {
            if(item.url == list.url){
              item.path = list.path
            }
          });
        });
      }
    },
    fn1(val) {
      this.$router.push({ name: val })
    }
  },
  created() {
    this.Change()
  },

}
</script>

<style scoped lang="less" >
.class {
  color: @attendance-background-color-1;
  font-size: 18px;
  /* margin-top: 10px; */
  font-weight: 600;
}
.bod {
  /* width: 90%; */
  width: calc(100% - 40px);
  margin: 50px auto 0;
}
.content {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 82px;
  margin-top: 20px;
  background: @attendance-background-color-10;
  border-radius: 5px;
}
.content::after {
  position: absolute;
  width: 3px;
  height: 100%;
  content: '';
  background-color: @attendance-background-color-1;
  left: 0;
  border-radius: 5px 0 0 5px;
}
.content .left_box {
  width: 60%;
  height: 100%;
  margin-left: 20px;
  float: left;
}
.content .left_box .sp {
  display: block;
}
.content .left_box .sp {
  color: @attendance-color-1;
  line-height: 82px;
  font-weight: 600;
}

.content .right_box {
  width: 25%;
  height: 100%;
  float: right;
}
.content .right_box i {
  display: inline-block;
  margin-top: 35px;
  margin-left: 60px;
  width: 9px;
  height: 13px;
  background: url(../../../assets/images/back_right.png) center center no-repeat;
  background-size: 100%;
}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Examination/index.vue