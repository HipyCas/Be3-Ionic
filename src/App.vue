<template>
	<IonApp>
		<IonSplitPane content-id="main-content">
			<ion-menu content-id="main-content" type="overlay" :hidden="isAuth">
				<ion-content>
					<ion-list id="inbox-list">
						<ion-list-header>Welcome Hipy</ion-list-header>
						<ion-button
							fill="clear"
							expand=""
							@click="openPopover()"
							color="medium"
							class="dropdown-button"
						>
							OPTIONS
							<ion-icon
								:md="chevronDownSharp"
								:ios="chevronDownOutline"
								slot="end"
							></ion-icon>
						</ion-button>

						<ion-menu-toggle
							auto-hide="false"
							v-for="(p, i) in appPages"
							:key="i"
						>
							<ion-item
								@click="selectedIndex = i"
								router-direction="root"
								:router-link="p.url"
								lines="none"
								detail="false"
								class="hydrated"
								:class="{ selected: selectedIndex === i }"
							>
								<ion-icon
									slot="start"
									:ios="p.iosIcon"
									:md="p.mdIcon"
								></ion-icon>
								<ion-label>{{ p.title }}</ion-label>
							</ion-item>
						</ion-menu-toggle>
					</ion-list>

					<ion-list id="labels-list">
						<ion-list-header>Custom Views</ion-list-header>

						<ion-item
							v-for="(label, index) in labels"
							lines="none"
							:key="index"
							router-direction="/views/"
						>
							<ion-icon
								slot="start"
								:ios="bookmarkOutline"
								:md="bookmarkSharp"
							></ion-icon>
							<ion-label>{{ label }}</ion-label>
						</ion-item>
					</ion-list>
				</ion-content>
			</ion-menu>
			<ion-router-outlet id="main-content"></ion-router-outlet>
		</IonSplitPane>
	</IonApp>
</template>

<script>
import {
	IonApp,
	IonContent,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonButton,
	IonMenu,
	IonMenuToggle,
	IonRouterOutlet,
	IonSplitPane,
	popoverController,
} from '@ionic/vue';
import HeaderOptions from './components/HeaderOptions.vue';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import {
	appsSharp,
	appsOutline,
	cubeSharp,
	cubeOutline,
	analyticsSharp,
	analyticsOutline,
	optionsSharp,
	optionsOutline,
	chatboxSharp,
	chatboxOutline,
	bookmarkSharp,
	bookmarkOutline,
	chevronDownSharp,
	chevronDownOutline,
} from 'ionicons/icons';

export default defineComponent({
	name: 'App',
	components: {
		IonApp,
		IonContent,
		IonIcon,
		IonItem,
		IonLabel,
		IonList,
		IonListHeader,
		IonButton,
		IonMenu,
		IonMenuToggle,
		IonRouterOutlet,
		IonSplitPane,
	},
	methods: {
		async openPopover(ev) {
			const popover = await popoverController.create({
				component: HeaderOptions,
				event: ev,
				translucent: true,
				componentProps: {
					onClick: () => {
						popover.dismiss();
					},
				},
			});
			return popover.present();
		},
	},
	setup() {
		const selectedIndex = ref(0);
		const appPages = [
			{
				title: 'Overview',
				url: '/overview',
				iosIcon: appsOutline,
				mdIcon: appsSharp,
			},
			{
				title: 'Devices',
				url: '/devices/',
				iosIcon: cubeOutline,
				mdIcon: cubeSharp,
			},
			{
				title: 'Data',
				url: '/data/',
				iosIcon: analyticsOutline,
				mdIcon: analyticsSharp,
			},
			{
				title: 'Messages',
				url: '/messages/',
				iosIcon: chatboxOutline,
				mdIcon: chatboxSharp
			},
			{
				title: 'Settings',
				url: '/settings/',
				iosIcon: optionsOutline,
				mdIcon: optionsSharp,
			},
		];
		const labels = [
			'Family',
			'Friends',
			'Work',
			'Travel',
		];

		const path = window.location.pathname.split('/')[1];
		if (path !== undefined) {
			selectedIndex.value = appPages.findIndex(
				(page) => page.title.toLowerCase() === path.toLowerCase()
			);
		}
		const isAuth = path == 'auth' ? true : false;

		const route = useRoute();

		return {
			bookmarkOutline,
			bookmarkSharp,
			selectedIndex,
			appPages,
			labels,
			isAuth,
			chevronDownSharp,
			chevronDownOutline,
			isSelected: (url) => (url === route.path ? 'selected' : ''),
		};
	},
	mounted () {
		this.$store.dispatch('loadData');
	}
});
</script>

<style scoped>
ion-menu ion-content {
	--background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
	--padding-start: 8px;
	--padding-end: 8px;
	--padding-top: 20px;
	--padding-bottom: 20px;
}

ion-menu.md ion-list {
	padding: 20px 0;
}

ion-menu.md ion-note {
	margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
	padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
	border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
	font-size: 22px;
	font-weight: 600;

	min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
	font-size: 16px;

	margin-bottom: 18px;

	color: #757575;

	min-height: 26px;
}

ion-menu.md ion-item {
	--padding-start: 10px;
	--padding-end: 10px;
	border-radius: 4px;
}

ion-menu.md ion-item.selected {
	--background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
	color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
	color: #616e7e;
}

ion-menu.md ion-item ion-label {
	font-weight: 500;
}

ion-menu.ios ion-content {
	--padding-bottom: 20px;
}

ion-menu.ios ion-list {
	padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
	line-height: 24px;
	margin-bottom: 20px;
}

ion-menu.ios ion-item {
	--padding-start: 16px;
	--padding-end: 16px;
	--min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
	color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
	font-size: 24px;
	color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
	margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
	padding-left: 16px;
	padding-right: 16px;
}

ion-menu.ios ion-note {
	margin-bottom: 8px;
}

ion-note {
	display: inline-block;
	font-size: 16px;

	color: var(--ion-color-medium-shade);
}

ion-item.selected {
	--color: var(--ion-color-primary);
}

ion-button.dropdown-button {
	text-align: start;
	padding-left: 0;
	padding-right: auto;
}
</style>
