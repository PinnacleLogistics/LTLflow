function startScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanner-container'),
            constraints: {
                width: 400,
                height: 300,
                facingMode: "environment" // "user" for the front camera
            },
        },
        decoder: {
            readers: [
                "code_128_reader",
                "ean_reader",
                "ean_8_reader",
                "code_39_reader",
                "code_39_vin_reader",
                "codabar_reader",
                "upc_reader",
                "upc_e_reader",
                "i2of5_reader"
            ],
            debug: {
                showCanvas: true,
                showPatches: true,
                showFoundPatches: true,
                showSkeleton: true,
                showLabels: true,
                showPatchLabels: true,
                showRemainingPatchLabels: true,
                boxFromPatches: {
                    showTransformed: true,
                    showTransformedBox: true,
                    showBB: true
                }
            }
        },

    }, function (err) {
        if (err) {
            console.error(err);
            return;
        }

        console.log("Initialization finished. Ready to start");
        Quagga.start();
        $('#barcode-result').text('Processing barcode...');
    });

    Quagga.onDetected(function (result) {
        var code = result.codeResult.code;
        var error = result.codeResult.error;
        var startinfo = result.codeResult.startInfo;
        console.log("Barcode detected and processed: [" + code + "]", result);
        $('#barcode-result').text('Barcode: '+ code);
    });
}

$('#openbarcode').on('click', function() {
startScanner();
});

$('#donebarcode').on('click', function() {
  Quagga.stop();
  $('#encoderModal').modal('hide');
});
