<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-sm-2" v-for="(d, i) in resumen">
                <div class="callout " :class="callouts[i]">
                    <small>{{d.tipo}}</small>
                    <br>
                    <strong class="h4">{{d.cantidad}}</strong>
                </div>

            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="card card-accent-primary card-header-inverse">
                    <div class="card-header">
                        {{total}} Documentos Encontrados
                        <div class="pull-right">

                            <b-form-select
                                    :plain="true"
                                    placeholder="Ordenar por"
                                    :options="[{text: 'Hoja de Ruta', value: 'd.nur'}, {text: 'Cite', value:'d.codigo'}, {text: 'Destinatario', value: 'd.nombre_destinatario'},
                                     {text: 'Referencia', value: 'd.referencia'}, {text: 'Fecha creación', value: 'f.fecha_creacion'}]">
                            </b-form-select>
                        </div>
                    </div>
                    <div class="card-body">
                        <strong>Busqueda:</strong>
                        <div class="row">
                            <b-form-fieldset
                                    label="Hoja de Ruta / Cite"
                                    class="col-md-3"
                                    :label-cols="2">
                                <b-form-input type="text" v-model="hojaruta"
                                              placeholder="Hoja de Ruta"></b-form-input>
                            </b-form-fieldset>
                            <b-form-fieldset
                                    label="Referencia"
                                    class="col-md-3"

                                    :label-cols="2">
                                <b-form-input type="text" v-model="referencia"
                                              placeholder="Referencia"></b-form-input>
                            </b-form-fieldset>
                            <b-form-fieldset
                                    label="Rango fecha"
                                    class="col-md-3"
                                    :label-cols="2">
                                <date-picker v-model="fechas" :first-day-of-week="1" lang="es" format="dd-MM-yyyy"  range :shortcuts="shortcuts"></date-picker>
                            </b-form-fieldset>
                            <b-form-fieldset
                                    label="Tipo documento"
                                    class="col-md-3"
                                    :label-cols="2">
                                <b-form-select
                                        :plain="true"
                                        :options="['Notas','Informe','Memorandum']">
                                </b-form-select>    
                            </b-form-fieldset>
                        </div>
                        <div slot="footer">
                            <b-button type="submit" size="sm" variant="success"><i class="fa fa-dot-circle-o"></i>
                                Buscar
                            </b-button>
                            <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset
                            </b-button>
                        </div>
                        {{fechas}}
                        <table class="table-sm mb-0 table b-table table-hover table-responsive">
                            <thead>
                            <tr>
                                <th>Hoja Ruta / Cite</th>
                                <th>Referencia</th>
                                <th>Tipo Doc.</th>
                                <th>Fecha Creación</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="documento in documentos">
                                <td>
                                    <div>{{documento.nur}}</div>
                                    <div class="small text-muted"><strong>{{documento.cite_original}}</strong></div>
                                </td>
                                <td>
                                    <div>{{documento.referencia}}</div>
                                    <div class="small text-muted">
                                        {{documento.nombre_destinatario}} | {{documento.cargo_destinatario}}
                                    </div>
                                </td>
                                <td>
                                    <div class="small text-muted">
                                        {{documento.tipo}}
                                    </div>
                                </td>
                                <td>
                                    <div>{{documento.fecha_creacion}}</div>
                                    <div class="small text-muted">
                                        {{documento.hora_creacion}}
                                    </div>
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-primary">Edit</button>
                                </td>
                            </tr>
                            </tbody>

                        </table>
                        <div>
                            <paginate class="float-right"
                                      :page-count="page_count"
                                      :click-handler="getDocumentos"
                                      :prev-text="'Prev'"
                                      :next-text="'Next'"
                                      :container-class="'pagination'">
                            </paginate>
                            Página {{num }} / {{page_count}}
                        </div>
                    </div>
                    <div class="card-footer">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import Vue from 'vue'
  import BarExample from './charts/BarExample'
  import Paginate from 'vuejs-paginate'
  import axios from 'axios'
  import DatePicker from 'vue2-datepicker'

  Vue.component('paginate', Paginate)
  export default {
    name: 'charts',
    data () {
      return {
        hojaruta: '',
        cite: '',
        referencia: '',
        filter: '',
        order: '',
        orderBy: '',
        page_count: 1,
        documentos: null,
        num: 1,
        pagenum: 5,
        total: 1,
        resumen: [],
        callouts: ['callout-primary', 'callout-danger', 'callout-warning', 'callout-success', 'callout-info'],
        fechas: '',
        shortcuts: [
          {
            text: 'Hoy',
            start: new Date(),
            end: new Date()
          }
        ]
      }
    },
    components: {
      BarExample,
      DatePicker
    },
    mounted () {
      this.getDocumentos(1)
      this.getResumen()
    },
    methods: {
      getResumen () {
        var vm = this
        axios.get('http://sspe.planificacion.gob.bo/backend/documentos/resumen/?token=' + localStorage.getItem('token'),
          {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
              referencia: this.referencia
            }
          })
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.resumen = response.data.data
              } else {
                vm.$router.push('/pages/login')
              }
            }
          )
      },
      getDocumentos (num = 1) {
        var vm = this
        this.num = num
        axios.get('http://sspe.planificacion.gob.bo/backend/documentos/lista/?token=' + localStorage.getItem('token'),
          {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            params: {
              pagenum: this.pagenum,
              page: this.num,
              hojaruta: this.hojaruta,
              cite: this.cite,
              referencia: this.referencia
            }
          })
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.documentos = response.data.data.documentos
                this.page_count = response.data.data.page_count
                this.total = response.data.data.total
              } else {
                vm.$router.push('/pages/login')
              }
            }
          )
      },
      clickCallback (pageNum) {
        console.log(pageNum)
      }
    }
  }
</script>
<style>

</style>