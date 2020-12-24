<template>
	<ion-page>
		<ion-content>
			<full-page-text
				title="Work in progress"
				text="We are currently working hard to get this feature out, stay tunned!"
			></full-page-text>
		</ion-content>
	</ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
import FullPageText from '../../components/FullPageText.vue';
export default {
	name: 'DevicesMap',
	components: { IonPage, IonContent, FullPageText },
	setup() {
		return {};
	},
};
</script>

<style scoped>
#container {
	text-align: center;
	position: absolute;
	left: 0;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
}

#container strong {
	font-size: 20px;
	line-height: 26px;
}
</style>
