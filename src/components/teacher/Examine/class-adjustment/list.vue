<template>
  <div>
    <Header title="调课审核" type="0" route="/teacher/examineIndex" :casLogin="casLogin"></Header>
    <div class="center">
      <div class="center-list" v-for="(item,index) in list" :key="index">
        <div class="list-left">
          <div class="left-title">{{item.kcmc}}</div>
          <div class="left-line">
            <span>教师:</span>
            <span style="margin-left: 5px;">{{item.skls}}</span>
          </div>
          <div class="left-line">
            <span>课堂:</span>
            <span style="margin-left: 5px;">{{item.ktmc}}</span>
          </div>
          <div class="left-line">
            <span>创建时间:</span>
            <span style="margin-left: 5px;">{{item.cjsj}}</span>
          </div>
          <div class="left-line">
            <span>调课原因:</span>
            <span style="margin-left: 5px;">{{item.tkyy}}</span>
          </div>
        </div>
        <div class="list-right">
          <van-button type="default" class="right-button" @click="pushDetail(item)">审核</van-button>
        </div>
      </div>

      <van-empty
        v-if="list.length == 0"
        class="custom-image"
        image="static/img/no_data.png"
        description="暂无数据"
      />
    </div>
  </div>
</template>
<script>
import { Empty } from 'vant';
// import Header from '../../header.vue'
import { Api } from '@/utils/axios'
export default {
  data() {
    return {
      casLogin: sessionStorage.getItem('casLogin'),
      list: [],

    }
  },
  mounted() {
    this.getList()
  },
  methods: {

    async getList() {
      const res = await Api.getTklist()
      this.list = res.data
    },
    pushDetail(item) {
      
      this.$router.push({ name: 'adjustListDetail' ,params:{route_params: encodeURI(JSON.stringify(item))}})
    }
  }

}
</script>

<style lang="less" scoped>
.center {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: 20px;
}
.center-list {
  width: calc(~'100% - 80px');
  background: @attendance-background-color-10;
  border-radius: 5px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  padding: 20px 20px 18px 20px;
}
.list-left {
  width: calc(~'100% - 70px');
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.left-title {
  width: 100%;
  font-size: 16px;
  color: @attendance-color-1;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 8px;
}
.left-line {
  width: 100%;
  font-size: 12px;
  color: @attendance-color-2;
  margin-bottom: 2px;
}
.list-right {
  width: 70px;
  height: 100%;
}
.right-button {
  width: 70px;
  height: 42px;
  line-height: 42px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  text-align: center;
  background-color: @attendance-background-color-1;
  border-radius: 3px;
}
.custom-image /deep/.van-empty__image {
  width: 130px;
  height: 130px;
}
</style>





// WEBPACK FOOTER //
// src/components/teacher/Examine/class-adjustment/list.vue