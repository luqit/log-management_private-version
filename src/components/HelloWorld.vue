<template>
<div>test</div>
</template>

<script>
//import DisplayCloud from "./DisplayCloud.vue";
//import DisplayHome from "./DisplayHome.vue";

export default {
  name: "HelloWorld",
   
  components: {
    //DisplayHome,
    //DisplayUsage
  },
  mounted(){
    //this.routerSelect();
  },
  methods: {
    routerSelect(name) {
      this.$router.push(name);
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
