<template>
    <div class="main_container" v-loading.fullscreen.lock="fullscreenLoading">
        <el-alert title="Success" type="success" @close="handleClose" :description="successMessage" v-if="successMessage != ''" center show-icon></el-alert>
        <el-alert title="Error" type="error" @close="handleClose" :description="errorMessage" show-icon v-if="errorMessage != ''"></el-alert>
		<el-header><navbar v-on:show-add-car="isVisibleAddMenu = true"/></el-header>

		<el-main>
            <div class="car_container_wrapper">
                <div class="filters_container">
                    <el-collapse v-model="activeNames" @change="handleChange" class="filters">
                        <el-collapse-item title="Popular marks" name="1" >
                            <el-checkbox-group v-model="selectedUser" @change="handlePopularMarkSelected" :max="1">
                                <el-checkbox v-for="(mark, index) in popularMarks" :label="mark" v-bind:key="index">{{mark.name}} ({{mark.cars_count}} adv)</el-checkbox>
                            </el-checkbox-group>
                        </el-collapse-item>
                        <el-collapse-item title="Filters" name="2">
                            <div class="filters_block"> 
                                <div class="select_container">
                                    <div class="transmission_select filter_selector">
                                        <span class="filter_title">Transmission </span>
                                        <el-select filterable v-model="filters.selectedFilters.transmission" name="Transmission" class="filter_select">
                                            <el-option label='Manual' value='1'/>
                                            <el-option label='Auto' value='2'/>
                                        </el-select>
                                    </div>
                                    <div class="body_select filter_selector">
                                        <span class="filter_title">Body </span>
                                        <el-select v-model="filters.selectedFilters.body" class="filter_select" placeholder="Select"> 
                                            <el-option v-for="(body, index) in bodies" :label='body' :value='index+1' v-bind:key="index"/>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="select_container">
                                    <div class="city_select filter_selector">
                                        <span class="filter_title"> City </span>
                                        <el-select filterable v-model="filters.selectedFilters.city" class="filter_select">
                                            <el-option v-for="(city, index) in cities" :value="city" v-bind:key="index"/>
                                        </el-select>
                                    </div>
                                    <div class="cost_select filter_selector">
                                        <span class="filter_title"> Max price </span>
                                        <el-input v-model="filters.selectedFilters.cost" type="number" min="500" class="filter_select"></el-input>
                                    </div>
                                </div>
                                 <div class="select_container">
                                    <div class="sort_by_price">
                                        <span class="filter_title   ">From min to max price </span>
                                        <el-switch v-model="filters.selectedFilters.sortByCostASC" 
                                        :disabled="filters.selectedFilters.sortByCostDESC" @change="sortByCostASCSelected"></el-switch> 
                                    </div>
                                    <div class="sort_by_price">
                                        <span class="filter_title sort_title">From max to min price</span>
                                        <el-switch v-model="filters.selectedFilters.sortByCostDESC" :disabled="filters.selectedFilters.sortByCostASC"
                                        @change="sortByCostDESCSelected"></el-switch>
                                    </div>    
                                </div>
                                <div class="date_picker filter_selector">
                                    <span class="filter_title"> Date </span>
                                    <el-date-picker size="medium" v-model="filters.selectedFilters.dateRange" type="daterange" range-separator="To"
                                    :start-placeholder="filters.selectedFilters.dateRange[0]" :end-placeholder="filters.selectedFilters.dateRange[1]" :disabledDate="validateDate">
                                    </el-date-picker>
                                </div>
                             </div>
                            <el-button @click="getAdvertisementsWithFilters" type="success">Show result</el-button>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <div class="car-container">
                    <CarCard class="car_card" @click="openAdvertisementPage(car)" v-for="car in advertisements" v-bind:car="car" :key="car.id"/>
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
import { continueSession } from '../../services/continueSession'
import { getAdvertisementList } from '../../services/getAdvertisementList'
import { getPopularMarks } from '../../services/getPopularMarks'
import {mapGetters} from 'vuex'
import { getCities } from '../../services/getCities'

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
            pageCount: 2,
            cities: [],

            filters : {
                currentFilters: null,
                selectedFilters : {
                    dateRange: [],
                    transmission: null,
                    body: null,
                    city: null,
                    cost: null,
                    sortByCostASC: null,
                    sortByCostDESC: null,
                    mark: null
                }
            },

            selectedUser : [],
            popularMarks: [],
        }
    },

    computed: {
        ...mapGetters(['GetUserInfo']),
        bodies () {
			return ["Sedan", "Cabriolet", "Coupe", "Crossover","Hatchback", "Limousine", "Wagon", "SUV", "Track"]
		},
    },

    components: {
		Navbar, 
        AddCar,
        CarCard,
    },

    methods: {
        handlePopularMarkSelected(mark) {
            this.filters.selectedFilters.mark = this.filters.selectedFilters.mark ? null : mark[0].name
            this.getAdvertisementsWithFilters()
        },

        sortByCostDESCSelected() {
            this.filters.selectedFilters.sortByCostASC = false;
        },

        sortByCostASCSelected() {
            this.filters.selectedFilters.sortByCostDESC = false;
        },

        AddNewAdvertisement() {
            this.isVisibleAddMenu = false;
            this.loadNewPage(this.currentPage, this.advertisementsCount)
            this.showSuccessAlert("Your advertisement successfully added!")
        },

        openLoadingScreen() {
            this.fullscreenLoading = true;
        },

        closeLoadingScreen() {
            this.fullscreenLoading = false;
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
            console.log(this.filters.currentFilters)
            this.loadNewPage(++this.currentPage, this.advertisementsCount)
        },

        handlePrevClick() {
            this.loadNewPage(--this.currentPage, this.advertisementsCount)
        },

        handleCurrentChange(newPageNumber) {
            this.loadNewPage(newPageNumber, this.advertisementsCount)
        },

        getCitiesList() {
            getCities().then(res => {
                for(var i in res.data) {
                    this.cities.push(res.data[i]['name'])
                }
            }).catch(err => {
                console.log(err)
            })
        },

        getPopularMarksList(limit) {
            getPopularMarks(limit).then(res => {
                this.popularMarks = res.data
            }).catch(err => {
                console.log(err)
            })
        },

        async getAdvertisementsWithFilters() {
            console.log("with filters called")
            this.currentPage = 1;
            this.pageCount = 2;
            this.filters.currentFilters = this.filters.selectedFilters
            await this.loadNewPage(this.currentPage, this.advertisementsCount)
        },

        async loadNewPage(page, count) {
            await getAdvertisementList(page, count, this.filters.currentFilters).then(res => {
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
        this.openLoadingScreen()
        await continueSession().then(res => {
            if (res.status == 200) {
                this.$store.commit('LoginUser', res.data)
            }
        }).catch(err => {
            if (err.response.status != 403) {  
                this.showErrorAlert(err.response.data.err)
            }
        })
        await this.loadNewPage(this.currentPage, this.advertisementsCount)
        this.getCitiesList()
        this.getPopularMarksList()
        this.closeLoadingScreen()
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

.filters_container
{
    max-width: 1200px;
    margin: auto;
}

.select_container
{
    max-width: 400px;
    margin-right: 20px;
    display:flex;
    flex-direction: column;
    margin-bottom: 5px;
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

.el-collapse-item__header, .el-collapse-item__wrap
{
    background: #f2f2f2 ;
}

.filter_title
{
    font-size: 18px;
    margin: 0 10px 0 10px;
    white-space: nowrap;
}

.filters_block
{
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.car_card 
{
    cursor: pointer;
}

.filter_selector
{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-width: 400px;
    margin-bottom: 5px;
}

.el-collapse-item__header 
{
    font-size: 22px;
}

.el-switch
{
    padding-top: 10px;
}

.sort_title 
{
    padding-top: 5px;
}

.sort_by_price
{
    display: flex;
}

.filter_select
{
    width: 200px;
}



</style>