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
			{id : 1, mark : "Лада", model : "Калина"},
			{id : 2, mark : "Лада", model : "Приора"},
			{id : 3, mark : "Лада", model : "Гранта"}
		]
		}
	},
}
</script>

<style scoped>
.car-container
{
    background: #F08080;
    max-width: 1920px;
    display:flex;
    margin: auto;
    padding : 10px 10px;
    flex-wrap: wrapж
    flex
}

</style>