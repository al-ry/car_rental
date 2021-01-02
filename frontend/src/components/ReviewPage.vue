<template>
    <el-main v-loading.fullscreen.lock="fullscreenLoading" class="main" element-loading-background="rgba(0, 0, 0, 1)">
        <div class="lessor_block">
            <div class="lessor_photo">
                <el-avatar :size="150" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <div class="lessor_info">
                <span><i class="el-icon-user icon"></i>{{userName}}</span>
                <span><i class="el-icon-phone-outline icon"></i>{{$route.params.phone}}</span>
                <div class="rate_block">
                    <el-rate v-model="rate" class="review_rate" disabled></el-rate> 
                    <span>{{rate}} points ({{reviews.length}} reviews)</span>
                </div>
            </div>
        </div>
        <div class="reviews_container">
            <div class="review" v-for="(review, index) in reviews" v-bind:key="index">
                <div class="review_info_block"> 
                    <div>
                        <el-avatar :size="70" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    </div>    
                    <div class="review_content">
                        <span class="reviewer_info">{{review.reviewer_name}} {{review.reviewer_phone}}</span>
                        <el-rate v-model="review.rating" class="review_rate" disabled></el-rate> 
                        <p class="review_text">{{review.description}}</p>
                    </div>
                </div>    
                <el-divider></el-divider>
            </div>
        </div>
    </el-main>
</template>


<script>

import {mapGetters} from 'vuex'
import {continueSession} from '../../services/continueSession'
import {getUserReviews} from '../../services/getUserReviews'

export default {
    data() {
        return {
            fullscreenLoading: false,
            rate: 0,
            userName: '',
            reviews: [{
                rating: 0
            }]
        }
    },

    computed:  {
        ...mapGetters(['isLoggedIn', 'GetUserName']),
    },

    methods : {
        calculateAverageRate() {
            for(var index in this.reviews) {
                this.rate += this.reviews[index].rating
            }

            if (this.rate == 0) {
                this.reviewCount = 0
            } else {
                this.rate = this.rate / this.reviews.length
                this.rate = Math.floor(this.rate * 100) / 100
            }
        }
    },

    async created() {
        this.fullscreenLoading = true;
        await continueSession().then(res => {
            if (res.status == 200) {
                this.$store.commit('LoginUser', res.data)
            }
        }).catch(err => {
            console.log(err, 'error')
        })

        await getUserReviews(this.$route.params.phone).then(res => {
            this.reviews = res.data.reviews
            this.userName = res.data.userName
            console.log(res.data.reviews)
        }).catch(err => {
            console.log(err, 'error')
        })

        this.calculateAverageRate()
        this.fullscreenLoading = false;
    },  
}
</script>

<style scoped>

.icon
{
    margin-right: 5px;
    font-weight: 700;
}

.reviews_container
{
    max-width: 1000px;
    height: 600px;
    overflow: auto;
    margin: 20px auto 60px auto;
}

.review_creation_block
{
    max-width: 1000px;
    margin: 50px auto 0 auto;
}

.review_info_block
{
    display: flex;
}

.review
{
    max-width: 1000px;
    margin: 30px auto 0 auto;
    padding: 5px;
}

.review_content
{
    margin-left: 20px;
    padding-top: 5px
}

.lessor_info
{
    display:flex;
    flex-direction: column;
    font: Courier, monospace;
    font-size: 20px;
    line-height: 50px;
    margin-left: 15px;
    color:black;
}


.lessor_block
{
    max-width: 1000px;
    margin: 50px auto 0 auto;
    display: flex;
    flex-direction: row;
}

.icon
{
    margin-right: 5px;
    font-weight: 700;
}

.reviewer_info
{
    font: Courier, monospace;
    font-size: 17px;
    font-weight: bold;
}

.review_text
{
    font-size: 15px;
    margin-top: 5px;
}

.review_rate
{
    margin-top: 12px;
}

.rate_block
{
    display: flex;
    font-size: 20px
}

</style>