<template>
  <v-sheet>

    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="11">
        <v-breadcrumbs :items="[{ text: 'STIX',disable:true},{ text: 'Search',disable:true},]"></v-breadcrumbs>
        <v-sheet>
          <v-tabs v-model="tab" :color="$store.state.mainColorDarken" centered>
            <v-tab style="text-transform: none">
              <v-icon>mdi-text-long</v-icon>
              Long Read Index
            </v-tab>
            <v-tab style="text-transform: none">
              <v-icon>mdi-text-short</v-icon>
              Short Read Index
            </v-tab>

          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>

            <search-long-read></search-long-read>

            </v-tab-item>
            <v-tab-item>
              short-read
            </v-tab-item>
          </v-tabs-items>
        </v-sheet>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-sheet>
</template>

<script>
import SearchLongRead from "@/views/SearchLongRead.vue";

export default {
  name: "Search",
  components: {SearchLongRead},
  data() {
    return {
      tab: 0,
    }
  }
}
</script>

<style scoped>

</style>