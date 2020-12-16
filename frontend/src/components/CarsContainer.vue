<template>
    <div class="car_container_wrapper">
        <div class="car-container">
        <CarCard @click="openAdvertisementPage(car)" v-for="car in advertisements" v-bind:car="car" :key="car.id"/>
        </div>
        <div class="pagination_block">
            <el-pagination v-if="pageCount < 12" layout="prev, pager, next" :total="pageCount * 10" 
            @next-click="handleNextClick" @prev-click="handlePrevClick" @current-change="handleCurrentChange"></el-pagination>
        </div>
    </div>
</template>

<script>

import CarCard from './CarCard.vue'
import {getAdvertisementList} from '../../services/getAdvertisementList'
import {mapGetters} from 'vuex'

export default {
    name : 'CarsConteiner',

    components: {
        CarCard,
    },

    data()  {
        return {
            advertisements: [],

            currentPage: 1,
            advertisementsCount: 12,
            pageCount: 2
        }
    },

    computed: {
        ...mapGetters(['GetUserInfo'])
    },
    
    methods : {
        openAdvertisementPage(car) {
            console.log(car.id_advertisment)
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
                console.log(this.pageCount)
            }).catch(err => {
                console.log(err)
            })  
        }
    },

    async created() {
        this.loadNewPage(this.currentPage, this.advertisementsCount)
    }
}
</script>

<style scoped>
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