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

				<div class="display-num" v-if="tabs[0].isSelected">
					{{value.privateNum}}
				</div>
				<div class="display-num" v-else-if="tabs[1].isSelected">
					{{value.publicNum}}
				</div>
				<div class="display-num" v-else>
					{{value.privateNum + value.publicNum}}
				</div>
       	 	</div>
      	</div>

		<div style="display: flex; justify-content: space-between;">
			<div class="card" v-for="( value, index) in totalInput" :key='index' style="padding: 0px 0px;">
				<div>{{value.name}}</div>
				<div><img :src='value.link'></div>

				<div class="display-num" v-if="tabs[0].isSelected">{{value.publicNum}}</div>
				<div class="display-num" v-if="tabs[1].isSelected">{{value.privateNum}}</div>
				<div class="display-num" v-if="tabs[2].isSelected">{{value.publicNum + value.privateNum}}</div>
			</div>
			<div class="card" style="visibility: hidden; padding: 0px 0px;">
				<div>1</div>
				<div><img src='@/assets/icon1.png'></div>
				<div class="display-num">1</div>  
			</div>
		</div>
		
		<br>

		<div id="container">
			<div id="tabpane">
				<ul class="tabs">
					<li v-for="(tab, index) in tabs" :key="index">
						<div class="content" @click="selectTab(tab)" :class="{'is-active': tab.isSelected}">
							{{tab.name}}
						</div>
					</li>
				</ul>    
			</div>

			<div id="location" v-if="tabs[0].isSelected">
				<div class="item-left">省份</div>
				<Select v-model="seletedProvince" size="large" style="width:100px" placeholder="">
					<Option v-for="item in provinceList" :value="item" :key="item">{{ item }}</Option>
				</Select>
				<div class="item-left">市区</div>
				<Select v-model="selectedCity" size="large" style="width:100px" placeholder="">
					<Option v-for="item in cityList" :value="item" :key="item">{{ item }}</Option>
				</Select>
				<div class="item-left">单位</div>
				<Select v-model="selectedHospital" size="large" style="width:100px" placeholder="">
					<Option v-for="item in hospitalList" :value="item" :key="item">{{ item }}</Option>
				</Select>
				<br>
			</div>

			<div id="time">
				<div class="item-left" >时间</div>
				<DatePicker 
					class="date-picker" 
					type="date" 
					placeholder="选择日期"
					v-model="startTime" 
					@on-change="print()">
				</DatePicker>
				<div class="item-left">至</div>
				<DatePicker 
					class="date-picker" 
					type="date" 
					placeholder="选择日期"
					:value="endTime">
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

		<div style="display: flex; justify-content: space-between;">
			<div class="card" v-for="( value, index) in usage" :key='index' style="padding: 0px 0px;">
			<div>{{value.name}}</div>
			<div><img :src='value.link'></div>
			<div class="display-num">{{value.searchNum}}</div>
			</div>
		</div>
		
		<!-- Display three chasrts each time, use to pass parameters -->
      	<div class="canvas-for-chart" id="chart1">
			<ChartDisplayUser v-if="chartClass[0].isSelected" :startdate="tableStartTime" :enddate="tableEndTime" :isdisplay="tabs[1].isSelected" ref="chart1"></ChartDisplayUser>
			<ChartDisplayInput v-if="chartClass[1].isSelected" :startdate="tableStartTime" :enddate="tableEndTime" :isdisplay="tabs[1].isSelected" ref="chart2"></ChartDisplayInput>
			<ChartDisplayWord v-if="chartClass[2].isSelected" :startdate="tableStartTime" :enddate="tableEndTime" :isdisplay="tabs[1].isSelected" ref="chart3"></ChartDisplayWord>
			<ChartDisplayTime v-if="chartClass[3].isSelected" :startdate="tableStartTime" :enddate="tableEndTime" :isdisplay="tabs[1].isSelected" ref="chart4"></ChartDisplayTime>
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
			publicNum: 1,
			totalNum: null,
			searchNum: 0,
		},
		{
			name: "使用设备数",
			link: require("@/assets/icon2.png"),
			privateNum: 7820,
			publicNum: 1,
			totalNum: null,
			searchNum: 0,
		},
		{
			name: "使用用户数",
			link: require("@/assets/icon3.png"),
			privateNum: 15220,
			publicNum: 1,
			totalNum: null,
			searchNum: 0,
		},
		{
			name: "使用科室数",
			link: require("@/assets/icon4.png"),
			privateNum: 320,
			publicNum: 1,
			totalNum: null,
			searchNum: 0,
		}
		],

		totalInput: [
		{
			name: "累计输入字数",
			link:require("@/assets/icon5.png"),
			privateNum: 0,
			publicNum: 0,
			totalNum: 0,
		},
		{
			name: "累计调用次数",
			link: require("@/assets/icon6.png"),
			privateNum: 0,
			publicNum: 0,
			totalNum: 0,
		},
		{
			name: "累计录音时间",
			link: require("@/assets/icon7.png"),
			privateNum: 0,
			publicNum: 0,
			totalNum: 0,
		}
		],

		provinceList: ['New York', 'London', 'Sydney', 'Ottawa', 'Paris', 'Canberra'],
		cityList: ['New York', 'London', 'Sydney', 'Ottawa', 'Paris', 'Canberra'],
		hospitalList: ['New York', 'London', 'Sydney', 'Ottawa', 'Paris', 'Canberra'],

		tabs: [
		{
			name: "公有云", 
			isSelected: true,
		},
		{
			name: "私有云", 
			isSelected: false,
		},
		{
			name: "总计", 
			isSelected: false,
		},
		],

		btnList: [
		{
			name: "今日", 
			methods: "clickShortcut1"
		},
		{
			name: "昨日", 
			methods: "clickShortcut2"
		},
		{
			name: "近一周", 
			methods: "clickShortcut3"
		},
		{
			name: "近一月", 
			methods: "clickShortcut4"
		},
		{
			name: "近一年", 
			methods: "clickShortcut5"},
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

		category: ' ',
		chartdata: ' ',
		seletedProvince: ' ',
		selectedCity: ' ',
		selectedHospital: ' ',

		startTime: "2018-07-01 00:00:00",
		endTime: "2018-07-31 00:00:00",
  	}
},

	computed: {
		tableStartTime: function(){
			return moment(this.startTime).format("YYYY-MM-DD HH:mm:ss");
		},
		tableEndTime: function(){
			return moment(this.endTime).format("YYYY-MM-DD HH:mm:ss")
		},
	},

 	methods: {

		selectTab(selectedTab) {
			this.tabs.forEach(tab => {
			tab.isSelected = (tab.name == selectedTab.name);})    
		},

		selectChart(selectedChart) {
			this.chartClass.forEach(chart => {
			chart.isSelected = (chart.name === selectedChart.name);})   
			console.log(this.chartClass); 
		},

    	requestNum(){
			this.$http.get('/new/flylog-search-web/customLogSearch/getWordCount.do', {
			params: {
				startTime: moment(this.startTime).format("YYYY-MM-DD HH:mm:ss"),
				endTime: moment(this.endTime).format("YYYY-MM-DD HH:mm:ss"),
				Uid: "",
				platform: 'siat',
			}
			})
			.then((response) => {
				console.log(response);
				// var nums = 0;
				var res =  response.data.data;
				// var lognums = res.totalTime;
				this.totalInput[2].privateNum = res.totalTime;
				this.totalInput[0].privateNum = res.count;
			})
			.catch(function (error) {
				console.log(error);
			})
			.then(function () {
				// always executed
      		});  



			this.$http.get('/api/flylog-search-web/api/timeline.do', {
			params: {
				startTime: moment(this.startTime).format("YYYY-MM-DD HH:mm:ss"),
				endTime: moment(this.endTime).format("YYYY-MM-DD HH:mm:ss"),
				platform: 'siat',
			}
			})
			.then((response) => {
				var nums = 0;
				var lognums = response.data.logCount;
				lognums.forEach(value => nums += value);
				this.totalInput[1].privateNum = nums;
			})
			.catch(function (error) {
				console.log(error);
			})
			.then(function () {
				// always executed
			});  
			// this.totalInput[0].totalNum = this.totalInput[0].privateNum + this.totalInput[0].publicNum;   
			// this.totalInput[1].totalNum = this.totalInput[1].privateNum + this.totalInput[0].publicNum;   
			
    	},

		requestUserNum(){
			this.$http.get('/api/flylog-search-web/api/getLogStat.do', {
			params: {
				startTime: '2018-07-26 00:00:00',
				endTime: '2018-07-26 09:59:00',
				platform: 'siat',
				aggQuery: "select count(*) uid"
			}
			})
			.then((response) => {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			})
			.then(function () {
				// always executed
			});  
		},

		searchDisplay(){
			if(this.tabs[0].isSelected){
				this.$http.get('/api/flylog-search-web/api/timeline.do', {
				params: {
					startTime: moment(this.startTime).format("YYYY-MM-DD HH:mm:ss"),
					endTime: moment(this.endTime).format("YYYY-MM-DD HH:mm:ss"),
					platform: 'siat',
				}
				})
				.then((response) => {
					var nums = 0;
					var lognums = response.data.logCount;
					lognums.forEach(value => nums += value);
					this.usage[2].searchNum = nums;
					// console.log(this.usage[1].searchNum);
					// this.$refs.chart1.getData();
					// this.$refs.chart2.getData();
					// this.$refs.chart3.getData();
					// this.$refs.chart4.getData();
				})
				.catch(function (error) {
					console.log(error);
				})
				.then(function () {
					// always executed
				}); 
			}
			
			if(this.tabs[1].isSelected){
				this.usage[0].searchNum = 1;
				let postData = this.$qs.stringify({
					startTime: moment(this.startTime).format("YYYY-MM-DD HH:mm:ss"),
					endTime: moment(this.endTime).format("YYYY-MM-DD HH:mm:ss"),
					platform: 'siat',
				});
				this.$http.post('/new/flylog-search-web/customLogSearch/getUidAndSectionCount.do', postData)
				.then((response) => {
					console.log(response);
					let res = response.data.data;
					this.usage[1].searchNum = this.usage[2].searchNum = res.uidCount;
					this.usage[3].searchNum = res.sectionCount; 
					this.$refs.chart1.getData();
					this.$refs.chart2.getData();
					this.$refs.chart3.getData();
					this.$refs.chart4.getData();
				})
				.catch(function (error) {
					console.log(error);
				})
				.then(function () {
					// always executed
				}); 				
			}	
		},

		computeTimeSlot(preDays){
			let now = new Date();
			let now2 = new Date();
			now.toString();
			now2.toString();
			let startDate = moment(now).startOf('day').subtract(preDays, 'days').format("YYYY-MM-DD HH:mm:ss");
			let endDate = moment(now2).format("YYYY-MM-DD HH:mm:ss");
			this.startTime = startDate.toString();
			this.endTime = endDate.toString();
			console.log(this.startTime);
			console.log(this.endTime);
		},  

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
  	},
  
	mounted() {
		this.requestNum();
		// this.requestUserNum();	
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
	.tabs>li {
		float: left;
		width: 33.333333%
	}
	.tabs>li>.content {
		height: 62px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.ivu-tabs-ink-bar {
		width: 150px;
	}
	.is-active {
		border-bottom: 3px solid #248fff;
	}
	.date-picker {
		width: 100px;
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
		/* display: box; */
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
		height: 204px;
	}
	#location, #time {
		margin-top: 10px;
		text-align: left;    
	}
	#time {    
		margin: 10px 0px;    
	}
</style>