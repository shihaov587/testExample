<template>
  <div class="screen-card">
    <div class="title">
      <i class="iconfont" :class="icon"></i>
      <span>{{title}}</span>
    </div>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/pagescss/regulatory/screen/handScreenTheme.scss';
.screen-card {
  @include getScreenThemeStyle(background-color, card-bg);
  border-radius: 12px;
  padding: 12px 24px 0;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  &:last-child {
    margin-bottom: 0;
  }
  .title {
    flex: none;
    padding: 12px 0;
    font-size: 20px;
    font-weight: 550;
    display: flex;
    align-items: center;
    height: 28px;
    box-sizing: content-box;
    border-bottom: 1px solid;
    @include getScreenThemeStyle(border-color, card-border);
    i {
      font-size: 28px;
      @include getScreenThemeStyle(color, icon-color);
      margin-right: 8px;
    }
  }
  .body {
    flex: auto;
  }
}
</style>