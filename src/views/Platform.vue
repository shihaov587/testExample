<template>
    <div id="Platform">
        <el-row class="show">
            <el-col :span="7">
                <el-card >
                    <div slot="header">
                        <span>数据汇总</span>
                    </div>
                    <div class="projectDesc flex">
                        <div class="item">
                            <div>79个</div>
                            <div>项目总数</div>
                        </div>
                        <div class="item">
                            <div>79个</div>
                            <div>项目总数</div>
                        </div>
                        <div class="item">
                            <div>79个</div>
                            <div>项目总数</div>
                        </div>
                        <div class="item">
                            <div>79个</div>
                            <div>项目总数</div>
                        </div>
                        <div class="item">
                            <div>79个</div>
                            <div>项目总数</div>
                        </div>
                        <div class="item">
                            <div>79个</div>
                            <div>项目总数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="7">
                <el-card>
                    <baidu-map></baidu-map>
                </el-card>
            </el-col>
            <el-col :span="7"></el-col>
        </el-row>
    </div>
</template>

<script>
import BaiduMap from '../components/BaiduMap.vue'
export default {
    components: {BaiduMap},
    data () {
        return {

        }
    }
}
</script>

<style lang="less" scoped>
#Platform {
    .show {
    height: 100%;
    .projectDesc {
        display: flex;
        flex-wrap: wrap;
        .item {
            width: 30%;
        }
    }
}
}
</style>