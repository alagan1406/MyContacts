sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("appmycontacts.controller.App", {
            onInit: function () {
                var that = this;
                $.ajax({
                    url: that._getODataRuntimeBaseURL() + "/contacts",
                    type: 'GET',
                    dataType: 'json', // added data type
                    success: function (res) {
                        console.log(res);
                        var wbsTempalteModelData = new JSONModel();
                        wbsTempalteModelData.setData(res);
                        that.getView().setModel(wbsTempalteModelData, "DataModel");
                    }
                });
                $.ajax({
                    url: that._getODataRuntimeBaseURL_SF() + "/API_TEST",
                    type: 'GET',
                    dataType: 'json', // added data type
                    success: function (sf) {
                        var wbsTempalteModelDataSF = new JSONModel();
                        wbsTempalteModelDataSF.setData(sf);
                        that.getView().setModel(wbsTempalteModelDataSF, "DataModelSF");
                    }
                });
                $.ajax({
                    url: that._getODataRuntimeBaseURL_GMAIL() + "/messages",
                    type: 'GET',
                    dataType: 'json', // added data type
                    success: function (gm) {
                        var wbsTempalteModelDataSF = new JSONModel();
                        wbsTempalteModelDataSF.setData(gm);
                        that.getView().setModel(wbsTempalteModelDataSF, "DataModelGM");
                    }
                });
                $.ajax({
                    url: that._getODataRuntimeBaseURL_Act() + "/contacts",
                    type: 'GET',
                    dataType: 'json', // added data type
                    success: function (gm) {
                        var wbsTempalteModelDataSF = new JSONModel();
                        wbsTempalteModelDataSF.setData(gm);
                        that.getView().setModel(wbsTempalteModelDataSF, "DataModelAct");
                    }
                });

            },
            _getODataRuntimeBaseURL: function () {
                var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                var appPath = appId.replaceAll(".", "/");
                var appModulePath = jQuery.sap.getModulePath(appPath);
                return appModulePath + "/HubSpotCRM";
            },
            _getODataRuntimeBaseURL_SF: function () {
                var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                var appPath = appId.replaceAll(".", "/");
                var appModulePath = jQuery.sap.getModulePath(appPath);
                return appModulePath + "/Snowflake";
            },
            _getODataRuntimeBaseURL_GMAIL: function () {
                var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                var appPath = appId.replaceAll(".", "/");
                var appModulePath = jQuery.sap.getModulePath(appPath);
                return appModulePath + "/Gmail";
            },
            _getODataRuntimeBaseURL_Act: function () {
                var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                var appPath = appId.replaceAll(".", "/");
                var appModulePath = jQuery.sap.getModulePath(appPath);
                return appModulePath + "/Act!365";
            },
            _getODataRuntimeBaseURL_IF: function () {
                var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                var appPath = appId.replaceAll(".", "/");
                var appModulePath = jQuery.sap.getModulePath(appPath);
                return appModulePath + "/products";
            },
            onGetValuesPress: function () {

                var oFC = this.getView().byId('FromContainerId').getItems();
                var oResult = this.getView().byId('ResultLabelId');
                var name = this.getView().byId("myInput1").getValue();
                var city = this.getView().byId("myInput2").getValue();
                var email = this.getView().byId("myInput3").getValue();
                var that = this;
                var oprop = "{ \"properties\": {";
                var oname = "\"firstname\": " + "\"" + name + "\", ";
                var ocity = "\"city\": " + "\"" + city + "\", ";
                var oemail = "\"email\": " + "\"" + email + "\" } }";
                var json = oprop + oname + ocity + oemail;
                var from = "{ \"from\": \"alagan941@gmail.com\", ";
                var subject = "\"subject\": \"Hubspot CRM - User Creation Success\",";
                var to = "\"to\": " + "\"" + email + "\", ";
                var data_mail = "\"data\": \"Your Cutomer Id has been successfully created in Hubspot CRM\" }";
                var json_gmail = from + subject + to + data_mail;

                oResult.setText(from + subject + to + data_mail);
                //oResult.setText("{\"properties\": {\"city\": \"string\",\"email\": \"string\",\"name\": \"string\"}}");

                var url = that._getODataRuntimeBaseURL() + "/contacts";
                var url_gmail = that._getODataRuntimeBaseURL_GMAIL() + "/messages";
                //var json = "{ \"properties\": { \"firstname\": \"POST_TEST1\", \"city\": \"TEST_CITY1\", \"email\": \"Test1231@zzz.com\" } }";

                $.ajax({
                    type: "POST",
                    url: url,
                    data: json,
                    dataType: "json",
                    async: false,
                    contentType: 'application/json; charset=utf-8',
                    success: function (data, textStatus, xhr) {
                        console.log("sukses: " + data + " " + JSON.stringify(xhr));
                    },
                    error: function (e, xhr, textStatus, err, data) {
                        console.log(e);
                        console.log(xhr);
                        console.log(textStatus);
                        console.log(err);
                    }
                });

                $.ajax({
                    type: "POST",
                    url: url_gmail,
                    data: JSON.stringify(json_gmail),
                    dataType: "json",
                    async: false,
                    //enctype: 'multipart/form-data',
                    contentType: 'application/json; charset=utf-8',
                    file: "",
                    success: function (data, textStatus, xhr) {
                        console.log("sukses: " + data + " " + JSON.stringify(xhr));
                    },
                    error: function (e, xhr, textStatus, err, data) {
                        console.log(e);
                        console.log(xhr);
                        console.log(textStatus);
                        console.log(err);
                    }
                });

                //oFC.getItems().forEach(function (item) {

                //    if (item.getMetadata().getName() === "sap.m.Input") {
                //        if (item.getProperty("name") === "myInput") {
                //            oResult.setText(oResult.getText() + ":" + item.getValue());
                //        }

                //    }
                //});

            },
            onGetValuesPress1: function () {

                //var oFC = this.getView().byId('FromContainerId').getItems();
                var oResult = this.getView().byId('ResultLabelId1');
                var prdid = this.getView().byId("myInput4").getValue();
                var that = this;
                var start = "{\"productIdentifier\": \"";
                var value = prdid;
                var end = "\"}";
                var json_if = start + value + end;

                oResult.setText(start + value + end);

                var url_if = that._getODataRuntimeBaseURL_IF() + "/details";

                $.ajax({
                    type: "POST",
                    url: url_if,
                    data: json_if,
                    dataType: "json",
                    async: false,
                    contentType: 'application/json; charset=utf-8',
                    success: function (ifl) {
                        var wbsTempalteModelDataIF = new JSONModel();
                        wbsTempalteModelDataIF.setData(ifl);
                        that.getView().setModel(wbsTempalteModelDataIF, "DataModelIF");
                    },
                    error: function (e, xhr, textStatus, err, data) {
                        console.log(e);
                        console.log(xhr);
                        console.log(textStatus);
                        console.log(err);
                    }
                });

            },
            handleNav1: function () {
                var navCon = this.byId("navCon");
                navCon.to(this.byId("p1"), "Slide animation");
                this.getView().byId("BUT1").setType("Emphasized");
                this.getView().byId("BUT2").setType("Accept");
                this.getView().byId("BUT3").setType("Accept");
                this.getView().byId("BUT4").setType("Accept");
                this.getView().byId("BUT5").setType("Accept");
            },
            handleNav2: function () {
                var navCon = this.byId("navCon");
                navCon.to(this.byId("p2"), "Slide animation");
                this.getView().byId("BUT1").setType("Accept");
                this.getView().byId("BUT2").setType("Emphasized");
                this.getView().byId("BUT3").setType("Accept");
                this.getView().byId("BUT4").setType("Accept");
                this.getView().byId("BUT5").setType("Accept");
            },
            handleNav3: function () {
                var navCon = this.byId("navCon");
                navCon.to(this.byId("p3"), "Slide animation");
                this.getView().byId("BUT1").setType("Accept");
                this.getView().byId("BUT2").setType("Accept");
                this.getView().byId("BUT3").setType("Emphasized");
                this.getView().byId("BUT4").setType("Accept");
                this.getView().byId("BUT5").setType("Accept");

            },
            handleNav4: function () {
                var navCon = this.byId("navCon");
                navCon.to(this.byId("p4"), "Slide animation");
                this.getView().byId("BUT1").setType("Accept");
                this.getView().byId("BUT2").setType("Accept");
                this.getView().byId("BUT3").setType("Accept");
                this.getView().byId("BUT4").setType("Emphasized");
                this.getView().byId("BUT5").setType("Accept");

            },
            handleNav5: function () {
                var navCon = this.byId("navCon");
                navCon.to(this.byId("p5"), "Slide animation");
                this.getView().byId("BUT1").setType("Accept");
                this.getView().byId("BUT2").setType("Accept");
                this.getView().byId("BUT3").setType("Accept");
                this.getView().byId("BUT4").setType("Accept");
                this.getView().byId("BUT5").setType("Emphasized");

            },
            handleUploadComplete: function (oEvent) {
                var sResponse = oEvent.getParameter("response"),
                    iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse)[0]),
                    sMessage;

                if (sResponse) {
                    sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
                    MessageToast.show(sMessage);
                }
            },

            handleUploadPress: function () {
                var oFileUploader = this.byId("fileUploader");
                oFileUploader.checkFileReadable().then(function () {
                    //oFileUploader.upload();
                    MessageToast.show("File Ready to Upload");
                }, function (error) {
                    MessageToast.show("The file cannot be read. It may have changed.");
                }).then(function () {
                    oFileUploader.clear();
                });
            }

        });


    });
