<template>
  	<div>
    	<div style="display: flex; justify-content: space-between;">
        	<div 
			class="card" 
			v-for="( value, index) in usage" 
			:key='index' 
			style="padding: 0px 0px;">
				<div>
					{{ value.name }}
				</div>

				<div>
					<img :src='value.link'>
				</div>

				<div class="display-num">
					{{value.privateNum}}
				</div>
       	 	</div>
      	</div>

		<div style="display: flex; justify-content: space-between;">
			<div class="card" v-for="( value, index) in totalInput" :key='index' style="padding: 0px 0px;">
				<div>{{value.name}}</div>
				<div><img :src='value.link'></div>
				<div class="display-num">{{value.privateNum}}</div>
			</div>
			<div class="card" style="visibility: hidden; padding: 0px 0px;">
				<div>1</div>
				<div><img src='@/assets/icon1.png'></div>
				<div class="display-num">1</div>  
			</div>
		</div>
		
		<br>
		<!-- 搜索框 -->
		<div id="container">
			<div id="time">
				<div class="item-left" >时间</div>
				<DatePicker 
					class="date-picker" 
					type="date" 
					:options="startTimeOptions"
					@on-change="startTimeChange"
					placeholder="选择日期"
					v-model="startTime">
				</DatePicker>
				<div class="item-left">至</div>
				<DatePicker 
					class="date-picker" 
					type="date"
					:options="endTimeOptions" 
					@on-change="endTimeChange"
					placeholder="选择日期"
					v-model="endTime">
				</DatePicker>

				<div style="display: inline-block; margin-left: 56px;">
					<Button 
						type="ghost" 
						v-for="(value, index) in btnList"
						:key="index"
						@click="clickShortcut(index)">
						{{value.name}}
					</Button>
					<Button type="primary" style="margin-left: 10px;" @click="searchDisplay()">搜索</Button>
				</div>
        	</div>
		<!-- 切换表格的按钮 -->
			<div>
				<ButtonGroup>
					<Button 
						v-for="( value , index) in chartClass" 
						:key='index' 
						type="ghost" 
						@click="selectChart(value)">
						{{value.name}}
					</Button>
				</ButtonGroup>	
			</div>          
   	 	</div>
		<!-- 搜索结果显示 -->
		<div style="display: flex; justify-content: space-between;">
			<div class="card" v-for="( value, index) in usage" :key='index' style="padding: 0px 0px;">
			<div>{{value.name}}</div>
			<div><img :src='value.link'></div>
			<div class="display-num">{{value.searchNum}}</div>
			</div>
		</div>
		
		<!-- 四组表格，点击切换 -->
      	<div class="canvas-for-chart" id="chart1">
			<ChartDisplayUser v-if="chartClass[0].isSelected" :startdate="tableStartTime" :enddate="tableEndTime" ref="chart1"></ChartDisplayUser>
			<ChartDisplayInput v-if="chartClass[1].isSelected" :startdate="tableStartTime" :enddate="tableEndTime" ref="chart2"></ChartDisplayInput>
			<ChartDisplayWord v-if="chartClass[2].isSelected" :startdate="tableStartTime" :enddate="tableEndTime" ref="chart3"></ChartDisplayWord>
			<ChartDisplayTime v-if="chartClass[3].isSelected" :startdate="tableStartTime" :enddate="tableEndTime" ref="chart4"></ChartDisplayTime>
		</div>
     
  	</div> 
</template>

<script>
var moment = require('moment');

import ChartDisplayUser from './ChartDisplayUser.vue'
import ChartDisplayInput from './ChartDisplayInput.vue'
import ChartDisplayWord from './ChartDisplayWord.vue'
import ChartDisplayTime from './ChartDisplayTime.vue'

export default {
	name: 'DisplayHome',

	components: {
		ChartDisplayUser,
		ChartDisplayInput,
		ChartDisplayWord,
		ChartDisplayTime,
	},
	data() {
	return {
		msg: "Welcome",

		usage: [
		{
			name: "使用医院数",
			link: require("@/assets/icon1.png"),
			privateNum: 1,
			searchNum: 0,
		},
		{
			name: "使用设备数",
			link: require("@/assets/icon2.png"),
			privateNum: 0,
			searchNum: 0,
		},
		{
			name: "使用用户数",
			link: require("@/assets/icon3.png"),
			privateNum: 0,
			searchNum: 0,
		},
		{
			name: "使用科室数",
			link: require("@/assets/icon4.png"),
			privateNum: 0,
			searchNum: 0,
		}
		],

		totalInput: [
		{
			name: "累计输入字数（字）",
			link:require("@/assets/icon5.png"),
			privateNum: 0,
		},
		{
			name: "累计调用次数（次）",
			link: require("@/assets/icon6.png"),
			privateNum: 0,
		},
		{
			name: "累计录音时间（秒）",
			link: require("@/assets/icon7.png"),
			privateNum: 0,
		}
		],

		btnList: [
		{
			name: "今日", 
		},
		{
			name: "昨日", 
		},
		{
			name: "近一周", 
		},
		{
			name: "近一月", 
		},
		{
			name: "近一年", 
		}
		],

		chartClass: [
		{
			name: "使用用户数",
			isSelected: true,
		},
		{
			name: "累计输入字数",
			isSelected: false,
		},
		{
			name: "累计调用次数",
			isSelected: false,
		},
		{
			name: "累计录音时间",
			isSelected: false,
		}
		],

		startTimeOptions: {}, //开始日期设置
        endTimeOptions: {}, //结束日期设置
		startTime: "",  //开始日期
		endTime: "",	//结束日期
  	}
},

	computed: {
		// 统一开始和结束时间格式
		tableStartTime: function(){
			return moment(this.startTime).format("YYYY-MM-DD HH:mm:ss");
		},
		// 将结束时间设置为最后一天的结束时刻
		tableEndTime: function(){
			return moment(this.endTime).endOf("day").format("YYYY-MM-DD HH:mm:ss");
		},
	},

 	methods: {
		/**
		 *  将选中图表的isSelected设置为true
		 */
		selectChart(selectedChart) {
			this.chartClass.forEach(chart => {
			chart.isSelected = (chart.name === selectedChart.name);})   
		},
		/**
		 * 页面加载时显示总体的日志信息
		 * 显示在首页最上方的标签中
		 */
    	requestNum(){
			this.$http.get(process.env.API_HOST2+'flylog-search-web/customLogSearch/getWordCount.do', {
			params: {
				startTime: "2017-01-01 00:00:00",
				endTime: moment().format("YYYY-MM-DD HH:mm:ss"),
				Uid: "",
				platform: 'siat',
			}
			})
			.then((response) => {
				var res =  response.data.data;
				this.totalInput[2].privateNum = res.totalTime;
				this.totalInput[0].privateNum = res.count;
			})
			.catch(function (error) {
				console.log(error);
			})
			.then(function () {
				// always executed
      		});  

			let postData = this.$qs.stringify({
				startTime: "2017-01-01 00:00:00",
				endTime: moment().format("YYYY-MM-DD HH:mm:ss"),
				platform: 'siat',
			});
			
			this.$http.post(process.env.API_HOST2+'flylog-search-web/customLogSearch/getChart.do', postData)
			.then((response) => {
				var rs = response.data.data;
				let sum = 0;
				var days = Object.keys(rs.day);
				for(var i in days){
					sum += rs.day[days[i]].logCount;
				}
				this.totalInput[1].privateNum = sum;
			})
			.catch(function (error) {
				console.log(error);
			})
			.then(function () {
				// always executed
			});  
			
    	},

		requestUserNum(){
			let postData = this.$qs.stringify({
				startTime: '2010-01-01 00:00:00',
				endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
				// endTime: '2018-08-24 00:00:00',
				platform: 'siat',
            });
			this.$http.post(process.env.API_HOST2+'flylog-search-web/customLogSearch/getUidAndSectionCount.do', postData)
			.then((response) => {
				let rs = response.data.data;
				this.usage[1].privateNum = this.usage[2].privateNum = rs.uidCount;
				this.usage[3].privateNum = rs.sectionCount;
			})
			.catch(function (error) {
				console.log(error);
			})
			.then(function () {
			});  
		},
		/**
		 * 搜索结果获取
		 * 显示搜索框下方的标签内容
		 * 处理图表和表格数据
		 */
		searchDisplay(){
			//set end time to the end of the day to include data of the last day 
			this.endTime = moment(this.endTime).endOf("day").format('YYYY-MM-DD HH:mm:ss');
			
			this.usage[0].searchNum = 1;
			let postData = this.$qs.stringify({
				startTime: moment(this.startTime).format("YYYY-MM-DD HH:mm:ss"),
				endTime: moment(this.endTime).format("YYYY-MM-DD HH:mm:ss"),
				platform: 'siat',
			});
			this.$http.post(process.env.API_HOST2+'flylog-search-web/customLogSearch/getUidAndSectionCount.do', postData)
			.then((response) => {
				let res = response.data.data;
				this.usage[1].searchNum = this.usage[2].searchNum = res.uidCount;
				this.usage[3].searchNum = res.sectionCount;
				if(this.chartClass[0].isSelected) 
					this.$refs.chart1.getData();
				if(this.chartClass[1].isSelected)
					this.$refs.chart2.getData();
				if(this.chartClass[2].isSelected)
					this.$refs.chart3.getData();
				if(this.chartClass[3].isSelected)
					this.$refs.chart4.getData();
			})
			.catch(function (error) {
				console.log(error);
			})
			.then(function () {
				// always executed
			}); 					
		},
		/**
		 * 计算时间范围
		 * 当前日期之前的preDays天至当前日期
		 */
		computeTimeSlot(preDays){
			let now = new Date();
			let now2 = new Date();
			now.toString();
			now2.toString();
			let startDate = moment(now).startOf('day').subtract(preDays, 'days').format("YYYY-MM-DD HH:mm:ss");
			let endDate = moment(now2).format("YYYY-MM-DD HH:mm:ss");
			this.startTime = startDate.toString();
			this.endTime = endDate.toString();
		},  
		/**
		 * 点击快捷键
		 */
		clickShortcut(index){
			switch(index){
				case(0):
					this.computeTimeSlot(0);
					break;
				case(1):
					this.computeTimeSlot(1);
					this.endTime = moment(this.endTime).startOf('day').subtract(1, 'seconds').format("YYYY-MM-DD HH:mm:ss");
					break;
				case(2):
					this.computeTimeSlot(7);
					break;
				case(3):
					this.computeTimeSlot(30);
					break;
				case(4):
					this.computeTimeSlot(365);
					break;
			}
		},
		/**
		 * 处理第二个Datepicker中的无效日期
		 */
		startTimeChange(e) {
			this.endTimeOptions = {
				disabledDate(endTime) {
					return moment(endTime).valueOf() < moment(e).valueOf() || endTime > Date.now()
				}
			}
		},
		/**
		 * 处理第一个Datepicker中的无效日期
		 */
		endTimeChange(e) {
			this.startTimeOptions = {
				disabledDate(startTime) {
					return startTime > new Date(e) || startTime > Date.now()
				}
			}
		},
	},


	created() {
		this.computeTimeSlot(30);//初始显示近30天的数据
		this.endTime = moment(this.endTime).endOf("day").format('YYYY-MM-DD HH:mm:ss');
		this.startTimeChange(this.startTime);//初始处理datepicker中的无效日期
		this.endTimeChange(this.endTime);		
	},

	mounted() {
		
		this.usage[0].searchNum = 1;
		let postData = this.$qs.stringify({
			startTime: moment(this.startTime).format("YYYY-MM-DD HH:mm:ss"),
			endTime: moment(this.endTime).format("YYYY-MM-DD HH:mm:ss"),
			platform: 'siat',
		});
		this.$http.post(process.env.API_HOST2+'flylog-search-web/customLogSearch/getUidAndSectionCount.do', postData)
		.then((response) => {
			let res = response.data.data;
			this.usage[1].searchNum = this.usage[2].searchNum = res.uidCount;
			this.usage[3].searchNum = res.sectionCount;
		})
		.catch(function (error) {
			console.log(error);
		})
		.then(function () {
			
		}); 					
		this.requestNum();
		this.requestUserNum();	
	} 
}
</script>

<style scoped>
	.card {
		margin-top: 14px;
		width: 230px;
		height: 150px;
		font-size: 14px;
		color: #828282;
		background-color: white;
		box-shadow:0 0 10px #dfdfdf;  
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
	.display-num {
		font-size: 22px;
		font-weight: bold;
		color: #666666;
	}
	ul {
		list-style-type: none;
	}
	ul, li { 
		margin:0;
		padding: 0;
		text-align: center;
	}
	.ivu-tabs-ink-bar {
		width: 150px;
	}
	.is-active {
		border-bottom: 3px solid #248fff;
	}
	.date-picker {
		width: 110px;
	}
	.item-left {
		display: inline-block; 
		width: 52px; 
		text-align: right;
	}
	.canvas-for-chart{
		height:352px;
	}
	#tabpane {
		width: 100%;   
		height: 62px; 
		border-bottom: 2px solid #e4e4e4;   
		font-size: 18px;
		font-weight: bold;
		color: #666666; 
	}
	#container{
		background: white;
		width: 100%;
		min-width: 1008px;
		margin-right: 66px;
		margin-top: 2px;
		padding-top:20px;
		height: 130px;
	}
	#location, #time {
		margin-top: 10px;
		text-align: left;    
	}
	#time {    
		margin: 10px 0px;    
	}
</style>