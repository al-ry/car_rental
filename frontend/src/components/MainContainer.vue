<template>
    <div class="main_container">
		<el-header><navbar v-on:show-add-car="isVisibleAddMenu = true"/></el-header>
		<el-main><car-container ref="car_container" v-bind:cars="cars"/></el-main>
        <AddCar v-if="isVisibleAddMenu == true" v-on:close="isVisibleAddMenu = false"
         v-on:add-new-advetisement="this.$refs.car_container.AddNewCar"/>
	</div> 
</template>

<script>
import Navbar from './Navbar.vue'
import CarContainer from './CarsContainer.vue'
import AddCar from './AddCar.vue'

export default {

    data() {
        return {
            isVisibleAddMenu : false
        }
    },

    components: {
		Navbar, 
        CarContainer,
        AddCar,
},
    methods: {
    }
}

</script>

<style scoped>
html, body {
    overflow: auto;
	height: 100%;
}

* {
	margin : 0;
	padding : 0;
}
.main_container
{
	height: 100%;
}

.el-header {
	padding: 0;
}

.el-main {
	padding: 0px;
	height: 100%;
}
</style>