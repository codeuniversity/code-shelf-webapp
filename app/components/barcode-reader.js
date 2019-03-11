import $ from 'jquery';
import Quagga from 'npm:quagga';
import { inject } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
	booksRepository: inject(),

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
				let preview = this.get('booksRepository').getPreview(result.codeResult.code);

				if (preview.status === 404) {
					alert("No matching books found on google books.");
					// TODO style notification
				} else {
					window.location.href = '/preview/' + result.codeResult.code;
				}
      });
		}

	}

});
