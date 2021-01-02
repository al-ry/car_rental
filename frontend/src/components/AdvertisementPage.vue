<template>
    <el-main class="advertisement_page" 
    v-loading.fullscreen.lock="fullscreenLoading" element-loading-background="rgba(1, 1, 1, 1)">
    <el-alert title="Success" type="success" @close="handleClose" :description="successMessage" v-if="successMessage != ''" center show-icon></el-alert>
    <el-alert title="Error" type="error" @close="handleClose" :description="errorMessage" show-icon v-if="errorMessage != ''"></el-alert>
    <el-page-header @back="Back" content="Advertisement"></el-page-header>
        <div class="lessor_block">
            <div class="lessor_photo">
                <el-avatar :size="150" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <div class="lessor_info">
                <span><i class="el-icon-user icon"></i>{{advertisement.user_name}}</span>
                <span><i class="el-icon-phone-outline icon"></i>{{advertisement.user_phone}}</span>
                <div class="rate_block">
                    <el-rate v-model="rate" class="review_rate" disabled></el-rate> 
                    <span @click="ShowReviews">{{rate}} points ({{reviewCount}} reviews)</span>
                </div>
            </div>
        </div>
        <div class="car_block">
            <el-carousel class="image_carousel" ref="carousel" :initial-index=1 :autoplay="false">
                <el-carousel-item v-for="(photo, index) in advertisement.photo_path" v-bind:key="index">
                    <img class="image" :src="getModifiedPath(photo)" >
                </el-carousel-item>
            </el-carousel>
            <div class="advertisement_info_block">
                <div class="mark_model_block"><span>{{advertisement.mark}} {{advertisement.model}}, {{advertisement.year}}</span></div>
                <div class="location_block"><span><i class="el-icon-location icon"></i> {{advertisement.city}}</span></div>
                <div class="technical_block">
                    <span><i class="el-icon-s-tools icon"></i> {{getModifiedTransmission(advertisement.transmission)}}</span>
                    <span><i class="el-icon-truck icon"></i> {{getModifiedFuel(advertisement.fuel)}}</span>
                    <span><i class="el-icon-house icon"></i> {{getModifiedBody(advertisement.body)}}</span>
                </div>
                <div class="price_block"><span>Price a day: {{getModifiedPrice(advertisement.cost)}}  &#x20bd;</span></div>
            </div>
        </div>
        <div class="booking_block">    
            <div class="description_block"><span class="description_title">Description:</span> {{advertisement.description}}</div>
            <div class="booking_date" v-if="isLoggedIn">
                <el-date-picker size="medium" v-model="dateRange" type="daterange" range-separator="To"
                :start-placeholder="dateRange[0]" :end-placeholder="dateRange[1]" :disabledDate="validateDate"></el-date-picker>
                <el-button type="success" class="book_button" @click="BookCar">book</el-button>
            </div>

        </div>
    </el-main>
</template>

<script>
import {getAdvertismentInfo} from '../../services/getAdvertisementInfo'
import {continueSession} from '../../services/continueSession'
import {getBookedDates} from '../../services/getBookedDates'
import {bookCar} from '../../services/bookCar'
import {mapGetters} from 'vuex'

export default {
    data() {
        return {
            advertisement: [],
            blockedDates: null,
            dateRange: [],
            rate: 0,
            reviewCount : 0,
            showErrorDialog: false,
            fullscreenLoading: false,
            modal : {
                showModal : false,
                header: '',
                text: ''
            },

            successMessage: '',
            errorMessage: ''
        }
    },

    computed:  {
        ...mapGetters(['isLoggedIn']),
    },

    async created() {
        this.fullscreenLoading = true
        await this.loginUser()
        await this.requireInfo()
        console.log(this.advertisement)
        await this.getLockedDates()
        this.setRate()
        this.$refs.carousel.next();
        this.fullscreenLoading = false
    },

    methods : {
        ShowReviews() {
            console.log(this.advertisement)
            this.$router.push({ name:'review_page', params: {phone: this.advertisement.user_phone, id: this.$route.params.id}})
        },

        getModifiedFuel(fuel) {
            var modifiedFuel
            switch(fuel) {
                case 1:
                    modifiedFuel = "Petrol";
                    break;
                case 2:
                    modifiedFuel = "Diesel";
                    break;
                default:
                    modifiedFuel = "Hybrid\\Electro";
                    break;
            }
            return modifiedFuel
        },

        getModifiedBody(body) {
            var modifiedBody
            switch(body) {
                case 1:
                    modifiedBody = "Sedan";
                    break;
                case 2:
                    modifiedBody = "Cabriolet";
                    break;
                case 3:
                    modifiedBody = "Coupe";
                    break;
                case 4:
                    modifiedBody = "Crossover"
                    break
                case 5:
                    modifiedBody = "Hatchback"
                    break
                case 6:
                    modifiedBody = "Limousine"
                    break
                case 7:
                    modifiedBody = "Wagon"
                    break
                case 8:
                    modifiedBody = "SUV"
                    break
                case 9:
                    modifiedBody = "Track"
                    break
                default:
                    modifiedBody = "Sedan"
                    break
            }

            return modifiedBody
        },

        getModifiedTransmission(transmission) {
            var modifiedTransmission
            switch(transmission) {
                case 1:
                    modifiedTransmission = "Manual";
                    break;
                case 2:
                    modifiedTransmission = "Auto";
                    break;
                default:
                    modifiedTransmission = "Manual";
                    break;
            }

            return modifiedTransmission
        },

        getModifiedPrice(cost) {
            if (cost) {
                return cost.slice(0, cost.length - 5)
            }
        },


        getModifiedPath(photo) {          
            return '../uploads/' + photo
        },

        validateDate(date) {
            if (this.blockedDates) {
                if (new Date > date) {
                    return true;
                }
                
                for (var range in this.blockedDates) {
                    var startDate = new Date(this.blockedDates[range].start)
                    var endDate = new Date(this.blockedDates[range].end)
                    if (date >= startDate.setDate(startDate.getDate() + 1)
                        && date <= endDate.setDate(endDate.getDate() + 1)) {
                        return true           
                    }

                }
            }
        },
        
        Back() {
            this.$router.replace("/")
        },

        showSuccessAlert(message) {
            this.successMessage = message
            this.errorMessage = ''
        },

        showErrorAlert(message) {
            this.errorMessage = message
            this.successMessage = ''
        },
        
        setRate() {
            for(var index in this.advertisement.rating) {
                this.rate += this.advertisement.rating[index].rating
            }
            
            if (this.rate == 0) {
                this.reviewCount = 0
            } else {
                this.rate = this.rate / this.advertisement.rating.length     
                this.rate = Math.floor(this.rate * 100) / 100
                this.reviewCount = this.advertisement.rating.length
            }
        },

        async requireInfo() {
            await getAdvertismentInfo(this.$route.params.id).then(res => {
                this.advertisement = res.data
                console.log(res.data)
            }).catch(err => {
                this.showErrorAlert(err.response.data.err)
            })
        },

        async getLockedDates() {
            await getBookedDates(this.$route.params.id).then(res => {
                this.blockedDates = res.data
            }).catch(err => {
                this.showErrorAlert(err.response.data.err)
            })
        },

        async loginUser() {
            await continueSession().then(res => {
                if (res.status == 200) {
                    this.$store.commit('LoginUser', res.data)
                }
            }).catch(err => {
                if (err.response.status != 403) {  
                    this.showErrorAlert(err.response.data.err)
                }
            })
        },

        handleClose() {
            this.errorMessage = ''
            this.successMessage = ''
        },

        BookCar() {
            if (this.dateRange.length == 2) {
                bookCar(new Date(this.dateRange[0]), new Date(this.dateRange[1]), this.$route.params.id).then(res => {
                    if (res.status == 200) {
                        this.showSuccessAlert("You have successfully sent request, call lessor to get details")
                    } 
                }).catch(err => {
                    this.showErrorAlert(err.response.data.err)
                })

                this.dateRange = []
                this.getLockedDates()
            }
        },
    },
    
}
</script>

<style scoped>
html, body {
    overflow: auto;
	height: 100%;
    margin: 0px;
}

.el-page-header 
{
    padding: 10px 0 10px 20px;
}



#app {
    height: 100%;
    overflow: auto;
}

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

.el-carousel__item:nth-child(2n) {
background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
background-color: #d3dce6;
}

.icon
{
    margin-right: 5px;
    font-weight: 700;
}

.rate_block
{
    display: flex;
    flex-direction: row;
}

.rate_block:hover {
    cursor: pointer;
}

.review_rate {
    margin-top: 11px;
}

.image_carousel
{   
    max-width: 500px;
    min-width: 500px;
}

.image
{
    height: 100%;
    width: 100%;
}

.advertisement_page
{
    margin: auto;
    padding: 5px auto;
    height: 100%;
    overflow: auto;
}

.description_title
{
    font-size: 20px;
}

.lessor_info
{
    margin-left: 20px;
    display:flex;
    flex-direction: column;
    font: Courier, monospace;
    font-size: 20px;
    line-height: 50px;
    color:black;
}

.lessor_block
{
    max-width: 1000px;
    margin: 50px auto 0 auto;
    display: flex;
    flex-direction: row;
}

.car_block
{
    max-width: 1000px;
    display: flex;
    flex-direction: row;
    margin: 30px auto 0px auto;
    padding: 0 10px 0 10px;
}

.advertisement_info_block
{
    margin: 0 10px 0px 40px;
    min-width: 450px;
}

.description_block
{
    word-wrap: break-word;
    font-size: 15px;
    margin-bottom: 10px;
}

.mark_model_block
{
    font-size: 25px;
}

.location_block 
{   
    font-size: 18px;
    margin-top: 10px;
    font-size: 20px;
    line-height: 50px;
}

.price_block
{
    font-size: 28px;
    display: flex;
    justify-content: flex-end;
    margin-top: 40px
}

.book_button
{
    margin-left: 20px
}

.technical_block
{
    display: flex;
    flex-direction: column;
    font-size: 20px;
    line-height: 50px;
}

.booking_block
{
    max-width: 1000px;
    margin: 50px auto 20px auto;
    padding: 0 10px 0 10px;
}

.booking_date {
    margin-top: 40px
}


@media screen and (max-width: 1020px) {
    .car_block {
      max-width: 800px;
    }

    .lessor_block {
        max-width: 800px;
    }

    .price_block {
        font-size: 22px;
    }

    .technical_block, .location_block  {
        font-size: 17px;
    }

    .image_carousel
    {   
        max-width: 500px;
        min-width: 400px;
    }

    .booking_block
    {
        max-width: 800px;
    }

    .advertisement_info_block {
        min-width: 320px;
    }

    .description_block {
        font-size: 12px;
    }
}

@media screen and (max-width: 780px) {
    .car_block {
        flex-direction: column;
        max-width: 500px;
    }

    .image_carousel {   
        max-width: 600px;
        min-width: 320px;
    }

    .lessor_block {
        max-width: 500px;
    }

    .advertisement_info_block
    {
        margin-top: 10px;
        margin-left: 5px;
        min-width: 320px;
    }

    .price_block
    {
        margin-top:20px;
    }

    .el-date-editor
    {
        width: 315px;
    }
}
</style>