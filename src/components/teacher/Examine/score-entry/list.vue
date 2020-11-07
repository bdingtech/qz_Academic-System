 <template>
  <div>
    <Header title="成绩录入审核" type="0" route="/teacher/examine/searchScore" :casLogin="casLogin"></Header>
    <div class="center">
      <div class="search-top">
        <div class="top-line" v-for="(item,index) in search_list" :key="index">{{item.name}}</div>
      </div>
      <div class="search-result">搜索结果</div>
      <div class="center-list" v-for="(item,index) in list" :key="index">
        <div class="list-left">
          <div class="left-title">{{item.wfexname}}</div>
          <div class="left-line">
            <span>开课院系:</span>
            <span style="margin-left: 5px;">{{item.kkdwmc}}</span>
          </div>
          <div class="left-line">
            <span>课堂名称:</span>
            <span style="margin-left: 5px;">{{item.ktmc}}</span>
          </div>
          <div class="left-line">
            <span>录入人:</span>
            <span style="margin-left: 5px;">{{item.userrealname}}</span>
          </div>
          <div class="left-line">
            <span>录入时间:</span>
            <span style="margin-left: 5px;">{{item.cjsj}}</span>
          </div>
        </div>
        <div class="list-right">
          <van-button type="default" class="right-button" @click="pushDetail(item.ywinstanceid,item.id)">审核</van-button>
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
      list: [],
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
      const route_params = JSON.parse(decodeURI(this.$route.params.route_params))
      this.route_params = JSON.parse(decodeURI(this.$route.params.route_params))
      const params = {
        xnxq: route_params.xnxq,
        cj0701id: route_params.cj0701id,
        wfexname: route_params.wfexname,
        lrr: route_params.lrr,
        Kkyx: route_params.Kkyx,
        iswfmes: route_params.iswfmes,
      }
      const res = await Api.getcjFind(params)
      this.list = res.data
      if (this.list.length == 0) {
        this.noData = true
      } else {
        this.noData = false
      }
      this.search_list = []
      if (route_params.xnxq_name != '') {
        this.search_list.push({ name: route_params.xnxq_name })
      }
      if (route_params.hdmc_name != '') {
        this.search_list.push({ name: route_params.hdmc_name })
      }
      if (route_params.kcmc_name != '') {
        this.search_list.push({ name: route_params.kcmc_name })
      }
      if (route_params.lrr_name != '') {
        this.search_list.push({ name: route_params.lrr_name })
      }
      if (route_params.kkdw_name != '') {
        this.search_list.push({ name: route_params.kkdw_name })
      }
      if (route_params.shzt_name != '') {
        this.search_list.push({ name: route_params.shzt_name })
      }
    },
    pushDetail(xq_id,sh_id) {
      this.route_params.id_sh = sh_id
      this.route_params.xq_id = xq_id
      this.route_params.sh_flag = '008'
      this.$router.push({ name: 'scoreListDetail', params: { route_params: encodeURI(JSON.stringify(this.route_params)) } })
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
  padding: 5px 14px;
  margin-right: 20px;
  background: @attendance-background-color-7;
  color: @attendance-background-color-1;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
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
  height:130px;
}
</style>










// WEBPACK FOOTER //
// src/components/teacher/Examine/score-entry/list.vue