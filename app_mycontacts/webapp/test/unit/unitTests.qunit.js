/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"app_mycontacts/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
