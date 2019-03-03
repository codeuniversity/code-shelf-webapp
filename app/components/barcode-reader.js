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
            width: $(window).width(),
            height: $(window).height(),
            facingMode: "environment",
            aspectRatio: {min: 1, max: 2}
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
