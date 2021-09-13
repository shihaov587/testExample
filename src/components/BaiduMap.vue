<template>
  <div id="baiduMap">
    <baidu-map class="map" center="南京" :scroll-wheel-zoom="true">
      <div v-for="(marker, index) in markers" :key="index">
        <bm-marker
          :position="{ lng: marker.lng, lat: marker.lat }"
          animation="BMAP_ANIMATION_BOUNCE"
          @click="infoWindowOpen(marker)"
          color="blue"
        >
          <bm-info-window
            title="测试标题"
            :position="{ lng: marker.lng, lat: marker.lat }"
            @close="infoWindowClose(marker)"
            :show="marker.showFlag"
          >
            <p>这是测试数据</p>
          </bm-info-window>
        </bm-marker>
      </div>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markers: [
        {
          lng: 118.812367,
          lat: 31.970143,
          showFlag: false,
        },
        {
          lng: 118.80,
          lat: 32.090143,
          showFlag: false,
        },
        {
          lng: 118.804341,
          lat: 31.975024,
          showFlag: false,
        },
        {
          lng: 118.960901,
          lat: 32.152949,
          showFlag: false,
        },
        {
          lng: 118.750965,
          lat: 31.988061,
          showFlag: false,
        }
      ],
    };
  },
  methods: {
    // 显示标记详情
    infoWindowOpen(marker) {
      marker.showFlag = !marker.showFlag
    },

    // 关闭标记详情
    infoWindowClose(marker) {
      marker.showFlag = false
    }
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 800px;
}
</style>