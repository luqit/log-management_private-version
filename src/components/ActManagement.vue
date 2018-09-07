<!--account management page -->
<template>
    <div id="container">
        <div style="margin: 14px 0; height: 90px; background: white; padding-top: 13px;">
            <!-- The content of the submitted form will be binded to the variable 'logName' and 'userStatus'' -->
            <div style="margin-top: 17px;">
                <div class="item-left">登录名称</div>
                <Input v-model="logName" placeholder="请输入登录名" style="width:120px;"></Input>
                <div class="item-left">用户状态</div>
                <Select v-model="userStatus" style="width:110px">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button class="item-left" type="primary">搜索</Button>
            </div>
        </div>

        <div id="button-group">
            <Button type="primary" class="button-handle-data">新建</Button>
            <Button type="success" class="button-handle-data">停用</Button>
            <Button type="error" class="button-handle-data">启用</Button>
        </div>

        <!-- Display the searching results in the table -->
        <div id="table">
            <Table :columns="columns" :data="accountData" size="large"></Table>
            <Page :total="dataCount" show-elevator show-total :page-size="pageSize"  @on-change="changepage" class="paging"/>
        </div>  
    </div>
</template>

<script>
export default {
    name: 'ActManagment',
    data(){
    return{

        columns: [
        {
            title: '序号',
            key: 'nums',
            width: 100,
        },
        {
            title: '登陆名称',
            key: 'username'
        },
        {
            title: '所属医院',
            key: 'hospital'
        },
        {
            title: '所在科室',
            key: 'section'
        },
        {
            title: '用户来源',
            key: 'resource', 
        },
        {
            title: '用户状态',
            key: 'status', 
        },
         {
            title: '操作',
            key: 'operation', 
        },
        ],

        statusList:[],

        logName: '', //登录名
        userStatus: '', //用户状态
        dataCount: 0, // 搜索结果的数量
        pageSize: 6, // 表格每页显示的数据条数
        ajaxData: [], //搜索结果
        accountData: [],
    }
  },


  methods: {

    selectTab(selectedTab) {
        this.tabs.forEach(tab => {
          tab.isSelected = (tab.name == selectedTab.name);
        })
    },

    changepage(index) {
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.tableData = this.ajaxData.slice(_start, _end);
    },

  },


}
</script>

<style scoped>
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
    .item-left {
        display: inline-block; 
        width: 52px; 
        margin-left: 15px;
        text-align: right;
    }
    .paging{
        float: right;
        margin-top:10px;
    }
    .button-handle-data{
        margin: auto 5px;
    }
    #container{
        width: 100%;
        min-width: 1008px;
        margin-right: 66px;
        text-align: left;
    }
    #tabpane {
        width: 100%;   
        height: 62px; 
        border-bottom: 2px solid #e4e4e4; 
        font-size: 18px;
        font-weight: bold;
        color: #666666;        
    }
    #button-group {
        height: 40px; 
        width: 100%;
        display: flex; 
        align-items: center; 
        justify-content: flex-end;
        background: white;
        padding-right: 20px;
        box-shadow:0 0 10px #dfdfdf;
    }
</style>