 <template>
  <div class="center">
    <Header title="辅修报名" type="0" route="/student/minorSearch" :casLogin="casLogin"></Header>
    <div class="center">
      <div class="search-top">
        <div class="top-line" v-for="(item,index) in search_list" :key="index">{{item.name}}</div>
      </div>
      <div class="search-result">搜索结果</div>
      <div v-for="(item,index) in list" :key="index" style="width:100%;">
        <div class="center-list" v-for="(oItem,oIndex) in item.otherData" :key="oIndex">
          <div class="list-left">
            <div class="left-title">{{oItem.zymc}}</div>
              <div class="left-line">
                <span>院系:</span>
                <span style="margin-left: 5px;">{{oItem.dwmc}}</span>
              </div>
              <div class="left-line">
                <span>说明:</span>
                <span style="margin-left: 5px;">{{oItem.bmsm}}</span>
              </div>
            </div>
            <div class="list-right">
              <van-button
                v-if="(oItem.iswfmes == null || oItem.iswfmes == '') && oItem.sfytg != '1'"
                type="default"
                class="right-button"
                @click="bmShr(item)"
              >报名</van-button>
              <div v-if="oItem.iswfmes == '2'" class="right-span">审核中</div>
              <div v-if="oItem.iswfmes == '1'" style="color: #12DDD6;" class="right-span">通过</div>
              <div
                v-if="oItem.iswfmes == '0'"
                style="color: #F86969;"
                class="right-span"
              >未通过</div>
              <div
                v-if="((oItem.iswfmes == '2' &&  oItem.sfsh == '' && (oItem.issh == '2' || oItem.issh == '')) || (oItem.iswfmes == '0' && oItem.sfytg  != '1')) && item.sfqyzybm"
                style="color: #F86969;"
                class="right-span"
                @click="canceBm(item)"
              >取消报名</div>
              <div
                v-if="((oItem.iswfmes == '0' || oItem.iswfmes == '3') && oItem.sfytg != '1') && !item.sfqyzybm"
                style="color: #F86969;"
                class="right-span"
                @click="canceBm(item)"
              >取消报名</div>
            </div>
        </div>
      </div>

      <van-empty
        v-if="NOdata"
        class="custom-image"
        image="static/img/no_data.png"
        description="暂无数据"
      />

      <van-popup v-model="peoplePop" position="bottom">
        <div class="apply-pop">
          <div class="pop-title">
            <i class="closeIcon" @click="peoplePop = false"></i>
            <p>审核人</p>
            <i class="conIcon" @click="resetCancel()"></i>
          </div>
          <div class="pop-search">
            <div class="inp">
              <input
                type="text"
                placeholder="搜索审核人"
                @keydown.enter="searchJkls"
                v-model="search_jkls"
              />
              <i></i>
              <div v-if="showSearch" class="inp-search" @click="searchJkls">搜索</div>
            </div>
            <div class="search-results">搜索结果</div>
          </div>
          <div class="person" style="padding-top:150px;">
            <button
              class="per-btn"
              ref="person"
              @click="personTap($event,index)"
              v-for="(item,index) in shr_list"
              :key="item.id"
            >{{item.name}}</button>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
// import Header from '../header.vue'
import { Api } from '@/utils/axios'
import { Toast } from 'vant';
export default {
  data() {
    return {
      casLogin: sessionStorage.getItem('casLogin'),
      list: [],
      search_list: [],
      NOdata: false,
      route_params: {},
      reset: "",
      resetId: '',
      peoplePop: false,
      shr_list: [{
        id: '',
        name: '全部',
        isBtn: 0,
      }],
      search_jkls: '',
      showSearch: false,
      bm_params: {}

    }
  },
  watch: {
    search_jkls: {
      handler(n, o) {
        if (n.length > 0) {
          this.showSearch = true

        } else {
          this.showSearch = false
          if (n == '' && o != '') {
            this.searchJkls()
          }
        }
      },
      deep: true
    },
  },
  mounted() {
    this.getShr()
    this.getList()
  },
  methods: {
    async getShr() {
      const params = {
        ywcode: '075',
      }
      this.shr_list = [{
        id: '',
        name: '全部',
        isBtn: 0,
      }]
      const res = await Api.selectReviewerApi(params)
      let concatList = []
      res.data.forEach((item, index) => {
        concatList[index] = {
          name: item.userrealname,
          id: item.userid,
          isBtn: 0,
        }
      });
      this.shr_list = this.shr_list.concat(concatList)
    },

    async getList() {
      const route_params = JSON.parse(decodeURI(this.$route.params.route_params))
      this.route_params = JSON.parse(decodeURI(this.$route.params.route_params))
      const params = {
        xnxqid: route_params.xnxq,
        yxid: route_params.fxyxId,
      }
      const res = await Api.showFxxsInfo(params)
      if(res.data.length == 0){
        Toast(res.Msg)
      }
      this.list = res.data
      if (this.list.length == 0) {
        this.NOdata = true
      } else {
        this.NOdata = false
      }
      this.search_list = []
      if (route_params.xnxq_name != '') {
        this.search_list.push({ name: route_params.xnxq_name })
      }
      if (route_params.fxyx_name != '') {
        this.search_list.push({ name: route_params.fxyx_name })
      }
    },
    //搜索监考老师
    async searchJkls() {
      const params = {
        ywcode: '075',
        selectname: this.search_jkls
      }
      this.shr_list = [{
        id: '',
        name: '全部',
        isBtn: 0,
      }]
      const res = await Api.selectReviewerApi(params)
      let concatList = []
      res.data.forEach((item, index) => {
        concatList[index] = {
          name: item.userrealname,
          id: item.userid,
          isBtn: 0,
        }
      });
      this.shr_list = this.shr_list.concat(concatList)

    },
    async resetCancel() {
      this.peoplePop = false
      this.person = this.reset
      this.personId = this.resetId

      const params = {
        ywcode: '075',
        ywid: this.bm_params.ywid,
        userids:this.personId

      }
      const res = await Api.submitCensorshipApi(params)
      this.getList()

      Toast(res.Msg)

    },
    personTap(e, res) {
      let strList = []
      let idList = []
      if (this.shr_list[res].isBtn == 0) {
        this.shr_list[res].isBtn = 1
        e.target.className = 'cur'
      } else if (this.shr_list[res].isBtn == 1) {
        this.shr_list[res].isBtn = 0
        e.target.className = 'per-btn'
      }
      for (let i in this.shr_list) {
        if (this.shr_list[res].name == '全部') {
          this.shr_list[i].isBtn = 0;
          this.shr_list[res].isBtn = 1
          this.$refs.person[res].className = 'cur'
          this.$refs.person[i].className = 'per-btn'
        } else {
          this.shr_list[0].isBtn = 0;
          this.$refs.person[0].className = 'per-btn'
        }
        if (this.shr_list[i].isBtn == 1) {
          strList = strList.concat(this.shr_list[i].name)
          idList = idList.concat(this.shr_list[i].id)
        }
      }
      this.reset = strList.toString();
      this.resetId = idList.toString();
    },
    bmShr(item) {
      this.bm_params = item
      if (item.sfqyzybm) {
        // this.peoplePop = true
        this.onlyReplayBm()
      } else {
        //报名
        this.replayBm()
      }

    },
    //报名 和送审
    async replayBm() {
      const params = {
        yxid: this.bm_params.yxid,
        xnxqid: this.bm_params.xnxqid,
        jx01ndid: this.bm_params.otherData[0].jx01ndid,
        // zy: this.bm_params.otherData[0].ZY,
        zy: '1',
        sfqyzybm: this.bm_params.sfqyzybm,
        xx0301id: this.bm_params.otherData[0].xx0301id,
        zdbmzy: this.bm_params.zdbmzy

      }
      const res = await Api.fxbmOper(params)
      if (res.code == 1) {
        if (res.data[0].ywid != '' || res.data[0].ywid != undefined) {
          this.bm_params.ywid = res.data[0].ywid
          this.peoplePop = true
        } else {
          Toast(res.Msg)
        }


      }

    },
    //报名
    async onlyReplayBm() {
      const params = {
        yxid: this.bm_params.yxid,
        xnxqid: this.bm_params.xnxqid,
        jx01ndid: this.bm_params.otherData[0].jx01ndid,
        // zy: this.bm_params.otherData[0].ZY,
        zy: '1',
        sfqyzybm: this.bm_params.sfqyzybm,
        xx0301id: this.bm_params.otherData[0].xx0301id,
        zdbmzy: this.bm_params.zdbmzy

      }
      const res = await Api.fxbmOper(params)
      Toast(res.Msg)
      setTimeout(() => {
        this.getList()
      },1000)
    },
    // 取消报名
    async canceBm(item) {
      const params = {
        yxid: item.yxid,
        xnxqid: item.xnxqid,
        jx01ndid: item.otherData[0].jx01ndid
      }
      const res = await Api.qxFxbmOper(params)
      Toast(res.Msg)
      setTimeout(() => {
        this.getList()
      },1000)
    },
    //审核
    async asyncsendSh() {
      const params = {
        ywcode: '075',
        ywid: this.bm_params.ywid
      }
      const res = await Api.submitCensorshipApi(params)
      this.getList()

      Toast(res.Msg)

    },
    pushDetail(xq_id, sh_id) {
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
  width: calc(~'100% - 40px');
  background: @attendance-background-color-10;
  border-radius: 5px;
  margin: 20px 20px 0;
  display: flex;
  align-items: center;
  padding: 20px 20px 18px 20px;
  box-sizing: border-box;
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
/deep/ .van-picker-column {
  position: relative;
}
/deep/ .van-picker-column::before {
  width: 140px;
  height: 1px;
  background-color: @attendance-background-color-2 ;
  content: '';
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
}
/deep/ .van-picker-column::after {
  width: 140px;
  height: 1px;
  background-color: @attendance-background-color-2 ;
  content: '';
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
}
/deep/
  .van-ellipsis
  /deep/
  .van-picker-column__item
  /deep/
  .van-picker-column__item--selected {
  color: @attendance-color-1;
  font-weight: 600;
}
.center .closeIcon {
  background: url(../../../../static/img/close.png) no-repeat center;
}
.center .conIcon {
  background: url(../../../../static/img/confirm.png) no-repeat center;
}
.center .pop-title i {
  width: 22px;
  height: 22px;
  background-size: 22px 22px;
  padding: 10px;
}
.center .pop-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  background-color: @attendance-color-3;
  border-radius: 5px 5px 0 0;
}
.center .pop-search {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: fixed;
  width: calc(~'100% - 32px');
  padding: 6px 16px 0px 16px;
  background-color: @attendance-color-3;
  margin-top: 40px;
}
.search-results {
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: @attendance-color-2;
  padding: 13px 0px 7px 0px;
  border-bottom: 1px solid @attendance-border-color-6;
}
.center .person {
  padding: 57px 15px 15px 15px;
}
.center .person button {
  border-radius: 3px;
  padding: 5px 15px;
  margin-right: 12px;
  margin-bottom: 10px;
}
.center .apply-pop .person .per-btn {
  background-color: @attendance-background-color-7;
  color: @attendance-background-color-1;
}
.center .person .cur {
  background-color: @attendance-background-color-1;
  color: @attendance-background-color-7;
}
.center
  /deep/.van-popup
  /deep/.van-popup--bottom
  /deep/.van-picker
  /deep/.van-picker-column {
  position: relative;
}
.center
  /deep/.van-ellipsis
  /deep/.van-picker-column__item
  /deep/.van-picker-column__item--selected {
  color: @attendance-color-1;
  font-weight: 600;
}

.center .inp input {
  width: 100%;
  height: 44px;
  background: @attendance-background-color-6;
  border: none;
  outline: none;
  text-indent: 46px;
  border-radius: 3px;
}
.center .inp input::-webkit-input-placeholder {
  font-size: 16px;
  color: @attendance-color-2;
}
.center .inp {
  width: 100%;
  position: relative;
}
.center .inp i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  background: url(../../../assets/images/search.png) center center no-repeat;
  background-size: 100%;
}
.inp .inp-search {
  position: absolute;
  top: 50%;
  right: 12px;
  z-index: 3;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  color: @attendance-background-color-1;
}
</style>



// WEBPACK FOOTER //
// src/components/student/minorSignUp/list.vue