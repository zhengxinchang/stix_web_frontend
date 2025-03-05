<template>
<v-sheet>

<v-row>
  <v-spacer></v-spacer>
  <v-col cols="11">
    <v-breadcrumbs :items="[{ text: 'STIX',disable:true},{ text: 'Batch Annotation',disable:true},]" ></v-breadcrumbs>
    <v-sheet elevation="2" outlined >

      <v-card>
        <v-card-subtitle>submit a task</v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col xl="2" lg="2" md="3" sm="12" cols="12">
              <v-select hide-details label="Reference" outlined  dense class="mb-2"></v-select>
              <v-select hide-details label="Index" outlined  dense class="mb-2"></v-select>
              <v-text-field hide-details outlined dense  label="email" class="mb-2"></v-text-field>
              <v-file-input hide-details outlined dense prepend-icon=""  e label="vcf file" class="mb-2"s></v-file-input>
              <v-row dense  >
                <v-col cols="6"><v-btn width="100%" :color="$store.state.mainColor" small ><v-icon small>mdi-refresh</v-icon> reset</v-btn></v-col>
                <v-col cols="6"><v-btn width="100%"  :color="$store.state.mainColor" small ><v-icon small>mdi-rocket</v-icon> submit</v-btn></v-col>

              </v-row>
            </v-col>
            <v-col xl="10" lg="10" md="9" sm="12" cols="12">
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-sheet>
  </v-col>
  <v-spacer></v-spacer>
</v-row>
</v-sheet>
</template>

<script>
export default {
  name: "batchAnno",
  data(){
    return{
      tab:0,
    }
  }
}
</script>

<style scoped>

</style>