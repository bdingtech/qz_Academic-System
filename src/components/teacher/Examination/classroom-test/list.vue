 <template>
  <div>
    <Header title="随堂考试" type="0" route="/teacher/examinationIndex" :casLogin="casLogin"></Header>
    <div class="center">
      <!-- <div class="search-top">
        <div class="top-line" v-for="(item,index) in search_list" :key="index">{{item.name}}</div>
      </div>-->
      <!-- <div class="search-result">搜索结果</div> -->
      <div class="center-list" v-for="(item,index) in list" :key="index">
        <div class="center-top-line">
          <div class="list-left">
            <div class="left-title">{{item.kcmc}}</div>
            <div class="left-line">
              <span>课程编号:</span>
              <span style="margin-left: 5px;">{{item.kch}}</span>
            </div>
            <div class="left-line">
              <span>开课周次:</span>
              <span style="margin-left: 5px;">{{item.kkzc}}</span>
            </div>
            <div class="left-line">
              <span>上课节次:</span>
              <span style="margin-left: 5px;">{{item.jc}}</span>
            </div>
            <div class="left-line">
              <span>上课班级:</span>
              <span style="margin-left: 5px;">{{item.ktmc}}</span>
            </div>
            <div class="left-line">
              <span>开课单位:</span>
              <span style="margin-left: 5px;">{{item.xx0301dwmc}}</span>
            </div>
            <div class="left-line">
              <span>审核状态:</span>
              <span  style="margin-left: 5px;">{{item.dmmc}}</span>
            </div>
          </div>
          <div class="list-right">
            <van-button
              v-if="item.iswfmes == ''||item.iswfmes == '3'||item.iswfmes == '0'"
              type="default"
              class="right-button"
              @click="pushDetail(item)"
            >申请</van-button>
            <van-button
              v-if="item.iswfmes == '2'||item.iswfmes == '1'"
              type="default"
              class="right-button"
              @click="pushDetail(item)"
            >查看</van-button>
            <!-- <div v-if="item.btn_name == '审核中'" class="right-span" type="default">{{item.btn_name}}</div>
            <div
              v-if="item.btn_name == '审核通过'"
              style="color: #12DDD6;"
              class="right-span"
              type="default"
            >{{item.btn_name}}</div>
            <div
              v-if="item.btn_name == '审核失败'"
              style="color: #F86969;"
              class="right-span"
              type="default"
            >{{item.btn_name}}</div>-->
          </div>
        </div>
        <!-- <div class="left-line">
          <span>考试场次:</span>
          <span style="margin-left: 5px;">{{item.kscc}}</span>
        </div>-->
      </div>
      <van-empty
        v-if="noData"
        class="custom-image"
        image="static/img/no_data.png"
        description="暂无数据"
      />
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
      list: [],
      noData: false,

    }
  },
  
  mounted() {
    this.getList()
  },
  methods: {

    async getList() {

      const res = await Api.stkssqxx()
      this.list = res.data
      if (this.list.length == 0) {
        this.noData = true
      } else {
        this.noData = false
      }
    },

    pushDetail(item) {
      this.$router.push({ name: 'classApply', params: { route_params: encodeURI(JSON.stringify(item)) } })
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
.search-top {
  width: calc(~'100% - 40px');
  display: flex;
  align-items: center;
  padding: 20px 20px 0px 20px;
  flex-wrap: wrap;
}
.top-line {
  //   padding: 5px 14px;
  margin-right: 20px;
  background: @attendance-background-color-7;
  color: @attendance-background-color-1;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  width: 132px;
  height: 30px;
  line-height: 30px;

  text-align: center;
}
.search-result {
  width: calc(~'100% - 40px');
  padding: 0px 20px;
  color: @attendance-color-1;
  font-size: 18px;
  font-weight: 600;
  margin-top: 16px;
}
.center-list {
  width: calc(~'100% - 80px');
  background: @attendance-background-color-10;
  border-radius: 5px;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 20px 20px 18px 20px;
  position: relative;
}
.center-top-line {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
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
  height: 70px;
  position: absolute;
  top: 0px;
  right: 0px;
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
.right-span {
  background: @attendance-background-color-10;
  color: @attendance-background-color-1;
  text-align: right;
  font-size: 14px;
  font-weight: 600;
}
.custom-image /deep/.van-empty__image {
  width: 130px;
  height: 130px;
}
</style>


// WEBPACK FOOTER //
// src/components/teacher/Examination/classroom-test/list.vue