<template>
  <div class="Echarts" style="height:100%">
    <div id="distributeChart" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import { getProjectAreaSummaryData } from '@/api/regulatory/screen.js'
export default {
  data() {
    return {
      myChart: null,
      allData: null,
    }
  },
  methods: {
    // 初始化图表
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("distributeChart"));
      const centerArr = [
        ["11%", "30%"],
        ["37%", "30%"],
        ["63%", "30%"],
        ["89%", "30%"],
        ["11%", "75%"],
        ["37%", "75%"],
        ["63%", "75%"],
        ["89%", "75%"],
      ];
      const colorArr = [
        ["#4FF778", "#0BA82C"],
        ["#E5DD45", "#E8B11C"],
        ["#E8821C", "#E55445"],
        ["#5052EE", "#AB6EE5"],
        ["#23E5E5", "#2E72BF"],
      ];
      
      const showData = this.allData
      const seriesArr = showData.map((item,index) => {
        return {
          type: 'pie',
          center: centerArr[index],
          hoverAnimation: false,
          radius: ['20%','25%'],
          labelLine: {
            show: false,
          },
          label: {
            position: "center",
            color: colorArr[index][0],
            formatter: item.projectNum + '\n' + item.liShuJieDao
          },
          data: [
            {
              value: 223,
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: colorArr[index][0],
                  },
                  {
                    offset: 1,
                    color: colorArr[index][1],
                  },
                ]),
              },
            },
            {
              value: 233,
              itemStyle: {
                color: "#D8D8D8",
              }
            }
          ]
        }
      })
      // 指定图表的配置项和数据
      const dataOption = {
        series: seriesArr,
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(dataOption);
    },

    // 重置图表
    chartResize() {
      this.myChart.resize()
    },
    // 获取数据
    getData() {
      getProjectAreaSummaryData({}).then(res => {
        if(res) {
          console.log(res);
          this.allData = res.data.obj
          this.myEcharts();
        }
      })
    }
  },
  mounted() {
    this.getData();
    
    
    window.addEventListener('resize', this.chartResize)
  },
}
</script>

<style>
</style>