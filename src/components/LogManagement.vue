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
        
                <div id="location">
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
                    <DatePicker class="date-picker" type="date" placeholder="选择日期"></DatePicker>
                    <div class="item-left">至</div>
                    <DatePicker class="date-picker" type="date" placeholder="选择日期"></DatePicker>
                    <Input 
                        v-model="macValue" 
                        placeholder="输入MAC等" 
                        style="width: 100px; margin-left: 56px;">
                    </Input>
                    <Button type="primary" style="margin-left: 15px;">搜索</Button>
                </div>
            </div>

            <div id="table">
                <Table 
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

export default {
    name: 'LogManagement',
    data(){
    return{
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

        province: '',
        city: '',
        hospital: '',
        macValue: '',

        columns1: [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '序号',
            key: 'nums',
            width: 100,
        },
        {
            title: '医院',
            key: 'hospital'
        },
        {
            title: '科室',
            key: 'section'
        },
        {
            title: 'MAC地址',
            key: 'address'
        },
        {
            title: '时间',
            key: 'date', 
        },
        {
            title: '转录内容',
            key: 'content',
        }
        ],

        tableData: [
        {
            hospital: 'John Brown',
            section: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
        },
        {
            hospital: 'Jim Green',
            section: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
        },
        {
            hospital: 'Joe Black',
            section: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
        },
        {
            hospital: 'Jon Snow',
            section: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
        },
        {
            hospital: 'Jon',
            section: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
        },
        {
            hospital: 'JSnow',
            section: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
        },
        {
            hospital: 'Snow',
            section: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
        },
        ],
        
        datacount: 0,
        pageSize: 5,
        ajaxData: [],
        
        
    }  
  },

    methods: {
        /**
         * When clicking the tab,
         * add the bottom border
         */
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isSelected = (tab.name == selectedTab.name);
                console.log(tab.isSelected);
            })   
        },

        handleListApproveHistory(){ 
            // 保存取到的所有数据
            this.ajaxData = this.tableData
            this.dataCount = this.tableData.length;
            // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
            if(this.tableData.length < this.pageSize){
                this.tableData = this.ajaxData;
            }
            else{
                this.tableData = this.ajaxData.slice(0,this.pageSize);
            }
        },

        changepage(index){
            var _start = ( index - 1 ) * this.pageSize;
            var _end = index * this.pageSize;
            this.tableData = this.ajaxData.slice(_start,_end);
        }
    },
    
    created(){
            this.handleListApproveHistory();
    },
}
</script>


<style scoped>
    ul {list-style-type: none;}
    ul, li { 
        margin:0;
        padding: 0;
        text-align: center;
    }
    .ivu-table td{
        height: 60px;
    }
    .tabs>li {
        float: left;
        width: 33.333333%;
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
      /* margin-left: 46px; */
      width: 100px;
    }
    .item-left {
        display: inline-block; 
        width: 52px; 
        text-align: right;
    }
    .paging{
        float: right;
        margin-top:10px;
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
        /* background: white; */
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