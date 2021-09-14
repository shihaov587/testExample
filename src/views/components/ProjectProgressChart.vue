<template>
  <div class="Echarts" style="height:100%">
    <div id="progressChart" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
export default {
  name: "Echarts",
  data() {
      return {
          myChart: null
      }
  },
  methods: {
    // 初始化图表
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("progressChart"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          left: "center",
        },
        tooltip: {
          show: 'item'
        },
        legend: {
          orient: "vertical",
          x: 'right',
          y: 'bottom'
        },
        color: ['#27DC6C', '#FFC700', '#FC4343'],
        series: [
          {
            name: "项目进度",
            type: "pie",
            radius: "50%",
            data: [
              { value: 53, name: "正常" },
              { value: 9, name: "滞后" },
              { value: 3, name: "落后" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
                normal: {
                    position: 'outer',
                    formatter: '{c}'+'个'
                }
            }
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },

    // 重置图表
    chartResize () {
        this.myChart.resize()
    }
  },
  mounted() {
    this.myEcharts();
    window.addEventListener('resize', this.chartResize)
  },
};
</script>

<style>
</style>
