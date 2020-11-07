<template>
	<div>
		<div class="title">
			<router-link to="evaluate3"><i></i>教学评价</router-link>
		</div>
		<div class="section">
			<span>8</span><span>/8</span>
			<span>您对该老师的看法及建议（专家）</span>
		</div>
		<div class="body">
			<textarea name="" id="" cols="30" rows="10" placeholder="请点击填写" maxlength="140" @input="descInput" v-model="desc"></textarea>
			<span class="mysp">{{remnant}}/140</span>
		</div>
		<div class="foot">
			<button @click="fn1()">提交评教</button>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	export default {
		data() {
			return {
				desc:'',
				remnant: 140
			}
		},
		methods: {
			descInput() {
				var txtVal = this.desc.length;
				this.remnant = 140 - txtVal;
			},
			fn1(){
				Toast.success('评价已提交');
			}
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

	.section {
		width: 90%;
		margin-left: 5%;
	}

	.section span {
		color: @attendance-background-color-1;
		font-size: 48px;
	}

	.section span:nth-child(2) {
		color: @attendance-background-color-7;
		font-size: 18px;
	}

	.section span:nth-child(3) {
		font-size: 18px;
		color: @attendance-color-2;
		display: block;
	}

	.body {
		margin-top: 20px;
		width: 90%;
		margin-left: 3.5%;
	}

	.body textarea {
		background: @attendance-background-color-6;
		width: 100%;
		height: 389px;
		border: none;
		outline: none;
		/* padding: 10px 0px 0px 10px; */
		text-indent: 10px;
		padding-top: 10px;
		margin-left: 5px;
	}

	.body textarea::-webkit-input-placeholder {
		font-size: 16px;
		color: @attendance-color-2;
	}
	.body .mysp{
		color: @attendance-color-2;
		font-size: 16px;
		position: relative;
		right: -80%;
		top: -30px;
	}

	.foot {
		margin-top: 50px;
		width: 90%;
		margin-left: 5%;
	}

	.foot button {
		width: 100%;
		height: 44px;
		background: @attendance-background-color-1;
		color: @attendance-color-3;
		font-size: 16px;
		border-radius: 3px;
	}
</style>



// WEBPACK FOOTER //
// src/components/teacher/Evaluate/evaluate4.vue