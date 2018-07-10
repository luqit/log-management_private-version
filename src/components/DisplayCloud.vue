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
        <div id="location">
        <Select v-model="model2" size="large" style="width:100px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="model3" size="large" style="width:100px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="model4" size="large" style="width:100px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
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
                model4: ''
            }
        }    
    }
</script>

<style scoped>
    #location{
        position:absolute;
    }

</style>