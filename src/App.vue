<template>
	<div class="layout">
		<Layout>
			<Header style="height: 70px; background: #19385f;">
				<Menu mode="horizontal" theme="dark" active-name="1" style="background: #19385f;">
					<div class="layout-logo">
						<img src="@/assets/icon-iflytek.png">
					</div>
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
					<Menu id="menu" active-name="1-2" theme="light" width="auto" :open-names="['1']">             
						<div class="navs" id="home" @click="routerSelect('/')">
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
						<div class="navs" name="log" @click="routerSelect('/log')">
							<img src="@/assets/icon5-pressed.png">
							<div class="menu-item">日志管理</div>
								<Icon type="chevron-right"/>
						</div>
						<div class="navs" id="account" @click="routerSelect('/account')">
							<img src="@/assets/icon6-hot.png">
							<div class="menu-item">账号管理</div>
								<Icon type="chevron-right"/>
						</div>
					</Menu>
				</Sider>
				<Layout :style="{padding: '0 0'}">
					<Content :style="{padding: '0px 66px 0px 40px', minHeight: '2000px', minWidth: '1106px', background: '#e8f4fe'}">
						<router-view/>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	</div>	
</template>

<script>
export default {
	name: 'App',
	data(){
		return{
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
		}
	},

	methods: {
		/**
		 * 用路由控制导航栏里的页面跳转
		 */
		routerSelect(name) {
			this.$router.push(name);
		},

	}
}
</script>

<style>
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
		border-radius: 4px;
		overflow: hidden;
		text-align: center;
		color: #2c3e50;
		min-width: 1366px;
	}
	.layout-logo {
		width: 200px;
		height: 40px;
		border-radius: 3px;
		float: left;
		position: relative;
		top: 11px;
	}
	.layout-nav {
		width: 235px;
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
	.ivu-table-large th{
		height: 54px;
		background-color: #fafcff;
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
