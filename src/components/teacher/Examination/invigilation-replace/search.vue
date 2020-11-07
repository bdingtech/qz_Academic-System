   <template>
  <div>
    <Header title="监考查询" type="0" route="/teacher/examinationIndex" :casLogin="casLogin"></Header>
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
            v-model="xqjd"
            label="学期阶段"
            placeholder="请点击选择"
            readonly
            is-link
            @click="showPicker_xqjd = true"
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
      <van-popup v-model="showPicker_xqjd" position="bottom">
        <van-picker
          show-toolbar
          :columns="xqjd_list"
          @confirm="onConfirmxqjd"
          :item-height="35"
          @cancel="showPicker_xqjd = false"
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
      xqjd: '',
      xqjdId: '',
      showPicker_xnxq: false,
      showPicker_xqjd: false,
      xnxq_list: [],
      xqjd_list: [],
      hd_list: []

    }
  },
  watch: {
    
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await Api.getXnxq()
      this.xnxq_list = res.data.map((v) => {
        if(v.isdqxq == '1') {
          this.xnxq = v.xqmc
          this.xnxqId  = v.xnxq01id
        }
        return {
          text: v.xqmc,
          value: v.xnxq01id
        }
      })
      this.xnxq_list.unshift({ text: '空', value: '' })
      this.getXqjd()
    },
    async getXqjd() {
      const params = {
        table:'zzdxqlb'
      }
      const res = await Api.getXqjd(params)
      this.xqjd_list = res.data.map((v) => {
        return {
          text: v.dmmc,
          value: v.dm
        }
      })
       this.xqjd_list.unshift({ text: '空', value: '' })

    },
    pushExamine() {
      const params = {
        xnxq: this.xnxqId,
        xqjdId: this.xqjdId,
        xnxq_name: this.xnxq,
        xqjd_name: this.xqjd,
      }
        this.$router.push({ name: 'examSearchResult', params: { route_params: encodeURI(JSON.stringify(params)) } })
    },
    onConfirmXnxq(value) {
      if (value.text == '空') {
        this.xnxq = ''
        this.xnxqId = ''
      } else {
        this.xnxq = value.text
        this.xnxqId = value.value
      }

      this.showPicker_xnxq = false
    },
    onConfirmxqjd(value) {
      if (value.text == '空') {
        this.xqjd = ''
        this.xqjdId = ''
      } else {
        this.xqjd = value.text
        this.xqjdId = value.value
      }

      this.showPicker_xqjd = false
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
// src/components/teacher/Examination/invigilation-replace/search.vue