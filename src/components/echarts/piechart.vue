<template>
  <div class="Echarts">
    <div id="typeChart" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
export default {
  name: "Echarts",
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("typeChart"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          left: "center",
        },
        tooltip: {
          trigger: "item.value",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "访问来源",
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
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
    this.myEcharts();
  },
};
</script>

<style>
</style>
