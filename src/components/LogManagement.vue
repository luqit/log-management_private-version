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
                    <Button type="ghost" style="margin-left: 15px;">导出</Button>
                </div>
            </div>
            <!-- 搜索结果 -->
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
        }
      ],

        loading: true, //表格loading控制
        tableData: [], //表格中显示数据
        dataCount: 0,  //数据总条数
        pageSize: 10,  //每页数据条数
        ajaxData: [],  //日志搜索结果
        macValue: "",  //MAC地址
        
        startTimeOptions: {}, //开始日期设置
        endTimeOptions: {},   //结束日期设置
        startTime: "",        //开始时间
        endTime: ""           //结束时间
    };
  },

  methods: {
    /**
     * 搜索结果
     */
    searchDisplay() {
      this.endTime = moment(this.endTime).endOf("day").format("YYYY-MM-DD HH:mm:ss");
      this.requestTableData(this.startTime, this.endTime, this.macValue);
    },
    /**
     * 从接口中获取对应开始时间，结束时间，MAC地址输入内容的日志
     */
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
     * 实现分页
     */
    changepage(index) {
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.tableData = this.ajaxData.slice(_start, _end);
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
    ul,li {
        margin: 0;
        padding: 0;
        text-align: center;
    }
    .ivu-table td {
        height: 60px;
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
    #location, #time {
        margin-top: 10px;
        text-align: left;
    }
    #time {
        margin: 10px 0px;
        margin-bottom: 22px;
    }   
</style>