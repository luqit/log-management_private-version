<template>
  <div id="container">
      <div id="tabpane">
        <ul class="tabs">
        <li v-for="(tab, index) in tabs" :key="index">
        <div class="content" @click="selectTab(tab)" :class="{'is-active': tab.isSelected}">{{tab.name}}</div>
        </li>
        </ul>    
      </div>
      <div style="margin-top: 15px;">
        <div class="item-left">登录名称</div>
        <Input v-model="logName" placeholder="请输入登录名" style="width:120px;"></Input>
        <div class="item-left">用户状态</div>
        <Select v-model="model1" style="width:110px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Button class="item-left" type="primary">搜索</Button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ActManagment',
  data(){
    return{
      tabs: [
      {name: "公有云", isSelected: true,},
      {name: "私有云", isSelected: false,},
      {name: "总计", isSelected: false,},
      ],
      logName: '',
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
    
    }    
  }
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
        height: 130px;
        text-align: left;
    }
</style>