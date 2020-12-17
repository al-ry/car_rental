<template>
    <el-main class="user_page_container" v-loading.fullscreen.lock="fullscreenLoading" element-loading-background="rgba(1, 1, 1, 1)">
     <el-page-header @back="Back" content="User page"></el-page-header>
        <div class="user_info_container">
            <div>
                <el-avatar :size="200" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <div class="info_block">
                <span><i class="el-icon-user icon"></i> <span class="info_text">{{userInfo.name}}</span></span>
                <span><i class="el-icon-phone-outline icon"></i> <span class="info_text">{{userInfo.phone}}</span></span>
                <span><i class="el-icon-postcard icon"></i> <span class="info_text">{{userInfo.email}}</span></span>
                <span><i class="el-icon-location icon"></i> <span class="info_text">{{userInfo.city}}</span></span>
            </div>
        </div>
        <el-tabs type="border-card" class="user_activity_tabs" @tab-click="showAdvertisementList">
            <el-tab-pane label="Your book requests" >
                <el-table :data="tableData" height="500" style="width: 100%" :row-class-name="tableRowClassName">
                    <el-table-column prop="date" label="Name" width="180"></el-table-column>
                    <el-table-column prop="name" label="Phone" width="180"></el-table-column>
                    <el-table-column prop="name" label="Start" width="180"></el-table-column>
                    <el-table-column prop="name" label="End" width="180"></el-table-column>
                    <el-table-column prop="name" label="Status" width="180"></el-table-column>

                </el-table>
            </el-tab-pane>
            <el-tab-pane label="Your advertisement"  class="cars_containter" >
                <CarCard v-for="car in cars" v-bind:car="car" :key="car.id_advertisement"/>
            </el-tab-pane>

            <el-tab-pane label="Your rents">Role</el-tab-pane>
            <el-tab-pane label="Your reviews">Task</el-tab-pane>
        </el-tabs>
    </el-main>
</template>

<script>
import {continueSession} from '../../services/continueSession'
import {getUserAdvertisement} from '../../services/getUserAdvertisements'
import CarCard from './CarCard.vue'
import {mapGetters} from 'vuex'

export default {
    components: {
        CarCard
    },

    computed: {
        ...mapGetters(['GetUserInfo']),
    },

    data() {
        return {
            fullscreenLoading: false,
            userInfo: {},
            cars: [],
            tableData:  [{
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            }, 
            {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            },
                        {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            },
                        {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            },
                        {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            },
                        {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            },
                        {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            },
                        {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            },
                        {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            },

            {
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles'
            }]
        }
    },

    created() {
        this.openFullScreen1()
        continueSession().then(res => {
            if (res.status == 200) {
                this.$store.commit('LoginUser', res.data)
                this.userInfo = this.$store.getters.GetUserInfo
            }
        }).catch(err => {
            console.log(err, 'error')
        })
    },

    methods: {
        showAdvertisementList(tab)  {
            if(tab.props.label == "Your advertisement") {                
                getUserAdvertisement(this.GetUserInfo.phone).then(res => {
                    this.cars = res.data
                }).catch(err => {
                    console.log(err, 'error')
                })
                console.log('requested')
            }
        },

        Back() {
            this.$router.replace("/")
        },
        
        openFullScreen1() {
            this.fullscreenLoading = true;
            setTimeout(() => {
            this.fullscreenLoading = false;
            }, 500);
        },
    },
}
</script>

<style scoped>

.el-page-header__title
{
    font-size: 30px;
}
.user_info_container
{
    max-width: 900px;
    margin: 50px auto;
    display: flex;
    flex-direction: row;
}

.user_page_container
{
    margin: auto;
    height: 100%;
    overflow: auto; 
    background: #996699;
}

/* .cars_containter
{
    max-width: 900px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
    padding: 20px 10px 10px 10px;
} */

.el-tabs__header
{
    margin-bottom: 0px;
}
.user_activity_tabs
{
    margin: 20px auto 50px auto;
    max-width: 1000px;
    height: auto;
}
.el-page-header 
{
    padding: 10px 0 10px 20px;
}

.icon
{
    margin-right: 5px;
    font-weight: 700;
}

.info_block
{
    display: flex;
    flex-direction: column;
    font: Courier, monospace;
    font-size: 20px;
    line-height: 40px;
    color:black;
    margin: auto 0 auto 50px 
}
/* .info_text
{
    color:black;
} */

</style>