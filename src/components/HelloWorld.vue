<template>
  <div class="hello">

    <div class="layout">
        <Layout>
            <Header style="height: 70px; background: #19385f;">
                <Menu mode="horizontal" theme="dark" active-name="1" style="background: #19385f;">
                    <div class="layout-logo"><img src="@/assets/icon-iflytek.png"></div>
                    <div class="layout-nav">
                        <MenuItem name="1" style="border-right: 1px solid white; height: 40px; top: 15px; line-height: 45px; color: white; display: flex;">
                          <img src="@/assets/user-normal.png">
                          <span style="margin-left: 10px">我的账户</span>
                        </MenuItem>
                        <MenuItem name="2" style="height: 40px; top: 15px; line-height: 45px; padding-left: 0px;">
                            退出
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider width="260px" hide-trigger :style="{background: '#e8f4fe', minWidth: '260px'}">
                    <Menu id="menu" active-name="1-2" theme="light" width="auto" :open-names="['1']" @on-select="routerSelect">             
                        <!-- <Submenu name="1">
                          <template slot="title">  
                              <Icon type="ios-navigate"></Icon>
                              首页
                          </template>
                          <MenuItem class="submenu" name="1-1" >使用总量统计</MenuItem>
                          <MenuItem name="1-2" class="submenu">医院使用统计</MenuItem>
                          <MenuItem name="1-3" class="submenu">科室使用统计</MenuItem>
                        </Submenu>
                        <MenuItem name="log">
                          <Icon type="settings"></Icon>
                          日志管理
                        </MenuItem>
                        <MenuItem name="account">
                          <Icon type="settings"></Icon>
                          账号管理
                        </MenuItem> -->
                      <div class="navs">
                        <img src="@/assets/icon1-pressed.png">
                        <div class="menu-item">首页</div>
                        <Icon type="chevron-down"/>
                      </div>
                      <div id="subnavs">
                        <div class="subnav" v-for="(sub, index) in submenu" :key='index'>
                          <img :src='sub.link'>
                          <div class="menu-item">{{sub.name}}</div>   
                          <Icon style="visibility: hidden;" type="chevron-right"/>                      
                        </div>
                      </div>
                      <div class="navs">
                        <img src="@/assets/icon5-pressed.png">
                        <div class="menu-item">日志管理</div>
                         <Icon type="chevron-right"/>
                      </div>
                      <div class="navs">
                        <img src="@/assets/icon6-hot.png">
                        <div class="menu-item">账号管理</div>
                         <Icon type="chevron-right"/>
                      </div>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 0'}">
                    <Content :style="{padding: '14px 66px 0px 40px', minHeight: '1000px', minWidth: '1106px', background: '#e8f4fe'}">
                      <template>
                        <Row :gutter="16">
                          <Col span="6"  v-for="( value , index) in usage" :key='index' style="padding: 0px 0px;">
                              <div class="card">
                                  <div>{{value.name}}</div>
                                  <div><img :src='value.link'></div>
                                  <div class="display-num">{{value.num}}</div>
                              </div>
                          </Col>
                        </Row>
                        <Row :gutter="16">
                          <Col span="6"  v-for="( value , index) in totalInput" :key='index' style="padding: 0px 0px;">
                              <div class="card">
                                  <div>{{value.name}}</div>
                                  <div><img :src='value.link'></div>
                                  <div class="display-num">{{value.num}}</div>
                              </div>
                          </Col>
                        </Row>
                        <br>
                      </template>
                      <DisplayCloud/>
                      <Row :gutter="16">
                        <Col span="6"  v-for="( value , index) in usage" :key='index' style="padding: 0px 0px;">
                            <div class="card">
                                <div>{{value.name}}</div>
                                <div><img :src='value.link'></div>
                                <div class="display-num">{{value.num}}</div>
                            </div>
                        </Col>
                      </Row>    
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</div>
</template>

<script>
import DisplayCloud from "./DisplayCloud.vue";
import DisplayUsage from "./DisplayUsage.vue";

export default {
  name: "HelloWorld",
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
          link: "/static/icon2.png",
          num: 7820,
        },
        {
          name: "使用用户数",
          link: "/static/icon3.png",
          num: 15220,
        },
        {
          name: "使用科室数",
          link: "/static/icon4.png",
          num: 320,
        }
      ],

      totalInput: [
        {
          name: "累计输入字数",
          link: "/static/icon5.png",
          num: 3535,
        },
        {
          name: "累计调用字数",
          link: "/static/icon6.png",
          num: 15220,
        },
        {
          name: "累计录音时间",
          link: "/static/icon7.png",
          num: 320,
        }
      ],

      submenu: [
        {
          name: "输入总量统计",
          link: require("@/assets/icon2-normal.png")
        },
        {
          name: "医院使用统计",
          link: require("@/assets/icon3-normal.png")
        },
        {
          name: "科室使用统计",
          link: require("@/assets/icon4-normal.png")
        }
      ]
    };
  },
  components: {
    DisplayCloud,
    DisplayUsage
  },
  mounted(){
    //this.routerSelect();
  },
  methods: {
    routerSelect(name) {
      this.$router.push({path:name});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.hello{
  min-width: 1366px;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  /* position: relative; */
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 200px;
  height: 40px;
  /* background: #5b6270; */
  border-radius: 3px;
  float: left;
  position: relative;
  top: 11px;
  /* left: 20px; */
}
.layout-nav {
  width: 380px;
  height: 70px;
  float: right;
}
.card {
  margin: 11px 6px;
  width: 230px;
  height: 150px;
  font-size: 14px;
  color: #828282;
  background-color: white;
  /* -moz-box-shadow:0 0 10px rgb(238, 238, 238);
  -webkit-box-shadow:0 0 10px #5f5f5f; */
  box-shadow:0 0 10px #dfdfdf;  
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.navs, .subnav {
  height: 68px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 18px; 
}
.menu-item{
  width: 108px;
}
.navs {
  font-weight: bold;
  color: #19385f;
  box-shadow:0 1px 0px #e8effc;
}
.subnav {
  background-color: #f7faff;
  color: #95a0aa;
  box-shadow:1px 1px 0px #e8effc;
}
.display-num {
  font-size: 22px;
  font-weight: bold;
  color: #666666;
}
/* .submenu {
  font-size: 16px;
} */
#menu{
  height: 408px; 
  width:260px; 
  font-size: 16px; 
  display: flex; 
  flex-direction: column;
}
#subnavs {
  box-shadow:0 0 1px #e8effc; 
  position: relative;
  z-index: -1;
}
</style>
