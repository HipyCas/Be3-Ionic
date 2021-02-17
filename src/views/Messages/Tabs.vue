<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button></ion-menu-button>
				</ion-buttons>
				<ion-title>Messages</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ion-tabs>
				<ion-tab-bar slot="bottom">
					<ion-tab-button tab="tab1" href="/messages/alerts">
						<ion-icon :md="warningSharp" :ios="warningOutline" />
						<ion-label>Alerts</ion-label>
					</ion-tab-button>

					<ion-tab-button tab="tab2" href="/messages/broadcast">
						<ion-icon :md="megaphoneSharp" :ios="megaphoneOutline" />
						<ion-label>Broadcast</ion-label>
					</ion-tab-button>

					<ion-tab-button tab="tab3" href="/messages/developer">
						<ion-icon :md="codeSharp" :ios="codeOutline" />
						<ion-label>Developer</ion-label>
					</ion-tab-button>
				</ion-tab-bar>
			</ion-tabs>
		</ion-content>
	</ion-page>
</template>

<script>
import {
	IonHeader,
	IonToolbar,
	IonButtons,
	IonMenuButton,
	IonTitle,
	IonTabBar,
	IonTabButton,
	IonTabs,
	IonContent,
	IonLabel,
	IonIcon,
	IonPage,
} from '@ionic/vue';
import {
	warningSharp,
	warningOutline,
	megaphoneSharp,
	megaphoneOutline,
	codeSharp,
	codeOutline,
} from 'ionicons/icons';

export default {
	name: 'Tabs',
	components: {
		IonHeader,
		IonToolbar,
		IonButtons,
		IonMenuButton,
		IonTitle,
		IonContent,
		IonLabel,
		IonTabs,
		IonTabBar,
		IonTabButton,
		IonIcon,
		IonPage,
	},
	setup() {
		return {
			warningSharp,
			warningOutline,
			megaphoneSharp,
			megaphoneOutline,
			codeSharp,
			codeOutline,
		};
	},
};
</script>
