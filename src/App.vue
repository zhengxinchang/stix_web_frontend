<template>
  <v-app app>
    <v-sheet class="py-2 " style="border-bottom: #7FC9C2FF solid 2px" width="100%"  >
      <v-row >
        <v-spacer></v-spacer>
        <v-col cols="12" xl="2" lg="2" md="2" sm="12">
          <v-sheet  style="z-index: 999"  class="d-flex flex-row justify-center z-transparent">
            <v-sheet class="mx-1" rounded elevation="8" height="60" width="60" dark color="teal" >
              <img :src="logo.img" style="width: 100%; height: 100%"
                   />
            </v-sheet>
          </v-sheet>
        </v-col>
        <v-col cols="12" xl="9" lg="9" md="9" sm="12">
          <v-tabs grow  :color="$store.state.mainColorDarken" >
            <v-tab to="/" style="text-transform: none"><v-icon>mdi-home-variant-outline</v-icon>Home </v-tab>
            <v-divider vertical inset class="mx-1"></v-divider>
            <v-tab to="/search" style="text-transform: none"><v-icon>mdi-magnify-expand</v-icon>Query</v-tab>

<!--            <v-divider vertical inset class="mx-1"></v-divider>-->
<!--            <v-tab style="text-transform: none"><v-icon>mdi-connection</v-icon>API </v-tab>-->
            <v-divider vertical inset class="mx-1"></v-divider>
            <v-tab style="text-transform: none"><v-icon>mdi-heart</v-icon>Help </v-tab>
          </v-tabs>

        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-sheet>
      <v-sheet class="z-transparent py-3" min-height="600" >
        <router-view/>

      </v-sheet>


    <v-sheet class="footer d-flex justify-center" >

      <v-sheet class="z-transparent" width="1200" min-height="200">
        <v-row>
          <v-col cols="8" offset="2">
            <v-row dense>

              <v-col cols="12" xl="5" lg="5" md="5" sm="12">
                <v-sheet  style="min-height: 100px;margin-top: 10px; " class=" z-transparent d-flex flex-row justify-start"  >
                  <v-img height="80" contain :src="require('../public/imgs/BCM.png')" ></v-img>
                  <v-img height="100" width="100" contain :src="require('../public/imgs/hgsc.png')"></v-img>

                </v-sheet>
                <v-sheet class="z-transparent text-body-2">

                    Human Genome Sequencing Center<br/>
                    ©1998-2023 Baylor College of Medicine® | One Baylor Plaza, Houston, Texas 77030

                </v-sheet>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" xl="5" lg="5" md="5" sm="12">
                <v-sheet  style="min-height: 100px;margin-top: 10px; " class=" z-transparent">
                    <v-img height="100"  contain  :src="require('../public/imgs/ucboulder-all.png')"></v-img>
                </v-sheet>
                <v-sheet class="z-transparent text-body-2">
                  University of Colorado Boulder<br/>
                  © Regents of the University of Colorado
                </v-sheet>
              </v-col>

            </v-row>
          </v-col>
        </v-row>
      </v-sheet>

    </v-sheet>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    logo: {
      href: "https://github.com/ryanlayer/stix",
      img: require('../public/imgs/STIX.2.5in.small.png'),
    },
  }),
};
</script>
<style lang="scss" scoped>

.footer {
  border-top: #25839f solid 5px;
  border-bottom: #0c64b6 solid 2px;
  background-color: #f4ece3;
}
.z-transparent {
  background-color: transparent !important;
  opacity: 2;
  border-color: transparent !important;
}

</style>