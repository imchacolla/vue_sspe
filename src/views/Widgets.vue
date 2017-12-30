<template>

    <div class="animated fadeIn">
        <div class="row">
            <div class="col-md-12">
                <div class="wrap-messages">
                    <div id="inbox" class="inbox">
                        <div class="col email-list">

                            <div class="wrap-list">
                                <div class="wrap-options">
                                    <div class="messages-options padding-15">
                                        <button class="btn btn-transparent pull-right open-message-search">
                                            <i class="ti-search"></i>
                                        </button>
                                        <button class="btn btn-transparent pull-right close-message-search">
                                            <i class="ti-close"></i>
                                        </button>
                                    </div>
                                    <div class="messages-search">
                                        <form>
                                            <b-form-input v-model="searchString" type="text" id="name"
                                                          placeholder="Filtrar"></b-form-input>
                                        </form>
                                    </div>
                                </div>
                                <div class="messages-list">
                                    <div v-for="pendiente in filteredPendientes">
                                        <div class="messages-item"
                                             v-on:click="detalleHR(pendiente.nur,pendiente.id)"
                                             :class="active == pendiente.id ? 'activo' : ''">
                                                <span title="Mark as starred" class="messages-item-star"><input
                                                        type="checkbox" value="1"/> <i
                                                        :class="pendiente.prioridad==1 ? 'fa fa-star' : ''"></i></span>
                                            <img alt="Google Geoff"
                                                 class="messages-item-avatar bordered border-primary"
                                                 v-bind:src="pendiente.foto">
                                            <span class="messages-item-from nur">{{pendiente.nur}}</span>
                                            <div class="messages-item-time">
                                                <span class="text ">{{pendiente.fecha}}</span>
                                            </div>
                                            <span class="messages-item-subject"> {{pendiente.referencia}}</span>
                                            <span class="messages-item-content ng-binding">{{pendiente.nombre_emisor}} | {{pendiente.cargo_emisor}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="email-reader perfect-scrollbar">
                            <div v-if="detalle!=null" class="message-content">
                                <div class="message-actions">
                                    <div class="card-block message-from">
                                        <strong>{{detalle.referencia}}</strong>
                                    </div>
                                </div>
                                <div class="message-header">
                                    <p class="text-dark">
                                        Hoja de Ruta: {{detalle.nur}} | Cite Original: {{detalle.codigo}}</p>
                                    <p>
                                        Destinatario: {{detalle.destinatario}} | {{detalle.cargo_destinatario}}</p>
                                    <p>Remitente: {{detalle.remitente}} | {{detalle.cargo_remitente}}</p>
                                    <p>Fecha Creación: {{detalle.fecha}} </p>
                                    <li v-for="archivo in archivos">

                                        {{archivo.nombre_archivo}}


                                    </li>
                                </div>
                                <div>

                                    <vue-tabs>
                                        <v-tab title="Derivar">
                                            <div class="col-sm-10">
                                                <div class="row">
                                                    <div class="col-sm-8">
                                                        <b-form-fieldset label="Destinatario">
                                                            <basic-select :options="destinatarios"
                                                                          :selected-option="item"
                                                                          placeholder="Destinatario"
                                                                          @select="onSelect">
                                                            </basic-select>
                                                        </b-form-fieldset>
                                                    </div>
                                                    <div class="col-sm-4">

                                                        <b-form-fieldset
                                                                label="¿Es urgente?"
                                                                :label-cols="3">
                                                            <c-switch type="text"
                                                                      variant="primary-outline-alt"
                                                                      on="Si"
                                                                      off="No"
                                                                      :checked="false"/>
                                                        </b-form-fieldset>
                                                    </div>
                                                </div><!--/.row-->
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <b-form-fieldset
                                                                label="Proveido"
                                                                :label-cols="3">
                                                            <b-form-input :textarea="true" :rows="2"
                                                                          placeholder="Content.."></b-form-input>
                                                        </b-form-fieldset>
                                                    </div>
                                                </div><!--/.row-->
                                                <div class="row">
                                                    <div class="col-sm-4">
                                                        <b-form-fieldset label="Month">
                                                            <b-form-select
                                                                    :plain="true"
                                                                    :options="[1,2,3,4,5,6,7,8,9,10,11,12]">
                                                            </b-form-select>
                                                        </b-form-fieldset>
                                                    </div><!--/.col-->
                                                    <div class="col-sm-4">
                                                        <b-form-fieldset label="Year">
                                                            <b-form-select
                                                                    :plain="true"
                                                                    :options="[2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025]">
                                                            </b-form-select>
                                                        </b-form-fieldset>
                                                    </div><!--/.col-->
                                                    <div class="col-sm-4">
                                                        <b-form-fieldset label="CVV/CVC">
                                                            <b-form-input type="text" id="cvv"
                                                                          placeholder="123"></b-form-input>
                                                        </b-form-fieldset>
                                                    </div><!--/.col-->
                                                </div><!--/.row-->

                                            </div><!--/.col-->
                                            Derivar Hoja de Ruta:

                                        </v-tab>

                                        <v-tab title="Responder">
                                            <b-button variant="primary"><i class="fa fa-send"></i> Derivar
                                            </b-button>

                                            <b-dropdown class="" variant="">
                                                <template slot="button-content">
                                                    <i class="icon-settings">Responder con...</i>
                                                </template>
                                                <b-dropdown-item>Action</b-dropdown-item>
                                                <b-dropdown-item>Another action</b-dropdown-item>
                                                <b-dropdown-item>Something else here...</b-dropdown-item>
                                                <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                                            </b-dropdown>
                                        </v-tab>
                                        <v-tab title="Adjunto">
                                            <li v-for="archivo in archivos">
                                                {{archivo.nombre_archivo}}
                                            </li>
                                        </v-tab>
                                        <v-tab title="Seguimiento">
                                            <div v-bar="{ preventParentScroll: true,
    scrollThrottle: 30, overrideFloatingScrollbar: true}" style="height: 400px;" class="el1 vb">
                                                <div class="el2 dragger">
                                                    <li v-for="article in filteredPendientes">
                                                        <a v-bind:href="article.nur"><img
                                                                v-bind:src="article.nur"/></a>
                                                        <p>{{article.nur}}</p>
                                                        <p>{{article.referencia}}</p>
                                                    </li>
                                                </div>
                                            </div>
                                        </v-tab>
                                    </vue-tabs>
                                </div>
                            </div>
                            <div>


                                <div class="message-subject">
                                    Seleccione una hoja de ruta
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>


        <div class="row">
            <div class="col-sm-6 col-lg-3">
                <b-card>
                    <div class="h4 m-0">89.9%</div>
                    <div>Lorem ipsum...</div>
                    <b-progress class="progress-xs my-3" variant="success" :value="25"/>
                    <small class="text-muted">Lorem ipsum dolor sit amet enim.</small>
                </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-lg-3">
                <b-card>
                    <div class="h4 m-0">12.124</div>
                    <div>Lorem ipsum...</div>
                    <b-progress class="progress-xs my-3" variant="info" :value="25"/>
                    <small class="text-muted">Lorem ipsum dolor sit amet enim.</small>
                </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-lg-3">
                <b-card>
                    <div class="h4 m-0">$98.111,00</div>
                    <div>Lorem ipsum...</div>
                    <b-progress class="progress-xs my-3" variant="warning" :value="25"/>
                    <small class="text-muted">Lorem ipsum dolor sit amet enim.</small>
                </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-lg-3">
                <b-card>
                    <div class="h4 m-0">2 TB</div>
                    <div>Lorem ipsum...</div>
                    <b-progress class="progress-xs my-3" variant="danger" :value="25"/>
                    <small class="text-muted">Lorem ipsum dolor sit amet enim.</small>
                </b-card>
            </div><!--/.col-->
        </div><!--/.row-->
        <div class="row">
            <div class="col-sm-6 col-lg-3">
                <b-card class="text-white bg-primary">
                    <div class="h4 m-0">89.9%</div>
                    <div>Lorem ipsum...</div>
                    <b-progress class="progress-white progress-xs my-3" :value="25"/>
                    <small class="text-muted">Lorem ipsum dolor sit amet enim.</small>
                </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-lg-3">
                <b-card class="text-white bg-warning">
                    <div class="h4 m-0">12.124</div>
                    <div>Lorem ipsum...</div>
                    <b-progress class="progress-white progress-xs my-3" :value="25"/>
                    <small class="text-muted">Lorem ipsum dolor sit amet enim.</small>
                </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-lg-3">
                <b-card class="text-white bg-danger">
                    <div class="h4 m-0">$98.111,00</div>
                    <div>Lorem ipsum...</div>
                    <b-progress class="progress-white progress-xs my-3" :value="25"/>
                    <small class="text-muted">Lorem ipsum dolor sit amet enim.</small>
                </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-lg-3">
                <b-card class="text-white bg-info">
                    <div class="h4 m-0">2 TB</div>
                    <div>Lorem ipsum...</div>
                    <b-progress class="progress-white progress-xs my-3" :value="25"/>
                    <small class="text-muted">Lorem ipsum dolor sit amet enim.</small>
                </b-card>
            </div><!--/.col-->
        </div><!--/.row-->
        <div class="row">
            <div class="col-6 col-lg-3">
                <b-card no-block>
                    <div class="card-body p-3 clearfix">
                        <i class="fa fa-cogs bg-primary p-3 font-2xl mr-3 float-left"></i>
                        <div class="h5 text-primary mb-0 mt-2">$1.999,50</div>
                        <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
                    </div>
                </b-card>
            </div><!--/.col-->
            <div class="col-6 col-lg-3">
                <b-card no-block>
                    <div class="card-body p-3 clearfix">
                        <i class="fa fa-laptop bg-info p-3 font-2xl mr-3 float-left"></i>
                        <div class="h5 text-info mb-0 mt-2">$1.999,50</div>
                        <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
                    </div>
                </b-card>
            </div><!--/.col-->
            <div class="col-6 col-lg-3">
                <b-card no-block>
                    <div class="card-body p-3 clearfix">
                        <i class="fa fa-moon-o bg-warning p-3 font-2xl mr-3 float-left"></i>
                        <div class="h5 text-warning mb-0 mt-2">$1.999,50</div>
                        <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
                    </div>
                </b-card>
            </div><!--/.col-->
            <div class="col-6 col-lg-3">
                <b-card no-block>
                    <div class="card-body p-3 clearfix">
                        <i class="fa fa-bell bg-danger p-3 font-2xl mr-3 float-left"></i>
                        <div class="h5 text-danger mb-0 mt-2">$1.999,50</div>
                        <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
                    </div>
                </b-card>
            </div><!--/.col-->
            <div class="col-6 col-lg-3">
                <b-card no-block footer-class="px-3 py-2">
                    <div class="card-body p-3 clearfix">
                        <i class="fa fa-cogs bg-primary p-3 font-2xl mr-3 float-left"></i>
                        <div class="h5 text-primary mb-0 mt-2">$1.999,50</div>
                        <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
                    </div>
                    <div slot="footer">
                        <a class="font-weight-bold font-xs btn-block text-muted" href="#">View More <i
                                class="fa fa-angle-right float-right font-lg"></i></a>
                    </div>
                </b-card>
            </div><!--/.col-->
            <div class="col-6 col-lg-3">
                <b-card no-block footer-class="px-3 py-2">
                    <div class="card-body p-3 clearfix">
                        <i class="fa fa-laptop bg-info p-3 font-2xl mr-3 float-left"></i>
                        <div class="h5 text-info mb-0 mt-2">$1.999,50</div>
                        <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
                    </div>
                    <div slot="footer">
                        <a class="font-weight-bold font-xs btn-block text-muted" href="#">View More <i
                                class="fa fa-angle-right float-right font-lg"></i></a>
                    </div>
                </b-card>
            </div><!--/.col-->
            <div class="col-6 col-lg-3">
                <b-card no-block footer-class="px-3 py-2">
                    <div class="card-body p-3 clearfix">
                        <i class="fa fa-moon-o bg-warning p-3 font-2xl mr-3 float-left"></i>
                        <div class="h5 text-warning mb-0 mt-2">$1.999,50</div>
                        <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
                    </div>
                    <div slot="footer">
                        <a class="font-weight-bold font-xs btn-block text-muted" href="#">View More <i
                                class="fa fa-angle-right float-right font-lg"></i></a>
                    </div>
                </b-card>
            </div><!--/.col-->
            <div class="col-6 col-lg-3">
                <b-card no-block footer-class="px-3 py-2">
                    <div class="card-body p-3 clearfix">
                        <i class="fa fa-bell bg-danger p-3 font-2xl mr-3 float-left"></i>
                        <div class="h5 text-danger mb-0 mt-2">$1.999,50</div>
                        <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
                    </div>
                    <div slot="footer">
                        <a class="font-weight-bold font-xs btn-block text-muted" href="#">View More <i
                                class="fa fa-angle-right float-right font-lg"></i></a>
                    </div>
                </b-card>
            </div><!--/.col-->
        </div><!--/.row-->
        <div class="row">

        </div>
        <div class="row">
            <div class="col-6 col-lg-3">
                <b-card no-block>
                    <div class="card-body p-0 clearfix">
                        <i class="fa fa-cogs bg-primary p-4 font-2xl mr-3 float-left"></i>
                        <div class="h5 text-primary mb-0 pt-3">$1.999,50</div>
                        <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
                    </div>
                </b-card>
            </div><!--/.col-->
            <div class="col-6 col-lg-3">
                <b-card no-block>
                    <div class="card-body p-0 clearfix">
                        <i class="fa fa-laptop bg-info p-4 font-2xl mr-3 float-left"></i>
                        <div class="h5 text-info mb-0 pt-3">$1.999,50</div>
                        <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
                    </div>
                </b-card>
            </div><!--/.col-->
            <div class="col-6 col-lg-3">
                <b-card no-block>
                    <div class="card-body p-0 clearfix">
                        <i class="fa fa-moon-o bg-warning p-4 font-2xl mr-3 float-left"></i>
                        <div class="h5 text-warning mb-0 pt-3">$1.999,50</div>
                        <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
                    </div>
                </b-card>
            </div><!--/.col-->
            <div class="col-6 col-lg-3">
                <b-card no-block>
                    <div class="card-body p-0 clearfix">
                        <i class="fa fa-bell bg-danger p-4 font-2xl mr-3 float-left"></i>
                        <div class="h5 text-danger mb-0 pt-3">$1.999,50</div>
                        <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
                    </div>
                </b-card>
            </div><!--/.col-->
            <div class="col-6 col-lg-3">
                <b-card no-block>
                    <div class="card-body p-0 clearfix">
                        <i class="fa fa-cogs bg-primary p-4 px-5 font-2xl mr-3 float-left"></i>
                        <div class="h5 text-primary mb-0 pt-3">$1.999,50</div>
                        <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
                    </div>
                </b-card>
            </div><!--/.col-->
            <div class="col-6 col-lg-3">
                <b-card no-block>
                    <div class="card-body p-0 clearfix">
                        <i class="fa fa-laptop bg-info p-4 px-5 font-2xl mr-3 float-left"></i>
                        <div class="h5 text-info mb-0 pt-3">$1.999,50</div>
                        <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
                    </div>
                </b-card>
            </div><!--/.col-->
            <div class="col-6 col-lg-3">
                <b-card no-block>
                    <div class="card-body p-0 clearfix">
                        <i class="fa fa-moon-o bg-warning p-4 px-5 font-2xl mr-3 float-left"></i>
                        <div class="h5 text-warning mb-0 pt-3">$1.999,50</div>
                        <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
                    </div>
                </b-card>
            </div><!--/.col-->
            <div class="col-6 col-lg-3">
                <b-card no-block>
                    <div class="card-body p-0 clearfix">
                        <i class="fa fa-bell bg-danger p-4 px-5 font-2xl mr-3 float-left"></i>
                        <div class="h5 text-danger mb-0 pt-3">$1.999,50</div>
                        <div class="text-muted text-uppercase font-weight-bold font-xs">Income</div>
                    </div>
                </b-card>
            </div><!--/.col-->
        </div><!--/.row-->
        <div class="row">
            <div class="col-md-3 col-sm-6">
                <div class="social-box facebook">
                    <i class="fa fa-facebook"></i>
                    <ul>
                        <li>
                            <strong>89k</strong>
                            <span>friends</span>
                        </li>
                        <li>
                            <strong>459</strong>
                            <span>feeds</span>
                        </li>
                    </ul>
                </div><!--/social-box-->
            </div><!--/.col-->
            <div class="col-md-3 col-sm-6">
                <div class="social-box twitter">
                    <i class="fa fa-twitter"></i>
                    <ul>
                        <li>
                            <strong>973k</strong>
                            <span>followers</span>
                        </li>
                        <li>
                            <strong>1.792</strong>
                            <span>tweets</span>
                        </li>
                    </ul>
                </div><!--/social-box-->
            </div><!--/.col-->
            <div class="col-md-3 col-sm-6">
                <div class="social-box linkedin">
                    <i class="fa fa-linkedin"></i>
                    <ul>
                        <li>
                            <strong>500+</strong>
                            <span>contacts</span>
                        </li>
                        <li>
                            <strong>292</strong>
                            <span>feeds</span>
                        </li>
                    </ul>
                </div><!--/social-box-->
            </div><!--/.col-->
            <div class="col-md-3 col-sm-6">
                <div class="social-box google-plus">
                    <i class="fa fa-google-plus"></i>
                    <ul>
                        <li>
                            <strong>894</strong>
                            <span>followers</span>
                        </li>
                        <li>
                            <strong>92</strong>
                            <span>circles</span>
                        </li>
                    </ul>
                </div><!--/social-box-->
            </div><!--/.col-->
        </div><!--/.row-->
        <div class="card-group">
            <b-card>
                <div class="h1 text-muted text-right mb-4">
                    <i class="icon-people"></i>
                </div>
                <div class="h4 mb-0">87.500</div>
                <small class="text-muted text-uppercase font-weight-bold">Visitors</small>
                <b-progress class="progress-xs mt-3 mb-0" variant="info" :value="25"/>
            </b-card>
            <b-card>
                <div class="h1 text-muted text-right mb-4">
                    <i class="icon-user-follow"></i>
                </div>
                <div class="h4 mb-0">385</div>
                <small class="text-muted text-uppercase font-weight-bold">New Clients</small>
                <b-progress class="progress-xs mt-3 mb-0" variant="success" :value="25"/>
            </b-card>
            <b-card>
                <div class="h1 text-muted text-right mb-4">
                    <i class="icon-basket-loaded"></i>
                </div>
                <div class="h4 mb-0">1238</div>
                <small class="text-muted text-uppercase font-weight-bold">Products sold</small>
                <b-progress class="progress-xs mt-3 mb-0" variant="warning" :value="25"/>
            </b-card>
            <b-card>
                <div class="h1 text-muted text-right mb-4">
                    <i class="icon-pie-chart"></i>
                </div>
                <div class="h4 mb-0">28%</div>
                <small class="text-muted text-uppercase font-weight-bold">Returning Visitors</small>
                <b-progress class="progress-xs mt-3 mb-0" :value="25"/>
            </b-card>
            <b-card>
                <div class="h1 text-muted text-right mb-4">
                    <i class="icon-speedometer"></i>
                </div>
                <div class="h4 mb-0">5:34:11</div>
                <small class="text-muted text-uppercase font-weight-bold">Avg. Time</small>
                <b-progress class="progress-xs mt-3 mb-0" variant="danger" :value="25"/>
            </b-card>
        </div>
        <div class="row">
            <div class="col-sm-6 col-md-2">
                <b-card>
                    <div class="h1 text-muted text-right mb-4">
                        <i class="icon-people"></i>
                    </div>
                    <div class="h4 mb-0">87.500</div>
                    <small class="text-muted text-uppercase font-weight-bold">Visitors</small>
                    <b-progress class="progress-xs mt-3 mb-0" variant="info" :value="25"/>
                </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-md-2">
                <b-card>
                    <div class="h1 text-muted text-right mb-4">
                        <i class="icon-user-follow"></i>
                    </div>
                    <div class="h4 mb-0">385</div>
                    <small class="text-muted text-uppercase font-weight-bold">New Clients</small>
                    <b-progress class="progress-xs mt-3 mb-0" variant="success" :value="25"/>
                </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-md-2">
                <b-card>
                    <div class="h1 text-muted text-right mb-4">
                        <i class="icon-basket-loaded"></i>
                    </div>
                    <div class="h4 mb-0">1238</div>
                    <small class="text-muted text-uppercase font-weight-bold">Products sold</small>
                    <b-progress class="progress-xs mt-3 mb-0" variant="warning" :value="25"/>
                </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-md-2">
                <b-card>
                    <div class="h1 text-muted text-right mb-4">
                        <i class="icon-pie-chart"></i>
                    </div>
                    <div class="h4 mb-0">28%</div>
                    <small class="text-muted text-uppercase font-weight-bold">Returning Visitors</small>
                    <b-progress class="progress-xs mt-3 mb-0" :value="25"/>
                </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-md-2">
                <b-card>
                    <div class="h1 text-muted text-right mb-4">
                        <i class="icon-speedometer"></i>
                    </div>
                    <div class="h4 mb-0">5:34:11</div>
                    <small class="text-muted text-uppercase font-weight-bold">Avg. Time</small>
                    <b-progress class="progress-xs mt-3 mb-0" variant="danger" :value="25"/>
                </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-md-2">
                <b-card>
                    <div class="h1 text-muted text-right mb-4">
                        <i class="icon-speech"></i>
                    </div>
                    <div class="h4 mb-0">972</div>
                    <small class="text-muted text-uppercase font-weight-bold">Comments</small>
                    <b-progress class="progress-xs mt-3 mb-0" variant="info" :value="25"/>
                </b-card>
            </div><!--/.col-->
        </div><!--/.row-->
        <div class="row">
            <div class="col-sm-6 col-md-2">
                <b-card class="text-white bg-info">
                    <div class="h1 text-muted text-right mb-4">
                        <i class="icon-people"></i>
                    </div>
                    <div class="h4 mb-0">87.500</div>
                    <small class="text-muted text-uppercase font-weight-bold">Visitors</small>
                    <b-progress class="progress-white progress-xs mt-3" :value="25"/>
                </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-md-2">
                <b-card class="text-white bg-success">
                    <div class="h1 text-muted text-right mb-4">
                        <i class="icon-user-follow"></i>
                    </div>
                    <div class="h4 mb-0">385</div>
                    <small class="text-muted text-uppercase font-weight-bold">New Clients</small>
                    <b-progress class="progress-white progress-xs mt-3" :value="25"/>
                </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-md-2">
                <b-card class="text-white bg-warning">
                    <div class="h1 text-muted text-right mb-4">
                        <i class="icon-basket-loaded"></i>
                    </div>
                    <div class="h4 mb-0">1238</div>
                    <small class="text-muted text-uppercase font-weight-bold">Products sold</small>
                    <b-progress class="progress-white progress-xs mt-3" :value="25"/>
                </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-md-2">
                <b-card class="text-white bg-primary">
                    <div class="h1 text-muted text-right mb-4">
                        <i class="icon-pie-chart"></i>
                    </div>
                    <div class="h4 mb-0">28%</div>
                    <small class="text-muted text-uppercase font-weight-bold">Returning Visitors</small>
                    <b-progress class="progress-white progress-xs mt-3" :value="25"/>
                </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-md-2">
                <b-card class="text-white bg-danger">
                    <div class="h1 text-muted text-right mb-4">
                        <i class="icon-speedometer"></i>
                    </div>
                    <div class="h4 mb-0">5:34:11</div>
                    <small class="text-muted text-uppercase font-weight-bold">Avg. Time</small>
                    <b-progress class="progress-white progress-xs mt-3" :value="25"/>
                </b-card>
            </div><!--/.col-->
            <div class="col-sm-6 col-md-2">
                <b-card class="text-white bg-info">
                    <div class="h1 text-muted text-right mb-4">
                        <i class="icon-speech"></i>
                    </div>
                    <div class="h4 mb-0">972</div>
                    <small class="text-muted text-uppercase font-weight-bold">Comments</small>
                    <b-progress class="progress-white progress-xs mt-3" :value="25"/>
                </b-card>
            </div><!--/.col-->
        </div><!--/.row-->

    </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import Config from '../Config'
  import { VueTabs, VTab } from 'vue-nav-tabs'
  import Vuebar from 'vuebar'
  import 'vue-nav-tabs/themes/vue-tabs.css'
  import { BasicSelect } from 'vue-search-select'
  import cSwitch from '../components/Switch'

  require('../../static/css/bandeja.css')
  Vue.use(Vuebar)
  Vue.use(Config)
  export default {
    name: 'widgets',
    data () {
      return {
        msg: 'Widgets',
        pendientes: null,
        destinatarios: [],
        searchText: '', // If value is falsy, reset searchText & searchItem
        item: {
          value: '',
          text: ''
        },
        archivos: null,
        detalle: null,
        res: null,
        searchString: '',
        url: Config.url,
        activo: '',
        active: ''
      }
    },
    mounted () {
      this.getPendientes()
    },
    components: {
      VueTabs,
      VTab,
      BasicSelect,
      cSwitch
    },
    computed: {
      filteredPendientes () {
        var articlesarray = this.pendientes
        if (!this.searchString) {
          return articlesarray
        }
        this.searchString = this.searchString.trim().toLowerCase()
        articlesarray = articlesarray.filter((item) => {
          if (item.referencia.toLowerCase().indexOf(this.searchString) !== -1 || item.nur.toLowerCase().indexOf(this.searchString) !== -1) {
            return item
          }
        })
        return articlesarray
      }
    },
    methods: {
      onSelect (item) {
        this.item = item
      },
      getPendientes () {
        this.$Progress.start()
        var vm = this
        axios.get(this.url + 'bandeja/pendientes?token=' + localStorage.getItem('token'),
          {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.pendientes = response.data.data
                this.destinatarios = response.data.destinatarios
                this.$Progress.finish()
              } else {
                vm.$router.push('/pages/login')
                this.$Progress.fail()
              }
            }
          )
      },
      detalleHR (nur, id) {
        this.active = id
        this.$Progress.start()
        var vm = this
        axios.get(this.url + '/bandeja/detalle?nur=' + nur + '&token=' + localStorage.getItem('token'),
          {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
          .then(
            (response) => {
              this.res = response.data.res
              if (this.res !== null && this.res === 'success') {
                localStorage.setItem('token', response.data.token)
                this.detalle = response.data.data
                this.archivos = response.data.archivos
                this.$Progress.finish()
              } else {
                vm.$router.push('/pages/login')
                this.$Progress.fail()
              }
            }
          )
      }
    }
  }
</script>
<style>
    .wrap-messages {
        height: 600px;
    }
</style>