<template>
    <div>
        <div id="container">
            <div style="background: white; margin: 14px 0; height: 90px; padding-top: 15px;">

                <div id="time">
                    <div class="item-left" >时间</div>
                    <DatePicker 
                      v-model="startTime" 
                      class="date-picker" 
                      type="date" 
                      placeholder="选择日期"		
                      :options="startTimeOptions"
					            @on-change="startTimeChange">
                    </DatePicker>

                    <div class="item-left">至</div>
                    <DatePicker 
                      v-model="endTime" 
                      class="date-picker" 
                      type="date" 
                      placeholder="选择日期" 		
                      :options="startTimeOptions"
					            @on-change="startTimeChange">
                    </DatePicker>
                    <Input 
                        v-model="macValue" 
                        placeholder="输入MAC等" 
                        style="width: 130px; margin-left: 56px;">
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
      province: "",
      city: "",
      hospital: "",

      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          key: "nums",
          width: 70
        },
        {
          title: "科室",
          key: "section",
          width: 90
        },
        {
          title: "MAC地址",
          key: "address",
          width: 170
       
        },
        {
          title: "时间",
          key: "date",
          width: 200
        },
        {
          title: "转录内容",
          key: "content",
          // width: 400
        }
      ],

        loading: true,
        tableData: [],
        dataCount: 0,
        pageSize: 10,
        ajaxData: [],
        macValue: "",
        
        startTimeOptions: {}, //开始日期设置
        endTimeOptions: {}, //结束日期设置
        startTime: "",
        endTime: ""
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
    },

    searchDisplay() {
      this.endTime = moment(this.endTime).endOf("day").format("YYYY-MM-DD HH:mm:ss");
      this.requestTableData(this.startTime, this.endTime, this.macValue);
    },

    requestTableData(st, et, uid) {
      this.loading = true;
      this.$http.get(process.env.API_HOST2+"flylog-search-web/customLogSearch/getWordCount.do", {
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
              address: res.medicals[i].uid,
              date: res.medicals[i].timestamp,
              content: res.medicals[i].result,
              section: res.medicals[i].section
            });
            }
            this.ajaxData = allData;
            this.dataCount = allData.length;
            if (this.ajaxData.length < this.pageSize) {
              this.tableData = this.ajaxData;
            } else {
              this.tableData = this.ajaxData.slice(0, this.pageSize);
            }

          this.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(function() {
  
        });
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
		},  

    changepage(index) {
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.tableData = this.ajaxData.slice(_start, _end);
    },

    startTimeChange(e) { //设置开始时间
      this.endTimeOptions = {
        disabledDate(endTime) {
          return moment(endTime).valueOf() < moment(e).valueOf() || endTime > Date.now()
        }
      }
        },
    endTimeChange(e) { //设置结束时间
      this.startTimeOptions = {
        disabledDate(startTime) {
          return startTime > new Date(e) || startTime > Date.now()
        }
      }
    },
  },

  created(){
    this.computeTimeSlot(30);	
    this.startTimeChange(this.startTime);
    this.endTimeChange(this.endTime);	
  },

  mounted() {
    this.searchDisplay();
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
        width: 110px;
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