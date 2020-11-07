  <template>
  <div>
    <Header title="成绩录入审核" type="0" route="/teacher/examineIndex" :casLogin="casLogin"></Header>
    <div class="center">
      <div style="width:100%;">
        <van-cell-group>
          <van-field
            v-model="xnxq"
            label="学年学期"
            placeholder="请点击选择"
            readonly
            is-link
            @click="showPicker_xnxq = true"
            input-align="right"
          />
          <van-field
            v-model="hdmc"
            label="活动名称"
            placeholder="请点击选择"
            readonly
            is-link
            @click="showPicker_hdmc = true"
            input-align="right"
          />
          <van-field
            class="xx"
            v-model="kcmc"
            label="课程名称"
            placeholder="请输入课程名称"
            input-align="right"
          />
          <van-field class="xx" v-model="lrr" label="录入人" placeholder="请输入录入人" input-align="right" />
          <van-field
            v-model="kkdw"
            label="开课单位"
            placeholder="非必选"
            readonly
            is-link
            @click="showPicker_kkdw = true"
            input-align="right"
          />
          <van-field
            v-model="shzt"
            label="审核状态"
            placeholder="待处理"
            readonly
            is-link
            @click="showPicker_shzt = true"
            input-align="right"
          />

          <van-field style="display:none" label="备注" placeholder="非必填" input-align="right" />
        </van-cell-group>
      </div>
      <van-button class="bottom-button" type="default" @click="pushExamine">查询</van-button>

      <van-popup v-model="showPicker_xnxq" position="bottom">
        <van-picker
          show-toolbar
          :columns="xnxq_list"
          @confirm="onConfirmXnxq"
          :item-height="35"
          @cancel="showPicker_xnxq = false"
        />
      </van-popup>
      <van-popup v-model="showPicker_hdmc" position="bottom">
        <van-picker
          show-toolbar
          :columns="hdmc_list"
          @confirm="onConfirmHdmc"
          :item-height="35"
          @cancel="showPicker_hdmc = false"
        />
      </van-popup>

      <van-popup v-model="showPicker_kkdw" position="bottom">
        <van-picker
          show-toolbar
          :columns="kkdw_list"
          @confirm="onConfirmKkdw"
          :item-height="35"
          @cancel="showPicker_kkdw = false"
        />
      </van-popup>
      <van-popup v-model="showPicker_shzt" position="bottom">
        <van-picker
          show-toolbar
          :columns="shzt_list"
          :item-height="35"
          @confirm="onConfirmShzt"
          @cancel="showPicker_shzt = false"
        />
      </van-popup>
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
      route: this.$route.params.route,
      xnxq: '',
      xnxqId: '',
      hdmc: '',
      hdmcId: '',
      kcmc: '',
      lrr: '',
      kkdw: '',
      kkdwId: '',
      shzt: '',
      shztId: '',
      showPicker_xnxq: false,
      showPicker_hdmc: false,
      showPicker_kcmc: false,
      showPicker_lrr: false,
      showPicker_kkdw: false,
      showPicker_shzt: false,
      xnxq_list: [],
      hdmc_list: [],
      kcmc_list: [],
      lrr_list: [],
      kkdw_list: [],
      shzt_list: [
        { text: '待处理', value: 'new' },
        { text: '已处理', value: 'old' }
      ],
      hd_list: []

    }
  },
  watch: {
    xnxqId: {
      handler(n) {
        if (n) {
          this.hdmc_list = []
          this.hd_list.forEach((k) => {
            if (n == k.xnxq01id) {
              this.hdmc_list.push({
                text: k.cjlrmc,
                value: k.cj0701id,
              })
            }
          })
          this.hdmc_list.unshift({ text: '空', value: '' })
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await Api.getcjMaxlr()

      this.xnxq_list = res.xnxq.map((v) => {
        return {
          text: v.mc,
          value: v.xnxq01id
        }
      })
      this.xnxq_list.unshift({ text: '空', value: '' })
      this.kkdw_list = res.xy.map((v) => {
        return {
          text: v.dwmc,
          value: v.xx0301id
        }
      })
      this.kkdw_list.unshift({ text: '空', value: '' })
      this.hd_list = res.xn
      this.xnxqId = res.data[0].xnxq01id
      this.xnxq = res.data[0].xnxq01id
      this.hdmcId = res.data[0].cj0701id
      this.hd_list.forEach((k) => {
        if (k.cj0701id === this.hdmcId) {
          this.hdmc = k.cjlrmc
        }
      })

      this.shzt = '待处理'
      this.shztId = 'new'


    },
    pushExamine() {
      const params = {
        xnxq: this.xnxqId,
        cj0701id: this.hdmcId,
        wfexname: this.kcmc,
        lrr: this.lrr,
        Kkyx: this.kkdwId,
        iswfmes: this.shztId,
        xnxq_name: this.xnxq,
        hdmc_name: this.hdmc,
        kcmc_name: this.kcmc,
        lrr_name: this.lrr,
        kkdw_name: this.kkdw,
        shzt_name: this.shzt,
      }
      this.$router.push({ name: 'scoreList', params: { route_params: encodeURI(JSON.stringify(params)) } })
    },
    onConfirmXnxq(value) {
      if (value.text == '空') {
        this.xnxq = ''
        this.xnxqId = ''
      } else {
        this.xnxq = value.text
        this.xnxqId = value.value
      }
      this.hdmc = ''
      this.showPicker_xnxq = false
    },
    onConfirmHdmc(value) {
      if (value.text == '空') {
        this.hdmc = ''
        this.hdmcId = ''
      } else {
        this.hdmc = value.text
        this.hdmcId = value.value
      }

      this.showPicker_hdmc = false
    },

    onConfirmKkdw(value) {
      if (value.text == '空') {
        this.kkdw = ''
        this.kkdwId = ''
      } else {
        this.kkdw = value.text
        this.kkdwId = value.value
      }

      this.showPicker_kkdw = false
    },
    onConfirmShzt(value) {
      this.shzt = value.text
      this.shztId = value.value
      this.showPicker_shzt = false
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
/deep/  .van-picker-column {
  position: relative;
}
/deep/  .van-picker-column::before {
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
/deep/  .van-ellipsis /deep/ .van-picker-column__item /deep/ .van-picker-column__item--selected {
  color: @attendance-color-1;
  font-weight: 600;
}
</style>


// WEBPACK FOOTER //
// src/components/teacher/Examine/score-entry/search.vue