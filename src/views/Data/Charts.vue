<template>
    <ion-page>
        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>Temperature - Temperature</ion-card-title>
                    <ion-card-subtitle>Relationship Outside temperature - Inside temperature</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <div style="position: relative;">
                        <canvas id="ttchart">

                        </canvas>
                    </div>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script>
import Chart from 'chart.js';
import {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
} from '@ionic/vue';

export default {
    components: {
        IonPage,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
    },
    computed: {
        records() {
            return this.$store.getters.records;
        },
        ttdata() {
            let data = [];
            for (let record in this.records) {
                data.push({
                    x: record.outside_temp,
                    y: record.inside_temp,
                    r: Math.abs(record.outside_temp - record.inside_temp)
                });
            }
            return data;
        }
    },
    methods: {
        createChart() {
            const ctx = document.getElementById('ttchart');
            let data = [];
            for (let record in this.records) {
                data.push({
                    x: record.outside_temp,
                    y: record.inside_temp,
                    r: Math.abs(record.outside_temp - record.inside_temp)
                });
            }
            const chart = new Chart(ctx, {
                type: 'bubble',
                data: data,
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            return chart;
        }
    },
    mounted() {
        this.createChart();
    }
}
</script>

<style>

</style>
