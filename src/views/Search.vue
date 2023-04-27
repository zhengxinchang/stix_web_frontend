<template>
<v-sheet>
<v-row>
  <v-spacer></v-spacer>
  <v-col cols="11">
    <v-sheet>
      <v-tabs :color="$store.state.mainColorDarken" centered v-model="tab">
        <v-tab style="text-transform: none" >By Location</v-tab>
        <v-tab style="text-transform: none" >By Gene</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          aaa
        </v-tab-item>
        <v-tab-item>
          bbb
        </v-tab-item>
      </v-tabs-items>
    </v-sheet>
  </v-col>
  <v-spacer></v-spacer>
</v-row>
</v-sheet>
</template>

<script>
export default {
  name: "Search",
  data(){
    return{
      tab:0,
    }
  }
}
</script>

<style scoped>

</style>