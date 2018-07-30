<template>
  <div>
      <div style="display: flex; justify-content: space-between;">
        <div 
          class="card" 
          v-for="( value, index) in usage" 
          :key='index' 
          style="padding: 0px 0px;">
          <div>{{value.name}}</div>
          <div><img :src='value.link'></div>
          <div 
            class="display-num" 
            v-if="tabs[0].isSelected">
            {{value.privateNum}}
          </div>
          <div 
            class="display-num" 
            v-else-if="tabs[1].isSelected">
            {{value.publicNum}}
          </div>
          <div 
            class="display-num" 
            v-else>
            {{value.totalNum}}
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <div class="card" v-for="( value, index) in totalInput" :key='index' style="padding: 0px 0px;">
          <div>{{value.name}}</div>
          <div><img :src='value.link'></div>
          <div class="display-num" v-if="tabs[0].isSelected">{{value.privateNum}}</div>
          <div class="display-num" v-if="tabs[1].isSelected">{{value.publicNum}}</div>
          <div class="display-num" v-else>{{value.totalNum}}</div>
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
          <div class="content" @click="selectTab(tab)" :class="{'is-active': tab.isSelected}">{{tab.name}}</div>
          </li>
          </ul>    
        </div>
      <div>
      <div id="location">
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
              @on-change="print()"></DatePicker>
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
            </div>
        </div>
        <div>
            <ButtonGroup v-for="( value , index) in usage" :key='index'>
                <Button type="ghost">{{value.name}}</Button>
            </ButtonGroup>
            <Button type="primary" style="margin-left: 10px;" @click="searchDisplay()">搜索</Button>
        </div>          
        </div>
    </div>
      <div style="display: flex; justify-content: space-between;">
        <div class="card" v-for="( value, index) in usage" :key='index' style="padding: 0px 0px;">
          <div>{{value.name}}</div>
          <div><img :src='value.link'></div>
          <div class="display-num">{{value.searchNum}}</div>
        </div>
      </div>
      <div class="canvas-for-chart" id="chart1"><ChartDisplayInput></ChartDisplayInput></div>
      <!-- <div class="canvas-for-chart" id="chart2"><ChartDisplayRank></ChartDisplayRank></div> -->
  </div> 
</template>

<script>
import ChartDisplayInput from './ChartDisplayInput.vue'
import ChartDisplayRank from './ChartDisplayRank.vue'


export default {
  name: 'DisplayHome',
  components: {
    ChartDisplayInput,
    ChartDisplayRank,
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
        privateNum: 3535,
        publicNum: 1,
        totalNum: null,
      },
      {
        name: "累计调用次数",
        link: require("@/assets/icon6.png"),
        privateNum: null,
        publicNum: 1,
        totalNum: null,
      },
      {
        name: "累计录音时间",
        link: require("@/assets/icon7.png"),
        privateNum: 320,
        publicNum: 1,
        totalNum: null,
      }
    ],

    provinceList: ['New York', 'London', 'Sydney', 'Ottawa', 'Paris', 'Canberra'],
    cityList: ['New York', 'London', 'Sydney', 'Ottawa', 'Paris', 'Canberra'],
    hospitalList: ['New York', 'London', 'Sydney', 'Ottawa', 'Paris', 'Canberra'],

    tabs: [
      {name: "公有云", isSelected: true,},
      {name: "私有云", isSelected: false,},
      {name: "总计", isSelected: false,},
    ],

    btnList: [
      {name: "今日", methods: "clickShortcut1"},
      {name: "昨日", methods: "clickShortcut2"},
      {name: "近一周", methods: "clickShortcut3"},
      {name: "近一月", methods: "clickShortcut4"},
      {name: "近一年", methods: "clickShortcut5"},
    ],

    seletedProvince: ' ',
    selectedCity: ' ',
    selectedHospital: ' ',

    startTime: null,
    endTime: null,
  }
},
 methods: {
    addBorder(){
        this.addClass(".clicked"); 
    },

    selectTab(selectedTab) {
        this.tabs.forEach(tab => {
          tab.isSelected = (tab.name == selectedTab.name);
    })    
    },

    computeTimeSlot(){

    },
   
    requestNum(){
      this.$http.get('/api/flylog-search-web/api/timeline.do', {
      params: {
        startTime: '2018-07-01 00:00:00',
        endTime: '2018-07-26 00:00:00',
        platform: 'siat',
      }
      })
      .then((response) => {
        var nums = 0;
        var lognums = response.data.logCount;
        lognums.forEach(value => nums += value);
        this.totalInput[1].privateNum = nums;
        console.log(response);
        console.log(this.totalInput[1].privateNum);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });  
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
      this.$http.get('/api/flylog-search-web/api/timeline.do', {
      params: {
        startTime: "2018-07-07 00:00:00",
        endTime: "2018-07-28 00:00:00",
        platform: 'siat',
      }
      })
      .then((response) => {
        var nums = 0;
        var lognums = response.data.logCount;
        lognums.forEach(value => nums += value);
        this.usage[2].searchNum = nums;
        console.log(this.usage[1].searchNum);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });        
    },

    clickShortcut(index){
      switch(index){
        case(0):
          const startDate0 = new Date();
          var endDate0 = new Date();
          startDate0.setHours(0);
          startDate0.setMinutes(0);
          startDate0.setSeconds(0);
          startDate0.setMilliseconds(0);
          this.startTime = startDate0;
          this.endTime = endDate0;
          console.log(this.startTime);
          console.log(this.endTime);
          break;
        case(1):
          var startDate1 = new Date();
          var endDate1 = new Date();
          endDate1.setHours(0);
          endDate1.setMinutes(0);
          endDate1.setSeconds(0);
          endDate1.setMilliseconds(0);
          startDate1.setTime(endDate1.getTime() - 3600 * 1000 * 24);
          this.startTime = startDate1.format();
          this.endTime = endDate1.format();
          console.log(this.startTime);
          console.log(this.endTime);
          break;
        case(2):
          var startDate2 = new Date();
          var endDate2 = new Date();
          startDate2.setHours(0);
          startDate2.setMinutes(0);
          startDate2.setSeconds(0);
          startDate2.setMilliseconds(0);
          startDate2.setTime(startDate2.getTime() - 7 * 3600 * 1000 * 24);
          this.startTime = startDate2;
          this.endTime = endDate2;
          console.log(startDate2);
          console.log(endDate2);
          break;
      }
    },

  },
  
  mounted() {
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
  ul {list-style-type: none;}
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