<template>
  <div>
    <Header title="教学评价"></Header>
    <div class="eva-detail">
      <p class="eva-num">
        <span>{{this.evaluateIndex + 1}}</span>
        /{{this.total}}
      </p>
      <!-- 选项评价 -->
      <div v-for="(item,index) in radioEvaluate" :key="index">
        <template>
          <p class="eva-topic">{{evaluateIndex == index ? item.targetName : ''}}</p>
        </template>
        <div class="eva-rate" v-if="evaluateIndex == index">
          <ul>
            <div v-for="(oItem,index) in item.optionData" :key="oItem.optionId">
              <keep-alive>
                <li
                  :class="{checked:index==isCheck}"
                  @click="pickOpt(oItem.optionId,index)"
                >{{index+1}}.{{oItem.optionName}}</li>
              </keep-alive>
            </div>
          </ul>
        </div>
      </div>
      <!-- 建议textarea评价 -->
      <template v-if="evaluateIndex >= textIndex">
        <div v-for="(item,index) in textEvaluate" :key="item.suggestTypeId">
          <p class="eva-topic" v-if="evaluateIndex == index + textIndex">{{item.suggestTypeName}}</p>
          <div class="eva-rate" v-if="evaluateIndex == index + textIndex">
            <keep-alive>
              <textarea name placeholder="请点击填写" v-model="evaText" maxlength="140"></textarea>
            </keep-alive>
            <span>{{calcNum()}}</span>
          </div>
        </div>
      </template>
    </div>
    <div class="eva-buttons">
      <button class="pre-topic" @click="preTopic()" v-if="this.evaluateIndex != 0">上一题</button>
      <button
        class="eva-btn"
        @click="nextTopic()"
        v-text="this.evaluateIndex + 1 == this.total ? '提交评教' : '下一题'"
        :style="this.evaluateIndex == 0 ? 'width:100%' : ''"
      ></button>
    </div>
  </div>
</template>

<script>
// import Header from '../header.vue'
import evaluateVue from './evaluate.vue'
import { Toast } from 'vant'
import { Api } from '../../../utils/axios'
export default {
  data() {
    return {
      evaluateIndex: 0,
      evaluateList: [],
      textEvaluate: [],
      radioEvaluate: [],
      evaText: '',
      total: '',
      optionList: [],
      pickOptVal: [],
      textVal: [],
      isCheck: null,
      textIndex: '',
      maxNum: '140'
    }
  },
  created() {
    // if (this.$store.state.evaOptCheck[0] != 0) {
    //   this.isCheck = this.$store.state.evaOptCheck[0]
    // } else {
    //   this.isCheck = null;
    // }
    this.getEva()
  },
  methods: {
    async getEva() {
      const params = {
        batchId: this.$route.query.id0,
        evaluationCategoriesId: this.$route.query.id1,
        courseId: this.$route.query.id2,
        teacherId: this.$route.query.id3,
        noticeId: this.$route.query.id4,
        schoolClassificationId: this.$route.query.id5
      }
      const res = await Api.getEvaluationIndex(params)
      this.textEvaluate = res.data.suggestData;
      for (let i = 0; i < res.data.targetData.length; i++) {
        if (res.data.targetData[i].optionData) {
          this.radioEvaluate = this.radioEvaluate.concat(res.data.targetData[i])
        }
      }
      this.textIndex = this.radioEvaluate.length
      this.total = this.textEvaluate.length + this.radioEvaluate.length;
    },
    calcNum() {
      this.maxNum = 140 - this.evaText.length;
      return this.maxNum
    },
    pickOpt(val, index) {
      this.isCheck = index
    },
    preTopic() {
      if (this.evaluateIndex > 0) {
        this.evaluateIndex--;
        this.isCheck = this.$store.state.evaOptCheck[this.evaluateIndex]
      }
    },
    async saveEvaTap(value) {
      const data = value
      const res = await Api.stuSaveEvaluate(data)
      if (res.code == 'success') {
        Toast.success('评教成功~')
        this.$store.state.evaOptCheck = []
        // this.$router.push('/student/evaluate')
        this.$router.push({
          name: 'teachEvaluate',
          query: {
            'pj01id': this.$route.query.pj01id,
            'pj05id': this.$route.query.pj05id,
            'pj0502id': this.$route.query.pj0502id
          }
        })
      } else {
        Toast(res.errorMessage)
      }
    },
    nextTopic() {
      this.$store.state.evaOptCheck[this.evaluateIndex] = this.isCheck;
      //无主观评价
      if (this.textEvaluate.length == 0) {
        this.pickOptVal.push({
          targetid: this.radioEvaluate[this.evaluateIndex].targetId,
          targetval: this.radioEvaluate[this.evaluateIndex].optionData[this.isCheck].optionId
        })
        if (this.evaluateIndex + 1 < this.total) {

          if (this.isCheck == null) {
            Toast.fail('请选择');
          } else {
            this.evaluateIndex += 1;
            if (this.$store.state.evaOptCheck[this.evaluateIndex] != 0) {
              this.isCheck = this.$store.state.evaOptCheck[this.evaluateIndex]
            } else {
              this.isCheck = 0;
            }
          }
        } else {
          let formData = {
            evaluationCategoriesId: this.$route.query.id1,
            target: this.pickOptVal,
            batchId: this.$route.query.id0,
            teacherId: this.$route.query.id3,
            noticeId: this.$route.query.id4,
            schoolClassificationId: this.$route.query.id5,
            courseId: this.$route.query.id2,
            suggest: []
          }
          this.saveEvaTap(formData)
        }
        //有主观评价
      } else {
        if (this.evaluateIndex < this.total - this.textEvaluate.length) {
          if (this.isCheck == null) {
            Toast.fail('请选择');
          } else {
            this.pickOptVal.push({
              targetid: this.radioEvaluate[this.evaluateIndex].targetId,
              targetval: this.radioEvaluate[this.evaluateIndex].optionData[this.isCheck].optionId
            })
            this.evaluateIndex += 1;
            if (this.$store.state.evaOptCheck[this.evaluateIndex] != 0) {
              this.isCheck = this.$store.state.evaOptCheck[this.evaluateIndex]
            } else {
              this.isCheck = 0;
            }
          }
        } else {
          this.textVal.push({
            suggestid: this.textEvaluate[this.evaluateIndex - this.textIndex].suggestTypeId,
            suggestval: this.evaText, // this.$store.state.evaTextList[this.textIndex - this.evaluateIndex]
          })
          this.evaText = ""
          let formData = {
            evaluationCategoriesId: this.$route.query.id1,
            target: this.pickOptVal,
            batchId: this.$route.query.id0,
            teacherId: this.$route.query.id3,
            noticeId: this.$route.query.id4,
            schoolClassificationId: this.$route.query.id5,
            courseId: this.$route.query.id2,
            suggest: this.textVal
          }
          if (this.evaluateIndex + 1 < this.total) {
            this.evaluateIndex += 1;
          } else {
            this.saveEvaTap(formData)
          }
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.eva-detail {
  padding: 0 20px;
  margin-bottom: 20px;
}
.eva-detail .eva-num {
  color: @attendance-background-color-2;
  font-size: 18px;
}
.eva-detail .eva-num span {
  color: @attendance-background-color-1;
  font-size: 48px;
  font-weight: 600;
}
.eva-detail .eva-topic {
  color: @attendance-color-2;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
}
.eva-detail .eva-rate {
  margin-top: 20px;
}
.eva-detail .eva-rate ul li {
  padding: 20px;
  font-weight: 600;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: @attendance-background-color-10;
  color: @attendance-color-1;
}
.eva-detail .eva-rate ul li.checked {
  padding: 20px;
  font-weight: 600;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: @attendance-background-color-12;
  color: @attendance-color-3;
}
.eva-detail .eva-rate textarea {
  width: 100%;
  padding: 20px;
  background-color: @attendance-background-color-6;
  border-radius: 3px;
  box-sizing: border-box;
  color: @attendance-color-1;
  height: 350px;
}
.eva-detail .eva-rate textarea::placeholder {
  color: @attendance-color-2;
}
.eva-detail .eva-rate {
  position: relative;
}
.eva-detail .eva-rate span {
  color: @attendance-color-2;
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.eva-buttons {
  position: relative;
  bottom: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  padding: 20px;
  background-color: @attendance-color-3;
}
.eva-buttons button {
  border-radius: 3px;
  padding: 11px 0;
  width: calc(50% - 10px);
}
.eva-buttons .eva-btn {
  background-color: @attendance-background-color-1;
  color: @attendance-color-3;
}
.eva-buttons .pre-topic {
  background-color: @attendance-background-color-6;
  color: @attendance-background-color-1;
}
</style>



// WEBPACK FOOTER //
// src/components/student/Evaluate/detailEvaluate.vue