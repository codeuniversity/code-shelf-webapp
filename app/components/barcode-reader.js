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

			Quagga.onProcessed(function (result) {
				let drawingCtx = Quagga.canvas.ctx.overlay;
				let drawingCanvas = Quagga.canvas.dom.overlay;

				if (result) {
					if (result.boxes) {
						drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
						
						result.boxes.filter((box) => {return box !== result.box;}).forEach((box) => {
							Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "#fff", lineWidth: 2 });
						});
					}

					if (result.box) {
						Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#fff", lineWidth: 2 });
					}

					if (result.codeResult && result.codeResult.code) {
						Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: '#ff6a6a', lineWidth: 3 });
					}
				}
			});

			Quagga.onDetected((result) => {
        alert(result.codeResult.code);
      });
		}

	}

});
