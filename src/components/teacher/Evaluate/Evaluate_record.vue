<template>
    <div>
        <div class="title">
			<router-link to="evaluate"><i></i>评价记录</router-link>
		</div>
        <div class="cont_box" v-for="(item,index) in recordlist" :key="index">
            <div class="left_box">
                <span class="contain-txt">{{item.teacherName}}</span>
                <span class="contain-txt1">教工号：{{item.teacherId}}</span>
                <span class="contain-txt1">所属学院：文史与法学学院</span>
            </div>
            <div class="right_box" @click="fn1()">
                <span class="number">{{item.overallScore}}</span>
                <span class="grade">总评分</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            recordlist:[]
        }
    },
    methods:{
        Record(){
            this.$axios({
                method:'post',
                url:'/teacher/teachingEvaluationList',
                params:{
                    batchId:'48370028936A49DC8FF06F92FEB07294',
                    pj05id:'97F646F853B64EF58FE292722AA5AD7A'
                }
            }).then(res=>{
                this.recordlist = res.data.data;
            })
        },
        fn1(){
            this.$router.push({
                path:'/gradeDetails'
            })
        }
    },
    created(){
        this.Record()
    }
}
</script>
<style lang="less" scoped>
    .title {
		line-height: 34px;
		width: 90%;
		margin: 10px auto;
	}

	.title a {
		text-decoration: none;
		color: @attendance-color-4;
		font-size: 18px;
		font-weight: 600;
	}

	.title a i {
		text-decoration: none;
		color: @attendance-color-4;
		vertical-align: middle;
		display: inline-block;
		width: 20px;
		height: 20px;
		background: url(../../../assets/images/back_left.png)center center no-repeat;
		background-size: 100%;
		margin-right: 5px;
	}
    .cont_box{
        width: 90%;
        margin-left: 5%;
        height: 80px;
        background: url(../../../assets/images/gray_bg.png) center center no-repeat;
        background-size: 100%;
        margin-top: 20px
    }
    .cont_box span{
        display: block;
    }
    .cont_box .left_box{
        width: 60%;
        height: 100%;
        float: left;
        margin-left: 20px
    }
    .cont_box .left_box .contain-txt{
        color: @attendance-color-1;
        font-size: 16px;
        font-weight: 600;
        margin-top: 7px
    }
    .cont_box .left_box .contain-txt1{
        color: @attendance-color-2;
        font-size: 12px;
        margin-top: 4px
    }
    .cont_box .right_box{
        width: 20%;
        height: 42px;
        float: right;
        background: url(../../../assets/images/bg_icon.png) center center no-repeat;
        background-size: 100%;
        margin: 20px 20px 0 0;
        text-align: center;
    }
    .cont_box .right_box .number{
        color: @attendance-color-3;
        font-size: 18px;
        margin-top: 3px
    }
    .cont_box .right_box .grade{
        color: @attendance-color-3;
        font-size: 10px;
        
    }
</style>


// WEBPACK FOOTER //
// src/components/teacher/Evaluate/Evaluate_record.vue