<template>
  <div id="container">
      <div id="tabpane">
        <ul class="tabs">
        <li v-for="(tab, index) in tabs" :key="index">
        <div class="content" @click="selectTab(tab)" :class="{'is-active': tab.isSelected}">{{tab.name}}</div>
        </li>
        </ul>    
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
  ul {list-style-type: none;}
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
      height: 204px;
  }
</style>