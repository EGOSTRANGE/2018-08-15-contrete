<template>
	<div class="mono-field">
		<label :for="'form-elem'+formElem.id">{{ formElem.label }}</label>
		<input type="number"
			   :id="'form-elem-'+formElem.id"
			   v-model="value" @change="Send">
		<!--<btn @click.stop="Send()">Send</btn>-->
	</div>
</template>

<script>
	import {bus} from '../../main';
	import Btn from '../Form/Btn';

	export default {
		props: ['formElem'],
		data() {
			return {value: 0};
		},
		methods: {
			Send() {
				console.log(this.elem);
				bus.$emit('updateFormElem', {
					formElem: this.formElem,
					value: this.value,
					type: this.formElem.type
				});
			}
		},
		components: {
			Btn
		}
	}
</script>

<style>
	.mono-field {
		display: flex;
		flex-direction: column;
		margin: 5px 0;
		position: relative;
	}
	input{
		border-radius: 3px;
		border: solid 1px grey;
		font-size: 15px;
		color: rgb(50,50,50);
		padding: 0 3px;
		width: 80px;
	}

	label {
		font-size: 17px;
		position: relative;
	}

	fieldset {
		border-radius: 3px;
		border: 1px solid lightgray;
		padding: 5px;
	}
</style>
