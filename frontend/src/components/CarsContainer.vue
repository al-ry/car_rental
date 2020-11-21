<template>
    <div class="car-container">
    <CarCard v-for="car in cars" v-bind:car="car" :key="car.id"/>
    </div>
</template>

<script>

import CarCard from './CarCard.vue'

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
            console.log(car.transmission)
            this.cars.push({id : this.cars.length, mark : car.mark, model : car.model,
             path : car.path, transmission : car.transmission});
        }
    }
}
</script>

<style scoped>
.car-container
{
    background: #F08080;
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