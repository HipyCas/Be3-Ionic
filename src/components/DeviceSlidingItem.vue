<template>
    <ion-item-sliding v-for="device in offlineDevices" :key="device.id" :inset="true">
        <!-- Left side options: Delete (expandable) -->
        <ion-item-options side="start">
            <ion-item-option color="danger" expandable>
                <ion-icon slot="top" :md="trashBinSharp" :ios="trashBinOutline"></ion-icon>
                Delete
            </ion-item-option>
        </ion-item-options>
        <!-- Item content -->
        <ion-item :router-link="`/devices/device/${device.id}`">
            <ion-label>
                <h6>{{ device.name }}</h6>
                <p>{{ device.location }}</p>
            </ion-label>
        </ion-item>
        <!-- Right side options: edit + more -->
        <ion-item-options side="end">
            <ion-item-option color="primary">
                <ion-icon slot="top" :md="createSharp" :ios="createOutline"></ion-icon>
                Edit
            </ion-item-option>
            <ion-item-option @click="moreActionSheet(device)" color="light" expandable>
                <ion-icon slot="top" :md="ellipsisHorizontalSharp" :ios="ellipsisVerticalOutline"></ion-icon>
                More
            </ion-item-option>
        </ion-item-options>
    </ion-item-sliding>
</template>

<script>
import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonIcon, } from '@ionic/vue';

export default {
    'name': 'DeviceSlidingItem',
    props: ['device'],
    components: { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonIcon, },
}
</script>

<style>

</style>
