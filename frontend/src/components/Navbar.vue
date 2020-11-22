<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1" v-on:click="$emit('show-add-car')">Add car</el-menu-item>
    <el-menu-item index="2"><router-link to="/login">Log in</router-link></el-menu-item>
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
        color: black;
        padding: 0;
        margin: 0;
    }
</style>