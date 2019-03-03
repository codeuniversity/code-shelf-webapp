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
						facingMode: "environment"
					}
				},
				decoder : {
					readers: [
					"ean_reader",
					"ean_8_reader"
					],
				},
				locate: true,
			}, function(err) {
				if (err) {
					console.log(err);
					return
				}

				Quagga.start();
				$("#cameraView video").css("width", "100%");
			});

			Quagga.onDetected((result) => {
        alert(result.codeResult.code);
      });
		}

	}

});
