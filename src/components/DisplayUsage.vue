<template>
    <Row :gutter="16">
        <Col span="6"  v-for="( value , index) in usage" :key='index' style="padding: 0px 0px;">
            <Card class="usage">
                <div>{{value.name}}</div>
                <img :src='value.link'>
            </Card>
        </Col>
    </Row>    
</template>

<script>

export default {
  name: "DisplayUsage",
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
    };
  },

};
</script>

<style scoped>

  .usage{
    margin: 11px 6px;
    width: 230px;
    height: 150px;
    font-size: 16px;
  }
</style>