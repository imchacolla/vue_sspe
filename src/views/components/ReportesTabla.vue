<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-md-12">
                <b-card header="<i class='fa fa-align-justify'></i> Beneficiarios / Empresa">
                    <div class="echarts">
                        <IEcharts :option="bar"  @ready="onReady" @click="onClick"></IEcharts>
                    </div>
                </b-card>
            </div>
            <div class="col-md-12">
                <div class="card" >
                <div class="card-header"> <i class='fa fa-align-justify'></i>Transfereneias / Empresa / Estado
                    <div class=" float-right">
                        <select v-model="gestion"  @change="getContratos">
                            <option v-for="gestion in gestiones" :value="gestion">{{gestion}}</option>
                        </select>
                    </div>
                </div>
            </div>


        </div>

    </div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import IEcharts from 'vue-echarts-v3/src/full.vue'
  import 'echarts/lib/component/tooltip'
  import Config from '../../Config'

  Vue.use(Config)
  export default {
    name: 'dashboard',
    components: {
      IEcharts
    },
    data: function () {
      return {
        url: Config.url,
        datos: null,
        pendientesUsuario: null,
        documentos: null,
        beneficiarios: 0,
        transferencias: 0,
        ciudad: 0,
        ciudades: null,
        res: null,
        gestion: new Date().getFullYear(),
        gestiones: [2017, 2018, 2019],
        loading: false,
        bar: {
          title: {
            text: ''
          },
          toolbox: {
            show: true,
            orient: 'horizontal',
            left: 'right',
            top: 'buttom',
            feature: {
              mark: {show: true, title: 'datos'},
              dataView: {show: true, readOnly: true},
              saveAsImage: {show: true, title: 'Guardar'}
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: []
          },
          series: [{
            name: 'Cantidad',
            type: 'pie',
            color: ['#FF271A', '#FF751A', '#FFA71A', '#F8FF1A', '#B8E122', '#1DD62C', '#2599D3', '#2563D5', '#3F24D4', '#9524D3', '#D22582', '#c4ccd3'],
            radius: '55%',
            center: ['60%', '55%'],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: []
          }]
        },
        barras: {
          title: {
            text: ''
          },
          legend: {
            data: ['PAE', 'PMEIL']
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          calculable: true,
          xAxis: {
            type: 'category',
            axisTick: {show: false},
            data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
          },
          yAxis: [
            {
              type: 'value'
            }
          ],
          toolbox: {
            show: true,
            orient: 'horizontal',
            left: 'right',
            top: 'buttom',
            feature: {
              mark: {show: true, title: 'datos'},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true, title: 'Refresh'},
              saveAsImage: {show: true, title: 'Guardar'}
            }
          },
          series: [{
            name: 'PAE',
            type: 'bar',
            animationEasing: 'elasticOut',
            color: ['#FE271A', '#3F24D4', '#9524D3', '#D22582', '#c4ccd3'],
            data: []
          },
          {
            name: 'PMEIL',
            type: 'bar',
            animationEasing: 'elasticOut',
            color: ['#FCC804', '#FF271A', '#FF751A', '#FFA71A', '#F8FF1A', '#B8E122', '#1DD62C', '#2599D3', '#2563D5', '#3F24D4', '#9524D3', '#D22582', '#c4ccd3'],
            data: []
          }]
        }
      }
    },
    mounted () {
      this.getDatos()
      this.getContratos()
      // this.getOtrosDatos()
    },
    methods: {
      variant (value) {
        let $variant
        if (value <= 25) {
          $variant = 'info'
        } else if (value > 25 && value <= 50) {
          $variant = 'success'
        } else if (value > 50 && value <= 75) {
          $variant = 'warning'
        } else if (value > 75 && value <= 100) {
          $variant = 'danger'
        }
        return $variant
      },
      getDatos () {
        var vm = this
        axios.get(this.url + 'reportes/empresas?token=' + localStorage.getItem('token'))
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.bar.series[0].data = response.data.empresas
                this.bar.legend.data = response.data.legenda
                // this.barras.xAxis.data = response.data.legenda
              } else {
                vm.$router.push('/pages/login')
              }
            }
          )
          .catch(error => {
            console.log(error)
            vm.$router.push('/pages/login')
          })
      },
      getContratos () {
        var vm = this
        axios.get(this.url + 'reportes/contratos?token=' + localStorage.getItem('token') + '&gestion=' + this.gestion)
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.barras.series[0].data = response.data.contratospae
                this.barras.series[1].data = response.data.contratospmeil
              } else {
                vm.$router.push('/pages/login')
              }
            }
          )
          .catch(error => {
            console.log(error)
            vm.$router.push('/pages/login')
          })
      },
      doRandom () {

      },
      onReady (instance) {
        console.log(instance)
      },
      onClick (event, instance, echarts) {
        console.log(arguments)
      }
    }
  }
</script>
<style>
    .border-bottom-1{ border-bottom: 1px solid #cccccc; margin-top: 5px; }
    .echarts {
        width: 100%;
        height: 400px;
    }
</style>