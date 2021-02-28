<template>
	<ion-page>
		<ion-content>
			<FullPageText
				title="Work in progress"
				text="The Broadcast feature is not available yet, it will be finished soon!"
			/>
		</ion-content>
	</ion-page>
</template>

<script>
import FullPageText from '../../components/FullPageText';
import { IonPage, IonContent } from '@ionic/vue';

export default {
	name: 'MessagesBroadcast',
	components: { FullPageText, IonPage, IonContent },
};
</script>

<style></style>
