<template>
    <div class="car-container">
    <CarCard v-for="car in cars" v-bind:car="car" :key="car.id"/>
    </div>
</template>

<script>

import CarCard from './CarCard.vue'
import {addCar} from '../../services/addCar'

export default {
    name : 'CarsConteiner',
    components: {
        CarCard
    },

    data() {
		return {
		cars : []
		}
    },
    
    methods : {
        AddNewCar(car)
        {
            var carInfo = car.form
            addCar(car).then(res => {
                console.log(res)
                this.cars.push({ mark: carInfo.mark, model: carInfo.model, 
                transmission: carInfo.transmission, description: carInfo.description})
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.car-container
{
    background: #ebc4c4;
    max-width: 1920px;
    display: grid;
    margin: auto;
    padding: 10px 10px;
    height: 100%;
    grid-template-columns: 300px 300px 300px 300px;
    grid-template-rows: 265px 265px 265px;
    grid-gap: 30px 50px;
}
</style>