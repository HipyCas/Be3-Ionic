<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button></ion-menu-button>
				</ion-buttons>
				<ion-title>Feature Lab</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<!-- THEMING (forceDarkTheme, customAccentColor) -->
			<ion-list>
				<ion-list-header><h3>Theming</h3></ion-list-header>
				<!-- forceDarkTheme -->
				<ion-item>
					<p>Force dark theme</p>
					<ion-toggle
						slot="end"
						v-model="localFeatures.forceDarkTheme"
					></ion-toggle>
				</ion-item>
				<!-- customAccentColor -->
				<ion-item>
					<p>Custom accent color</p>
					<ion-button
						@click="colorPicker()"
						:disabled="!customAccentColor"
						:color="customAccentColorButtonColor"
						slot="end"
						>{{ color.toUpperCase() }}</ion-button
					>
					<ion-toggle slot="end" v-model="customAccentColor"></ion-toggle>
				</ion-item>
			</ion-list>
			<!-- SECTIONS (matrixOrgClient, customViews)-->
			<ion-list>
				<ion-list-header><h3>Sections</h3></ion-list-header>
				<!-- matrixOrgClient -->
				<ion-item>
					<p>Matrix.org client</p>
					<ion-toggle
						slot="end"
						v-model="localFeatures.matrixOrgClient"
					></ion-toggle>
				</ion-item>
				<!-- customViews -->
				<ion-item>
					<p>Custom views</p>
					<ion-button
						@click="customViewsPicker()"
						:disabled="!localFeatures.customViews"
						:color="customViewsEnabledButtonColor"
						slot="end"
						>{{ localFeatures.customViewsValue }}</ion-button
					>
					<ion-toggle
						slot="end"
						v-model="localFeatures.customViews"
					></ion-toggle>
				</ion-item>
			</ion-list>
		</ion-content>
	</ion-page>
</template>

<script>
//import FullPageText from '@/components/FullPageText.vue';
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonMenuButton,
	IonTitle,
	IonContent,
	IonList,
	IonListHeader,
	IonItem,
	//IonNote,
	IonToggle,
	IonButton,
	pickerController,
} from '@ionic/vue';

export default {
	name: 'OtherFeatureLab',
	components: {
		//FullPageText,
		IonPage,
		IonHeader,
		IonToolbar,
		IonButtons,
		IonMenuButton,
		IonTitle,
		IonContent,
		IonList,
		IonListHeader,
		IonItem,
		//IonNote,
		IonToggle,
		IonButton,
	},
	data() {
		return {
			//localFeatures: {},
			color: 'blue',
			customAccentColor: false,
			//customViews: 0,
			//customViewsEnabled: false,
		};
	},
	computed: {
		customAccentColorButtonColor() {
			if (!this.customAccentColor) return 'medium';
			else if (this.color == 'blue') return 'primary';
			else if (this.color == 'yellow') return 'warning';
			else if (this.color == 'green') return 'success';
			return 'light';
		},
		customViewsEnabledButtonColor() {
			console.info(
				`Number of custom views: ${this.localFeatures.customViewsValue}`
			);
			if (!this.localFeatures.customViews) return 'medium';
			else if (this.localFeatures.customViewsValue === 0) return 'light';
			return 'primary';
		},
		features() {
			return this.$store.getters.features;
		},
		localFeatures() {
			return this.features;
		},
	},
	methods: {
		async colorPicker() {
			let selectedIndex = -1;
			switch (this.color) {
				case 'blue':
					selectedIndex = 0;
					break;
				case 'yellow':
					selectedIndex = 1;
					break;
				case 'green':
					selectedIndex = 2;
					break;
			}
			const picker = await pickerController.create({
				columns: [
					{
						name: 'color',
						selectedIndex,
						options: [
							{
								text: 'Blue',
								value: 'blue',
							},
							{
								text: 'Yellow',
								value: 'yellow',
							},
							{
								text: 'Green',
								value: 'green',
							},
						],
					},
				],
				buttons: [
					{
						text: 'Cancel',
						role: 'cancel',
					},
					{
						text: 'Default',
						handler: () => {
							this.color = 'blue';
						},
					},
					{
						text: 'Confirm',
						handler: (value) => {
							this.color = value.color.value;
						},
					},
				],
			});
			picker.onDidDismiss().then(() => {
				console.log('Dismissed picker');
			});
			return picker.present();
		},
		async customViewsPicker() {
			let selectedIndex = this.localFeatures.customViewsValue;
			const picker = await pickerController.create({
				columns: [
					{
						name: 'number',
						selectedIndex,
						options: [
							{
								text: '0',
								value: 0,
							},
							{
								text: '1',
								value: 1,
							},
							{
								text: '2',
								value: 2,
							},
							{
								text: '3',
								value: 3,
							},
							{
								text: '4',
								value: 4,
							},
							{
								text: '5',
								value: 5,
							},
						],
					},
				],
				buttons: [
					{
						text: 'Cancel',
						role: 'cancel',
					},
					{
						text: 'Default',
						handler: () => {
							this.localFeatures.customViewsValue = 0;
						},
					},
					{
						text: 'Confirm',
						handler: (value) => {
							this.localFeatures.customViewsValue = value.number.value;
						},
					},
				],
			});
			picker.onDidDismiss().then(() => {
				console.log('Dismissed customViews picker');
			});
			return picker.present();
		},
	},
	watch: {
		localFeatures: {
			handler() {
				this.$store
					.dispatch('setFeatures', this.localFeatures)
					.then(() => console.log('Features successfully saved'))
					.catch((e) =>
						console.error(`An error was risen while updating the store: ${e}`)
					);
			},
			deep: true,
		},
	},
	ionViewWillEnter() {
		//this.localFeatures = this.features;
		console.log(
			`Obtained the following features: forceDarkTheme -> ${this.localFeatures.forceDarkTheme}, customAccentColor -> ${this.localFeatures.customAccentColor} [customAccentColorValue -> ${this.localFeatures.customAccentColorValue}]`
		);
	},
};
</script>

<style></style>
