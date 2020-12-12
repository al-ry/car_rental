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
        cars : [ 
            {mark: "Lada", model: "Granta", year:"2017", path:"granta.jpg"},
            {mark: "Lada", model: "Granta", year:"2017", path:"granta.jpg"},
            {mark: "Lada", model: "Granta", year:"2017", path:"granta.jpg"},
            {mark: "Lada", model: "Granta", year:"2017", path:"granta.jpg"},
            {mark: "Lada", model: "Granta", year:"2017", path:"granta.jpg"},
            {mark: "Lada", model: "Granta", year:"2017", path:"granta.jpg"},
            {mark: "Lada", model: "Granta", year:"2017", path:"granta.jpg"},
            {mark: "Lada", model: "Granta", year:"2017", path:"granta.jpg"},
            {mark: "Lada", model: "Granta", year:"2017", path:"granta.jpg"},
            {mark: "Lada", model: "Granta", year:"2017", path:"granta.jpg"},
            {mark: "Lada", model: "Granta", year:"2017", path:"granta.jpg"},
            {mark: "Lada", model: "Granta", year:"2017", path:"granta.jpg"},
            {mark: "Lada", model: "Granta", year:"2017", path:"granta.jpg"},
            {mark: "Lada", model: "Granta", year:"2017", path:"granta.jpg"},
        ]
		}
    },
    
    methods : {
        AddNewCar(car) {
            this.cars.push({ mark: car.mark, model: car.model, 
            transmission: car.transmission, description: car.description})
        }
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
    margin: auto;
    padding: 10px 10px;
    height: 100%;
}
</style>