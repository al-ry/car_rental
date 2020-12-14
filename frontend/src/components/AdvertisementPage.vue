<template>
    <el-main class="advertisement_page">
        <div class="lessor_block">
            <div class="lessor_photo">
                <el-avatar :size="150" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <div class="lessor_info">
                <span>Name: Stas Gaisin</span>
                <span>Phone: 89021089168</span>
                <span>Rating ....</span>
            </div>
        </div>
        <div class="book_block">
            <el-carousel class="image_carousel">
                <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small">item </h3>
                </el-carousel-item>
            </el-carousel>
            
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
export default {
    props : ['advertisement'],
    methods : {
        ShowAdvertisementInfo() {
            console.log(this.advertisement.mark)
        }
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
  
.image_carousel
{
    max-width: 500px;
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
}

.description_block
{
    margin-top: 30px;
}

</style>