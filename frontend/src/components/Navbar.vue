<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1" v-on:click="$emit('show-add-car')" v-bind:disabled="LoginState">Add car</el-menu-item>
    <el-menu-item index="2" @click="OpenLoginPage" v-if="LoginState">Log in</el-menu-item>
    <el-menu-item index="3" @click="LogOut" v-if="!LoginState">Log out</el-menu-item>
    <el-menu-item index="4" v-if="!loginState">Hi, {{userName}}</el-menu-item>
</el-menu>
</template>

<script>
    import {mapGetters} from 'vuex'


    export default {
        name: 'Navbar',
        data() {
            return {
                isVisibleAddMenu : false
            }
        },
        computed: {
            ...mapGetters(['LoginState']),
            userName() {
                return this.$store.getters.GetUserName;
            }
        },
        methods : {
            OpenLoginPage() {
                this.$router.push('/login')
            },
            LogOut() {
                this.$store.commit('LogOutUser')
            },
        }
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
    .el-menu--horizontal>.el-menu-item
    {
        color:#000000;
    }
</style>