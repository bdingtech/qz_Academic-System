 <template>
  <div>
    <Header title="教室借用审核" type="0" route="/teacher/examine/borrowingList" :casLogin="casLogin"></Header>
    <div class="center">
      <div class="center-list">
        <div class="paperClip-circle"></div>
        <img  class="paperClip" src="../../../../assets/images/paperClip.png"/>
        <div class="list-left">
          <div class="left-title">{{user_info.wfexname}}</div>
          <div class="left-line">
            <div style="width:100%">
              <span>角色:</span>
              <span style="margin-left: 5px;">{{user_info.js}}</span>
            </div>
          </div>
          <div class="left-line">
            <div style="width:100%">
              <span>借用人:</span>
              <span style="margin-left: 5px;">{{user_info.xm}}</span>
            </div>
          </div>
          <div class="left-line">
            <div style="width:100%">
              <span>编号:</span>
              <span style="margin-left: 5px;">{{user_info.jgh}}</span>
            </div>
          </div>
          <div class="left-line">
            <div style="width:100%">
              <span>院系:</span>
              <span style="margin-left: 5px;">{{user_info.dwmc}}</span>
            </div>
          </div>
          <div class="left-line">
            <div style="width:100%">
              <span>教室名称:</span>
              <span style="margin-left: 5px;">{{info.jsmc}}</span>
            </div>
          </div>
          <div class="left-line">
            <div style="width:100%">
              <span>教室备注:</span>
              <span style="margin-left: 5px;">{{info.jsms}}</span>
            </div>
          </div>
           <div class="left-line">
            <div style="width:100%">
              <span>备注:</span>
              <span style="margin-left: 5px;">{{info.jyyy}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="center-content">
        <van-tabs v-model="activeName">
          <van-tab title="其他信息" name="1">
            <div class="content-one">
              <div class="content-one-line">
                <div class="one-line-left">开课点</div>
                <div class="one-line-right">{{info.kkd}}</div>
              </div>
              <div class="content-one-line">
                <div class="one-line-left">借用周次</div>
                <div class="one-line-right">{{info.kkzc}}</div>
              </div>
              <div class="content-one-line">
                <div class="one-line-left">单双周</div>
                <div class="one-line-right">{{info.dsz}}</div>
              </div>
              <div class="content-one-line">
                <div class="one-line-left">借用时间</div>
                <div class="one-line-right">{{info.kcsj}}</div>
              </div>
              <div class="content-one-line">
                <div class="one-line-left">教室名称</div>
                <div class="one-line-right">{{info.jsmc}}</div>
              </div>
              <div class="content-one-line">
                <div class="one-line-left">教室备注</div>
                <div class="one-line-right">{{info.jyyy}}</div>
              </div>
            </div>
          </van-tab>
          <van-tab title="学时信息" name="2">内容 2</van-tab>
        </van-tabs>
      </div> -->

      <div class="center-title">详细信息</div>

      <div class="table">
        <el-table :data="table_data" stripe height="295" >
          <el-table-column prop="kkd" show-overflow-tooltip label="开课点" sortable></el-table-column>
          <el-table-column prop="kkzc" show-overflow-tooltip label="借用周次" sortable></el-table-column>
          <el-table-column prop="dsz" show-overflow-tooltip label="单双周" sortable></el-table-column>
          <el-table-column prop="kcsj" show-overflow-tooltip label="借用时间"  sortable></el-table-column>
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
      activeName: '1',
      info: {},
      user_info: {},
      route_tk: {},
      table_data:[]

    }
  },
  mounted() {
    this.getList()
  },
  methods: {

    async getList() {
      this.route_tk = JSON.parse(decodeURI(this.$route.params.route_params))
      const params = {
        ywinstanceid: this.route_tk.ywinstanceid
      }
      const res = await Api.getjyCk(params)
      this.table_data =res.data
      this.info = res.data[0]
      this.user_info = res.jsxx[0]
    },
    pushExamine() {
      this.route_tk.id_sh = this.route_tk.id  
      this.route_tk.xq_id = this.route_tk.ywinstanceid  
      this.route_tk.sh_flag = '007'
      this.$router.push({ name: 'examineCommom', params: { route: 'borrowingListDetail,1', route_params: encodeURI(JSON.stringify(this.route_tk)) } })

    }
  }

}
</script>


<style scoped lang="less" >
.center {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: 20px;
}
.center-list {
  width: calc(~'100% - 80px');
  background: url(../../../../assets/images/card_bg3.png) no-repeat top center;
  background-size: cover;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding: 20px 20px 18px 20px;
  position: relative;
}
.paperClip {
  position: absolute;
  right: 20px;
  top:20px;
  width: 22px;
  height: 22px;
}
.paperClip-circle {
  position: absolute;
  right: 15px;
  top:15px;
  width: 32px;
  height: 32px;
  border-radius: 30px;
  background: @attendance-background-color-16;
}
.list-left {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.left-title {
  width: 85%;
  font-size: 16px;
  color: white;
  font-weight: 600;
  margin-bottom: 8px;
}
.left-line {
  width: 100%;
  font-size: 12px;
  color: rgb(243, 240, 240);
  margin-bottom: 2px;
  display: flex;
}
.center-content {
  width: 100%;
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
}
/deep/.van-tabs--line /deep/ .van-tabs__wrap {
  border-bottom: 1px @attendance-border-color-6 solid;
}
.content-one {
  width: calc(~'100% - 40px');
  padding: 20px 20px;
}
.content-one-line {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 14px;
}
.one-line-left {
  color: @attendance-color-2;
}
.one-line-right {
  color: @attendance-color-2;
  font-weight: 600;
}
.center-title {
  width: calc(~'100% - 40px');
  font-size: 18px;
  color: @attendance-color-1;
  font-weight: 600;
  margin-bottom: 16px;
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
// src/components/teacher/Examine/classroom-borrowing/listDetail.vue