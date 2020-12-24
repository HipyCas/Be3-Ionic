<template>
    <ion-list lines="inset">
        <ion-item button router-link="/lab">Feature Lab</ion-item>
        <ion-item button href="https://hipycas.gitbook.io/be3" target="_blank">Documentation</ion-item>
        <ion-item button router-link="/about">About</ion-item>
        <ion-item button router-link="/auth/logout">Logout</ion-item>
    </ion-list>
</template>

<script lang="ts">
import { IonList, IonItem } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HeaderOptions',
    components: { IonList, IonItem }
})
</script>
