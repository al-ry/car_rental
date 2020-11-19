<template>
	<el-container>
	<el-header><navbar/></el-header>
	<el-main><car-container v-bind:cars="cars"/></el-main>
	</el-container>

</template>

<script>

import Navbar from './components/Navbar.vue'
import CarContainer from './components/CarsContainer.vue'

export default { 
	name: 'App',
	components: {
		Navbar, 
		CarContainer
}
}

</script>

<style>
* {
	margin : 0;
	padding : 0;
}

.el-header {
	padding: 0;
}

.el-main {
	padding: 20px 0px;
}
</style>
