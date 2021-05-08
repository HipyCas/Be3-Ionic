<template>
  <ion-page>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Temperature - Temperature</ion-card-title>
          <ion-card-subtitle
            >Relationship Outside temperature - Inside
            temperature</ion-card-subtitle
          >
        </ion-card-header>
        <ion-card-content>
          <div style="position: relative;">
            <canvas id="ttlchart"> </canvas>
          </div>
        </ion-card-content>
      </ion-card>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Humidity - Humidity</ion-card-title>
          <ion-card-subtitle
            >Relationship Outside humidity - Inside humidity</ion-card-subtitle
          >
        </ion-card-header>
        <ion-card-content>
          <div style="position: relative;">
            <canvas id="hhlchart"> </canvas>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import Chart from 'chart.js';
import { temperaturesLineal, humiditiesLineal } from '../../charts';
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
  data() {
    return {
      //planetChartData,
    };
  },
  computed: {
    records() {
      console.log(`this.records (${this.$store.getters.records.length}):`);
      this.$store.getters.records.forEach(r => {
        console.log(`${r}: {`);
        console.log(`\tinside_temp: ${r.inside_temp},`);
        console.log(`\toutside_temp: ${r.outside_temp}`);
        console.log('}');
      });
      return this.$store.getters.records;
    },
    ttdata() {
      let data = [];
      this.records.forEach(record => {
        console.log(
          `Pushing for record id ${record.id}: {x: ${record.outside_temp}, y: ${record.inside_temp}}`
        );
        data.push({
          x: record.outside_temp,
          y: record.inside_temp,
          r: Math.abs(record.outside_temp - record.inside_temp),
        });
      });
      console.info(`Data (${data.length}):`);
      data.forEach(d => {
        console.log(`x: ${d.x}, y: ${d.y}, radius: ${d.r}`);
      });
      return data;
    },
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);

      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
      return myChart;
    },
  },
  mounted() {
    //this.createChart('ttchart', this.planetChartData);
    let get_records = this.$store.getters.records;
    this.createChart('ttlchart', temperaturesLineal(get_records));
    this.createChart('hhlchart', humiditiesLineal(get_records));
  },
};
</script>

<style></style>
