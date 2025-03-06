<script>

import _ from 'lodash';
import axios from 'axios';

export default {
  name: "SearchLongRead",
  data() {
    return {
      opt_refver: [{
        display: "GRCh38", val: "lrgrch38",
      }, {
        display: "CHM13-T2T", val: "lrchm13",
      }],
      opt_svtype: [
        {display: "Deletion", val: "DEL"},
        {display: "Insertion", val: "INS"},
        {display: "Duplication", val: "DUP"},
        {display: "Inversion", val: "INV"},
        {display: "Translocation", val: "BND"},
      ],
      val_refver: null,
      val_left_break: null,
      val_right_break: null,
      val_svtype: null,
      val_slop: null,

      examples: [
        {
          val_refver: "lrgrch38",
          val_left_break: "1:964666-964676",
          val_right_break: "1:964744-964754",
          val_svtype: "DEL",
          val_slop: 100,
        }
      ],
      err_msg: [],
      msg: [],
      results: null,
      results_query_sv: {
        val_refver: null,
        val_left_break: null,
        val_right_break: null,
        val_svtype: null,
        val_slop: null,
      },
      is_loading: false,
      long_read_meta: null,
      plotOption: {},
      evidence_stats: {},
      evidence_table: [],
      min_reads: 5,
    }
  },
  methods: {
    add_example(example) {
      this.val_refver = example.val_refver;
      this.val_left_break = example.val_left_break;
      this.val_right_break = example.val_right_break;
      this.val_svtype = example.val_svtype;
      this.val_slop = example.val_slop;
    },
    clear() {
      this.val_refver = null;
      this.val_left_break = null;
      this.val_right_break = null;
      this.val_svtype = null;
      this.val_slop = null;
      this.err_msg = [];
      this.msg = [];
      // this.results = {};
    },
    clean_val(k) {

      if (k === 'refver') {
        this.val_refver = null;
      } else if (k === 'slop') {
        this.val_slop = null;
      } else if (k === 'svtype') {
        this.val_svtype = null;
      } else if (k === 'left') {
        this.val_left_break = null;
      } else if (k === 'right') {
        this.val_right_break = null;
      }
    },
    validation() {
      this.err_msg = [];
      this.msg = [];

      let missing_val = [];
      if (this.val_refver == null) {
        missing_val.push("Reference")
      }
      if (this.val_left_break == null) {
        missing_val.push("Left-breakpoint")
      }
      if (this.val_right_break == null) {
        missing_val.push("Right-breakpoint")
      }
      if (this.val_svtype == null) {
        missing_val.push("SV type")
      }
      if (this.val_slop == null) {
        missing_val.push("Padding base pairs")
      }

      if (missing_val.length > 0) {
        this.err_msg.push(`Found empty values: ${missing_val.join(", ")}`);
      }

      // this.val_slop must be positive integer

      if (!(_.isNumber(this.val_slop) && this.val_slop > 0)) {
        this.err_msg.push(`Padding base pairs should be positive integer`);
      }

      const regex = /^(?:chr)?([1-9]|1[0-9]|2[0-2]|X|Y|MT):(\d+)-(\d+)$/;

      function validateFormat(input) {
        const match = input.match(regex);
        if (match) {
          const [, chr, start, end] = match.map(Number);
          return start <= end; // 确保起始位置小于等于终止位置
        }
        return false;
      }

      if (!validateFormat(this.val_left_break)) {
        this.err_msg.push(`Left break format is not correct, please use format like "1:1682238-1686375" `);
      }

      if (!validateFormat(this.val_right_break)) {
        this.err_msg.push(`Right break format is not correct, please use format like "1:1682238-1686375" `);
      }


    },
    loadLongReadMeta() {
      fetch('/stix/long-read-meta.json')
          .then(response => response.json())
          .then(data => {
            console.log(data)
            this.long_read_meta = data // 存储到组件数据中
          })
          .catch(error => console.error('Can not load long-read-meta:', error))
    },
    retrieve() {

      // check parameters

      this.validation();

      if (this.err_msg.length > 0) {
        return null;
      }

      this.is_loading = true;
      this.results = {};
      this.msg = [`querying SV`];


      this.results_query_sv.val_refver = this.val_refver;
      this.results_query_sv.val_left_break = this.val_left_break;
      this.results_query_sv.val_right_break = this.val_right_break;
      this.results_query_sv.val_svtype = this.val_svtype;
      this.results_query_sv.val_slop = this.val_slop;


      let url = `https://stix.colorado.edu/${this.val_refver}/`;
      axios.get(url, {
        params: {
          left: this.val_left_break,
          right: this.val_right_break,
          svtype: this.val_svtype,
          slop: this.val_slop,
          raw: true,
        }

      }).then(res => {
        this.msg = [`result retrieved`];
        this.results = res.data && res.data.results && res.data.results.samples || null;
        this.is_loading = false;


        this.postProcessResults();
        this.processPlotData();

        console.log(this.results)

      }).finally(() => {
        this.is_loading = false;
      });

      if (this.results == null) {

      }


    },
    postProcessResults() {

      this.results = this.results.map(item => {

        let realsample = item['Sample'].split(".")[0];
        let source = item['Sample'].split(".")[1];

        item.realsample = realsample;
        item.source = source;
        let meta = this.long_read_meta[realsample] || null;

        if (meta != null) {
          item.Sex = meta['Sex'];
          item.population = meta['Population'];
          item.Super_population = meta['Super_Population'];
        } else {
          item.Sex = null;
          item.population = null;
          item.Super_population = null;
        }

        return item;

      })

    },
    processPlotData() {

      let evidence_count = {};
      let evidence_count_suppop = {};

      this.results.forEach(item => {
        if (evidence_count.hasOwnProperty(item['Split'])) {
          evidence_count[item['Split']] += 1;
        } else {
          evidence_count[item['Split']] = 1;
        }

        if (!evidence_count_suppop.hasOwnProperty(item['Super_population'])) {

          evidence_count_suppop[item['Super_population']] = {}

        }

        if (evidence_count_suppop[item['Super_population']].hasOwnProperty(item['Split'])) {
          evidence_count_suppop[item['Super_population']][item['Split']] += 1;
        } else {
          evidence_count_suppop[item['Super_population']][item['Split']] = 1;
        }

      })

      evidence_count = Object.entries(evidence_count)
          .sort(([keyA], [keyB]) => Number(keyA) - Number(keyB))

      console.log(evidence_count);

      let evidence_count_obj = Object.fromEntries(evidence_count);

      console.log(evidence_count_obj);
      console.log(evidence_count_suppop);

      this.evidence_stats = {...{"ALL": evidence_count_obj}, ...evidence_count_suppop};

      console.log(this.evidence_stats);


      this.updateFreqTable();

      let keylist = [];
      let vallist = [];
      for (const [k, v] of Object.entries(evidence_count)) {
        keylist.push(k);
        vallist.push(v);
      }


      this.plotOption = {
        title: {
          text: 'Evidence depth histogram'
        },
        tooltip: {},
        xAxis: {
          data: keylist,
          name: 'Evidence Depth(Support Reads)',  // X轴标签
          nameLocation: 'middle',
          nameGap: 30,  // 名称与轴线之间的距离
          axisLabel: {
            rotate: 0  // 如果X轴标签太长，可以设置旋转角度
          }
        },
        yAxis: {
          name: 'Sample Count',  // Y轴标签
          nameLocation: 'middle',
          nameGap: 40  // 名称与轴线之间的距离
        },
        series: [
          {
            name: 'Minimal Support Reads',
            type: 'bar',
            data: vallist,
            markLine: {
              symbol: ['none', 'none'],
              label: {
                formatter: 'Minimal Support Reads'
              },
              lineStyle: {
                color: '#FF0000',
                type: 'solid',
                width: 2
              },
              data: [
                { xAxis: this.min_reads }
              ]
            }
          }
        ],
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true,
              title: 'Save as Image',
              name: 'evidence_depth_histogram',
              type: 'png'
            }
          }
        }
      }

    },
    updateFreqTable(){
      this.evidence_table = [];
      for (const [label, counts] of Object.entries(this.evidence_stats)) {

        let total = 0;
        let hit = 0;

        for (const [evidence, count] of Object.entries(counts)) {
          total = total + Number(count);
          if (Number(evidence) >= this.min_reads) {
            hit = hit + Number(count);
          }


        }
        let freq = hit / total * 100;
        this.evidence_table.push({
          category: label,
          size: total,
          hit: hit,
          freq: freq,
        })

      }
      console.log(this.evidence_table);
    },
  },
  mounted() {
    this.loadLongReadMeta();
    // console.log(this.long_read_meta);
  },
  watch:{

    'min_reads':{
      handler:function(newval){
        if (newval <=0){
          this.min_reads = 1;
        }
        this.updateFreqTable();
        this.plotOption.series[0].markLine.data[0].xAxis = this.min_reads;
      },
      immediate:true,
      deep:true
    }
  }

}
</script>

<template>

  <v-row>
    <v-col cols="12" lg="2" md="3" sm="12" xl="2">
      <v-card class=" ma-1">
        <v-card-subtitle>
          <v-icon>mdi-magnify</v-icon>
          Search
        </v-card-subtitle>
        <v-card-text>
          <v-select v-model="val_refver" :items="opt_refver" class="mb-2" dense hide-details item-text="display"
                    item-value="val" label="reference" outlined></v-select>
          <v-text-field v-model="val_left_break" class="mb-2" dense hide-details label="left-breakpoint"
                        outlined></v-text-field>
          <v-text-field v-model="val_right_break" class="mb-2" dense hide-details label="right-breakpoint"
                        outlined></v-text-field>
          <v-select v-model="val_svtype" :items="opt_svtype" class="mb-2" dense hide-details item-text="display"
                    item-value="val" label="SV Type" outlined></v-select>
          <v-text-field v-model.number="val_slop" class="mb-2" dense hide-details label="padding base pairs"
                        outlined></v-text-field>
          <v-row>
            <v-col cols="12">
              Examples: <a href="#" @click="add_example(examples[0])"> #1 </a>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="6">
              <v-btn :color="$store.state.mainColor" small width="100%" @click="clear">
                <v-icon small>mdi-close</v-icon>
                clear
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn :color="$store.state.mainColor" small width="100%" @click="retrieve">
                <v-icon small>mdi-rocket</v-icon>
                Query
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>

      </v-card>
      <v-card class="ml-1 mr-1 mt-5">
        <v-card-subtitle>
          <v-icon>mdi-mailbox</v-icon>
          Message
        </v-card-subtitle>
        <v-card-text>

          <v-sheet class="overflow-y-auto" max-height="200" min-height="200">
            <div v-for="(m,idx) in err_msg" :key="idx" class="text-body-2">{{ idx + 1 }}: {{ m }}</div>
            <div v-for="(m,idx) in msg" :key="idx" class="text-body-2">{{ m }}</div>
          </v-sheet>


        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" lg="10" md="9" sm="12" xl="10">
      <v-card class=" ma-1">
        <v-card-subtitle>
          <v-icon>mdi-book</v-icon>
          Result
        </v-card-subtitle>
        <v-card-text>
          <v-sheet min-height="600">
            <v-row>
              <v-col cols="12">
                &nbsp; <b>Query SV:</b> &nbsp;
                <v-chip v-show="results_query_sv.val_refver != null" :color="$store.state.mainColor" class="mr-2" label
                        small
                        @click:close="clean_val('refver')"><b>Index</b>&nbsp; {{ results_query_sv.val_refver }}
                </v-chip>
                <v-chip v-show="results_query_sv.val_left_break != null" :color="$store.state.mainColor" class="mr-2"
                        label small
                        @click:close="clean_val('left')"><b>Left</b>&nbsp;{{ results_query_sv.val_left_break }}
                </v-chip>
                <v-chip v-show="results_query_sv.val_right_break != null" :color="$store.state.mainColor" class="mr-2"
                        label small
                        @click:close="clean_val('right')"><b>Right</b>&nbsp;{{ results_query_sv.val_right_break }}
                </v-chip>
                <v-chip v-show="results_query_sv.val_svtype != null" :color="$store.state.mainColor" class="mr-2" label
                        small
                        @click:close="clean_val('svtype')"><b>SV Type</b>&nbsp;{{ results_query_sv.val_svtype }}
                </v-chip>
                <v-chip v-show="results_query_sv.val_slop != null" :color="$store.state.mainColor" class="mr-2" label
                        small
                        @click:close="clean_val('slop')"><b>Padding bp</b>&nbsp;{{ results_query_sv.val_slop }}
                </v-chip>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">

                <v-progress-linear
                    v-show="is_loading"
                    :color="$store.state.mainColor"
                    indeterminate
                ></v-progress-linear>

                <v-row>
                  <v-col cols="8" lg="8" md="8" sm="8" xl="8" xs="8">
                    <v-sheet v-show="!is_loading " height="400">

                      <v-chart :option="plotOption" class="chart"></v-chart>

                    </v-sheet>

                  </v-col>
                  <v-col cols="4" lg="4" md="4" sm="4" xl="4" xs="4">

                    <v-sheet v-show="!is_loading && results != null">
<!--                    <v-sheet >-->
                      <v-row >
                        <v-col>
                          <v-text-field append-icon="mdi-plus"
                                        label="Minimal Support Read"
                                        outlined
                                        dense
                                        v-model="min_reads"

                                        @click:append="min_reads+=1"
                          >
                            <template v-slot:prepend-inner>
                              <v-icon @click="min_reads-=1" >mdi-minus</v-icon>
                            </template>

                          </v-text-field>
                        </v-col>
                        <v-col>

                        </v-col>
                      </v-row>


                      <v-simple-table

                      >
                        <thead>
                        <th>Population</th>
                        <th>Frequency(%)</th>
                        <th>Sample Size</th>
                        </thead>
                        <tbody>

                        <tr v-for="item in evidence_table">
                          <td>{{ item.category }}</td>
                          <td>{{ item.freq.toFixed(2) }}</td>
                          <td>{{ item.size }}</td>
                        </tr>

                        </tbody>
                      </v-simple-table>
                    </v-sheet>


                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>
      </v-card>

    </v-col>


  </v-row>


</template>

<style scoped>

</style>