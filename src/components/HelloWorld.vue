<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            我的账户
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            退出
                        </MenuItem>
                        <!-- <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem> -->
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
                    <!-- <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb> -->
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                      <template>
                        <Row :gutter="16">
                            <Col span="6">
                                <div>使用医院数</div>
                            </Col>
                            <Col span="6">
                                <div>使用设备数</div>
                            </Col>
                            <Col span="6">
                                <div>使用用户数</div>
                            </Col>
                            <Col span="6">
                                <div>使用科室数</div>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="6">
                                <div>累计输入字数</div>
                            </Col>
                            <Col span="6">
                                <div>累计调用字数</div>
                            </Col>
                            <Col span="6">
                                <div>累计录音时间</div>
                            </Col>
                        </Row>
                      </template>
                      <DisplayCloud/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
    
</template>


  </div>
</template>

<script>
import DisplayCloud from './DisplayCloud.vue'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome'
    }
  },
  components: {
    DisplayCloud
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
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
a {
  color: #42b983;
}

.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
