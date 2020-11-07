 <template>
  <div>
    <Header title="查询结果" type="0" route="/teacher/examSearch" :casLogin="casLogin"></Header>
    <div class="center">
      <div class="search-top">
        <div class="top-line" v-for="(item,index) in search_list" :key="index">{{item.name}}</div>
      </div>
      <div class="search-result">搜索结果</div>
      <div class="center-list" v-for="(item,index) in list" :key="index">
        <div class="center-top-line">
          <div class="list-left">
            <div class="left-title">{{item.title}}</div>
            <div class="left-line">
              <span>课程编号:</span>
              <span style="margin-left: 5px;">{{item.kch}}</span>
            </div>
            <div class="left-line">
              <span>类别:</span>
              <span style="margin-left: 5px;">{{item.jklx}}</span>
            </div>
            <div class="left-line">
              <span>考生数:</span>
              <span style="margin-left: 5px;">{{item.kss}}</span>
            </div>
            <div class="left-line">
              <span>考场:</span>
              <span style="margin-left: 5px;">{{item.kcmc}}</span>
            </div>
          </div>
          <div class="list-right">
            <van-button
              v-if="item.shzt == '待送审' ||item.shzt == '未通过'||item.shzt == ''"
              type="default"
              class="right-button"
              @click="pushDetail(item)"
            >调代</van-button>
            
            <div v-if="item.shzt == '审核中'" class="right-span" type="default">{{item.shzt}}</div>
            <div
              v-if="item.shzt == '审核通过'"
              style="color: #12DDD6;"
              class="right-span"
              type="default"
            >{{item.shzt}}</div>
            <!-- <div
              v-if="item.shzt == '未通过'"
              style="color: #F86969;"
              class="right-span"
              type="default"
              @click="pushDetail(item)"
            >{{item.shzt}}</div> -->
          </div>
        </div>
        <div class="left-line">
          <span>考试场次:</span>
          <span style="margin-left: 5px;">{{item.ksccmc}}</span>
        </div>
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
      list: [
        { title: '思想道德修养与法律基础', kcbh: '050220047', lb: '主监考', kss: '79', kc: '河西校区 公共101', kscc: '20031701（2020-03-17 08:00-09:40)', btn_name: '调代' },
        { title: '思想道德修养与法律基础', kcbh: '050220047', lb: '主监考', kss: '79', kc: '河西校区 公共101', kscc: '20031701（2020-03-17 08:00-09:40)', btn_name: '审核中' },
        { title: '思想道德修养与法律基础', kcbh: '050220047', lb: '主监考', kss: '79', kc: '河西校区 公共101', kscc: '20031701（2020-03-17 08:00-09:40)', btn_name: '调代成功' },
        { title: '思想道德修养与法律基础', kcbh: '050220047', lb: '主监考', kss: '79', kc: '河西校区 公共101', kscc: '20031701（2020-03-17 08:00-09:40)', btn_name: '调代失败' },
      ],
      search_list: [],
      noData: false,
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
        xnxqid: this.route_params.xnxq,
        xqlb: this.route_params.xqjdId,
      }
      const res = await Api.getJktd(params)
      this.list = res.data
      if (this.list.length == 0) {
        this.noData = true
      } else {
        this.noData = false
      }
      this.search_list = []
      if (this.route_params.xnxq_name != '') {
        this.search_list.push({ name: this.route_params.xnxq_name })
      }
      if (this.route_params.xqjd_name != '') {
        this.search_list.push({ name: this.route_params.xqjd_name })
      }

    },
    pushDetail(item) {
      this.route_params.kw0412tdid = item.kw0412tdid
      this.route_params.kw0412id = item.kw0412id
      this.route_params.kw0403id = item.kw0403id
      this.route_params.kcmc = item.kcmc
      this.route_params.ksccmc = item.ksccmc
      this.route_params.xqmc = item.xqmc
      this.route_params.istd = item.istd
      this.$router.push({ name: 'examReplace', params: { route_params: encodeURI(JSON.stringify(this.route_params)) } })
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
// src/components/teacher/Examination/invigilation-replace/searchResult.vue