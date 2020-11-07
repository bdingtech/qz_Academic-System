 <template>
  <div>
    <Header title="重修报名" type="0" route="/student/retouchList" :casLogin="casLogin"></Header>
    <div class="center">
      <div style="width:100%;">
        <van-cell-group>
          <van-field v-model="route_params.kcmc" label="课程名称" readonly input-align="right" />
          <van-field v-model="route_params.dwmc" label="开课院系" readonly input-align="right" />
          <van-field v-model="route_params.zxs" label="总学时" readonly input-align="right" />
          <van-field v-model="route_params.xf" label="学分" readonly input-align="right" />
          <van-field v-model="route_params.kclbmc" label="课程属性" readonly input-align="right" />
          <van-field v-model="route_params.ksfsmc" label="考试方式" readonly input-align="right" />
          <van-field v-model="route_params.kcxzkcxz" label="课程性质" readonly input-align="right" />
          <van-field v-model="route_params.cjfsmc" label="成绩方式" readonly input-align="right" />
          <van-field v-model="route_params.ksxzmc" label="考试性质" readonly input-align="right" />
          <van-field style="display:none" label="备注" placeholder="非必填" input-align="right" />
        </van-cell-group>
      </div>
      <van-button class="bottom-button" type="default" @click="pushExamine">提交</van-button>
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
      route: this.$route.params.route,
      xnxq: '',
      xnxqId: '',
      xqjd: '',
      xqjdId: '',
      showPicker_xnxq: false,
      showPicker_xqjd: false,
      xnxq_list: [],
      xqjd_list: [],
      hd_list: [],
      route_params: {},
      info: {}

    }
  },
  watch: {

  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.route_params = JSON.parse(decodeURI(this.$route.params.route_params))
    },
    async pushExamine() {
      const params = {
        operate: 'bm',
        id: this.route_params.cj0721id,
        sfbm: this.route_params.sfbm,
        xnxq01id: this.route_params.shxq,
        kcid: this.route_params.kcid,
        jx0404id: this.route_params.jx0404id,
        sfnbm: ''
      }
      const res = await Api.cxbmxk_bm_save(params)
      Toast(res.Msg)
      let _this = this
      setTimeout(function () {
        if (res.code == '1') {
          _this.$router.push({ name: 'retouchList' })
        }
      }, 300)
    },
  }

}
</script>
<style scoped  lang="less" >
.center {
  width: 100%;
  display: flex;
  justify-content: center;
}
.bottom-button {
  width: calc(~'100% - 40px');
  background-color: @attendance-background-color-1;
  color: white;
  font-size: 16px;
  font-weight: 600;
  height: 44px;
  line-height: 44px;
  position: absolute;
  bottom: 20px;
  border-radius: 3px;
}
.center input::placeholder {
  color: @attendance-background-color-2;
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
  color: @attendance-background-color-2;
}
/deep/ .van-picker-column {
  position: relative;
}
/deep/ .van-picker-column::before {
  width: 140px;
  height: 1px;
  background-color: @attendance-background-color-2;
  content: '';
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
}
/deep/ .van-picker-column::after {
  width: 140px;
  height: 1px;
  background-color: @attendance-background-color-2;
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
</style>



// WEBPACK FOOTER //
// src/components/student/retouchSignUp/submit.vue