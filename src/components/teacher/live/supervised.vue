<template>
  <div>
    <Header title = "督导"></Header>
    <div class="eva-detail">
      <p class="eva-num"><span>{{this.evaluateIndex + 1}}</span>/{{this.total}}</p>
      <!-- 选项评价 -->
      <div v-for="(item,index) in radioEvaluate" :key="index">
        <template>
          <p class="eva-topic">{{evaluateIndex == index ? item.zbmc : ''}}</p>
        </template>
        <div class="eva-rate" v-if="evaluateIndex == index">
          <ul>
            <div v-for="(oItem,index) in item.optionData" :key="oItem.val">
              <li :class="index == isCheck ? 'checked' : ''" @click="pickOpt(oItem,index)">{{index+1}}.{{oItem.zbmc}}</li>
            </div>
          </ul>
        </div>
      </div>
      <!-- 建议textarea评价 -->
      <template v-if="this.evaluateIndex + 1 > this.textIndex">
        <div v-for="(item,index) in textEvaluate" :key="item.zbmc">
        <p class="eva-topic">{{evaluateIndex == index  + textIndex ? item.zbmc : ''}}</p>
        <div class="eva-rate" v-if="evaluateIndex == index + textIndex">
          <keep-alive><textarea name="" placeholder="请点击填写" v-model="evaText" maxlength="140" v-if="index == 0"></textarea></keep-alive>
          <keep-alive><textarea name="" placeholder="请点击填写" v-model="evaText1" maxlength="140" v-if="index == 1"></textarea></keep-alive>
          <span>{{calcNum(item.val)}}</span>
        </div>
      </div>
      </template>
    </div>
    <div class="eva-buttons">
      <button class="pre-topic" @click="preTopic()" v-if="this.evaluateIndex != 0">上一项</button>
      <button class="eva-btn" @click="nextTopic()" v-text="this.evaluateIndex + 1 == this.total ? '提交督导' : '下一项'" :style="this.evaluateIndex == 0 ? 'width:100%' : ''"></button>
    </div> 
  </div>
</template>

<script>
  // import Header from '../header.vue'
  import { Toast } from 'vant'
  import {Api} from '../../../utils/axios'
export default{
    data(){
      return{
        evaluateIndex:0,
        evaluateList:[],
        textEvaluate:[],
        radioEvaluate:[], 
        evaText:'',
        total:'',
        optionList:[],
        pickOptVal: [],
        textVal: [],
        isCheck:null,
        textIndex:'',
        maxNum:'140',
        loadCheckList:[],

        //保存参数
        paramList:[],
        iskgm:'',
        totalCmt:'',
        checkOptList:[]
      }
    },
    created(){
      if(this.$store.state.evaOptCheck[0] != 0){
        this.isCheck = this.$store.state.evaOptCheck[0]
      }else{
        this.isCheck = null;
      }
      let dataContent = JSON.parse(this.$route.query.val)
      this.getList(dataContent)
    },
    methods:{
      async getList(dataContent){
        const params = {
          tk08id:dataContent.tk08id,
          tk09id:dataContent.tk09id,
          zcvalue:dataContent.zcvalue,
          jcvalue:dataContent.jcvalue,
          xnxqid:dataContent.xnxqid
        }
        const res = await Api.supervisorGetddpjlist(params)
        this.evaText = res.data[0].text[0].val;
        this.evaText1 = res.data[0].text[1].val
        // 保存参数
        this.paramList = res.data[0];

        this.textEvaluate = res.data[0].text;
        for(let i = 0;i<res.data[0].targetData.length;i++){
          if(res.data[0].targetData[i].optionData){
            this.radioEvaluate = this.radioEvaluate.concat(res.data[0].targetData[i])
          }
        }
        this.textIndex = this.radioEvaluate.length
        this.total = this.textEvaluate.length + this.radioEvaluate.length;
        this.calcSelected();
      },  
      calc(e,val){
        if(e == '1'){
          this.isCheck = val;
          return val
        }else{
          return this.isCheck
        }
      },
      //calc(oItem.isxz,index)
      calcNum(e){
        this.maxNum = 140 - e.length;
        return this.maxNum
      },
      pickOpt(res,index){
        this.isCheck = index;
        if(this.evaluateIndex == 0){
          this.totalCmt = res.val
        }else{
          this.iskgm = res.val
        }
      },
      preTopic(){
        if(this.evaluateIndex > 0){
          this.evaluateIndex --;
          this.isCheck = this.$store.state.evaOptCheck[this.evaluateIndex]
        }
      },
      async saveTap(e){
        const params = e
        const res = await Api.supervisorSavepjlist(params)
        if(res.code == '1'){
          Toast.success('提交成功~');
          this.$router.go(-1);
        }else{
          Toast(res.errorMessage)
        }
      },
      nextTopic(){
        this.$store.state.evaOptCheck[this.evaluateIndex] = this.isCheck;
        //无主观评价
        if(this.textEvaluate.length == 0){
          // this.pickOptVal.push({
          //   targetid: this.radioEvaluate[this.evaluateIndex].val,
          //   targetval: this.radioEvaluate[this.evaluateIndex].optionData[this.isCheck].val
          // })
          if(this.evaluateIndex + 1 < this.total){
            this.evaluateIndex += 1;
            if(this.$store.state.evaOptCheck[this.evaluateIndex] != 0){
              this.isCheck = this.$store.state.evaOptCheck[this.evaluateIndex]
            }else{
              this.isCheck = 0;
            }
          }else{
            let formData = {
              jynr:'',
              tk03id:'',
              xnxqid:this.paramList.xnxq01id,
              tk01id:this.paramList.tk01id,
              tk0502id:this.paramList.tk0502id,
              jx0404id:this.paramList.jx0404id,
              tk02id:this.paramList.tk02id,
              tk05id:this.paramList.tk05id,
              zc:'',
              jc:'',
              bz:this.evaText,
              iskgm:'',
              sdxsrs:this.evaText1,
              tk09id:this.paramList.tk09id,
              xnxq01id:this.paramList.xnxq01id,
              jg0101id:this.paramList.jg0101id,
              xq:this.paramList.jc[0],
              tkdpdjValue:''
            }
            this.saveTap(formData)
          }
          //有主观评价
        }else{
          if(this.evaluateIndex + 1 < this.total){
            this.evaluateIndex += 1;
            if(this.$store.state.evaOptCheck[this.evaluateIndex] != 0){
              this.isCheck = this.$store.state.evaOptCheck[this.evaluateIndex];
            }else{
              this.isCheck = 0;
            }
          }else{
            this.textVal = []
            // this.textVal.push(this.$store.state.evaTextList[this.textIndex - this.evaluateIndex]);
            if(!Number(this.evaText1)){
              Toast.fail('实到人数需为数字');
            }else{
              
              let formData = {
                jynr:'',
                tk03id:'',
                xnxqid:this.paramList.xnxq01id,
                tk01id:this.paramList.tk01id,
                tk0502id:this.paramList.tk0502id,
                jx0404id:this.paramList.jx0404id,
                tk02id:this.paramList.tk02id,
                tk05id:this.paramList.tk05id,
                zc:'',
                jc:'',
                bz:this.evaText,
                iskgm:this.iskgm,
                sdxsrs:this.evaText1,
                tk09id:this.paramList.tk09id,
                xnxq01id:this.paramList.xnxq01id,
                jg0101id:this.paramList.jg0101id,
                xq:this.paramList.jc[0],
                tkdpdjValue:this.totalCmt
              }
              this.saveTap(formData)
            }
            
          }
        }
      },
    },
  }
</script>

<style lang="less" scoped>
	  .eva-detail{padding:0 20px;margin-bottom: 20px;}
	  .eva-detail .eva-num{color: @attendance-background-color-2;font-size: 18px;}
	  .eva-detail .eva-num span{color: @attendance-background-color-1;font-size: 48px;font-weight: 600;}
	  .eva-detail .eva-topic{color: @attendance-color-2;font-size: 18px;font-weight: 600;line-height: 25px;}
	  .eva-detail .eva-rate{margin-top: 20px;}
	  .eva-detail .eva-rate ul li{padding: 20px;font-weight: 600;border-radius: 5px;margin-bottom: 20px;background-color: @attendance-background-color-10;color: @attendance-color-1;}
	  .eva-detail .eva-rate ul li.checked{padding: 20px;font-weight: 600;border-radius: 5px;margin-bottom: 20px;background-color: @attendance-background-color-12;color: @attendance-color-3;}
	  .eva-detail .eva-rate textarea{width: 100%;padding: 20px;background-color: @attendance-background-color-6;border-radius: 3px;box-sizing: border-box;color: @attendance-color-1;height: 350px;}
	  .eva-detail .eva-rate textarea::placeholder{color: @attendance-color-2;}
	  .eva-detail .eva-rate{position: relative;}
	  .eva-detail .eva-rate span{color: @attendance-color-2;position: absolute;bottom: 20px;right: 20px;}
	  .eva-buttons{position: fixed;bottom: 0px;width: 100%;display: flex;justify-content: space-between;padding: 0 20px;box-sizing: border-box;padding: 20px;background-color: @attendance-color-3;}
	  .eva-buttons button{border-radius: 3px;padding: 11px 0;width: calc(50% - 10px);}
	  .eva-buttons .eva-btn{background-color: @attendance-background-color-1;color: @attendance-color-3;}
	  .eva-buttons .pre-topic{background-color: @attendance-background-color-6;color: @attendance-background-color-1;}
	</style>


// WEBPACK FOOTER //
// src/components/teacher/live/supervised.vue