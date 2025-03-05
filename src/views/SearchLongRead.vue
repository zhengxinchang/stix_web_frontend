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
      msg:[],
      results: {},
      results_query_sv:{
        val_refver: null,
        val_left_break: null,
        val_right_break: null,
        val_svtype: null,
        val_slop: null,
      },
      is_loading: false,
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
      this.msg=[];
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
        this.results = res.data;
        this.is_loading = false;
      }).finally(() => {
        this.is_loading = false;
      })


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
          <v-text-field v-model.number="val_slop" class="mb-2"   dense hide-details label="padding base pairs"
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
                <v-chip v-show="results_query_sv.val_refver != null" :color="$store.state.mainColor" class="mr-2"  label small
                        @click:close="clean_val('refver')"><b>Index</b>&nbsp; {{ results_query_sv.val_refver }}
                </v-chip>
                <v-chip v-show="results_query_sv.val_left_break != null" :color="$store.state.mainColor" class="mr-2"  label small
                        @click:close="clean_val('left')"><b>Left</b>&nbsp;{{ results_query_sv.val_left_break }}
                </v-chip>
                <v-chip v-show="results_query_sv.val_right_break != null" :color="$store.state.mainColor" class="mr-2"  label small
                        @click:close="clean_val('right')"><b>Right</b>&nbsp;{{ results_query_sv.val_right_break }}
                </v-chip>
                <v-chip v-show="results_query_sv.val_svtype != null" :color="$store.state.mainColor" class="mr-2"  label small
                        @click:close="clean_val('svtype')"><b>SV Type</b>&nbsp;{{ results_query_sv.val_svtype }}
                </v-chip>
                <v-chip v-show="results_query_sv.val_slop != null" :color="$store.state.mainColor" class="mr-2"  label small
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


                <v-sheet v-show="!is_loading">

                  {{ this.results }}
                </v-sheet>


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