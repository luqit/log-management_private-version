<template>
    <div>
        <div id="container">

            <div style="background: white; margin: 14px 0; height: 160px;">
                <div id="tabpane">
                    <ul class="tabs">
                        <li v-for="(tab, index) in tabs" :key="index">
                            <div 
                                class="content" 
                                @click="selectTab(tab)" 
                                :class="{'is-active': tab.isSelected}">
                                {{ tab.name }}
                            </div>
                        </li>
                    </ul>    
                </div>
        
                <div id="location" v-if="tabs[0].isSelected">
                    <div class="item-left">省份</div>
                    <Select v-model="province" size="large" style="width:100px" placeholder="">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <div class="item-left">市区</div>
                    <Select v-model="city" size="large" style="width:100px" placeholder="">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <div class="item-left">单位</div>
                    <Select v-model="hospital" size="large" style="width:100px" placeholder="">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Button type="primary" style="margin-left: 15px;">导入</Button>
                    <br>
                </div>

                <div id="time">
                    <div class="item-left" >时间</div>
                    <DatePicker v-model="startTime" class="date-picker" type="date" placeholder="选择日期"></DatePicker>
                    <div class="item-left">至</div>
                    <DatePicker v-model="endTime" class="date-picker" type="date" placeholder="选择日期"></DatePicker>
                    <Input 
                        v-model="macValue" 
                        placeholder="输入MAC等" 
                        style="width: 100px; margin-left: 56px;">
                    </Input>
                    <Button type="primary" style="margin-left: 15px;" @click="searchDisplay()">搜索</Button>
                </div>
            </div>

            <div id="table">
                <Table 
                    :loading="loading" 
                    :columns="columns1" 
                    :data="tableData" 
                    size="large">
                </Table>

                <Page 
                    :total="dataCount" 
                    show-elevator 
                    show-total 
                    :page-size="pageSize"  
                    @on-change="changepage" 
                    class="paging">
                </Page>
            </div>
    
         </div>
    </div>
</template>

<script>
var moment = require("moment");
export default {
  name: "LogManagement",
  data() {
    return {
      tabs: [
        {
          name: "公有云",
          isSelected: true
        },
        {
          name: "私有云",
          isSelected: false
        },
        {
          name: "总计",
          isSelected: false
        }
      ],

      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],

      province: "",
      city: "",
      hospital: "",
      hospitalInTable:     
      {
          title: "医院",
          key: "hospital"
      },

      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          key: "nums",
          width: 100
        },
        {
          title: "医院",
          key: "hospital"
        },
        {
          title: "科室",
          key: "section"
        },
        {
          title: "MAC地址",
          key: "address"
        },
        {
          title: "时间",
          key: "date"
        },
        {
          title: "转录内容",
          key: "content"
        }
      ],

        loading: true,
        tableData: [],
        dataCount: 0,
        pageSize: 6,
        ajaxData: [],
        macValue: "F0-03-8C-35-D8-B1",
        startTime: "2018-07-01 00:00:00",
        endTime: "2018-07-27 00:00:00"
    };
  },

  methods: {
    /**
     * When clicking the tab,
     * add the bottom border
     */
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isSelected = tab.name == selectedTab.name;
      });
      if(this.tabs[1].isSelected){ 
        this.columns1.splice(2, 1);
      }
      if(this.tabs[0].isSelected || this.tabs[2].isSelected){ 
        this.columns1.splice(2, 0, this.hospitalInTable); 
      }
    },

    searchDisplay() {
      this.requestTableData(this.startTime, this.endTime, this.macValue);
    },

    requestTableData(st, et, uid) {

      this.$http
        .get("/new/flylog-search-web/customLogSearch/getWordCount.do", {
          params: {
            startTime: moment(st).format("YYYY-MM-DD HH:mm:ss"),
            endTime: moment(et).format("YYYY-MM-DD HH:mm:ss"),
            platform: "siat",
            Uid: uid
          }
        })
        .then(response => {
          let res = response.data.data;
          let allData = [];
          for (var i in res.medicals) {
            allData.push({
              nums: parseInt(i) + 1,
              hospital: "-",
              section: res.Section,
              address: this.macValue,
              date: res.medicals[i].timestamp,
              content: res.medicals[i].result,
              section: res.medicals[i].section
            });

            this.ajaxData = allData;
            this.dataCount = allData.length;
            if (this.ajaxData.length < this.pageSize) {
              this.tableData = this.ajaxData;
            } else {
              this.tableData = this.ajaxData.slice(0, this.pageSize);
            }
          }
            this.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(function() {
  
        });
    },

    changepage(index) {
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.tableData = this.ajaxData.slice(_start, _end);
    }
  },

  mounted() {
    this.requestTableData(this.startTime, this.endTime, this.macValue);
  }
};
</script>


<style scoped>
    ul {
        list-style-type: none;
    }
    ul,
    li {
        margin: 0;
        padding: 0;
        text-align: center;
    }
    .ivu-table td {
        height: 60px;
    }
    .tabs > li {
        float: left;
        width: 33.333333%;
    }
    .tabs > li > .content {
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
    .paging {
        float: right;
        margin-top: 10px;
    }

    #tabpane {
        width: 100%;
        height: 62px;
        border-bottom: 2px solid #e4e4e4;
        font-size: 18px;
        font-weight: bold;
        color: #666666;
    }
    #container {
        width: 100%;
        min-width: 1008px;
        margin-right: 66px;
        height: 160px;
    }
    #location,
    #time {
        margin-top: 10px;
        text-align: left;
    }

    #time {
        margin: 10px 0px;
        margin-bottom: 22px;
    }   
</style>