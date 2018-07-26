<template>
  <div>
      <div style="display: flex; justify-content: space-between;">
        <div class="card" v-for="( value, index) in usage" :key='index' style="padding: 0px 0px;">
          <div>{{value.name}}</div>
          <div><img :src='value.link'></div>
          <div class="display-num">{{value.num}}</div>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <div class="card" v-for="( value, index) in totalInput" :key='index' style="padding: 0px 0px;">
          <div>{{value.name}}</div>
          <div><img :src='value.link'></div>
          <div class="display-num">{{value.num}}</div>
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
          <Select v-model="model2" size="large" style="width:100px" placeholder="">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <div class="item-left">市区</div>
          <Select v-model="model3" size="large" style="width:100px" placeholder="">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <div class="item-left">单位</div>
          <Select v-model="model4" size="large" style="width:100px" placeholder="">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <br>
      </div>
        <div id="time">
            <div class="item-left" >时间</div>
            <DatePicker class="date-picker" type="date" placeholder="选择日期"></DatePicker>
            <div class="item-left">至</div>
            <DatePicker class="date-picker" type="date" placeholder="选择日期"></DatePicker>
            <div style="display: inline-block; margin-left: 56px;">
                <Button type="ghost">今日</Button>
                <Button type="ghost">昨日</Button>
                <Button type="ghost">近一日</Button>
                <Button type="ghost">近一周</Button>
                <Button type="ghost">近一月</Button>
            </div>
        </div>
        <div>
            <ButtonGroup v-for="( value , index) in usage" :key='index'>
                <Button type="ghost">{{value.name}}</Button>
            </ButtonGroup>
            <Button type="primary" style="margin-left: 10px;">搜索</Button>
        </div>          
        </div>
    </div>
      <div style="display: flex; justify-content: space-between;">
        <div class="card" v-for="( value, index) in usage" :key='index' style="padding: 0px 0px;">
          <div>{{value.name}}</div>
          <div><img :src='value.link'></div>
          <div class="display-num">{{value.num}}</div>
        </div>
      </div>
  </div> 
</template>

<script>

export default {
  name: 'DisplayHome',
  data() {
  return {
    msg: "Welcome",

    usage: [
      {
        name: "使用医院数",
        link: require("@/assets/icon1.png"),
        num: 3535,
      },
      {
        name: "使用设备数",
        link: require("@/assets/icon2.png"),
        num: 7820,
      },
      {
        name: "使用用户数",
        link: require("@/assets/icon3.png"),
        num: 15220,
      },
      {
        name: "使用科室数",
        link: require("@/assets/icon4.png"),
        num: 320,
      }
    ],

    totalInput: [
      {
        name: "累计输入字数",
        link:require("@/assets/icon5.png"),
        num: 3535,
      },
      {
        name: "累计调用次数",
        link: require("@/assets/icon6.png"),
        num: null,
      },
      {
        name: "累计录音时间",
        link: require("@/assets/icon7.png"),
        num: 320,
      }
    ],
    cityList: [
      {
          value: 'New York',
          label: 'New York'
      },
      {
          value: 'London',
          label: 'London'
      },
      {
          value: 'Sydney',
          label: 'Sydney'
      },
      {
          value: 'Ottawa',
          label: 'Ottawa'
      },
      {
          value: 'Paris',
          label: 'Paris'
      },
      {
          value: 'Canberra',
          label: 'Canberra'
      }
    ],
    tabs: [
      {name: "公有云", isSelected: true,},
      {name: "私有云", isSelected: false,},
      {name: "总计", isSelected: false,},
      ],
    model2: null,
    model3: '',
    model4: '',
  }
},
 methods: {
    addBorder(){
        this.addClass(".clicked"); 
    },
    selectTab(selectedTab) {
        this.tabs.forEach(tab => {
          tab.isSelected = (tab.name == selectedTab.name);
          console.log(tab.isSelected);
    })    
    },

    requestNum(){
      this.$http.get('/api/flylog-search-web/api/timeline.do', {
      params: {
        startTime: '2018-07-01 00:00:00',
        endTime: '2018-07-26 00:00:00',
        platform: 'siat'
      }
      })
      .then((response) => {
        var nums = 0;
        var lognums = response.data.logCount;
        lognums.forEach(value => nums += value);
        this.totalInput[1].num = nums;
        console.log(this.totalInput[1].num);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });  
    }
  },
  
  mounted() {
    this.requestNum();
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