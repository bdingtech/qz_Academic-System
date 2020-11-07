 <template>
  <div>
    <Header title="成绩录入审核" type="0" route="scoreList,1" :casLogin="casLogin"></Header>
    <div class="center">
      <div class="center-list">
        <div class="list-left">
          <div class="first-line">
            <div class="left-title">{{top_info.kcmc}}</div>
            <!-- <div class="right-title">18-19学年 </div> -->
            <div class="input-tap">
              <input type="text" readonly v-model="top_info.xnxq01id" />
              <i></i>
            </div>
          </div>
          <div class="left-line">
            <div style="width:45%">
              <span>课程编号:</span>
              <span style="margin-left: 5px;">{{top_info.kch}}</span>
            </div>
            <div class="left-line-line">
              <span>考核方式:</span>
              <span style="margin-left: 5px;">{{top_info.ksfsmc}}</span>
            </div>
          </div>
          <div class="left-line">
            <div style="width:100%">
              <span>授课教师:</span>
              <span style="margin-left: 5px;">{{top_info.jsxm}}</span>
            </div>
          </div>
          <div class="left-line">
            <div style="width:100%">
              <span>录入人:</span>
              <span style="margin-left: 5px;">{{top_info.lrjs}}</span>
            </div>
          </div>
          <div class="left-line">
            <div style="width:100%">
              <span>开课单位:</span>
              <span style="margin-left: 5px;">{{top_info.dwmc}}</span>
            </div>
          </div>
          <!-- <div class="left-line">
            <div style="width:100%">
              <span>考试性质:</span>
              <span style="margin-left: 5px;">{{top_info.dwmc}}</span>
            </div>
          </div> -->
          <div class="left-line">
            <div style="width:100%">
              <span>录入方式:</span>
              <span style="margin-left: 5px;">{{top_info.cjlrfs_name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="center-title">成绩详情</div>
      <div class="table">
        <el-table :data="table_data" stripe height="295" :cell-style="cellColor">
          <el-table-column prop="xm" show-overflow-tooltip label="姓名" sortable></el-table-column>
          <el-table-column prop="xh" show-overflow-tooltip label="学号" sortable></el-table-column>
          <el-table-column prop="bj" show-overflow-tooltip label="班级" sortable></el-table-column>
          <el-table-column prop="cjxss" show-overflow-tooltip label="成绩" width="73" sortable></el-table-column>
          <el-table-column prop="cjbs" show-overflow-tooltip label="标志" sortable></el-table-column>
        </el-table>
      </div>
      <van-button class="bottom-button" type="default" @click="pushExamine">审核</van-button>
    </div>
  </div>
</template>
<script>
// import Header from '../../header.vue'
import { Api } from '@/utils/axios'
export default {
  data() {
    return {
      casLogin: sessionStorage.getItem('casLogin'),
      route: { name: 'scoreList' },
      list: [],
      semester: '',
      curSemester: '18-19学年 第二学期',
      table_data: [],
      top_info: {},
      route_params: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.route_params = JSON.parse(decodeURI(this.$route.params.route_params))
      const params = {
        cj0703id: this.route_params.xq_id
      }
      const res = await Api.getcjCk(params)
      this.table_data = res.bottom
      this.top_info = res.top[0]
      if (this.top_info.cjlrfs == 'A') {
        this.top_info.cjlrfs_name = '二分制A(通过，不通过)'
      }
      if (this.top_info.cjlrfs == 'B') {
        this.top_info.cjlrfs_name = '二分制B(合格，不合格)'
      }
      if (this.top_info.cjlrfs == 'C') {
        this.top_info.cjlrfs_name = '五分制(优，良，中，及格，不及格)'
      }
      if (this.top_info.cjlrfs == 'D') {
        this.top_info.cjlrfs_name = '分数方式'
      }
      if (this.top_info.cjlrfs == 'E') {
        this.top_info.cjlrfs_name = '分数等级制(录入成绩为分数，总评为等级)'
      }
      // this.changeList = res.data[0].resitData
      // this.semester = res.data[0].semester
    },
    pushExamine(id) {
      this.$router.push({ name: 'examineCommom', params: { route: 'scoreListDetail,1', route_params: encodeURI(JSON.stringify(this.route_params)) } })
    },
    cellColor({ row, column, rowIndex, columnIndex }) {
      if (row.score == '不合格' && columnIndex == 3) {
        return 'color:#F86969'
      }
      if (row.score == '合格' && columnIndex == 3) {
        return 'color:#12DDD6'
      }
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
  background-image: url(../../../../assets/images/blue_icon.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding: 20px 20px 18px 20px;
}
.list-left {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.first-line {
  width: 100%;
  position: relative;
}
.left-title {
  width: 50%;
  font-size: 16px;
  color: white;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 8px;
}
.input-tap input {
  /* width: 80px; */
  background-color: rgba(143, 135, 249, 0.8);
  border-radius: 12px;
  padding: 5px 0px 5px 15px;
  color: rgb(243, 240, 240);
  font-size: 12px;
}
.input-tap input::placeholder {
  color: @attendance-color-3;
}
.input-tap {
  position: absolute;
  right: 0px;
  top: 0px;
}
.input-tap input {
  width: 100px;
}
.input-tap > i {
  background: url(../../../../../static/img/week.png) no-repeat center;
  background-size: 7px 5px;
  width: 7px;
  height: 7px;
  position: absolute;
  right: 10px;
  top: 50%;
  margin-top: -3px;
}
.left-line {
  width: 100%;
  font-size: 12px;
  color: rgb(243, 240, 240);
  margin-bottom: 2px;
  display: flex;
}
.center-title {
  width: calc(~'100% - 40px');
  font-size: 18px;
  color: @attendance-color-1;
  font-weight: 600;
  margin-bottom: 16px;
}
.bottom-button {
  width: calc(~'100% - 40px');
  background-color: @attendance-background-color-1;
  color: white;
  font-size: 16px;
  font-weight: 600;
  height: 44px;
  line-height: 44px;
  // position: absolute;
  // bottom: 20px;
  border-radius: 3px;
  margin-top: 20px;
}
.table {
  width: 100%;
}
/deep/.el-table td {
  padding: 6px 0;
  color: @attendance-color-1;
  font-size: 14px;
}
/deep/.el-table .descending .sort-caret.descending {
  border-top-color: @attendance-color-2;
}
/deep/.el-table .ascending .sort-caret.ascending {
  border-bottom-color: @attendance-color-2;
}
/deep/ .el-table .sort-caret.ascending {
  border-bottom-color: @attendance-background-color-2;
}
/deep/ .el-table .sort-caret.descending {
  border-top-color: @attendance-background-color-2;
}
/deep/.el-table__header .cell {
  color: @attendance-color-2;
  font-weight: 400;
}
/deep/.el-table th {
  padding: 0;
}
/deep/ .el-table__row td:nth-child(2),
/deep/ .el-table__row td:nth-child(3) {
  text-align: left;
  //   padding-right: 25px;
}
/deep/ .el-table__header-wrapper th:nth-child(2),
/deep/.el-table__header-wrapper th:nth-child(3) {
  text-align: left;
}
/deep/.el-table__body-wrapper tr td:nth-child(4) {
  font-weight: 600;
}

/deep/ .el-table td,
/deep/.el-table th.is-leaf {
  border-bottom: none;
}
/deep/.el-table__row.el-table__row--striped {
  background-color: @attendance-background-color-3;
}
/deep/.el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/.el-table::before {
  height: 0;
}
</style>


// WEBPACK FOOTER //
// src/components/teacher/Examine/score-entry/listDetail.vue