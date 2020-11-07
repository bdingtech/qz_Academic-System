   <template>
  <div>
    <Header title="监考调代" type="0" route="examSearchResult,1" :casLogin="casLogin"></Header>
    <div class="replace">
      <div class="top-info">
        <div class="info-first">{{route_params.xqmc}}</div>
        <div class="info-line">
          <span>考场：</span>
          {{route_params.kcmc}}
        </div>
        <div class="info-line">
          <span>考试场次：</span>
          {{route_params.ksccmc}}
        </div>
      </div>
      <div style="width:100%;">
        <van-cell-group>
          <van-field
            v-if="route_params.istd == '0'"
            v-model="tdjs"
            label="调代教师"
            placeholder="请点击选择"
            readonly
            is-link
            @click="showPicker_tdjs = true"
            input-align="right"
          />
          <van-field
            v-if="route_params.istd == '1'"
            v-model="person"
            label="审核人"
            placeholder="请点击选择"
            readonly
            is-link
            @click="peoplePop = true"
            input-align="right"
          />
          <van-field
            v-if="route_params.istd == '0'"
            class="xx"
            v-model="remark"
            label="调代原因"
            placeholder="请点击填写"
            input-align="right"
          />

          <van-field style="display:none" label="备注" placeholder="非必填" input-align="right" />
        </van-cell-group>
      </div>
      <div class="bottom-btn-line">
        <van-button
          class="bottom-button"
          v-if="route_params.istd == '1'"
          type="default"
          @click="pushExamine('ss')"
        >送审</van-button>
        <van-button
          class="bottom-button"
          v-if="route_params.istd == '0'"
          type="default"
          @click="pushExamine('td')"
        >调代老师</van-button>
        <van-button class="bottom-button" @click="pushExamine('qx')">取消调代</van-button>
      </div>
      <van-popup v-model="showPicker_tdjs" position="bottom">
        <div class="apply-pop">
          <div class="pop-title">
            <i class="closeIcon" @click="showPicker_tdjs = false"></i>
            <p>调代教师</p>
            <i class="conIcon" @click="resetDdCancel()"></i>
          </div>
          <div class="pop-search">
            <div class="inp">
              <input
                type="text"
                placeholder="搜索教师名称/工号"
                @keydown.enter="searchTdjs"
                v-model="value"
              />
              <i></i>
              <div v-if="showSearch" class="inp-search" @click="searchTdjs">搜索</div>
            </div>
            <div class="search-result">搜索结果</div>
          </div>
          <div class="person" style="padding-top:150px;">
            <button
              class="per-btn"
              ref="personTdjs"
              @click="personTdjs($event,index)"
              v-for="(item,index) in personTdjsList"
              :key="item.id"
            >{{item.name}}</button>
          </div>
        </div>
      </van-popup>

      <van-popup v-model="peoplePop" position="bottom">
        <div class="apply-pop">
          <div class="pop-title">
            <i class="closeIcon" @click="peoplePop = false"></i>
            <p>审核人</p>
            <i class="conIcon" @click="resetCancel()"></i>
          </div>
          <div class="person">
            <button
              class="per-btn"
              ref="person"
              @click="personTap($event,index)"
              v-for="(item,index) in personList"
              :key="item.id"
            >{{item.name}}</button>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
// import Header from '../../header.vue'
import { Api } from '@/utils/axios'
import axios from 'axios';
import qs from 'qs'
import { Toast } from 'vant';
export default {
  data() {
    return {
      casLogin: sessionStorage.getItem('casLogin'),
      value: '',
      person: '',
      personId: '',
      tdjs: '',
      tdjsId: '',
      oldjgbh: '',
      remark: '',
      tdjs_list: [],
      showPicker_tdjs: false,
      peoplePop: false,
      route_params: {},
      personList: [{
        id: '',
        name: '全部',
        isBtn: 0,
      }],
      personTdjsList: [],
      route_params: {},
      showSearch: false,
      reset:"",
      resetId:'',
      resetDd:'',
      resetDdId:''
    }
  },
  watch: {
    value: {
      handler(n, o) {
        if (n.length > 0) {
          this.showSearch = true

        } else {
          this.showSearch = false
          if (n == '' && o != '') {
            this.searchTdjs()
          }
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    resetDdCancel(){
      this.showPicker_tdjs = false
      this.tdjs = this.resetDd
      this.tdjsId = this.resetDdId
    },
    resetCancel(){
      this.peoplePop = false
      this.person = this.reset
      this.personId = this.resetId
    },
    async getList() {
      this.route_params = JSON.parse(decodeURI(this.$route.params.route_params))
      const params = {
        kw0412tdid: this.route_params.kw0412tdid
      }
      const res = await Api.getJkjs(params)
      if (res.data.length > 0) {
        this.tdjs = res.data[0].xm
        this.tdjsId = res.data[0].jgh
        this.oldjgbh = res.data[0].jgh
        this.remark = res.data[0].tdyy
      }
      this.getShr()
      this.getTdjs()
    },
    async getTdjs() {
      const params = {
        kw0403id: this.route_params.kw0403id,
        xnxq01id: this.route_params.xnxq
      }
      if (this.tdjs != '' && this.tdjsId != '') {
        params.yls = this.tdjsId
      }
      const res = await Api.getkxjs(params)
      let concatList = []
      res.data.forEach((item, index) => {
        concatList[index] = {
          name: item.xm,
          id: item.jg0101id,
          isBtn: 0,
        }
      });
      this.personTdjsList = this.personTdjsList.concat(concatList)
    },
    async getShr() {
      const params = {
        ywcode: '408'
      }
      const res = await Api.getTdshr(params)
      let concatList = []
      res.data.forEach((item, index) => {
        concatList[index] = {
          name: item.userrealname,
          id: item.userid,
          isBtn: 0,
        }
      });
      this.personList = this.personList.concat(concatList)
    },
    async searchTdjs() {
      const params = {
        kw0403id: this.route_params.kw0403id,
        xnxq01id: this.route_params.xnxq,
        jgxm: this.value
      }
      this.personTdjsList = []
      const res = await Api.getkxjs(params)
      let concatList = []
      res.data.forEach((item, index) => {
        concatList[index] = {
          name: item.xm,
          id: item.jgh,
          isBtn: 0,
        }
      });
      this.personTdjsList = this.personTdjsList.concat(concatList)
    },
    pushExamine(flag) {
      if (this.tdjs == '') {
        Toast('请选择调代教师')
        return
      }
      //送审
      if (flag == 'ss') {
        // if (this.personId == '') {
        //   Toast('请选择审核人')
        //   return
        // }
        const params = {
          kw0412tdid: this.route_params.kw0412tdid,
          userids: this.personId,
          code: '408',
        }
        Api.sstdjgSs(params).then((res) => {
          if (res.code == '1') {
            this.$router.push({ name: 'examSearchResult' })
          }

          Toast(res.Msg)

        }).catch(() => {

        })

      }
      //取消调代
      if (flag == 'qx') {
        const params = {
          kw0412tdid: this.route_params.kw0412tdid,
          type: 'edit',
        }
        Api.cancelTdjs(params).then((res) => {
          if (res.code == '1') {
            this.$router.push({ name: 'examSearchResult' })
          }
          Toast(res.Msg)
        }).catch(() => {

        })

      }
      //调代老师
      if (flag == 'td') {
        // if (this.tdjsId == '') {
        //   Toast('请选择调代老师')
        //   return
        // }
        const params = {
          kw0412tdid: this.route_params.kw0412tdid,
          kw0412id: this.route_params.kw0412id,
          type: 'save',
          newjgbh: this.tdjsId,
          oldjgbh: this.oldjgbh,
          tdyy: this.remark,
        }
        Api.cancelTdjs(params).then((res) => {
          if (res.code == '1') {
            this.$router.push({ name: 'examSearchResult' })
          }
          Toast(res.Msg)

        }).catch(() => {

        })

      }


    },
    personTap(e, res) {
      let strList = []
      let idList = []
      if (this.personList[res].isBtn == 0) {
        this.personList[res].isBtn = 1
        e.target.className = 'cur'
      } else if (this.personList[res].isBtn == 1) {
        this.personList[res].isBtn = 0
        e.target.className = 'per-btn'
      }
      for (let i in this.personList) {
        if (this.personList[res].name == '全部') {
          this.personList[i].isBtn = 0;
          this.personList[res].isBtn = 1
          this.$refs.person[res].className = 'cur'
          this.$refs.person[i].className = 'per-btn'
        } else {
          this.personList[0].isBtn = 0;
          this.$refs.person[0].className = 'per-btn'
        }
        if (this.personList[i].isBtn == 1) {
          strList = strList.concat(this.personList[i].name)
          idList = idList.concat(this.personList[i].id)
        }
      }
      this.reset = strList.toString();
      this.resetId = idList.toString();
    },
    personTdjs(e, index) {

      let strList = []
      let idList = []
      //     this.$refs.personTdjs[res].className = 'cur'
      //     this.$refs.personTdjs[i].className = 'per-btn'
      this.personTdjsList = this.personTdjsList.map((v, index2) => {
        if (index == index2) {
          if (v.isBtn == 0) {
            v.isBtn = 1
            this.resetDd = v.name
            this.resetDdId = v.id
            this.$refs.personTdjs[index].className = 'cur'
          }

        } else {
          v.isBtn = 0
          this.$refs.personTdjs[index2].className = 'per-btn'
        }

        return v
      })


    },

  }

}
</script>
<style scoped  lang="less" >
.replace {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.bottom-btn-line {
  width: calc(~'100% - 40px');
  position: absolute;
  bottom: 20px;
  text-align: center;
}
.bottom-button {
  width: 49%;
  background-color: @attendance-background-color-1;
  color: white;
  font-size: 16px;
  font-weight: 600;
  height: 44px;
  line-height: 44px;
  border-radius: 3px;
}
.center input::placeholder {
  color:@attendance-background-color-2;
  font-weight: 0 !important;
}
/deep/ .van-field__control {
  color: @attendance-color-1 !important;
  font-weight: 600;
}
/deep/ .van-cell {
  font-size: 16px;
}
/deep/.van-field__label {
  width: 100px;
}
/deep/ .van-picker__cancel {
  color: rgba(0, 0, 0, 0);
}
/deep/ .van-picker__confirm {
  color: rgba(0, 0, 0, 0);
}
.xx {
  /deep/ .van-field__body {
    padding-right: 6px;
  }
  /deep/ .van-field__label {
    width: 68px;
  }
}
.upload-line {
  /deep/ .van-field__label {
    width: 75px;
  }
}
/deep/ .van-cell {
  padding: 20px 16px 10px 20px;
}
/deep/ .van-cell:not(:last-child)::after {
  left: 20px;
  right: 20px;
}
/deep/ .van-cell__right-icon {
  margin-left: 3px;
  color:@attendance-background-color-2;
}
/deep/ .van-picker-column {
  position: relative;
}
/deep/ .van-picker-column::before {
  width: 140px;
  height: 1px;
  background-color:@attendance-background-color-2;
  content: '';
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
}
/deep/ .van-picker-column::after {
  width: 140px;
  height: 1px;
  background-color:@attendance-background-color-2;
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

.replace .closeIcon {
  background: url(../../../../../static/img/close.png) no-repeat center;
}
.replace .conIcon {
  background: url(../../../../../static/img/confirm.png) no-repeat center;
}
.replace .pop-title i {
  width: 22px;
  height: 22px;
  background-size: 22px 22px;
  padding: 10px;
}
.replace .pop-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  background-color: @attendance-border-color-6;
  border-radius: 5px 5px 0 0;
}
.replace .pop-search {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: fixed;
  width: calc(~'100% - 32px');
  padding: 6px 16px 0px 16px;
  background-color: @attendance-border-color-6;
  margin-top: 40px;
}
.search-result {
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: @attendance-color-2;
  padding: 13px 0px 7px 0px;
  border-bottom: 1px solid @attendance-border-color-6;
}
.replace .person {
  padding: 57px 15px 15px 15px;
}
.replace .person button {
  border-radius: 3px;
  padding: 5px 15px;
  margin-right: 12px;
  margin-bottom: 10px;
}
.replace .apply-pop .person .per-btn {
  background-color: @attendance-background-color-7;
  color: @attendance-background-color-1;
}
.replace .person .cur {
  background-color: @attendance-background-color-1;
  color: @attendance-background-color-7;
}
.replace
  /deep/.van-popup
  /deep/.van-popup--bottom
  /deep/.van-picker
  /deep/.van-picker-column {
  position: relative;
}
.replace
  /deep/.van-ellipsis
  /deep/.van-picker-column__item
  /deep/.van-picker-column__item--selected {
  color: @attendance-color-1;
  font-weight: 600;
}
.top-info {
  width: calc(~'100% - 40px');
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 16px;
}
.info-first {
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  color: @attendance-color-1;
}
.info-line {
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  color: @attendance-color-2;
  margin-top: 4px;
}
.info-line span {
  font-weight: normal;
}
.replace .inp input {
  width: 100%;
  height: 44px;
  background: @attendance-background-color-6;
  border: none;
  outline: none;
  text-indent: 46px;
  border-radius: 3px;
}
.replace .inp input::-webkit-input-placeholder {
  font-size: 16px;
  color: @attendance-color-2;
}
.replace .inp {
  width: 100%;
  position: relative;
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
.replace .inp i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  background: url(../../../../assets/images/search.png) center center no-repeat;
  background-size: 100%;
}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Examination/invigilation-replace/replace.vue