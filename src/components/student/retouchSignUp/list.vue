 <template>
  <div>
    <Header title="重修报名" type="0" route="/homeIndex" :casLogin="casLogin"></Header>
    <div class="center">
      <div class="center-list" v-for="(item,index) in list" :key="index">
        <div class="list-left">
          <div class="left-title">{{item.kcmc}}</div>
          <div class="left-line">
            <span>编号:</span>
            <span style="margin-left: 5px;">{{item.kch}}</span>
            <span style="margin-left: 20px;">总成绩:</span>
            <span style="margin-left: 5px;">{{item.zhcj}}</span>
          </div>
          <div class="left-line">
            <span>总学时:</span>
            <span style="margin-left: 5px;">{{item.zxs}}</span>
            <span style="margin-left: 20px;">总学分:</span>
            <span style="margin-left: 5px;">{{item.xf}}</span>
          </div>
        </div>
        <div class="list-right">
          <van-button
            v-if="item.sfbm=='0' && sfkbm==true"
            type="default"
            class="right-button"
            @click="pushDetail(item)"
          >报名</van-button>
          <van-button
            v-if="item.sfbm=='1' && sfkbm==true && item.sfjf=='0' && item.skys=='0' && item.kkys=='0' && item.sfxk=='0'"
            style="background: #F86969;"
            type="default"
            class="right-button"
            @click="cancelBm(item)"
          >取消</van-button>
        </div>
      </div>
      <van-empty
        v-if="NOdata"
        class="custom-image"
        image="static/img/no_data.png"
        description="暂无数据"
      />
    </div>
  </div>
</template>
<script>
// import Header from '../header.vue'
import { Api } from '@/utils/axios'
import { Toast } from 'vant'
export default {
  data() {
    return {
      casLogin: sessionStorage.getItem('casLogin'),
      list: [],
      NOdata: false,
      sfkbm: false,

    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await Api.cxbmxk_query()
      if (res.code == '1') {
        this.list = res.data[0].dataList
        this.sfkbm = res.data[0].sfkbm
        if (this.list.length == 0) {
          this.NOdata = true
        } else {
          this.NOdata = false
        }
      } else {
        Toast(res.Msg)
      }
    },
    async cancelBm(item) {
      const params = {
        operate: 'qx',
        id: item.cj0721id,
        sfbm: item.sfbm,
        xnxq01id: item.shxq,
        kcid: item.kcid,
        jx0404id: item.jx0404id,
        sfnbm:''
      }
      const res = await Api.cxbmxk_bm_save(params)
      this.getList()

    },
    pushDetail(item) {
      this.$router.push({ name: 'retouchSubmit', params: { route_params: encodeURI(JSON.stringify(item)) } })
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
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
// src/components/student/retouchSignUp/list.vue