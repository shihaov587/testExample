<template>
  <div class="home">
    <h1>{{title}}</h1>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" :info="info" @loadMsg="showInfo" />
    <editor :content="desc" @change="html => desc = html"></editor>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import editor from '@/components/Editor.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld,
    editor
  },
  data() {
    return {
      info: '我是父组件的参数asdasda',
      title: "",
      desc: ""
    }
  },
  methods: {
    showInfo(value) {
      this.title = value
    }
  }
}
</script>
