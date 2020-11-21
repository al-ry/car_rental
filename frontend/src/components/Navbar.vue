<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1" v-on:click="$emit('show-add-car')">Add car</el-menu-item>
    <el-menu-item index="3" disabled>Info</el-menu-item>
    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">Log in</a></el-menu-item>
</el-menu>
</template>

<script>
export default {
    name: 'Navbar',
}
</script>

<style scoped>
    .el-menu-demo
    {
        background-color : #FFFAF0;
        padding: 0;
        margin: 0;
    }
</style>