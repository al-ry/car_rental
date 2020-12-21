<template>
    <div class="main_container" v-loading.fullscreen.lock="fullscreenLoading">
        <el-alert title="Success" type="success" @close="handleClose" :description="successMessage" v-if="successMessage != ''" center show-icon></el-alert>
        <el-alert title="Error" type="error" @close="handleClose" :description="errorMessage" show-icon v-if="errorMessage != ''"></el-alert>
		<el-header><navbar v-on:show-add-car="isVisibleAddMenu = true"/></el-header>

		<el-main>
            <div class="car_container_wrapper">
                <div class="car-container">
                    <CarCard @click="openAdvertisementPage(car)" v-for="car in advertisements" v-bind:car="car" :key="car.id"/>
                </div>
                <div class="pagination_block">
                    <el-pagination layout="prev, pager, next" :total="pageCount * 10" 
                    @next-click="handleNextClick" @prev-click="handlePrevClick" @current-change="handleCurrentChange"></el-pagination>
                </div>
            </div>  
        </el-main>
        <AddCar v-if="isVisibleAddMenu == true" v-on:close="isVisibleAddMenu = false"
         v-on:add-new-advetisement="AddNewAdvertisement"/>
	</div> 
</template>

<script>
import Navbar from './Navbar.vue'
import AddCar from './AddCar.vue'
import CarCard from './CarCard.vue'
import {continueSession} from '../../services/continueSession'
import {getAdvertisementList} from '../../services/getAdvertisementList'
import {mapGetters} from 'vuex'

export default {

    data() {
        return {
            isVisibleAddMenu : false,
            cars: [],
            fullscreenLoading : false,
            successMessage: '',
            errorMessage: '',
            advertisements: [],
            currentPage: 1,
            advertisementsCount: 8,
            pageCount: 2
        }
    },

    computed: {
        ...mapGetters(['GetUserInfo'])
    },

    components: {
		Navbar, 
        AddCar,
        CarCard,
    },

    methods: {
        AddNewAdvertisement() {
            this.isVisibleAddMenu = false;
            this.loadNewPage(this.currentPage, this.advertisementsCount)
            this.showSuccessAlert("Your advertisement successfully added!")
        },

        openFullScreen1() {
            this.fullscreenLoading = true;
            setTimeout(() => {
            this.fullscreenLoading = false;
            }, 500);
        },

        handleClose() {
            this.errorMessage = ''
            this.successMessage = ''
        },

        showSuccessAlert(message) {
            this.successMessage = message
            this.errorMessage = ''
        },

        showErrorAlert(message) {
            this.errorMessage = message
            this.successMessage = ''
        },

        openAdvertisementPage(car) {
            this.$router.push({ name:'advertisement', params: {id: car.id_advertisment}})
        },

        handleNextClick() {
            this.loadNewPage(++this.currentPage, this.advertisementsCount)
        },

        handlePrevClick() {
            this.loadNewPage(--this.currentPage, this.advertisementsCount)
        },

        handleCurrentChange(newPageNumber) {
            this.loadNewPage(newPageNumber, this.advertisementsCount)
        },

        async loadNewPage(page, count) {
            await getAdvertisementList(page, count).then(res => {
                console.log(res.data)
                this.nextPageNumber = res.data.next.page
                this.currentPage = res.data.current.page
                this.advertisements = res.data.rows
                this.pageCount = res.data.pagesCount
                console.log(this.advertisements)
            }).catch(err => {
                console.log(err)
            })  
        },
    },

    async created() {
        this.openFullScreen1()
        await continueSession().then(res => {
            if (res.status == 200) {
                this.$store.commit('LoginUser', res.data)
            }
        }).catch(err => {
            this.showErrorAlert(err.response.data.err)
        })
        this.loadNewPage(this.currentPage, this.advertisementsCount)
    },
}

</script>

<style>


#app
{
    margin: 0;
    padding: 0;
    height: 100%;
}

html, body {
    overflow: auto;
	height: 100%;
    margin: 0px;
}

.main {
    overflow: auto;
}

* {
	margin : 0;
	padding : 0;
}

.main_container
{
	height: 100%;
}

.el-alert
{
    z-index: 2001;
}

.el-header {
	padding: 0;
}

.el-main {
	padding: 0px;
	height: 100%;
    overflow: hidden; 
}
.el-main
{
    overflow: auto;
}

.car-container
{
    background: #f2f2f2;
    max-width: 1920px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 10px 10px;
}

.pagination_block 
{
    width: 100%;
    margin: 50px auto 50px auto;
    display: flex;
    align-items: center;
    height: 50px;
}

.el-pagination
{
    margin: 50px auto 50px auto;
}

.car_container_wrapper
{
    justify-self: flex-start;
    background: #f2f2f2;
    max-width: 1920px;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
    padding: 10px 10px;
    min-height: 100%;
    margin-bottom: 20px;
}

</style>