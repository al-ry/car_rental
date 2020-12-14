<template>
    <div class="car-container">
    <CarCard @click="openAdvertisementPage(car)" v-for="car in cars" v-bind:car="car" :key="car.id"/>
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
        cars : [ {body: 1, city: "Йошкар-Ола", cost: "5 000,00 ?",year: 2008, description: "another good car", fuel: 1,
        id_advertisment: 3, is_open: 1, mark: "LADA (ВАЗ)", model: "Priora", 
        photo_path: "E:\\car_rental\\backend\\uploads\\2cfd95fa-44ab-4c0f-8cba-79e36a80fa1c",
        transmission: 1}, ]
		}
    },
    
    
    methods : {
        openAdvertisementPage(car) {
            console.log(car)
            this.$router.push({ name:'advertisement', params: {advertisement: car}})
        },

        AddNewCar(car) {
            this.cars.push({ mark: car.mark, model: car.model, 
            transmission: car.transmission, description: car.description, })
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
    min-height: 100%;
}
</style>