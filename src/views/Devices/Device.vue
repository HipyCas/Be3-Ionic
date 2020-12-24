<template>
	<ion-page>
		<ion-content>
            <div :hidden="!loadedDevice">
                <h2 v-if="!loadedDevice" style="margin: auto auto auto auto">Device not found</h2>
                <h2 v-else>Loaded device {{ loadedDevice.name }}</h2>
            </div>
            <ion-loading :is-open="!loadedDevice" :duration="1000" message="Loading device..." :translucent="true">
            </ion-loading>
		</ion-content>
	</ion-page>
</template>

<script>
import { IonPage, IonContent, IonLoading } from '@ionic/vue';

export default {
	name: 'DevicesDevice',
	components: { IonPage, IonContent, IonLoading },
	data() {
		return {
			deviceId: null,
		};
	},
	computed: {
		loadedDevice() {
            console.log(`Id ${this.deviceId}`);
			return this.$store.getters.device(this.deviceId);
		},
	},
	watch: {
		$route(currentRoute) {
			this.deviceId = currentRoute.params.id;
			console.log(this.deviceId);
		},
    },
};
</script>

<style></style>
