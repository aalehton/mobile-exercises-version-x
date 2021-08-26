<template>
  <view class="container">
    <view v-if="loading"><text>Ladataan...</text></view>      
    <scroll-view  v-if="!loading">
      <view class="sodexo">
        <text class="title">{{title}} {{timeperiod}}</text>
      </view>
      <view class="mealdates">
          <mealDate-item
            v-for="mealdate in mealdates"
            :key="mealdate.date"
            :item="mealdate"
          />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import MealDateItem from "./MealDateItem"

export default {
  name: "Sodexo",
  data() {
    return {
      title: '',
      timeperiod: '',
      mealdates: [],
      loading: true
    };
  },
  methods: {
    getSodexoData() {
      fetch("https://www.sodexo.fi/ruokalistat/output/weekly_json/7498")
        .then(response => response.json())
        .then(data => {
          this.title = data.meta.ref_title,
          this.timeperiod = data.timeperiod,
          this.mealdates = data.mealdates
        });
        this.loading = false
    }
  },
  beforeMount(){
    this.getSodexoData()
 },
};
</script>

<style>
.container {
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-top: 30;
}
.sodexo {
  align-items: center;
}
.mealdates {
  align-items: flex-start;
}
.title {
  color: green;
  font-size: 20px;
}
</style>