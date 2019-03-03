import Quagga from 'npm:quagga';
import Component from '@ember/component';

export default Component.extend({

	actions: {
		launchBarcodeScanner: function () {
			Quagga.init({
				inputStream : {
					name : "Live",
					type : "LiveStream",
					target: document.querySelector('#cameraView')
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
	}

});
