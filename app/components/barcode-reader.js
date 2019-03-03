import $ from 'jquery';
import Quagga from 'npm:quagga';
import Component from '@ember/component';

export default Component.extend({

	actions: {

		launchBarcodeScanner: function () {
			$("#cameraView").css("display", "block");

			Quagga.init({
				inputStream : {
					name : "Live",
					type : "LiveStream",
					target: document.querySelector('#cameraView'),
					constraints: {
          }
				},
				decoder : {
					readers : ["code_128_reader"]
				}
			}, function(err) {
				if (err) {
					console.log(err);
					return
				}
				Quagga.start();
			});
		}
	},

	closeBarcodeScanner: function () {

	}

});
