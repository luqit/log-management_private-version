<template>    
    <div id="container">
        <div id="tabpane">
            <ul class="tabs">
            <li v-for="(tab, index) in tabs" :key="index">
            <div class="content" @click="selectTab(tab)" :class="{'is-active': tab.isSelected}">{{tab.name}}</div>
            </li>
            </ul>
            <!-- <ul class="tabs" style="height: ;">
            <li><div class="content">公有云</div></li>
            <li><div class="content">私有云</div></li>
            <li><div class="content">总计</div></li>
            </ul> -->
        </div>
    <div>
            <div id="location">
                <div class="item-left">省份</div>
                <Select v-model="model2" size="large" style="width:100px" placeholder="">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div class="item-left">市区</div>
                <Select v-model="model3" size="large" style="width:100px" placeholder="">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div class="item-left">单位</div>
                <Select v-model="model4" size="large" style="width:100px" placeholder="">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <br>
            </div>

            <div id="time">
                <div class="item-left" >时间</div>
                <DatePicker class="date-picker" type="date" placeholder="选择日期"></DatePicker>
                <div class="item-left">至</div>
                <DatePicker class="date-picker" type="date" placeholder="选择日期"></DatePicker>
                <div style="display: inline-block;">
                    <Button type="ghost">今日</Button>
                    <Button type="ghost">昨日</Button>
                    <Button type="ghost">近一日</Button>
                    <Button type="ghost">近一周</Button>
                    <Button type="ghost">近一月</Button>
                </div>
            </div>
            <div>
                <ButtonGroup v-for="( value , index) in usage" :key='index'>
                    <Button type="ghost">{{value.name}}</Button>
                </ButtonGroup>
                <Button type="ghost" style="margin-left: 10px;">搜索</Button>
            </div>          
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DisplayCloud',
                data () {
            return {
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model2: '',
                model3: '',
                model4: '',

                usage: [
                {
                name: "使用医院数",
                },
                {
                name: "使用设备数",
                //link: "/static/icon2.png"
                },
                {
                name: "使用用户数",
                //link: "/static/icon3.png"
                },
                {
                name: "使用科室数",
                //link: "/static/icon4.png"
                }
                ],

                tabs: [
                    {name: "公有云", isSelected: true,},
                    {name: "私有云", isSelected: false,},
                    {name: "总计", isSelected: false,},
                    ],
                // currentTab: "1",
            }
        }, 
        computed: {
            // currentTabComponent: function () {}
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
        width: 33.333333%
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
    .date-picker {
        /* margin-left: 46px; */
        width: 100px;
    }
    .item-left {
        display: inline-block; 
        width: 52px; 
        text-align: right;
    }
    #tabpane {
        /* display: box; */
        width: 100%;   
        height: 62px; 
        border-bottom: 2px solid #e4e4e4;   
        margin-bottom: 
    }
    #container{
        background: white;
        /* width: 90.6%; */
        min-width: 1008px;
        margin-right: 66px;
        height: 204px;
        }
    #location, #time {
        margin-top: 10px;
        text-align: left;    
    }

    #time {    
        margin: 10px 0px;    
    }


</style>