<template>
	<div class="list">
		<div class="job-list">
			list
		</div>
		<SideBar></SideBar>
	</div>
</template>

<script>
	import SideBar from './components/list-sidebar.vue'
	export default{
		name: 'List',
		components: {
			SideBar
		},
		mounted(){
			// this.$axios.get('/jobs/getList').then((res) => {
			// 	console.log(res);
			// })
		}
	}
</script>

<style lang="scss">
  .list{
    @include temp-div;
    align-items: stretch;
    .job-list{
      flex: 1;
      border: 1px solid #eeeeee;
      border-right: 0;
      background-color: $theme-color;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
