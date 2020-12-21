<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1" v-on:click="$emit('show-add-car')" v-bind:disabled="!isLoggedIn">Add car</el-menu-item>
    <el-menu-item index="2" @click="OpenLoginPage" v-if="!isLoggedIn">Log in</el-menu-item>
    <el-menu-item index="3" @click="LogOut" v-if="isLoggedIn">Log out</el-menu-item>
    <el-menu-item index="4" v-if="isLoggedIn" @click="OpenUserPage">Hi, {{userName}} </el-menu-item>
</el-menu>
</template>

<script>
    import {logOutUser} from '../../services/logoutUser'
    import {mapGetters} from 'vuex'

    export default {
        name: 'Navbar',
        data() {
            return {
                isVisibleAddMenu : false
            }
        },
        computed: {
            ...mapGetters(['isLoggedIn', 'GetUserName']),
            userName() {
                return this.$store.getters.GetUserName 
            }
        }, 
        methods : {
            OpenUserPage() {
                this.$router.push('/user_page')
            },
            OpenLoginPage() {
                this.$router.push('/login')
            },

            LogOut() {
                logOutUser().then(res=> {
                    this.$store.commit('LogOutUser')
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
                
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