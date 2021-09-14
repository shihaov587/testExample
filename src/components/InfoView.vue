<template>
  <div class="infoView">
      <div>
          <span>政策信息</span>
          <span class="textBox">
              <transition name="slide">
                  <span class="text" v-for="(item,index) in info" :key="index"></span>
              </transition>
          </span>
      </div>
      <div></div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            info: [
                {
                    content: '第一条信息',
                    data: '2021-9-1'
                },
                {
                    content: '第二条信息',
                    data: '2021-9-3'
                },
                {
                    content: '第三条信息',
                    data: '2021-9-5'
                },
            ]
        }
    }
}
</script>

<style>

</style>