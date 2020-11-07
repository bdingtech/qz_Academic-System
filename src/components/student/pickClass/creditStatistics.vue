<template>
  <div>
    <Header title="学分统计"></Header>
    <div class="credit_top">
      <div>总选课门数：{{this.creditDataList.length > 0 ? this.creditDataList[this.creditDataList.length - 1].creditControlcont : ''}}</div>
      <div>总选课学分：{{this.creditDataList.length > 0 ? this.creditDataList[this.creditDataList.length - 1].selectedCreditcont : ''}}</div>
    </div>
    <div class="credit">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="credit_list">
              <div class="credit_list_item">
                <h3>{{this.creditDataList.length > 0 ? this.creditDataList[0].classificationName : ''}}</h3>
                <div id="myChart_0" :style="{width: '100%', height: '200px'}"></div>
                <div id="myChart_1" :style="{width: '100%', height: '200px'}"></div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="credit_list">
              <div class="credit_list_item">
                <h3>{{this.creditDataList.length > 0 ? this.creditDataList[1].classificationName : ''}}</h3>
                <div id="myChart_2" :style="{width: '100%', height: '200px'}"></div>
                <div id="myChart_3" :style="{width: '100%', height: '200px'}"></div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="credit_list">
              <div class="credit_list_item">
                <h3>{{this.creditDataList.length > 0 ? this.creditDataList[2].classificationName : ''}}</h3>
                <div id="myChart_4" :style="{width: '100%', height: '200px'}"></div>
                <div id="myChart_5" :style="{width: '100%', height: '200px'}"></div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="credit_list">
              <div class="credit_list_item">
                <h3>{{this.creditDataList.length > 0 ? this.creditDataList[3].classificationName : ''}}</h3>
                <div id="myChart_6" :style="{width: '100%', height: '200px'}"></div>
                <div id="myChart_7" :style="{width: '100%', height: '200px'}"></div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="credit_list">
              <div class="credit_list_item">
                <h3>{{this.creditDataList.length > 0 ? this.creditDataList[4].classificationName : ''}}</h3>
                <div id="myChart_8" :style="{width: '100%', height: '200px'}"></div>
                <div id="myChart_9" :style="{width: '100%', height: '200px'}"></div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="credit_list">
              <div class="credit_list_item">
                <h3>{{this.creditDataList.length > 0 ? this.creditDataList[5].classificationName : ''}}</h3>
                <div id="myChart_10" :style="{width: '100%', height: '200px'}"></div>
                <div id="myChart_11" :style="{width: '100%', height: '200px'}"></div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="credit_list">
              <div class="credit_list_item">
                <h3>{{this.creditDataList.length > 0 ? this.creditDataList[6].classificationName : ''}}</h3>
                <div id="myChart_12" :style="{width: '100%', height: '200px'}"></div>
                <div id="myChart_13" :style="{width: '100%', height: '200px'}"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import Header from '../header.vue'
  import {Toast} from 'vant'
  import { Api } from '../../../utils/axios'
  export default {
    data() {
      return {
        name:'dataList',
        NOdata:false,
        SelectUrl:'',
        creditDataList:[],
        // 必修选课
        creditData: [
          {value: 88,name: '已选门数'},
          {value: 0,name: '控制门数'},
        ],
        creditData_b: [
          {value: 0,name: '控制学分'},
          {value: 0,name: '已选学分'},
        ],
        // 选修选课
        creditData1: [
          {value: 0,name: '已选门数'},
          {value: 0,name: '控制门数'},
        ],
        creditData_b1: [
          {value: 0,name: '控制学分'},
          {value: 0,name: '已选学分'},
        ],
        // 本学期计划选课
        creditData2: [
          {value: 0,name: '已选门数'},
          {value: 0,name: '控制门数'},
        ],
        creditData_b2: [
          {value: 0,name: '控制学分'},
          {value: 0,name: '已选学分'},
        ],
        //专业内跨年级选课
        creditData3: [
          {value: 0,name: '已选门数'},
          {value: 0,name: '控制门数'},
        ],
        creditData_b3: [
          {value: 0,name: '控制学分'},
          {value: 0,name: '已选学分'},
        ],
        //跨专业选课
        creditData4: [
          {value: 0,name: '已选门数'},
          {value: 0,name: '控制门数'},
        ],
        creditData_b4: [
          {value: 0,name: '控制学分'},
          {value: 0,name: '已选学分'},
        ],
        //公选课选课
        creditData5: [
          {value: 0,name: '已选门数'},
          {value: 0,name: '控制门数'},
        ],
        creditData_b5: [
          {value: 0,name: '控制学分'},
          {value: 0,name: '已选学分'},
        ],
        //辅修选课
        creditData6: [
          {value: 0,name: '已选门数'},
          {value: 0,name: '控制门数'},
        ],
        creditData_b6: [
          {value: 0,name: '控制学分'},
          {value: 0,name: '已选学分'},
        ],
        option0:{
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          title: {
            text:"",
            left: "28%",
            top: "40%",
            textStyle: {
              color: "#212F6E",
              fontSize: 18,
              textAlign: "center"
            }
          },
          graphic: {
            type: "text",
            left: "25%",
            top: "55%",
            style: {
              text: "选课门数",
              textAlign: "center",
              fill: "#757DA3",
              fontSize: 14,
            }
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            y: 'bottom',
            data: this.creditData,
            icon: "circle",
            align: 'left'
          },
          color: [ '#FF5D92','#5B56E6',],
          series: [{
            name: '选课门数',
            type: 'pie',
            radius: ['58%', '75%'],
            center: ['35%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.creditData
          }]
        },
        option1:{
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 'bottom',
            data: this.creditData_b,
            icon: "circle",
            align: 'left'
          },
          color: ['#9876FF', '#3FE2CB'],
          title: {
            text: "",
            left: "58%",
            top: "45%",
            textStyle: {
              color: "#212F6E",
              fontSize: 18,
              textAlign: "center"
            }
          },
          graphic: {
            type: "text",
            left: "55%",
            top: "60%",
            style: {
              text: "选课学分",
              textAlign: "center",
              fill: "#757DA3",
              fontSize: 14,
            }
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['58%', '75%'],
            center: ['65%', '55%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.creditData_b
          }]
        },
        option2:{
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          title: {
            text: "",
            left: "28%",
            top: "40%",
            textStyle: {
              color: "#212F6E",
              fontSize: 18,
              textAlign: "center"
            }
          },
          graphic: {
            type: "text",
            left: "25%",
            top: "55%",
            style: {
              text: "选课门数",
              textAlign: "center",
              fill: "#757DA3",
              fontSize: 14,
            }
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            y: 'bottom',
            data: this.creditData,
            icon: "circle",
            align: 'left'
          },
          color: [ '#FF5D92','#5B56E6',],
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['58%', '75%'],
            center: ['35%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.creditData1
          }]
        },
        option3:{
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 'bottom',
            data: this.creditData_b,
            icon: "circle",
            align: 'left'
          },
          color: ['#9876FF', '#3FE2CB'],
          title: {
            text: "",
            left: "52%",
            top: "45%",
            textStyle: {
              color: "#212F6E",
              fontSize: 18,
              textAlign: "center"
            }
          },
          graphic: {
            type: "text",
            left: "55%",
            top: "60%",
            style: {
              text: "选课学分",
              textAlign: "center",
              fill: "#757DA3",
              fontSize: 14,
            }
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['58%', '75%'],
            center: ['65%', '55%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.creditData_b1
          }]
        },
        option4:{
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          title: {
            text: "",
            left: "28%",
            top: "40%",
            textStyle: {
              color: "#212F6E",
              fontSize: 18,
              textAlign: "center"
            }
          },
          graphic: {
            type: "text",
            left: "25%",
            top: "55%",
            style: {
              text: "选课门数",
              textAlign: "center",
              fill: "#757DA3",
              fontSize: 14,
            }
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            y: 'bottom',
            data: this.creditData,
            icon: "circle",
            align: 'left'
          },
          color: [ '#FF5D92','#5B56E6',],
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['58%', '75%'],
            center: ['35%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.creditData2
          }]
        },
        option5:{
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 'bottom',
            data: this.creditData_b,
            icon: "circle",
            align: 'left'
          },
          color: ['#9876FF', '#3FE2CB'],
          title: {
            text: "",
            left: "52%",
            top: "45%",
            textStyle: {
              color: "#212F6E",
              fontSize: 18,
              textAlign: "center"
            }
          },
          graphic: {
            type: "text",
            left: "55%",
            top: "60%",
            style: {
              text: "选课学分",
              textAlign: "center",
              fill: "#757DA3",
              fontSize: 14,
            }
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['58%', '75%'],
            center: ['65%', '55%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.creditData_b2
          }]
        },
        option6:{
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          title: {
            text: "",
            left: "28%",
            top: "40%",
            textStyle: {
              color: "#212F6E",
              fontSize: 18,
              textAlign: "center"
            }
          },
          graphic: {
            type: "text",
            left: "25%",
            top: "55%",
            style: {
              text: "选课门数",
              textAlign: "center",
              fill: "#757DA3",
              fontSize: 14,
            }
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            y: 'bottom',
            data: this.creditData,
            icon: "circle",
            align: 'left'
          },
          color: [ '#FF5D92','#5B56E6',],
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['58%', '75%'],
            center: ['35%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.creditData3
          }]
        },
        option7:{
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 'bottom',
            data: this.creditData_b,
            icon: "circle",
            align: 'left'
          },
          color: ['#9876FF', '#3FE2CB'],
          title: {
            text: "",
            left: "52%",
            top: "45%",
            textStyle: {
              color: "#212F6E",
              fontSize: 18,
              textAlign: "center"
            }
          },
          graphic: {
            type: "text",
            left: "55%",
            top: "60%",
            style: {
              text: "选课学分",
              textAlign: "center",
              fill: "#757DA3",
              fontSize: 14,
            }
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['58%', '75%'],
            center: ['65%', '55%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.creditData_b3
          }]
        },
        option8:{
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 'bottom',
            data: this.creditData_b,
            icon: "circle",
            align: 'left'
          },
          color: ['#9876FF', '#3FE2CB'],
          title: {
            text: "",
            left: "28%",
            top: "40%",
            textStyle: {
              color: "#212F6E",
              fontSize: 18,
              textAlign: "center"
            }
          },
          graphic: {
            type: "text",
            left: "25%",
            top: "55%",
            style: {
              text: "选课门数",
              textAlign: "center",
              fill: "#757DA3",
              fontSize: 14,
            }
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            y: 'bottom',
            data: this.creditData,
            icon: "circle",
            align: 'left'
          },
          color: [ '#FF5D92','#5B56E6',],
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['58%', '75%'],
            center: ['35%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.creditData4
          }]
        },
        option9:{
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 'bottom',
            data: this.creditData_b,
            icon: "circle",
            align: 'left'
          },
          color: ['#9876FF', '#3FE2CB'],
          title: {
            text: "",
            left: "52%",
            top: "45%",
            textStyle: {
              color: "#212F6E",
              fontSize: 18,
              textAlign: "center"
            }
          },
          graphic: {
            type: "text",
            left: "55%",
            top: "60%",
            style: {
              text: "选课学分",
              textAlign: "center",
              fill: "#757DA3",
              fontSize: 14,
            }
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['58%', '75%'],
            center: ['65%', '55%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.creditData_b4
          }]
        },
        option10:{
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 'bottom',
            data: this.creditData_b,
            icon: "circle",
            align: 'left'
          },
          color: ['#9876FF', '#3FE2CB'],
          title: {
            text: "",
            left: "28%",
            top: "40%",
            textStyle: {
              color: "#212F6E",
              fontSize: 18,
              textAlign: "center"
            }
          },
          graphic: {
            type: "text",
            left: "25%",
            top: "55%",
            style: {
              text: "选课门数",
              textAlign: "center",
              fill: "#757DA3",
              fontSize: 14,
            }
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            y: 'bottom',
            data: this.creditData,
            icon: "circle",
            align: 'left'
          },
          color: [ '#FF5D92','#5B56E6',],
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['58%', '75%'],
            center: ['35%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.creditData5
          }]
        },
        option11:{
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 'bottom',
            data: this.creditData_b,
            icon: "circle",
            align: 'left'
          },
          color: ['#9876FF', '#3FE2CB'],
          title: {
            text: "",
            left: "52%",
            top: "45%",
            textStyle: {
              color: "#212F6E",
              fontSize: 18,
              textAlign: "center"
            }
          },
          graphic: {
            type: "text",
            left: "55%",
            top: "60%",
            style: {
              text: "选课学分",
              textAlign: "center",
              fill: "#757DA3",
              fontSize: 14,
            }
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['58%', '75%'],
            center: ['65%', '55%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.creditData_b5
          }]
        },
        option12:{
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 'bottom',
            data: this.creditData_b,
            icon: "circle",
            align: 'left'
          },
          color: ['#9876FF', '#3FE2CB'],
          title: {
            text: "12",
            left: "28%",
            top: "40%",
            textStyle: {
              color: "#212F6E",
              fontSize: 18,
              textAlign: "center"
            }
          },
          graphic: {
            type: "text",
            left: "25%",
            top: "55%",
            style: {
              text: "选课门数",
              textAlign: "center",
              fill: "#757DA3",
              fontSize: 14,
            }
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            y: 'bottom',
            data: this.creditData,
            icon: "circle",
            align: 'left'
          },
          color: [ '#FF5D92','#5B56E6',],
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['58%', '75%'],
            center: ['35%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.creditData6
          }]
        },
        option13:{
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            y: 'bottom',
            data: this.creditData_b,
            icon: "circle",
            align: 'left'
          },
          color: ['#9876FF', '#3FE2CB'],
          title: {
            text: "",
            left: "52%",
            top: "45%",
            textStyle: {
              color: "#212F6E",
              fontSize: 18,
              textAlign: "center"
            }
          },
          graphic: {
            type: "text",
            left: "55%",
            top: "60%",
            style: {
              text: "选课学分",
              textAlign: "center",
              fill: "#757DA3",
              fontSize: 14,
            }
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['58%', '75%'],
            center: ['65%', '55%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.creditData_b6
          }]
        }
      }
    },
    mounted() {
      var mySwiper = new Swiper('.swiper-container', {
        // loop : true,
      });
      this.drawLine();
      this.dataList();
    },
    watch:{
      option0:{
        handler(newVal, oldVal) {
          if (this.myChart_0) {
            if (newVal) {
              this.myChart_0.setOption(newVal,true);
            } else {
              this.myChart_0.setOption(oldVal,true);
            }
          } else {
            this.drawLine();
          }
        },
        deep:true
      }
    },
    methods: {
      async dataList(){
        const params = {
          rotationId:this.$route.query.data
        }
        const res = await Api.selectWxgetXsxktzsm(params)
        this.creditDataList = res.data;
        if(res.data == ''){
          Toast(res.errorMessage)
        }
        if(res.errorCode == 'fail'){
          this.$router.replace("/student/pickClass")
        }
        // 必修选课
        this.creditData[0].value = res.data[0].numberOfSelectedGates;//已选门数
        this.creditData[1].value = res.data[0].controlGateNumber;//88控制门数
        this.option0.series[0].data = this.creditData;
        this.option0.title.text = res.data[0].controlGateNumber

        this.creditData_b[0].value = res.data[0].creditControl;
        this.creditData_b[1].value = res.data[0].selectedCredits;
        this.option1.series[0].data = this.creditData_b;
        this.option1.title.text = res.data[0].creditControl

        // 选修选课
        this.creditData1[0].value = res.data[1].numberOfSelectedGates;
        this.creditData1[1].value = res.data[1].controlGateNumber;
        this.option2.series[0].data = this.creditData1;
        this.option2.title.text = res.data[1].controlGateNumber

        this.creditData_b1[0].value = res.data[1].creditControl;
        this.creditData_b1[1].value = res.data[1].selectedCredits;
        this.option3.series[0].data = this.creditData_b1;
        this.option3.title.text = res.data[1].creditControl

        //本学期计划选课
        this.creditData2[0].value = res.data[2].numberOfSelectedGates;
        this.creditData2[1].value = res.data[2].controlGateNumber;
        this.option4.series[0].data = this.creditData2;
        this.option4.title.text = res.data[2].controlGateNumber

        this.creditData_b2[0].value = res.data[2].creditControl;
        this.creditData_b2[1].value = res.data[2].selectedCredits;
        this.option5.series[0].data = this.creditData_b2;
        this.option5.title.text = res.data[2].creditControl
        //专业内跨年级选课
        this.creditData3[0].value = res.data[3].numberOfSelectedGates;
        this.creditData3[1].value = res.data[3].controlGateNumber;
        this.option6.series[0].data = this.creditData3;
        this.option6.title.text = res.data[3].controlGateNumber

        this.creditData_b3[0].value = res.data[3].creditControl;
        this.creditData_b3[1].value = res.data[3].selectedCredits;
        this.option7.series[0].data = this.creditData_b3;
        this.option7.title.text = res.data[3].creditControl
        //跨专业选课
        this.creditData4[0].value = res.data[4].numberOfSelectedGates;
        this.creditData4[1].value = res.data[4].controlGateNumber;
        this.option8.series[0].data = this.creditData4;
        this.option8.title.text = res.data[4].controlGateNumber

        this.creditData_b4[0].value = res.data[4].creditControl;
        this.creditData_b4[1].value = res.data[4].selectedCredits;
        this.option9.series[0].data = this.creditData_b4;
        this.option9.title.text = res.data[4].creditControl
        //公选课选课
        this.creditData5[0].value = res.data[5].numberOfSelectedGates;
        this.creditData5[1].value = res.data[5].controlGateNumber;
        this.option10.series[0].data = this.creditData5;
        this.option10.title.text = res.data[5].controlGateNumber

        this.creditData_b5[0].value = res.data[5].creditControl;
        this.creditData_b5[1].value = res.data[5].selectedCredits;
        this.option11.series[0].data = this.creditData_b5;
        this.option11.title.text = res.data[5].creditControl
        //辅修选课
        this.creditData6[0].value = res.data[6].numberOfSelectedGates;
        this.creditData6[1].value = res.data[6].controlGateNumber;
        this.option12.series[0].data = this.creditData6;
        this.option12.title.text = res.data[6].controlGateNumber

        this.creditData_b6[0].value = res.data[6].creditControl;
        this.creditData_b6[1].value = res.data[6].selectedCredits;
        this.option13.series[0].data = this.creditData_b6;
        this.option13.title.text = res.data[6].creditControl
      },
      drawLine() {
        let myChart_0 = this.$echarts.init(document.getElementById('myChart_0'));
        let myChart_1 = this.$echarts.init(document.getElementById('myChart_1'));
        let myChart_2 = this.$echarts.init(document.getElementById('myChart_2'));
        let myChart_3 = this.$echarts.init(document.getElementById('myChart_3'));
        let myChart_4 = this.$echarts.init(document.getElementById('myChart_4'));
        let myChart_5 = this.$echarts.init(document.getElementById('myChart_5'));
        let myChart_6 = this.$echarts.init(document.getElementById('myChart_6'));
        let myChart_7 = this.$echarts.init(document.getElementById('myChart_7'));
        let myChart_8 = this.$echarts.init(document.getElementById('myChart_8'));
        let myChart_9 = this.$echarts.init(document.getElementById('myChart_9'));
        let myChart_10 = this.$echarts.init(document.getElementById('myChart_10'));
        let myChart_11 = this.$echarts.init(document.getElementById('myChart_11'));
        let myChart_12 = this.$echarts.init(document.getElementById('myChart_12'));
        let myChart_13 = this.$echarts.init(document.getElementById('myChart_13'));
        myChart_0.setOption(this.option0,true);
        myChart_1.setOption(this.option1,true);
        myChart_2.setOption(this.option2,true);
        myChart_3.setOption(this.option3,true);
        myChart_4.setOption(this.option4,true);
        myChart_5.setOption(this.option5,true);
        myChart_6.setOption(this.option6,true);
        myChart_7.setOption(this.option7,true);
        myChart_8.setOption(this.option8,true);
        myChart_9.setOption(this.option9,true);
        myChart_10.setOption(this.option10,true);
        myChart_11.setOption(this.option11,true);
        myChart_12.setOption(this.option12,true);
        myChart_13.setOption(this.option13,true);
      }
    },
  }
</script>

<style lang="less" scoped>
  .credit_top {padding:0px 20px;box-sizing: border-box;background: @attendance-color-3;}
  .credit_top div{color: @attendance-color-2;font-size: 14px;}
  .credit{overflow: hidden; margin: 20px;box-shadow:0px 1px 21px 0px rgba(210,210,210,0.6);}
  .credit .credit_list{overflow-y: scroll;display: flex;}
  .credit .credit_list::-webkit-scrollbar {display:none}
  .credit .credit_list .credit_list_item {width: 100%;background: @attendance-color-3;box-sizing: border-box;padding: 15px;margin: 10px 20px;}
  .credit .credit_list .credit_list_item h3 {text-align: center;color: @attendance-color-1;font-size: 18px;}
</style>



// WEBPACK FOOTER //
// src/components/student/pickClass/creditStatistics.vue