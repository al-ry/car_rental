<template>
    <el-main class="advertisement_page">
        <div class="lessor_block">
            <div class="lessor_photo">
                <el-avatar :size="150" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <div class="lessor_info">
                <span><i class="el-icon-user icon"></i>Stas Gaisin</span>
                <span><i class="el-icon-phone-outline icon"></i>89021089168</span>
                <span>Rating ....</span>
                <button @click="ShowAdvertisementInfo">asdas</button>
            </div>
        </div>
        <div class="book_block">
            <el-carousel class="image_carousel" ref="carousel" :initial-index=1 :autoplay="false">
                <el-carousel-item v-for="(photo, index) in advertisement" v-bind:key="index">
                    <img class="image" :src="getModifiedPath(photo)" >
                </el-carousel-item>
            </el-carousel>
            <div>
                    <el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date" :disabledDate="validateDate">
    </el-date-picker>
            </div>
        </div>
        <div class="description_block">
            <span>Mark: Lada</span>
            <span>Model: Kalina</span>
            <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cumque velit 
                delectus odit qui excepturi sapiente magni distinctio quas nisi, perferendis suscipit 
                impedit culpa dolores animi natus ullam accusamus consectetur.
            </span>
        </div>
    </el-main>
</template>

<script>
import {getAdvertismentInfo} from '../../services/getAdvertisementInfo'

export default {
    data() {
        return {
            advertisement: []
        }
    },

    methods : {
        ShowAdvertisementInfo() {
            console.log(this.advertisement)
        },

        getModifiedPath(photo) {          
            return '../uploads/' + photo
        },

        validateDate(date) {
            console.log(date)
            return true
        }

    },
    async beforeCreate() {
        console.log(this.$route.params.id)
        await getAdvertismentInfo(this.$route.params.id).then(res => {
            this.advertisement = res.data.photo_path
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
        this.$refs.carousel.next();
    }
    
}
</script>

<style scoped>

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

.image_carousel
{
    max-width: 500px;
}

.image
{
    height: 100%;
    width: 100%;
}

.advertisement_page
{
    max-width: 1200px;
    margin:auto
}

.lessor_info
{
    display:flex;
    flex-direction: column;
    margin: 20px 0 0 40px;
    font: Courier, monospace;
    font-size: 20px;
    line-height: 40px;
    color:black;
}

.lessor_block
{
    margin-top: 50px;
    display: flex;
    flex-direction: row;
}

.book_block
{
    margin-top: 30px;
    display: flex;
    flex-direction: column;
}

.description_block
{
    margin-top: 30px;
}

</style>