<template>
    <Row :gutter="16">
        <Col span="6"  v-for="( value , index) in usage" :key='index'>
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
    margin: 15px;
    width: 300px;
    }
</style>