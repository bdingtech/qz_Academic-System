   <template>
  <div>
    <Header title="随堂考试申请" type="0" route="/teacher/classList" :casLogin="casLogin"></Header>
    <div class="center">
      <div style="width:100%;">
        <van-cell-group>
          <van-field
            v-if="route_params.iswfmes == '' || route_params.iswfmes == '0'"
            v-model="kslx"
            label="考试类型"
            placeholder="请点击选择"
            readonly
            is-link
            @click="showPicker_kslx = true"
            input-align="right"
          />
          <van-field
            v-if=" route_params.iswfmes == '1' || route_params.iswfmes == '2'"
            v-model="kslx"
            label="考试类型"
            placeholder="请点击选择"
            readonly
            is-link
            input-align="right"
          />

          <van-field
            v-if="route_params.iswfmes == '' || route_params.iswfmes == '0'"
            v-model="kszc"
            label="考试周次"
            placeholder="请点击选择"
            readonly
            is-link
            @click="showPicker_kszc = true"
            input-align="right"
          />
          <van-field
            v-if="route_params.iswfmes == '1' || route_params.iswfmes == '2'"
            v-model="kszc"
            label="考试周次"
            placeholder="请点击选择"
            readonly
            is-link
            input-align="right"
          />

          <van-field
            v-if="route_params.iswfmes == '' || route_params.iswfmes == '0'"
            v-model="ksxq"
            label="考试星期"
            placeholder="请点击选择"
            readonly
            is-link
            @click="showPicker_ksxq = true"
            input-align="right"
          />
          <van-field
            v-if=" route_params.iswfmes == '1' || route_params.iswfmes == '2'"
            v-model="ksxq"
            label="考试星期"
            placeholder="请点击选择"
            readonly
            is-link
            input-align="right"
          />

          <van-field
            v-if="route_params.iswfmes == '' || route_params.iswfmes == '0'"
            v-model="sjms"
            label="时间模式"
            placeholder="请点击选择"
            readonly
            is-link
            @click="showPicker_sjms = true"
            input-align="right"
          />
          <van-field
            v-if=" route_params.iswfmes == '1' || route_params.iswfmes == '2'"
            v-model="sjms"
            label="时间模式"
            placeholder="请点击选择"
            readonly
            is-link
            input-align="right"
          />

          <van-field
            v-if="route_params.iswfmes == '' || route_params.iswfmes == '0'"
            v-model="ksjc"
            label="考试节次"
            placeholder="请点击选择"
            readonly
            is-link
            @click="showPicker_ksjc = true"
            input-align="right"
          />
          <van-field
            v-if=" route_params.iswfmes == '1' || route_params.iswfmes == '2'"
            v-model="ksjc"
            label="考试节次"
            placeholder="请点击选择"
            readonly
            is-link
            input-align="right"
          />

          <van-field
            v-if="route_params.iswfmes == '' || route_params.iswfmes == '0'"
            v-model="ksjs"
            label="考试教室"
            placeholder="请点击选择"
            readonly
            is-link
            @click="showKsjs"
            input-align="right"
          />
          <van-field
            v-if=" route_params.iswfmes == '1' || route_params.iswfmes == '2'"
            v-model="ksjs"
            label="考试教室"
            placeholder="请点击选择"
            readonly
            is-link
            input-align="right"
          />

          <van-field
            v-if="route_params.iswfmes == '' || route_params.iswfmes == '0'|| route_params.iswfmes == '1'|| route_params.iswfmes == '2'"
            class="xx"
            v-model="sqr"
            readonly
            label="申请人"
            placeholder="请输入申请人"
            input-align="right"
          />

          <van-field
            v-if="route_params.iswfmes == '' || route_params.iswfmes == '0'"
            v-model="jkls"
            label="监考老师"
            placeholder="请点击选择"
            readonly
            is-link
            @click="showKsls"
            input-align="right"
          />
          <van-field
            v-if=" route_params.iswfmes == '1' || route_params.iswfmes == '2'"
            v-model="jkls"
            label="监考老师"
            placeholder="请点击选择"
            readonly
            is-link
            input-align="right"
          />
          <van-field
            v-if="route_params.iswfmes == '' || route_params.iswfmes == '0'|| route_params.iswfmes == '3'"
            v-model="shr"
            label="审核人"
            placeholder="请点击选择"
            readonly
            is-link
            @click="showPicker_shr = true"
            input-align="right"
          />
          <van-field
            v-if=" route_params.iswfmes == '1' || route_params.iswfmes == '2'"
            v-model="shr"
            label="审核人"
            placeholder="请点击选择"
            readonly
            is-link
            input-align="right"
          />

          <van-field
            v-if="route_params.iswfmes == '' || route_params.iswfmes == '0'"
            name="switch"
            class="xx"
            label="允许考试时间为上课时间"
            label-width="180"
            input-align="right"
          >
            <template #input>
              <van-switch
                v-model="switch_sk"
                active-color="#12DDD6"
                inactive-color="#DFE0E6"
                size="20"
              />
            </template>
          </van-field>

          <van-field
            v-if=" route_params.iswfmes == '1' || route_params.iswfmes == '2'"
            name="switch"
            class="xx"
            label="允许考试时间为上课时间"
            label-width="180"
            input-align="right"
          >
            <template #input>
              <van-switch
                disabled
                v-model="switch_sk"
                active-color="#12DDD6"
                inactive-color="#DFE0E6"
                size="20"
              />
            </template>
          </van-field>

          <van-field
            v-if="route_params.iswfmes == '' || route_params.iswfmes == '0'"
            name="switch"
            class="xx"
            label="检测班级时间冲突"
            label-width="180"
            input-align="right"
          >
            <template #input>
              <van-switch
                v-model="switch_bjct"
                active-color="#12DDD6"
                inactive-color="#DFE0E6"
                size="20"
              />
            </template>
          </van-field>
          <van-field
            v-if=" route_params.iswfmes == '1' || route_params.iswfmes == '2'"
            name="switch"
            class="xx"
            label="检测班级时间冲突"
            label-width="180"
            input-align="right"
          >
            <template #input>
              <van-switch
                disabled
                v-model="switch_bjct"
                active-color="#12DDD6"
                inactive-color="#DFE0E6"
                size="20"
              />
            </template>
          </van-field>

          <van-field
            v-if="route_params.iswfmes == '' || route_params.iswfmes == '0'"
            name="switch"
            class="xx"
            label="检测学生时间冲突"
            label-width="180"
            input-align="right"
          >
            <template #input>
              <van-switch
                v-model="switch_xsct"
                active-color="#12DDD6"
                inactive-color="#DFE0E6"
                size="20"
              />
            </template>
          </van-field>

          <van-field
            v-if=" route_params.iswfmes == '1' || route_params.iswfmes == '2'"
            name="switch"
            class="xx"
            label="检测学生时间冲突"
            label-width="180"
            input-align="right"
          >
            <template #input>
              <van-switch
                disabled
                v-model="switch_xsct"
                active-color="#12DDD6"
                inactive-color="#DFE0E6"
                size="20"
              />
            </template>
          </van-field>

          <van-field
            v-if="route_params.iswfmes == '' || route_params.iswfmes == '0'"
            name="switch"
            class="xx"
            label="检测监考老师时间冲突"
            label-width="180"
            input-align="right"
          >
            <template #input>
              <van-switch
                v-model="switch_lsct"
                active-color="#12DDD6"
                inactive-color="#DFE0E6"
                size="20"
              />
            </template>
          </van-field>

          <van-field
            v-if=" route_params.iswfmes == '1' || route_params.iswfmes == '2'"
            name="switch"
            class="xx"
            label="检测监考老师时间冲突"
            label-width="180"
            input-align="right"
          >
            <template #input>
              <van-switch
                disabled
                v-model="switch_lsct"
                active-color="#12DDD6"
                inactive-color="#DFE0E6"
                size="20"
              />
            </template>
          </van-field>
          <van-field
            v-if="route_params.iswfmes == '' || route_params.iswfmes == '0'"
            name="switch"
            class="xx"
            label="检测考场时间冲突"
            label-width="180"
            input-align="right"
          >
            <template #input>
              <van-switch
                v-model="switch_kcct"
                active-color="#12DDD6"
                inactive-color="#DFE0E6"
                size="20"
              />
            </template>
          </van-field>

          <van-field
            v-if=" route_params.iswfmes == '1' || route_params.iswfmes == '2'"
            name="switch"
            class="xx"
            label="检测考场时间冲突"
            label-width="180"
            input-align="right"
          >
            <template #input>
              <van-switch
                disabled
                v-model="switch_kcct"
                active-color="#12DDD6"
                inactive-color="#DFE0E6"
                size="20"
              />
            </template>
          </van-field>

          <van-field style="display:none" label="备注" placeholder="非必填" input-align="right" />
        </van-cell-group>
      </div>
      <van-button
        v-if=" route_params.iswfmes == '' ||route_params.iswfmes == '0' ||route_params.iswfmes == '3'"
        class="bottom-button"
        type="default"
        @click="pushExamine"
      >申请</van-button>

      <van-popup v-model="showPicker_kslx" position="bottom">
        <van-picker
          show-toolbar
          :columns="kslx_list"
          @confirm="onConfirmkslx"
          :item-height="35"
          @cancel="showPicker_kslx = false"
        />
      </van-popup>
      <van-popup v-model="showPicker_kszc" position="bottom">
        <van-picker
          show-toolbar
          :columns="kszc_list"
          @confirm="onConfirmkszc"
          :item-height="35"
          @cancel="showPicker_kszc = false"
        />
      </van-popup>

      <van-popup v-model="showPicker_ksxq" position="bottom">
        <van-picker
          show-toolbar
          :columns="ksxq_list"
          @confirm="onConfirmksxq"
          :item-height="35"
          @cancel="showPicker_ksxq = false"
        />
      </van-popup>

      <van-popup v-model="showPicker_sjms" position="bottom">
        <van-picker
          show-toolbar
          :columns="sjms_list"
          @confirm="onConfirmsjms"
          :item-height="35"
          @cancel="showPicker_sjms = false"
        />
      </van-popup>

      <van-popup v-model="showPicker_ksjc" position="bottom">
        <van-picker
          show-toolbar
          :columns="ksjc_list"
          :item-height="35"
          @confirm="onConfirmksjc"
          @cancel="showPicker_ksjc = false"
        />
      </van-popup>

      <van-popup v-model="showPicker_ksjs" position="bottom">
        <div class="apply-pop">
          <div class="pop-title">
            <i class="closeIcon" @click="showPicker_ksjs = false"></i>
            <p>考试教室</p>
            <i class="conIcon" @click="ksjsClear()"></i>
          </div>
          <div class="pop-search">
            <div class="inp">
              <input
                type="text"
                placeholder="搜索考试教室名称"
                @keydown.enter="searchKsjs"
                v-model="search_ksjs"
              />
              <i></i>
              <div v-if="showSearch" class="inp-search" @click="searchKsjs">搜索</div>
            </div>
            <div class="search-result">搜索结果</div>
          </div>
          <div class="person" style="padding-top:150px;">
            <button
              class="per-btn"
              ref="person"
              @click="personTap($event,index)"
              v-for="(item,index) in ksjs_list"
              :key="item.id"
            >{{item.name}}</button>
          </div>
        </div>
      </van-popup>
      <van-popup v-model="showPicker_jkls" position="bottom">
        <div class="apply-pop">
          <div class="pop-title">
            <i class="closeIcon" @click="showPicker_jkls = false"></i>
            <p>监考老师</p>
            <i class="conIcon" @click="jklsClear()"></i>  
          </div>
          <div class="pop-search">
            <div class="inp">
              <input
                type="text"
                placeholder="搜索监考老师名称"
                @keydown.enter="searchJkls"
                v-model="search_jkls"
              />
              <i></i>
              <div v-if="showSearch" class="inp-search" @click="searchJkls">搜索</div>
            </div>
            <div class="search-result">搜索结果</div>
          </div>
          <div class="person" style="padding-top:150px;">
            <button
              class="per-btn"
              ref="personJkls"
              @click="personTapJkls($event,index)"
              v-for="(item,index) in jkls_list"
              :key="item.id"
            >{{item.name}}</button>
          </div>
        </div>
      </van-popup>
      <van-popup v-model="showPicker_shr" position="bottom">
        <div class="apply-pop">
          <div class="pop-title">
            <i class="closeIcon" @click="showPicker_shr = false"></i>
            <p>审核人</p>
            <i class="conIcon" @click="resetCancel()"></i>
          </div>
          <div class="person">
            <button
              class="per-btn"
              ref="personShr"
              @click="personTapShr($event,index)"
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
// import Header from '../../header.vue'
import { Api } from '@/utils/axios'
import { Toast } from 'vant';

export default {
  data() {
    return {
      casLogin: sessionStorage.getItem('casLogin'),
      route: this.$route.params.route,
      kslx: '',
      kslxId: '',
      kszc: '',
      kszcId: '',
      ksxq: '',
      ksxqId: '',
      sjms: '',
      sjmsId: '',
      ksjc: '',
      ks_jc: '',//开始节次
      js_jc: '',//结束节次
      ksjs: '',
      ksjsId: '',
      sqr: '',
      jkls: '',
      jklsId: '',
      shr: '',
      shrId: '',
      switch_sk: true,
      switch_bjct: false,
      switch_xsct: false,
      switch_lsct: false,
      switch_kcct: false,
      showPicker_kslx: false,
      showPicker_kszc: false,
      showPicker_ksxq: false,
      showPicker_sjms: false,
      showPicker_ksjc: false,
      showPicker_ksjs: false,
      showPicker_jkls: false,
      showPicker_shr: false,
      kslx_list: [],
      kszc_list: [],
      ksxq_list: [
        { text: '一', value: '1' },
        { text: '二', value: '2' },
        { text: '三', value: '3' },
        { text: '四', value: '4' },
        { text: '五', value: '5' },
        { text: '六', value: '6' },
        { text: '日', value: '7' }
      ],
      sjms_list: [],
      ksjc_list: [],
      ksjs_list: [],
      jkls_list: [],
      shr_list: [{
        id: '',
        name: '全部',
        isBtn: 0,
      }],
      route_params: {},
      search_ksjs: '',
      search_jkls: '',
      showSearch: false,
      byjc_list: [],
      reset:"",
      resetId:'',
      resetJkls:"",
      resetJklsId:'',
      resetKsjs:'',
      resetKsjsId:''
    }
  },
  watch: {
    search_ksjs: {
      handler(n, o) {
        if (n.length > 0) {
          this.showSearch = true

        } else {
          this.showSearch = false
          if (n == '' && o != '') {
            this.searchKsjs()
          }
        }
      },
      deep: true
    },
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
    sjmsId: {
      handler(n) {
        if (n) {
          this.ksjc_list = []
          this.ksjc = ''
          this.ks_jc = ''
          this.js_jc = ''
          this.byjc_list.forEach((k) => {
            if (k.kbjcmsid == n) {
              this.ksjc_list.push({ values: k.jc }, { values: k.jc })
            }
          })
        }
      },
      deep: true
    },
    // xnxqId: {
    //   handler(n) {
    //     if (n) {
    //       this.hdmc_list = []
    //       this.hd_list.forEach((k) => {
    //         if (n == k.xnxq01id) {
    //           this.hdmc_list.push({
    //             text: k.cjlrmc,
    //             value: k.cj0701id,
    //           })
    //         }
    //       })
    //       this.hdmc_list.unshift({ text: '空', value: '' })
    //     }
    //   },
    //   deep: true
    // }
  },
  mounted() {
    this.getList()
    this.getShr()

  },
  methods: {
    jklsClear(){
      this.showPicker_jkls = false
      this.jkls = this.resetJkls
      this.jklsId = this.resetJklsId
    },
    async getList() {
      this.route_params = JSON.parse(decodeURI(this.$route.params.route_params))
      this.sqr = this.route_params.xm
      this.getDict()
      
    },
    //
    async getSjms() {
      const params = {
        xnxqid: this.route_params.xnxq01id
      }
      const res = await Api.getSjms(params)
      this.sjms_list = res.data.map((v) => {
        if (v.kbjcmsid == '94D51EECEBF4F9B4E053474110AC8060') {
          this.sjmsId = v.kbjcmsid
          this.sjms = v.kbjcmsmc
        }
        return {
          text: v.kbjcmsmc,
          value: v.kbjcmsid
        }
      })
      this.byjc_list = res.data
    },
    //回显
    async getLooksq() {
      const params = {
        stkssqid: this.route_params.stkssqid
      }
      if (this.route_params.iswfmes != '') {
        const res = await Api.getLooksq(params)
        this.kslx_list.forEach((k) => {
          if (k.value == res.map.kslx) {
            this.kslx = k.text
            this.kslxId = k.value
          }
        })
        this.kszc_list.forEach((k) => {
          if (k.value == res.map.kszc) {
            this.kszc = k.text
            this.kszcId = k.value
          }
        })
        this.ksxq_list.forEach((k) => {
          if (k.value == res.map.ksxq) {
            this.ksxq = k.text
            this.ksxqId = k.value
          }
        })
        this.sjms = res.kbjcmsmc
        this.sjmsId = res.kbjcmsid
        this.ksjc = res.map.ksjc
        this.ks_jc = res.jc
        this.js_jc = res.jc2
        this.ksjs = res.map.jsmc
        this.ksjsId = res.map.ksjs
        this.jkls = res.map.jkls
        this.jklsId = res.map.jklsid
        this.switch_sk = res.map.isksct == '1' ? true : false
        this.switch_bjct = res.map.isbjct == '1' ? true : false
        this.switch_xsct = res.map.isxsct == '1' ? true : false
        this.switch_lsct = res.map.islsct == '1' ? true : false
        this.switch_kcct = res.map.isjsct == '1' ? true : false
        if (res.userids.length > 0) {
          // this.shr = res.userids[0].userrealname
          // this.shrId = res.userids[0].userids
          this.shr = res.userids.map(v => v.userrealname).join(',') || ''
          this.shrId = res.userids.map(v => v.userids).join(',') || ''
        }
      }

    },
    async getShr() {
      const params = {
        ywcode: '070'
      }
      this.shr_list = [{
        id: '',
        name: '全部',
        isBtn: 0,
      }]
      const res = await Api.getTdshr(params)
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
    async getDict() {
      const params = {
        table: 'Zzdstksfs'
      }
      const res = await Api.getXqjd(params)
      this.kslx_list = res.data.map((v) => {
        return {
          text: v.dmmc,
          value: v.dm
        }
      })

      Api.getKszc().then((res) => {
        this.kszc_list = res.data.map((v) => {
          return {
            text: v.key,
            value: v.value
          }
        })
      })
      this.getLooksq()
      this.getSjms()

    },
    //点击选择考试教室
    showKsjs() {
      if (this.kslxId == '') {
        Toast('考试类型不能为空')
        return
      }
      if (this.kszcId == '') {
        Toast('考试周次不能为空')
        return
      }
      if (this.ksxqId == '') {
        Toast('考试星期不能为空')
        return
      }
      if (this.ksjc == '' || this.ks_jc == '' || this.js_jc == '') {
        Toast('考试节次不能为空')
        return
      }
      const params = {
        jx0404id: this.route_params.jx0404id,
        xnxq01id: this.route_params.xnxq01id,
        zc: this.kszcId,
        xq: this.ksxqId,
        ksjc: this.js_jc,
        jsjc: this.js_jc,
        // sfjcsqkc: this.switch_sk,
        // jsmch: this.route_params.jx0404id,
      }
      if (this.switch_sk) {
        params.sfjcsqkc = '1'
      } else {
        params.sfjcsqkc = '0'
      }
      this.showPicker_ksjs = true
      this.ksjs_list = []
      Api.getSelectKsjs(params).then((res) => {

        let concatList = []
        res.data.forEach((item, index) => {
          concatList[index] = {
            name: item.jsmc,
            id: item.jsid,
            isBtn: 0,
          }
        });
        this.ksjs_list = this.ksjs_list.concat(concatList)


      }).catch(() => {

      })
      // getSelectKsjs
    },
    //点击选择考试老师
    showKsls() {
      if (this.kslxId == '') {
        Toast('考试类型不能为空')
        return
      }
      if (this.kszcId == '') {
        Toast('考试周次不能为空')
        return
      }
      if (this.ksxqId == '') {
        Toast('考试星期不能为空')
        return
      }
      if (this.ksjc == '' || this.ks_jc == '' || this.js_jc == '') {
        Toast('考试节次不能为空')
        return
      }
      const params = {
        jx0404id: this.route_params.jx0404id,
        xnxq01id: this.route_params.xnxq01id,
        zc: this.kszcId,
        xq: this.ksxqId,
        ksjc: this.js_jc,
        jsjc: this.js_jc,
        // sfjcsqkc: this.switch_sk,
        // jsmc: this.route_params.jx0404id,
      }
      if (this.switch_sk) {
        params.sfjcsqkc = '1'
      } else {
        params.sfjcsqkc = '0'
      }
      this.showPicker_jkls = true
      this.jkls_list = []
      Api.getSelectKsls(params).then((res) => {
        let concatList = []
        res.data.forEach((item, index) => {
          concatList[index] = {
            name: item.xm,
            id: item.jg0101id,
            isBtn: 0,
          }
        });
        this.jkls_list = this.jkls_list.concat(concatList)
      }).catch(() => {
      })
    },
    //查询考试教室
    searchKsjs() {
      const params = {
        jx0404id: this.route_params.jx0404id,
        xnxq01id: this.route_params.xnxq01id,
        zc: this.kszcId,
        xq: this.ksxqId,
        ksjc: this.js_jc,
        jsjc: this.js_jc,
        // sfjcsqkc: this.switch_sk,
        jsmch: this.search_ksjs,
      }
      if (this.switch_sk) {
        params.sfjcsqkc = '1'
      } else {
        params.sfjcsqkc = '0'
      }
      this.showPicker_ksjs = true
      this.ksjs_list = []
      Api.getSelectKsjs(params).then((res) => {
        let concatList = []
        res.data.forEach((item, index) => {
          concatList[index] = {
            name: item.jsmc,
            id: item.jsid,
            isBtn: 0,
          }
        });
        this.ksjs_list = this.ksjs_list.concat(concatList)
        // this.ksjs_list.unshift({
        //   id: '',
        //   name: '全部',
        //   isBtn: 0,
        // })


      }).catch(() => {

      })
    },
    //搜索监考老师
    searchJkls() {
      const params = {
        jx0404id: this.route_params.jx0404id,
        xnxq01id: this.route_params.xnxq01id,
        zc: this.kszcId,
        xq: this.ksxqId,
        ksjc: this.js_jc,
        jsjc: this.js_jc,
        // sfjcsqkc: this.switch_sk,
        jsmc: this.search_jkls,
      }
      if (this.switch_sk) {
        params.sfjcsqkc = '1'
      } else {
        params.sfjcsqkc = '0'
      }
      this.showPicker_jkls = true
      this.jkls_list = []
      Api.getSelectKsls(params).then((res) => {

        let concatList = []
        res.data.forEach((item, index) => {
          concatList[index] = {
            name: item.xm,
            id: item.jg0101id,
            isBtn: 0,
          }
        });
        this.jkls_list = this.jkls_list.concat(concatList)

      }).catch(() => {
      })
    },
    pushExamine() {
      if (this.kslxId == '') {
        Toast('考试类型不能为空')
        return
      }
      if (this.kszcId == '') {
        Toast('考试周次不能为空')
        return
      }
      if (this.ksxqId == '') {
        Toast('考试星期不能为空')
        return
      }
      if (this.sjmsId == '') {
        Toast('时间模式不能为空')
        return
      }
      if (this.ksjc == '' || this.ks_jc == '' || this.js_jc == '') {
        Toast('考试节次不能为空')
        return
      }
      if (this.ksjsId == '') {
        Toast('考试教室不能为空')
        return
      }
      if (this.jklsId == '') {
        Toast('监考老师不能为空')
        return
      }
      const params = {
        stkssqid: this.route_params.stkssqid,
        userids: this.shrId,
        jx0404id: this.route_params.jx0404id,
        xnxqid: this.route_params.xnxq01id,
        zc: this.kszcId,
        xq: this.ksxqId,
        jc: this.ks_jc,
        jc2: this.js_jc,
        jsid: this.ksjsId,
        jsmc: this.ksjs,
        jklsid: this.jklsId,
        jkls: this.jkls,
        jsxm: this.route_params.xm,
        kslx: this.kslxId,
        kbjcmsid: this.sjmsId,
        type: 'add'
      }
      if (this.switch_xsct) {
        params.jcxssj = '1'
      } else {
        params.jcxssj = '0'
      }

      if (this.switch_lsct) {
        params.jcjklssj = '1'
      } else {
        params.jcjklssj = '0'
      }

      if (this.switch_kcct) {
        params.jckcsj = '1'
      } else {
        params.jckcsj = '0'
      }
      if (this.switch_sk) {
        params.sfjcsqkc = '1'
      } else {
        params.sfjcsqkc = '0'
      }
      if (this.switch_bjct) {
        params.jcbjsj = '1'
      } else {
        params.jcbjsj = '0'
      }
      Api.toSendSendStkssq(params).then((res) => {
        if (res.code == '1') {
          this.$router.push({ name: 'classApplySuccess' })
        }
        Toast(res.Msg)
      })


    },
    onConfirmkslx(value) {
      if (value.text == '空') {
        this.kslx = ''
        this.kslxId = ''
      } else {
        this.kslx = value.text
        this.kslxId = value.value
      }

      this.showPicker_kslx = false
    },
    onConfirmkszc(value) {
      if (value.text == '空') {
        this.kszc = ''
        this.kszcId = ''
      } else {
        this.kszc = value.text
        this.kszcId = value.value
      }

      this.showPicker_kszc = false
    },

    onConfirmksxq(value) {
      if (value.text == '空') {
        this.ksxq = ''
        this.ksxqId = ''
      } else {
        this.ksxq = value.text
        this.ksxqId = value.value
      }

      this.showPicker_ksxq = false
    },
    onConfirmksjc(value) {
      this.ks_jc = value[0] == undefined ? '' : value[0]
      this.js_jc = value[1] == undefined ? '' : value[1]

      if (this.ks_jc >= this.js_jc) {
        Toast('考试节次选择不对')
        return
      }
      this.ksjc = value.map(v => v).join('-') || ''

      // if (value.text == '空') {
      //   this.ksjc = ''
      //   this.ksjcId = ''
      // } else {
      //   this.ksjc = value.text
      //   this.ksjcId = value.value
      // }
      this.showPicker_ksjc = false
    },
    ksjsClear(){
      this.showPicker_ksjs = false
      this.ksjs = this.resetKsjs
      this.ksjsId = this.resetKsjsId
    },
    personTap(e, res) {
      let strList = []
      let idList = []
      if (this.ksjs_list[res].isBtn == 0) {
        this.ksjs_list[res].isBtn = 1
        e.target.className = 'cur'
      } else if (this.ksjs_list[res].isBtn == 1) {
        this.ksjs_list[res].isBtn = 0
        e.target.className = 'per-btn'
      }
      for (let i in this.ksjs_list) {
        // if (this.ksjs_list[res].name == '全部') {
        //   this.ksjs_list[i].isBtn = 0;
        //   this.ksjs_list[res].isBtn = 1
        //   this.$refs.person[res].className = 'cur'
        //   this.$refs.person[i].className = 'per-btn'
        // } else {
        // this.ksjs_list[0].isBtn = 0;
        // this.$refs.person[0].className = 'per-btn'
        // }
        if (this.ksjs_list[i].isBtn == 1) {
          strList = strList.concat(this.ksjs_list[i].name)
          idList = idList.concat(this.ksjs_list[i].id)
        }
      }
      this.resetKsjs = strList.toString();
      this.resetKsjsId = idList.toString();
    },
    personTapJkls(e, res) {
      let strList = []
      let idList = []
      if (this.jkls_list[res].isBtn == 0) {
        this.jkls_list[res].isBtn = 1
        e.target.className = 'cur'
      } else if (this.jkls_list[res].isBtn == 1) {
        this.jkls_list[res].isBtn = 0
        e.target.className = 'per-btn'
      }
      for (let i in this.jkls_list) {
        // if (this.jkls_list[res].name == '全部') {
        //   this.jkls_list[i].isBtn = 0;
        //   this.jkls_list[res].isBtn = 1
        //   this.$refs.personJkls[res].className = 'cur'
        //   this.$refs.personJkls[i].className = 'per-btn'
        // } else {
        //   this.jkls_list[0].isBtn = 0;
        //   this.$refs.personJkls[0].className = 'per-btn'
        // }
        if (this.jkls_list[i].isBtn == 1) {
          strList = strList.concat(this.jkls_list[i].name)
          idList = idList.concat(this.jkls_list[i].id)
        }
      }
      this.resetJkls = strList.toString();
      this.resetJklsId = idList.toString();
    },
    resetCancel(){
      this.showPicker_shr= false
      this.shr = this.reset
      this.shrId = this.resetId
    },
    personTapShr(e, res) {
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
          this.$refs.personShr[res].className = 'cur'
          this.$refs.personShr[i].className = 'per-btn'
        } else {
          this.shr_list[0].isBtn = 0;
          this.$refs.personShr[0].className = 'per-btn'
        }
        if (this.shr_list[i].isBtn == 1) {
          strList = strList.concat(this.shr_list[i].name)
          idList = idList.concat(this.shr_list[i].id)
        }
      }
      this.reset = strList.toString();
      this.resetId = idList.toString();

    },
    onConfirmjkls(value) {
      if (value.text == '空') {
        this.jkls = ''
        this.jklsId = ''
      } else {
        this.jkls = value.text
        this.jklsId = value.value
      }
      this.showPicker_jkls = false
    },
    onConfirmsjms(value) {
      if (value.text == '空') {
        this.sjms = ''
        this.sjmsId = ''
      } else {
        this.sjms = value.text
        this.sjmsId = value.value
      }
      this.showPicker_sjms = false
    },
  }

}
</script>


<style scoped  lang="less" >
.center {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 20px;
}
.bottom-button {
  width: calc(~'100% - 40px');
  background-color: @attendance-background-color-1;
  color: white;
  font-size: 16px;
  font-weight: 600;
  height: 44px;
  line-height: 44px;
  //   position: absolute;
  //   bottom: 20px;
  border-radius: 3px;
  margin-top: 60px;
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
.center .closeIcon {
  background: url(../../../../../static/img/close.png) no-repeat center;
}
.center .conIcon {
  background: url(../../../../../static/img/confirm.png) no-repeat center;
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
.search-result {
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
  background: url(../../../../assets/images/search.png) center center no-repeat;
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
// src/components/teacher/Examination/classroom-test/apply.vue