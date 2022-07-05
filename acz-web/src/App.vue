<!--
 * @Author: your name
 * @Date: 2020-12-10 09:28:20
 * @LastEditTime: 2020-12-14 20:24:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /acz/src/App.vue
-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: 'iconfont';  /* project id 2188491 */
  src: url('//at.alicdn.com/t/font_2188491_0kaz5lnfrgqm.eot');
  src: url('//at.alicdn.com/t/font_2188491_0kaz5lnfrgqm.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2188491_0kaz5lnfrgqm.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2188491_0kaz5lnfrgqm.woff') format('woff'),
  url('//at.alicdn.com/t/font_2188491_0kaz5lnfrgqm.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2188491_0kaz5lnfrgqm.svg#iconfont') format('svg');
}

.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  background-color: #eef2fa;
}
</style>
