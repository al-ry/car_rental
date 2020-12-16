<template>
    <el-card class="car_card" :body-style="{ padding: '0px' }">
      <img :src="getModifiedPath()" class="image">
      <div class="mark-model-container">
        <span>{{car.mark}}&nbsp;{{car.model}}</span>
      </div>
      <div class="description-container">
        <span>Year: {{car.year}}<br/></span>
        <span>Transmission: {{getModifiedTransmission(car.transmission)}}</span>
      </div>
      <div class="price-block">
        <span>Price: {{getModifiedPrice(car.cost)}} &#x20bd;</span>
      </div>
      </el-card>
</template>

<script>
export default {
    props : ['car'],
    methods: {

      getModifiedPath() {
        return 'uploads/' + this.car.photo_path
      },

      getModifiedPrice(cost) {
        return cost.slice(0, cost.length - 5)
      },

      getModifiedTransmission() {
        var transmission
        switch(this.car.transmission) {
          case 1:
            transmission = "Manual";
            break;
          case 2:
            transmission = "Auto";
            break;
          default:
            transmission = "Manual";
            break;
        }

        return transmission
      }
    },

}

</script>

<style scoped>

.car_card
{
    max-width: 300px;
    max-height: 320px;
    min-width: 320px;
    margin-left: 10px;
    margin-right: 20px;
    margin-bottom: 40px;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
  }

  .image {
    max-width: 320px;
    height: 230px;
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

.mark-model-container
{
  margin: 10px 0 0 20px;
  font: Courier, monospace;
  font-size: 20px
}

.description-container
{
  margin: 5px 0 5px 20px;
  font-size: 16px;
}

.price-block
{
  text-align: right;
  margin: 5px 20px 10px 0;
  font-size: 18px;
}

</style>