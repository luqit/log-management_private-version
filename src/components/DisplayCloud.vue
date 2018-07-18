<template>    
<div>
    <template>  
        <Tabs :animated="false">
            <TabPane label="公有云"></TabPane>
            <TabPane label="私有云"></TabPane>
            <TabPane label="总计"></TabPane>
        </Tabs>
    </template>

    <template>
        <div id="container">

            <div id="location">
                <span>省份</span>
                <Select v-model="model2" size="large" style="width:100px" placeholder="">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span>市区</span>
                <Select v-model="model3" size="large" style="width:100px" placeholder="">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span>单位</span>
                <Select v-model="model4" size="large" style="width:100px" placeholder="">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <br>
            </div>

            <div id="time">
                <span>时间</span>
                <DatePicker type="date" placeholder="选择日期" style="width: 100px"></DatePicker>
                <span>至</span>
                <DatePicker type="date" placeholder="选择日期" style="width: 100px"></DatePicker>
                <Button type="ghost">今日</Button>
                <Button type="ghost">昨日</Button>
                <Button type="ghost">近一日</Button>
                <Button type="ghost">近一周</Button>
                <Button type="ghost">近一月</Button>
            </div>
            <div>
                <ButtonGroup v-for="( value , index) in usage" :key='index'>
                    <Button type="ghost">{{value.name}}</Button>
                </ButtonGroup>
                <Button type="ghost">搜索</Button>
            </div>

        </div>
    </template>

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
            }
        }    
    }
</script>

<style scoped>
    /* #container {
        position: absolute;
    }  */

    #time {    
        margin: 30px;    
    }


</style>