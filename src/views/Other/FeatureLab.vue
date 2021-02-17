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
		<ion-content>
			<FullPageText
        title="Work in progress"
        text="We are currently working on Feature Lab, come back soon"
      ></FullPageText>
	</ion-page>
</template>

<script>
import FullPageText from '@/components/FullPageText.vue';

export default {
	name: 'OtherFeatureLab',
	components: { FullPageText },
};
</script>

<style></style>
