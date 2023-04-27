<template>
  <v-sheet>
    <v-sheet class="text-center " color="teal lighten-3" style="padding-bottom: 150px">

      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="11">
          <v-sheet class="d-flex text-h4 z-transparent mt-2">
            STIX2: Ultra-fast search engine for Structural Variation in large cohorts
          </v-sheet>
          <v-card class="mt-6 pa-2 " elevation="8">
            <v-row>
              <v-col cols="12" lg="7" md="12" sm="12" xl="7">
                <v-row>
                  <v-col cols="12">
                    <v-card elevation="0" style="text-align: left">
                      <v-card-subtitle>
                        <v-icon>mdi-turbine</v-icon>
                        About
                      </v-card-subtitle>
                      <v-card-text class="text-justify">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad at, cum deserunt
                        excepturi inventore voluptate! Accusamus autem, dignissimos, dolor eum incidunt inventore libero
                        nisi qui quia sint unde voluptas?
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid architecto assumenda
                        consequuntur excepturi explicabo, hic impedit laudantium nostrum nulla provident, quam quas
                        quibusdam, sint soluta tempore temporibus velit voluptatum.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam asperiores, commodi
                        consequatur cumque cupiditate deserunt dolor, fuga incidunt minima nesciunt nihil non,
                        perferendis quam quia recusandae reiciendis sequi ullam?
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto asperiores blanditiis
                        consequuntur dolor eaque expedita incidunt itaque laborum laudantium neque nobis nostrum odit
                        praesentium quia recusandae suscipit ullam, unde voluptatibus.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consequatur illo ipsa libero magni
                        molestias mollitia nostrum ratione sed suscipit! Corporis ea eius id inventore molestiae neque
                        porro quam saepe!
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col cols="12">
                    <v-card elevation="0">
                      <v-card-subtitle class="text-left  text-body-2">
                        <v-icon small>mdi-information-outline</v-icon>
                        To get the best experience, please visit us using the latest version of Google Chrome or
                        Microsoft Edge.
                      </v-card-subtitle>

                    </v-card>
                  </v-col>

                </v-row>
              </v-col>
              <v-col cols="12" lg="5" md="12" sm="12" xl="5">
                <v-row>
                  <v-col cols="12">
                    <v-card elevation="0" style="text-align: left">
                      <v-card-subtitle>
                        <v-icon>mdi-chart-bar-stacked</v-icon>
                        Statistic
                      </v-card-subtitle>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-sheet>
    <v-sheet class="text-center " color="cyan lighten-3">
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="11">
          <v-row dense>
            <v-col cols="12" lg="3" md="6" sm="12" xl="3">
              <v-card :style="{marginTop: changeOffset($vuetify.breakpoint.name,isTop=true,isTop2=true)}" elevation="8"
                      height="300">
                <v-card-subtitle class="text-left">
                  <v-icon>mdi-newspaper-variant-multiple-outline</v-icon>
                  Updates
                </v-card-subtitle>
                <v-card-text>
                  <v-sheet class="overflow-y-auto mx-2" height="220">
                    <v-timeline align-top dense>
                      <v-timeline-item v-for="(item,idx) in news" :key="idx" color="teal lighten-1" fill-dot
                                       icon="mdi-star" small>
                        <v-row class="mr-2" justify="space-between">
                          <v-col class="text-left" cols="12">
                            {{ item.date }} &nbsp;
                            {{ item.text }}
                          </v-col>
                        </v-row>
                      </v-timeline-item>

                    </v-timeline>
                  </v-sheet>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" lg="3" md="6" sm="12" xl="3">
              <v-card :style="{marginTop: changeOffset($vuetify.breakpoint.name,isTop=true,isTop2=false)}" elevation="8"
                      height="300">
                <v-card-subtitle class="text-left">
                  <v-icon>mdi-earth</v-icon>
                  Global visitors
                </v-card-subtitle>
                <v-card-text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, adipisci architecto
                  blanditiis corporis cumque debitis delectus earum facilis illo, modi nam optio perferendis provident
                  quam quasi sed velit veritatis, voluptatem!
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" lg="3" md="6" sm="12" xl="3">
              <v-card :style="{marginTop: changeOffset($vuetify.breakpoint.name,isTop=false)}" elevation="8"
                      height="300">
                <v-card-subtitle class="text-left">
                  <v-icon>mdi-cog-outline</v-icon>
                  Tools
                </v-card-subtitle>
                <v-card-text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, adipisci architecto
                  blanditiis corporis cumque debitis delectus earum facilis illo, modi nam optio perferendis provident
                  quam quasi sed velit veritatis, voluptatem!
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" lg="3" md="6" sm="12" xl="3">
              <v-card :style="{marginTop: changeOffset($vuetify.breakpoint.name,isTop=false)}" elevation="8"
                      height="300">
                <v-card-subtitle class="text-left">
                  <v-icon>mdi-link-variant</v-icon>
                  Related Resources
                </v-card-subtitle>
                <v-card-text>
                  <v-list class="overflow-y-auto overflow-x-hidden" max-height="220">
                    <v-list-item v-for="(item,idx) in relatedlinks" :key="idx" :href="item.href" class="align--center"
                                 target="_blank">
                      <v-sheet class="text-left align--center">
                        <v-icon small>mdi-link-variant</v-icon> &nbsp;
                        <span class="black--text text-body-2 font-weight-bold mr-3" style="white-space: nowrap">{{
                            item.name
                          }}</span>

                        <img :src="item.logo" height="20"
                             style="display: inline-block;border: 1px solid darkgrey"/>
                      </v-sheet>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <v-card elevation="8">
                <v-card-subtitle class="text-left">
                  <v-icon>mdi-format-quote-open-outline</v-icon>
                  Citations
                </v-card-subtitle>
                <v-card-text class="text-left">
                  <v-icon small>mdi-format-quote-open-outline</v-icon>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, adipisci architecto
                  blanditiis corporis cumque debitis delectus earum facilis illo, modi nam optio perferendis provident
                  quam quasi sed velit veritatis, voluptatem!
                </v-card-text>

              </v-card>
            </v-col>
          </v-row>

        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-sheet>
  </v-sheet>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      news: [
        {
          date: "[2023/05/11]",
          text: 'r sit amet, consectetur a'
        },
        {
          date: "[2023/04/11]",
          text: 'corporis cumque debitis delectus earum '
        },
      ],
      relatedlinks: [
        {
          href: "https://pubchem.ncbi.nlm.nih.gov/",
          icon: "mdi-link-variant",
          name: "PubChem",
          logo: require('../../public/imgs/related_resource_pubchem.png'),
        },
        {
          href: "https://ngdc.cncb.ac.cn/ccas/#/",
          icon: "mdi-link-variant",
          name: "CCAS",
          logo: require('../../public/imgs/CCASlogo.png'),
        },
        {
          href: "https://ngdc.cncb.ac.cn/ascancer/home",
          icon: "mdi-link-variant",
          name: "ASCancer Atlas",
          logo: require('../../public/imgs/ascancer_atlas.png'),
        },
        {
          href: "https://ngdc.cncb.ac.cn/gsa-human/",
          icon: "mdi-link-variant",
          name: "GSA-Human",
          logo: require('../../public/imgs/gsahuman.png'),
        },
        {
          href: "https://ngdc.cncb.ac.cn/omix/",
          icon: "mdi-link-variant",
          name: "OMIX",
          logo: require('../../public/imgs/omix.png'),
        },
        {
          href: "https://ngdc.cncb.ac.cn/cancerscem/",
          icon: "mdi-link-variant",
          name: "CancerSCEM",
          logo: require('../../public/imgs/cancersem.png'),
        },

      ]
    }
  },
  methods: {
    changeOffset(breakpointName, isTop = false, isTop2 = false) {
      console.log(breakpointName)
      switch (breakpointName) {
        case 'lg':
          return '-120px'
        case 'xl':
          return '-120px'
        case 'xs':
          if (isTop2) {
            return '-120px'
          } else {
            return '12px'
          }
        case 'sm':
          if (isTop2) {
            return '-120px'
          } else {
            return '12px'
          }
        default:
          if (isTop) {
            return '-120px'

          } else {
            return '12px'
          }
      }

      // (( $vuetify.breakpoint.name == 'lg' ||  $vuetify.breakpoint.name == 'xl') ? '-120px' : '12px')
    }
  }
}
</script>

<style lang="scss" scoped>

.z-transparent {
  background-color: transparent !important;
  opacity: 2;
  border-color: transparent !important;
}

//$btn-text-transform: none;
.v-btn {
  text-transform: capitalize;
}

@import "~vuetify/src/components/VBtn/_variables.scss";

</style>