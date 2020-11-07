<template>
  <div>
    <Header title="补考查询" type="0" route="/homeIndex" :casLogin="casLogin"></Header>
    <div class="center">
      <div class="center-top">
        <div class="top-date">{{semester}}</div>
      </div>
      <div class="center-table">
        <div class="table-one-title">
          <div class="table-one-span-name">课程名称</div>
          <div class="table-one-span-two">成绩</div>
          <div class="table-one-span-two">学分</div>
          <div class="table-one-span-four">课程属性</div>
        </div>
        <div class="table-one">
          <div
            class="table-one-content"
            v-for="(item,index) in changeList"
            :key="index"
            :style="getColor(index)"
          >
            <div class="table-one-span-name">{{item.courseName}}</div>
            <div class="table-one-span-two">{{item.fraction}}</div>
            <div class="table-one-span-two">{{item.credit}}</div>
            <div class="table-one-span-four">{{item.curriculumAttributes}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// // import Header from './header.vue'
import { Api } from '../../utils/axios'
export default {
  data() {
    return {
      casLogin: sessionStorage.getItem('casLogin'),
      changeList: [],
      semester: '',
     
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getColor(value) {
      if ((value % 2) == 0) {
        return 'background:#F6F6F6'
      }
    },
    async getList() {
      const res = await Api.queryResit()
      this.changeList = res.data[0].resitData
      this.semester = res.data[0].semester
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
}
.center-top {
  width: 90%;
  height: 60px;
  background: @attendance-background-color-1;
  border-radius: 5px;
  margin-top: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.top-date {
  height: 26px;
  line-height: 26px;
  text-align: center;
  background-color: @attendance-background-color-8;
  color: white;
  font-size: 12px;
  border-radius: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
  padding: 0px 30px;
}
.center-table {
  width: 100%;
  margin-top: 10px;
}
.table-one-title {
  height: 40px;
  width: 100%;
  line-height: 40px;
  display: flex;
  color: rgb(133, 130, 130);
  font-size: 14px;
  text-align: left;
  margin-top: 10px;
}
.table-one {
  width: 100%;
  height: 320px;
  overflow: scroll;
}
.table-one-span-name {
  width: 43%;
  text-align: left;
  padding-left: 20px;
}
.table-one-span-two {
  width: 15%;
  text-align: center;
}
.table-one-span-four {
  width: 27%;
  text-align: center;
}
.table-one-content {
  height: 40px;
  width: 100%;
  line-height: 40px;
  display: flex;
  color: rgb(80, 78, 78);
  font-size: 12px;
  text-align: left;
}
</style>



// WEBPACK FOOTER //
// src/components/student/supplementExam.vue