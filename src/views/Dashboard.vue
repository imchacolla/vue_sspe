<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-sm-6 col-lg-3">
                <b-card class="bg-primary" :no-block="true">
                    <div class="card-body pb-0">
                        <h4 class="mb-0">{{beneficiarios}}</h4>
                        <p>Beneficiarios </p>
                    </div>
                    <card-line1-chart-example class="chart-wrapper px-3" style="height:60px;" height="60"/>
                </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-lg-3">
                <b-card class="bg-info" :no-block="true">
                    <div class="card-body pb-0">
                        <h4 class="mb-0">Bs {{transferencias}}</h4>
                        <p>Transfereridos</p>
                    </div>
                    <card-line2-chart-example class="chart-wrapper px-3" style="height:60px;" height="60"/>
                </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-lg-3">
                <b-card class="bg-warning" :no-block="true">
                    <div class="card-body pb-0">
                        <b-dropdown class="float-right" variant="transparent p-0" right>
                            <template slot="button-content">
                                <i class="icon-settings"></i>
                            </template>
                            <b-dropdown-item>Action</b-dropdown-item>
                            <b-dropdown-item>Another action</b-dropdown-item>
                            <b-dropdown-item>Something else here...</b-dropdown-item>
                            <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                        </b-dropdown>
                        <h4 class="mb-0">0</h4>
                        <p>Capacitaciones pagadas</p>
                    </div>
                    <card-line3-chart-example class="chart-wrapper" style="height:60px;" height="60"/>
                </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-lg-3">
                <b-card class="bg-danger" :no-block="true">
                    <div class="card-body pb-0">
                        <b-dropdown class="float-right" variant="transparent p-0" right>
                            <template slot="button-content">
                                <i class="icon-settings"></i>
                            </template>
                            <b-dropdown-item>Action</b-dropdown-item>
                            <b-dropdown-item>Another action</b-dropdown-item>
                            <b-dropdown-item>Something else here...</b-dropdown-item>
                            <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                        </b-dropdown>
                        <h4 class="mb-0">4</h4>
                        <p>Niños atendidos</p>
                    </div>
                    <card-bar-chart-example class="chart-wrapper px-3" style="height:60px;" height="60"/>
                </b-card>
            </div><!--/.col-->
        </div><!--/.row-->
        <div class="row">
            <div class="col-md-8">
                <div class="card" >
                <div class="card-header"> <i class='fa fa-align-justify'></i>Transferencias
                    <div class=" float-right">
                        <select v-model="gestion"  @change="getTransferencias">
                            <option v-for="gestion in gestiones" :value="gestion">{{gestion}}</option>
                        </select>
                    </div>

                </div>
                    <div class="card-body">
                    <div class="echarts">
                        <IEcharts :option="barras"  @ready="onReady" @click="onClick"></IEcharts>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-md-4">
                <b-card header="<i class='fa fa-align-justify'></i> Beneficiarios / Programa">
                    <div class="echarts">
                        <IEcharts :option="bar"  @ready="onReady" @click="onClick"></IEcharts>
                    </div>
                </b-card>
            </div>

        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card" >
                    <div class="card-header"> <i class='fa fa-align-justify'></i>Beneficiarios / Departamento
                        <div class=" float-right">
                            <select v-model="empresa"  @change="getOtrosDatos">
                                <option value="0">TODAS LAS EMPRESAS</option>
                                <option v-for="e in empresas" :value="e.id">{{e.empresa}}</option>
                            </select>
                        </div>
                        <div class=" float-right">
                        <select v-model="ciudad"  @change="getOtrosDatos">
                            <option value="0">TODOS</option>
                            <option v-for="c in ciudades" :value="c.id">{{c.ciudad}}</option>
                        </select>
                    </div>

                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-lg-4">
                            <div class="row">
                                <div class="col-sm-6">
                                    <Callout variant="info">
                                        <small class="text-muted">Beneficiarios</small>
                                        <br>
                                        <strong class="h4">{{ben}}</strong>
                                    </Callout>
                                </div><!--/.col-->
                                <div class="col-sm-6">
                                    <Callout variant="danger">
                                        <small class="text-muted">PAE</small>
                                        <br>
                                        <strong class="h4">{{pae}}</strong>
                                    </Callout>
                                </div><!--/.col-->
                            </div><!--/.row-->
                            <hr class="mt-0">
                            <ul class="horizontal-bars type-2">
                                <li v-for="edad in edades">
                                    <span class="title"><i class="fa fa-user-circle"></i> {{edad.edad}} años </span>
                                    <span class="value">{{edad.cantidad}} <span class="text-muted small">({{edad.porcentaje}}%)</span></span>
                                    <div class="bars">
                                        <b-progress class="progress-xs" :value="edad.porcentaje" variant="primary"></b-progress>
                                    </div>
                                </li>
                                <!--<li class="legend">
                                    <span class="badge badge-pill badge-info"></span>
                                    <small>New clients</small> &nbsp; <span
                                        class="badge badge-pill badge-danger"></span>
                                    <small>Recurring clients</small>
                                </li> -->
                            </ul>
                        </div><!--/.col-->
                        <div class="col-sm-6 col-lg-4">
                            <div class="row">
                                <div class="col-sm-6">
                                    <Callout variant="warning">
                                        <small class="text-muted">PMEIL</small>
                                        <br>
                                        <strong class="h4">{{pmeil}}</strong>
                                    </Callout>
                                </div><!--/.col-->
                                <div class="col-sm-6">
                                    <Callout variant="success">
                                        <small class="text-muted">Organic</small>
                                        <br>
                                        <strong class="h4">49,123</strong>
                                    </Callout>
                                </div><!--/.col-->
                            </div><!--/.row-->
                            <hr class="mt-0">
                            <ul class="horizontal-bars type-2">
                                <li>
                                    <i class="icon-user"></i>
                                    <span class="title">Hombres ({{hombres}})</span>
                                    <span class="value">{{phombres}}%</span>
                                    <div class="bars">
                                        <b-progress class="progress-xs" :value="phombres" variant="warning"></b-progress>
                                    </div>
                                </li>
                                <li>
                                    <i class="icon-user-female"></i>
                                    <span class="title">Mujeres ({{mujeres}})</span>
                                    <span class="value">{{pmujeres}}%</span>
                                    <div class="bars">
                                        <b-progress class="progress-xs" :value="pmujeres" variant="warning"></b-progress>
                                    </div>
                                </li>
                                <li class="divider"></li>
                                <!--<li>
                                    <i class="icon-globe"></i>
                                    <span class="title">Organic Search</span>
                                    <span class="value">191,235 <span class="text-muted small">(56%)</span></span>
                                    <div class="bars">
                                        <b-progress class="progress-xs" :value="56" variant="success"></b-progress>
                                    </div>
                                </li>
                                -->

                                <li class="divider text-center">
                                    <button type="button" class="btn btn-sm btn-link text-muted"><i
                                            class="icon-options"></i></button>
                                </li>
                            </ul>
                        </div><!--/.col-->
                        <div class="col-sm-6 col-lg-4">
                            <div class="row">
                                <div class="col-sm-6">
                                    <Callout>
                                        <small class="text-muted">CTR</small>
                                        <br>
                                        <strong class="h4">23%</strong>
                                    </Callout>
                                </div><!--/.col-->
                                <div class="col-sm-6">
                                    <Callout variant="primary">
                                        <small class="text-muted">Bounce Rate</small>
                                        <br>
                                        <strong class="h4">5%</strong>
                                    </Callout>
                                </div><!--/.col-->
                            </div><!--/.row-->
                            <hr class="mt-0">
                            <ul class="icons-list">
                                <li v-for="p in paquetes">
                                    <i class="icon-user bg-danger"></i>
                                    <div class="desc">
                                        <div class="title">{{p.programa}}</div>
                                        <small>{{p.paquete}}</small>
                                    </div>
                                    <div class="value">
                                        <div class="small text-muted">({{p.cantidad}})</div>
                                        <strong>{{p.porcentaje}}%</strong>
                                    </div>

                                </li>

                                <li class="divider text-center">
                                    <button type="button" class="btn btn-sm btn-link text-muted"><i
                                            class="icon-options"></i></button>
                                </li>
                            </ul>
                        </div><!--/.col-->
                    </div><!--/.row-->
                    <br/>

                </div>
            </div><!--/.col-->
        </div><!--/.row-->
    </div>
</template>

<script>
  import Vue from 'vue'
  import CardLine1ChartExample from './dashboard/CardLine1ChartExample'
  import CardLine2ChartExample from './dashboard/CardLine2ChartExample'
  import CardLine3ChartExample from './dashboard/CardLine3ChartExample'
  import CardBarChartExample from './dashboard/CardBarChartExample'
  import MainChartExample from './dashboard/MainChartExample'
  import SocialBoxChartExample from './dashboard/SocialBoxChartExample'
  import {Callout} from '../components/'
  import axios from 'axios'
  import IEcharts from 'vue-echarts-v3/src/full.vue'
  import 'echarts/lib/component/tooltip'
  import Config from '../Config'

  Vue.use(Config)
  export default {
    name: 'dashboard',
    components: {
      Callout,
      CardLine1ChartExample,
      CardLine2ChartExample,
      CardLine3ChartExample,
      CardBarChartExample,
      MainChartExample,
      SocialBoxChartExample,
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
        ben: 0,
        pae: 0,
        pmeil: 0,
        hombres: 0,
        phombres: 0,
        mujeres: 0,
        pmujeres: 0,
        edades: null,
        paquetes: null,
        empresa: 0,
        empresas: null,
        tableItems: [
          {
            avatar: {url: 'static/img/avatars/1.jpg', status: 'success'},
            user: {name: 'Yiorgos Avraamu', new: true, registered: 'Jan 1, 2015'},
            country: {name: 'USA', flag: 'static/img/flags/USA.png'},
            usage: {value: 50, period: 'Jun 11, 2015 - Jul 10, 2015'},
            payment: {name: 'Mastercard', icon: 'fa fa-cc-mastercard'},
            activity: '10 sec ago'
          },
          {
            avatar: {url: 'static/img/avatars/2.jpg', status: 'danger'},
            user: {name: 'Avram Tarasios', new: false, registered: 'Jan 1, 2015'},
            country: {name: 'Brazil', flag: 'static/img/flags/Brazil.png'},
            usage: {value: 22, period: 'Jun 11, 2015 - Jul 10, 2015'},
            payment: {name: 'Visa', icon: 'fa fa-cc-visa'},
            activity: '5 minutes ago'
          },
          {
            avatar: {url: 'static/img/avatars/3.jpg', status: 'warning'},
            user: {name: 'Quintin Ed', new: true, registered: 'Jan 1, 2015'},
            country: {name: 'India', flag: 'static/img/flags/India.png'},
            usage: {value: 74, period: 'Jun 11, 2015 - Jul 10, 2015'},
            payment: {name: 'Stripe', icon: 'fa fa-cc-stripe'},
            activity: '1 hour ago'
          },
          {
            avatar: {url: 'static/img/avatars/4.jpg', status: ''},
            user: {name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2015'},
            country: {name: 'France', flag: 'static/img/flags/France.png'},
            usage: {value: 98, period: 'Jun 11, 2015 - Jul 10, 2015'},
            payment: {name: 'PayPal', icon: 'fa fa-paypal'},
            activity: 'Last month'
          },
          {
            avatar: {url: 'static/img/avatars/5.jpg', status: 'success'},
            user: {name: 'Agapetus Tadeáš', new: true, registered: 'Jan 1, 2015'},
            country: {name: 'Spain', flag: 'static/img/flags/Spain.png'},
            usage: {value: 22, period: 'Jun 11, 2015 - Jul 10, 2015'},
            payment: {name: 'Google Wallet', icon: 'fa fa-google-wallet'},
            activity: 'Last week'
          },
          {
            avatar: {url: 'static/img/avatars/6.jpg', status: 'danger'},
            user: {name: 'Friderik Dávid', new: true, registered: 'Jan 1, 2015'},
            country: {name: 'Poland', flag: 'static/img/flags/Poland.png'},
            usage: {value: 43, period: 'Jun 11, 2015 - Jul 10, 2015'},
            payment: {name: 'Amex', icon: 'fa fa-cc-amex'},
            activity: 'Last week'
          }
        ],
        tableFields: {
          avatar: {
            label: '<i class="icon-people"></i>',
            class: 'text-center'
          },
          user: {
            label: 'User'
          },
          country: {
            label: 'Country',
            class: 'text-center'
          },
          usage: {
            label: 'Usage'
          },
          payment: {
            label: 'Payment method',
            class: 'text-center'
          },
          activity: {
            label: 'Activity'
          }
        },
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
            radius: ['20%', '70%'],
            data: []
          }]
        },
        barras: {
          title: {
            text: 'Montos Transferidos Bs'
          },
          tooltip: {},
          xAxis: {
            data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
          },
          yAxis: {},
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
            name: 'Monto Transferido',
            type: 'bar',
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ['#FF271A', '#FF751A', '#FFA71A', '#F8FF1A', '#B8E122', '#1DD62C', '#2599D3', '#2563D5', '#3F24D4', '#9524D3', '#D22582', '#c4ccd3']
                  return colorList[params.dataIndex]
                },
                label: {
                  show: true,
                  position: 'top',
                  formatter: '{b}\n{c}'
                }
              }
            },
            animationEasing: 'elasticOut',
            color: ['#FF271A', '#FF751A', '#FFA71A', '#F8FF1A', '#B8E122', '#1DD62C', '#2599D3', '#2563D5', '#3F24D4', '#9524D3', '#D22582', '#c4ccd3'],
            data: []
          }]
        }
      }
    },
    mounted () {
      this.getDatos()
      this.getTransferencias()
      this.getOtrosDatos()
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
        axios.get(this.url + 'dashboard/datos?token=' + localStorage.getItem('token'))
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.datos = response.data.data
                this.beneficiarios = response.data.data.beneficiarios
                this.transferencias = response.data.data.transferencias
                this.documentos = response.data.documentos
                this.bar.series[0].data = response.data.resumen
                this.ciudades = response.data.ciudades
                this.empresas = response.data.empresas
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
      getOtrosDatos () {
        var vm = this
        this.$Progress.start()
        axios.get(this.url + 'dashboard/otrosdatos?token=' + localStorage.getItem('token') + '&ciudad=' + this.ciudad + '&empresa=' + this.empresa)
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.ben = response.data.data.beneficiarios
                this.pae = response.data.data.pae
                this.pmeil = response.data.data.pmeil
                this.hombres = response.data.data.hombres
                this.phombres = response.data.data.phombres
                this.mujeres = response.data.data.mujeres
                this.pmujeres = response.data.data.pmujeres
                this.edades = response.data.edades
                this.paquetes = response.data.paquetes
                this.$Progress.finish()
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
      getTransferencias () {
        var vm = this
        this.$Progress.start()
        axios.get(this.url + 'dashboard/gtransferencias?token=' + localStorage.getItem('token') + '&gestion=' + this.gestion + '&ciudad=' + this.ciudad)
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.barras.series[0].data = response.data.transferido
                // this.barras.xAxis.data = response.data.legenda
                this.$Progress.finish()
              } else {
                this.$Progress.fail()
                vm.$router.push('/pages/login')
              }
            }
          )
      },
      getDocumentos () {
        var vm = this
        axios.get(this.url + 'documentos/recientes?token=' + localStorage.getItem('token'))
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.documentos = response.data.data
              } else {
                vm.$router.push('/pages/login')
              }
            }
          )
      },
      getPendientes () {
        var vm = this
        axios.get(this.url + 'bandeja/pendientes?token=' + localStorage.getItem('token'),
          {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.pendientesUsuario = response.data.data
              } else {
                vm.$router.push('/pages/login')
              }
            }
          )
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
        height: 320px;
    }
</style>