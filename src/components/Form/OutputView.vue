<template>
	<div class="output-view">
		{{output}}
		<!--BALACLAVA-->
		<div>{{evaluation}}
			<button @click.stop="Evaluate">GetResult</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {output: null};
		},
		methods: {
			GetData() {
			}
		}
	}
</script>

<style>

</style>
