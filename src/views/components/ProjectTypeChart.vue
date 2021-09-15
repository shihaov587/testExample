<template>
  <div class="Echarts" style="height:100%">
    <div id="typeChart" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import { getProjectTypeSummaryData } from '@/api/regulatory/screen.js'
export default {
  data() {
    return {
      myChart: null,
      allData: {}
    }
  },
  methods: {
    // 初始化图表
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("typeChart"));

      // 指定图表的配置项和数据
      var option = {
        grid: {
          x: 1,
          y: 10,
          x2: 25,
          y2: 10,
          containLabel: true
        },
        xAxis: {
          type: 'value',

        },
        yAxis: {
          type: 'category',
          data: this.allData.y
          // data: ['景观绿化', '教学科研建筑', '场馆建筑', '住宅建筑']
        },
        tooltip: {
          // 当鼠标移入axis(坐标轴)时展示 底层的背景色
          trigger: 'axis',
          axisPointer: {
            // 展示的类型是线条类型
            type: 'line',
            lineStyle: {
              color: this.axisPointerColor,
            },
            // 相等于 z-index 将层级调低
            z: 0,
          },
        },
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              position: 'right',
              formatter: '{c}个'
            },
            // data: [17, 14, 9, 13],
            data: this.allData.x,
            itemStyle: {
              normal: {
                barBorderRadius: [0, 10, 10, 0],
                color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: '#A300FF'
                  },
                  {
                    offset: 1,
                    color: '#FF6296 '
                  },
                ]),
              }
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },

    // 重置图表
    chartResize() {
      this.myChart.resize()
    },

    // 获取数据
    getData() {
      getProjectTypeSummaryData({}).then(res => {
        if(res) {
          this.allData.y = res.data.obj.map(item => {return item.projectType})
          this.allData.x = res.data.obj.map(item => {return item.projectNum})
          this.myEcharts();
        }
      })
    }
  },
  mounted() {
    this.getData()
    
    window.addEventListener('resize', this.chartResize)
  },
}
</script>

<style>
</style>