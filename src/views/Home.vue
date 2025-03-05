<template>
  <v-sheet>
    <v-sheet class="text-center " color="teal lighten-3" style="padding-bottom: 150px">

      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="11">
          <v-sheet class="d-flex text-h4 z-transparent mt-2">
            STIX: Ranking Structural Variation by Population Frequency Annotation
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
                        STIX webserver is a platform for structural variant (SV) analysis, enabling population frequency
                        estimation and variant prioritization using both short-read and long-read sequencing data.
                        Unlike traditional methods that rely on variant calls, STIX indexes and searches raw alignments
                        from thousands of samples, providing comprehensive SV annotation.
                        <br/>
                        STIX enables SV annotation by indexing both short-read and long-read alignments, allowing
                        comprehensive population frequency estimation and variant analysis. It supports both GRCh38 and
                        CHM13-T2T references, ensuring broad applicability across different genomic datasets. In
                        addition to population frequency estimation, STIX facilitates SV prioritization, helping to
                        distinguish common variants from potentially pathogenic ones and supporting the study of mosaic
                        SVs. For more details, please refer to our publications.
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
                      <v-card-text style="min-height: 250px">
                        <v-row>
                          <v-spacer></v-spacer>
                          <v-col cols="11">
                            <v-row>
                              <v-col v-for="item in stats.data" :key="item.name" class="pa-0" cols="12" lg="6" md="6"
                                     sm="6" xl="6">
                                <v-hover v-slot="{ hover }">
                                  <v-card
                                      :elevation="hover?4:0"
                                      :to="item.to"
                                      class="ma-1 d-flex justify-center "
                                      height="100"
                                      tile
                                  >

                                    <v-sheet class="pt-6 ">
                                      <!--                                    <v-sheet class="px-auto ">-->
                                      <v-progress-circular
                                          v-show="stats.isShow==null"
                                          :color="$store.state.mainColor"
                                          :size="45"
                                          :width="7"
                                          indeterminate

                                      ></v-progress-circular>

                                      <div v-show="stats.isShow !=null" :style="{color: $store.state.mainColor}"
                                           class="text-h6"
                                      >
                                        <v-icon :color="item.color">{{ item.icon }} mdi-36px</v-icon>
                                        {{ item.num }}
                                      </div>
                                      <v-divider dark></v-divider>

                                      <div :style="{color: $store.state.mainColor}" class="text-center"
                                           v-html="item.name"></div>
                                    </v-sheet>

                                  </v-card>
                                </v-hover>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-spacer></v-spacer>
                        </v-row>
                      </v-card-text>
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
              <v-card :style="{marginTop: changeOffset($vuetify.breakpoint.name,isTop=false)}" elevation="8"
                      height="300">
                <v-card-subtitle class="text-left">
                  <v-icon>mdi-format-quote-open-outline</v-icon>
                  Citations
                </v-card-subtitle>
                <v-card-text class="text-left">

                  <v-icon small>mdi-format-quote-open-outline</v-icon>

                  Chowdhury, M., Pedersen, B.S., Sedlazeck, F.J. et al. Searching thousands of genomes to classify
                  somatic and novel structural variants using STIX. Nat Methods 19, 445–448 (2022). DOI:<a
                    href="https://www.nature.com/articles/s41592-022-01423-4"
                    target="_blank">10.1038/s41592-022-01423-4</a>
                  <br/>
                  <v-icon small>mdi-format-quote-open-outline</v-icon>
                  Xinchang Zheng, Murad Chowdhury, Behzod Mirpochoev, Aaron Clauset, Ryan M Layer, Fritz J Sedlazeck.
                  STIX: Long-reads based Accurate Structural Variation Annotation at Population Scale. BioRxiv DOI: <a
                    href="https://www.biorxiv.org/content/10.1101/2024.09.30.615931v1" target="_blank">10.1101/2024.09.30.615931v1</a>


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
                      </v-sheet>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" lg="3" md="6" sm="12" xl="3">
              <v-card :style="{marginTop: changeOffset($vuetify.breakpoint.name,isTop=true,isTop2=false)}" elevation="8"
                      height="300">
                <v-card-subtitle class="text-left">
                  <v-icon>mdi-link</v-icon>
                  Related resource
                </v-card-subtitle>
                <v-card-text>

                  <v-list>
                    <v-list-item href="https://www.internationalgenome.org/" target="_blank"><v-icon>mdi-link</v-icon> 1000 Genomes Project </v-list-item>
                    <v-list-item href="https://gnomad.broadinstitute.org/" target="_blank"><v-icon>mdi-link</v-icon> gnomAD </v-list-item>
                  </v-list>

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
          date: "[Mar/4/2025]",
          text: 'New front-end has been released'
        },

      ],
      relatedlinks: [
        {
          href: "https://fritzsedlazeck.github.io/",
          icon: "mdi-link-variant",
          name: "Sedlazeck Lab",
        },
        {
          href: "https://ryanlayerlab.github.io/layerlab/",
          icon: "mdi-link-variant",
          name: "Layer Lab",
        }, {
          href: "https://www.colorado.edu/faculty/clauset/",
          icon: "mdi-link-variant",
          name: "Clauset Lab",
        },

      ],
      stats: {
        data: [
          {
            to: "#",
            name: "Samples",
            icon: "mdi-water",
            color: "red lighten-3",
            num: 3108,
            fontsize: 12,
          },
          {
            to: "#",
            name: "Short-read samples",
            icon: "mdi-alpha-s-box",
            color: "cyan lighten-3",
            num: 2000,
            fontsize: 12,
          },

          {
            to: "#",
            name: "Ancestries",
            icon: "mdi-dna",
            color: "green lighten-3",
            num: 5,
            fontsize: 12,
          },
          {
            to: "#",
            name: "Long-read samples",
            icon: " mdi-alpha-l-box",
            color: "blue lighten-3",
            num: 1108,
            fontsize: 12,
          },
        ],
        isShow: null
      }
    }
  },
  methods: {
    changeOffset(breakpointName, isTop = false, isTop2 = false) {
      // console.log(breakpointName)
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
  },
  mounted() {

    // const script = document.createElement('script');
    // script.type = 'text/javascript';
    // script.src = '//rf.revolvermaps.com/0/0/7.js?i=5kw240okzxt&m=1&c=ff0000&cr1=ffffff&sx=0';
    // script.async = true;
    //
    // // 将 <script> 元素添加到页面
    // document.body.appendChild(script);

    setTimeout(() => {
      this.stats.isShow = true;
    }, 1000)
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