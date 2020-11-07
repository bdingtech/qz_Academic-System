  <template>
  <div>
     <!-- type="0" :route="route"  -->
    <Header title="审核" :casLogin="casLogin"></Header>
    <div class="stop-item">
      <div style="width:100%;">
        <van-cell-group>
          <van-field
            v-model="spjg"
            label="审批结果"
            placeholder="请点击选择"
            readonly
            is-link
            @click="showPicker1 = true"
            input-align="right"
          />
          <van-field
            v-model="person"
            v-if="shr_flag=='1'"
            label="下一步审核人"
            placeholder="请点击选择"
            readonly
            is-link
            @click="peoplePop = true"
            input-align="right"
          />

          <van-field name="uploader" input-align="right" class="upload-line" label="上传附件" v-if="!route_tk.new">
            <template #input>
              <van-uploader 
                v-model="uploader" 
                accept="*" 
                :after-read="afterRead" 
                :max-size="2 * 1024 * 1024"
                @oversize="onOversize"/>
            </template>
          </van-field>
          <van-field class="xx" v-model="remark" label="备注" placeholder="非必填" input-align="right" />
          <van-field style="display:none" label="备注" placeholder="非必填" input-align="right" />
        </van-cell-group>
      </div>
      <div v-if="isShowFile">
        <van-button class="bottom-button" type="default" @click="CheckFile">查看附件</van-button>
        <van-button class="bottom-button1" type="default" @click="pushExamine">审核</van-button>
      </div>
      <div v-else>
        <van-button class="bottom-button2" type="default" @click="pushExamine">审核</van-button>
      </div>
      <van-popup v-model="showPicker1" position="bottom">
        <van-picker
          show-toolbar
          :columns="isEndShow == '1' ? columns : columns1"
          @confirm="onConfirm1"
          :item-height="35"
          @cancel="showPicker1 = false"
        />
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
      route: this.$route.params.route,
      remark: '审核通过',
      spjg: '通过',
      spjgId: '1',
      shr: '',
      shrId: '',
      columns: [
        { text: '通过', value: '1' },
        { text: '不通过', value: '0' },
        { text: '终止流程', value: '2' },
      ],
      columns1: [
        { text: '通过', value: '1' },
        { text: '不通过', value: '0' },
      ],
      showPicker1: false,
      peoplePop: false,
      shr_list: [],
      uploader: [],
      route_params: {},
      personList: [{
        id: '',
        name: '全部',
        isBtn: 0,
      }],
      isShowFile:false,
      person: '',
      personId: '',
      route_tk: {},
      shr_flag: false,
      reset:"",
      resetId:'',
      ywinstanceid:'',
      isEndShow:''
    }
  },
  watch: {
    spjgId: {
      handler(n) {
        if (n == '1') {
          this.remark = '审核通过'
        }
        if (n == '0') {
          this.remark = '审核不通过'
        }
      },
      deep: true
    }
  },
  mounted() {
    this.route_tk = JSON.parse(decodeURI(this.$route.params.route_params))
    if(!this.route_tk.new){
      this.getList()
    }
  },
  methods: {
    onOversize(file){
      Toast.fail('文件大小不能超过2M')
    },
    CheckFile(){
      this.$router.push({
        path:'/teacher/fileDetail',
        query:{
          id:this.route_tk.id_sh
        }
      })
    },
    resetCancel(){
      this.peoplePop = false
      this.person = this.reset
      this.personId = this.resetId
    },
    async getList() {
      const params = {
        id: this.route_tk.id_sh
      }
      // let formData = new FormData();
      // formData.append('id', this.route_tk.id_sh);
      const res = await Api.getshXx(params)
      if(res.code == '0'){
        Toast.fail(res.Msg)
      }
      this.shr_flag = res.xsxyb
      let concatList = []
      if(res.nextRoleList && res.nextRoleList.length > 0){
        res.nextRoleList.forEach((item, index) => {
          concatList[index] = {
            name: item.userrealname,
            id: item.userid,
            isBtn: 0,
          }
        });
      }
      this.isEndShow = res.qzwfdefine.isend
      this.ywinstanceid = res.qzwfexample.ywinstanceid
      this.personList = this.personList.concat(concatList)
      if(res.recList.length == 0){
        this.isShowFile = false
      }else{
        this.isShowFile = true
      }
    },
    async afterRead(file) {
      // const params = {
      //   ywinstanceid: this.route_tk.xq_id,
      //   id: this.route_tk.id_sh,
      //   file: file.file,
      // }
      let formData = new FormData();
      formData.append('ywinstanceid', this.route_tk.xq_id || this.ywinstanceid);
      formData.append('id', this.route_tk.id_sh);
      formData.append('file', file.file);
      const res = await Api.fileUpload(formData)
      Toast(res.Msg)
      // axios.defaults.headers.token = sessionStorage.getItem('Token')
      // axios.post('/apis/upload/fileUpload',
      //   formData,
      //   // { timeout: 5 * 60 * 1000 }
      // ).then(res => {
      //   Toast(res.data.Msg)
      // }).catch(() => {
      //   Toast('上传失败')
      // })
    },
    async pushExamine() {
      const params = {
        id: this.route_tk.id_sh,
        type: this.spjgId,
        shyj: this.remark,
        code: this.route_tk.sh_flag
      }
      if(this.shr_flag == '1') {
        params.userids = this.personId
      }
      let res = {}
      if(this.route_tk.new){
        res = await Api.workflowAuditingNew(params)
      }else{
        res = await Api.workflowAuditing(params)
      }
      if(res.code == '1'){
        this.$router.push({ name: 'examineCommomSuccess' })
      }else{
        Toast(res.Msg)
        setTimeout(() => {
          this.$router.replace('/teacher/examineIndex')
        },2000)
      }
    },
    onConfirm1(value) {
      this.spjg = value.text
      this.spjgId = value.value
      this.showPicker1 = false
    },
    onConfirm2(value) {
      this.shr = value.text
      this.shrId = value.value
      this.showPicker2 = false
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

  }

}
</script>
<style scoped  lang="less" >
.stop-item {
  width: 100%;
  display: flex;
  justify-content: center;
}
.bottom-button, .bottom-button1,.bottom-button2{
  font-size: 16px;
  font-weight: 600;
  height: 44px;
  line-height: 44px;
  position: absolute;
  bottom: 20px;
  border-radius: 3px;
}
.bottom-button{
  width: calc(~'50% - 30px');
  left: 20px;
  background-color: @attendance-background-color-7;
  color: @attendance-background-color-1;
}
.bottom-button1{
  width: calc(~'50% - 30px');
  right: 20px;
  background-color: @attendance-background-color-1;
  color: white;
}
.bottom-button2{
  left: 20px;
  width: calc(~'100% - 40px');
  background-color: @attendance-background-color-1;
  color: white;
}
.center input::placeholder {
  color: @attendance-background-color-2;
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
    width: 36px;
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
  color: @attendance-background-color-2;
}
/deep/ .van-picker-column {
  position: relative;
}
/deep/ .van-picker-column::before {
  width: 140px!important;
  height: 1px!important;
  background-color: @attendance-background-color-2!important;
  content: ''!important;
  position: absolute!important;
  top: 70px!important;
  left: 50%!important;
  transform: translateX(-50%)!important;
  border-bottom: none!important;
  border-top:none!important;
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

.stop-item .closeIcon{
  background: url(../../../../../static/img/close.png) no-repeat center;
}
.stop-item .conIcon {
  background: url(../../../../../static/img/confirm.png) no-repeat center;
}
.stop-item .pop-title i {
  width: 22px;
  height: 22px;
  background-size: 22px 22px;
  padding: 10px;
}
.stop-item .pop-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  background-color: @attendance-color-3;
  border-radius: 5px 5px 0 0;
}
.stop-item .person {
  padding: 57px 15px 15px 15px;
}
.stop-item .person button {
  border-radius: 3px;
  padding: 5px 15px;
  margin-right: 12px;
  margin-bottom: 10px;
}
.stop-item .apply-pop .person .per-btn {
  background-color: @attendance-background-color-7;
  color: @attendance-background-color-1;
}
.stop-item .person .cur {
  background-color: @attendance-background-color-1;
  color: @attendance-background-color-7;
}
.stop-item /deep/.van-popup /deep/.van-popup--bottom  /deep/.van-picker  /deep/.van-picker-column {
  position: relative;
}
.stop-item
  /deep/.van-ellipsis /deep/.van-picker-column__item /deep/.van-picker-column__item--selected {
  color: @attendance-color-1;
  font-weight: 600;
}
</style>






// WEBPACK FOOTER //
// src/components/teacher/Examine/commom/index.vue