<template>
  <div class="hello">
    <template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"><img src="@/assets/icon-iflytek.png"></div>
                    <div class="layout-nav">
                        <MenuItem name="1" style="border-right: 1px solid white; height: 40px; top: 10px; line-height: 45px;">
                            <Icon type="ios-navigate"></Icon>
                            我的账户
                        </MenuItem>
                        <MenuItem name="2" style="height: 40px; top: 10px; line-height: 45px;">
                            <Icon type="ios-keypad"></Icon>
                            退出
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                          <template slot="title">
                              <Icon type="ios-navigate"></Icon>
                              首页
                          </template>
                          <MenuItem name="1-1">使用总量统计</MenuItem>
                          <MenuItem name="1-2">医院使用统计</MenuItem>
                          <MenuItem name="1-3">科室使用统计</MenuItem>
                        </Submenu>
                        <!-- <MenuItem name="2">使用总量统计</MenuItem>
                        <MenuItem name="3">医院使用统计</MenuItem> -->
                        <Submenu name="2">
                          <template slot="title">
                              <Icon type="ios-keypad"></Icon>
                              日志管理
                          </template>
                        </Submenu>
                        <Submenu name="3">
                          <template slot="title">
                              <Icon type="ios-analytics"></Icon>
                              账号管理
                          </template>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Content :style="{padding: '24px', minHeight: '1000px', background: '#fff'}">
                      <template>
                        <Row :gutter="16">
                          <Col span="6"  v-for="( value , index) in usage" :key='index'>
                              <Card class="card">
                                  <div>{{value.name}}</div>
                                  <img :src='value.link'>
                              </Card>
                          </Col>
                        </Row>
                        <Row :gutter="16">
                          <Col span="6"  v-for="( value , index) in totalInput" :key='index'>
                              <Card class="card">
                                  <div>{{value.name}}</div>
                                  <img :src=value.link>
                              </Card>
                          </Col>
                        </Row>
                        <br>
                      </template>
                      <DisplayCloud/>
                      <DisplayUsage/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
    
</template>


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
          link: require('@/assets/icon1.png')
        },
        {
          name: "使用设备数",
          link: "/static/icon2.png"
        },
        {
          name: "使用用户数",
          link: "/static/icon3.png"
        },
        {
          name: "使用科室数",
          link: "/static/icon4.png"
        }
      ],

      totalInput: [
        {
          name: "累计输入字数",
          link: "/static/icon5.png"
        },
        {
          name: "累计调用字数",
          link: "/static/icon6.png"
        },
        {
          name: "累计录音时间",
          link: "/static/icon7.png"
        }
      ]
    };
  },
  components: {
    DisplayCloud,
    DisplayUsage,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,h2 {
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
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 10px;
  right: 20px;
}
.card{
  margin: 15px;
  width: 300px;
}
</style>
