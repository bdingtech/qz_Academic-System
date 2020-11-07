<template>
    <div>
        <Header title="教室借用详情"></Header>
        <div class="Detail_box">
            <h3 :style="{color:color1}">{{this.state}}</h3>
            <p class="lesson">{{this.courseName}}</p>
            <p>教学周次：<span>{{this.weekly}}</span></p>
            <p>星期几：<span>{{this.dayweek}}</span></p>
            <p>教师容量：<span>{{this.classroomCapacity}}</span></p>
            <p>起止节次：<span>{{this.node}}</span></p>
            <p>校区：<span>{{this.campus}}</span></p>
            <p>教学楼：<span>{{this.tchBuilding}}</span></p>
            <p>教室：<span>{{this.jsmc}}</span></p>
            <p>联系电话：<span>{{this.phone}}</span></p>
            <p>备注：<span>{{this.remarks}}</span></p>
        </div>
    </div>
</template>
<script>
// // import Header from '../header.vue'
export default {
    data(){
        return{
            weekly:'',
			courseName:'',
			dayweek:'',
			classroomCapacity:'',
			node:'',
			campus:'',
			state:'',
			remarks:'',
            tchBuilding:'',
            color1: '',
            phone:'',
            jsmc:''
        }

    },
    created(){
        this.weekly = this.$route.query.weekly;
        this.courseName = this.$route.query.courseName;
        this.phone = this.$route.query.phone;
        this.dayweek = this.$route.query.dayweek;
        this.classroomCapacity = this.$route.query.classroomCapacity;
        this.node = this.$route.query.node;
        this.campus = this.$route.query.campus;
        this.state = this.$route.query.state;
        this.remarks = this.$route.query.remarks;
        this.tchBuilding = this.$route.query.tchBuilding;
        this.jsmc = this.$route.query.jsmc
        // this.weekly = this.$route.query.weekly;
        if(this.state == '审核通过'){
			this.color1 = '#12DDD6'
		}else if(this.state == '申请失败'){
			this.color1 = '#F86969'
		}else if(this.state == '待审核'){
			this.color1 = '#7469F8'
		}else if(this.state == '待送审'){
			this.color1 = '#757DA3'
		}
    },
}
</script>
<style lang="less" scoped> 
    .Detail_box{
        width: 90%;
        margin-left: 5%;
    }
    .Detail_box h3{
        font-size: 24px;
        margin-top: 25px;
        /* color: #7469F8 */
    }
    .Detail_box .lesson{
        color: @attendance-color-1;
        font-size: 18px;
        margin-top: 20px;
        font-weight: 600
    }
    .Detail_box p{
        color: @attendance-color-2;
        font-size: 14px;
    }
    .Detail_box p span{
        font-weight: 700;
        word-wrap: break-word;
    }
    .Detail_box p{
        margin-top: 8px;
    }
    .Detail_box p:nth-child(9){
        margin-top: 20px;
    }
</style>


// WEBPACK FOOTER //
// src/components/teacher/Classroom/recordDetail.vue