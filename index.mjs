let noofPallet = 0;
let btnbanding = null;
let btncornerProtectorsUse = null;
let btnShrinkWrapped = null;
let btnboxes = null;

(function() {

  $('#saleOrderNumber, #numberOfPallet').on('blur', function() {
    const saleOrderNumber = $('#saleOrderNumber').val();
    const numberOfPallet = $('#numberOfPallet').val();

    if (saleOrderNumber && numberOfPallet) {
      $('#Send').show();
      $('#log').text('');
      $('.palletChecklistContainer').show();
      noofPallet = numberOfPallet
        // Clear existing pallet containers
        $('.palletContainer').remove();

        // Append the required number of pallet containers
        for (let i = 0; i < numberOfPallet; i++) {
            const palletDiv = `
              <div class="pallet-info palletContainer">
                  <h5 id="title">Pallet No. ${i+1}</h5>
                  <div class="row ">
                      <div class="col">
                        <div class="input-quote">
                          <input type="text" id="Length${i}"  class="input-populated">
                          <label for="Length${i}">Length</label>
                        </div>    
                      </div>
                      <div class="col">
                        <div class="input-quote">
                          <input type="text" id="Width${i}" class="input-populated">
                          <label for="Width${i}">Width</label>
                        </div>
                      </div>
                      <div class="col">
                        <div class="input-quote">
                          <input type="text" id="Height${i}" class="input-populated">
                          <label for="Height${i}">Height</label>
                        </div>    
                      </div>
                  </div>
                  <div class="row ">
                      <div class="col">
                        <div class="input-quote">
                          <input type="text" id="Weight${i}" class="input-populated">
                          <label for="Weight${i}">Weight</label>
                        </div>
                      </div>
                  </div>
                  <div class="row ">
                    <div class="col">
                        <div class="input_containers">
                          <label class="mylabel" for="pictureOnScalePro${i}">Click Here to Upload Picture 1</label>
                          <input type="file" id="pictureOnScalePro${i}" style="display:none;">
                          <p>Pallet on scale with PRO sticker Readable (close up)</p>
                        </div>
                        <div class="input_containers">
                          <label class="mylabel" for="pictureSidePalletDisplay${i}">Click Here to Upload Picture 2</label>
                          <input type="file" id="pictureSidePalletDisplay${i}" style="display:none;">
                          <p>Side view of pallet</p>
                        </div>
                        <div class="input_containers">
                          <label class="mylabel" for="packingList${i}">Click Here to Upload Picture 3</label>
                          <input type="file" id="packingList${i}" style="display:none;">
                          <p>Packing List</p>
                        </div>
                      </div>
                  </div>
                  
              </div>`;
            $('#pallet').append(palletDiv);
            $(`#Weight${i}, #Height${i}, #Length${i}, #Width${i}`).on('input', function() {
                var value = $(this).val();
                value = value.replace(/[^0-9.]/g, '');
                if ((value.match(/\./g) || []).length > 1) {
                    value = value.replace(/\.+$/, '');
                }
                $(this).val(value);
            });
            $(`#pictureOnScalePro${i}`).on("change", function() {
                const fileName = $(this).prop("files")[0]?.name;
                const label = $(`label[for=pictureOnScalePro${i}]`);
                label.text(fileName || "Click Here to Upload Picture 1");
            });
            $(`#pictureSidePalletDisplay${i}`).on("change", function() {
                const fileName = $(this).prop("files")[0]?.name;
                const label = $(`label[for=pictureSidePalletDisplay${i}]`);
                label.text(fileName || "Click Here to Upload Picture 2");
            });
            $(`#packingList${i}`).on("change", function() {
                const fileName = $(this).prop("files")[0]?.name;
                const label = $(`label[for=packingList${i}]`);
                label.text(fileName || "Click Here to Upload Picture 3");
            });
        }
    }
  });

  $('#Send').on('click',async function() {
    if (checkbtns()){
      $('#log').hide();
      await submitForm();

    } 
  });
  
  btn();
}());

function checkbtns(){
  if ( btnbanding && btncornerProtectorsUse && btnShrinkWrapped && btnboxes){
    return true
  }
  $('#log').text('There are unchecked items on checklist section');
}

function btn(){
   $('#btnbandingUsedYes').on('click', function() {
      btnbanding = 'Yes';
      $('#btnbandingUsedYes').css('background-color', '#00FF94');
      $('#btnbandingUsedNo').css('background-color', '#D9D9D9');
   })
   $('#btnbandingUsedNo').on('click', function() {
      btnbanding = 'No';
      $('#btnbandingUsedNo').css('background-color', '#FF8787');
      $('#btnbandingUsedYes').css('background-color', '#D9D9D9');
   })
    $('#btncornerProtectorsUseyes').on('click', function() {
      $('#btncornerProtectorsUseyes').css('background-color', '#00FF94');
      $('#btncornerProtectorsUseNo').css('background-color', '#D9D9D9');
      btncornerProtectorsUse = 'Yes'
   })
   $('#btncornerProtectorsUseNo').on('click', function() {
    $('#btncornerProtectorsUseNo').css('background-color', '#FF8787');
    $('#btncornerProtectorsUseyes').css('background-color', '#D9D9D9');
      btncornerProtectorsUse = 'No'
   })
    $('#btnShrinkWrappedYes').on('click', function() {
      $('#btnShrinkWrappedYes').css('background-color', '#00FF94');
      $('#btnShrinkWrappedNo').css('background-color', '#D9D9D9');
      btnShrinkWrapped = 'Yes'
   })
   $('#btnShrinkWrappedNo').on('click', function() {
    $('#btnShrinkWrappedNo').css('background-color', '#FF8787');
    $('#btnShrinkWrappedYes').css('background-color', '#D9D9D9');
      btnShrinkWrapped = 'No'
   })
    $('#btnboxesYes').on('click', function() {
      $('#btnboxesYes').css('background-color', '#00FF94');
      $('#btnboxesNo').css('background-color', '#D9D9D9');
      btnboxes = 'Yes'
   })
   $('#btnboxesNo').on('click', function() {
    $('#btnboxesNo').css('background-color', '#FF8787');
    $('#btnboxesYes').css('background-color', '#D9D9D9');
    btnboxes = 'No'
   })
}



async function submitForm(){
    const formData = new FormData();
    let saleOrderNumber = $('#saleOrderNumber').val();
    let numberOfPallet = $('#numberOfPallet').val();
    let pallet = [];
    
    let palletdet = {
        saleOrderNumber: saleOrderNumber,
        numberOfPallet: numberOfPallet,
        btnbanding: btnbanding,
        btncornerProtectorsUse: btncornerProtectorsUse,
        btnShrinkWrapped: btnShrinkWrapped,
        btnboxes: btnboxes
    };

    let noofPallet = parseInt(numberOfPallet);
    console.log(noofPallet);
   
    if(noofPallet > 0) {
        for (let index = 0; index < noofPallet; index++) {
            let pictureOnScalePro = $(`#pictureOnScalePro${index}`)[0].files[0];
            let pictureSidePalletDisplay = $(`#pictureSidePalletDisplay${index}`)[0].files[0];
            let packingList = $(`#packingList${index}`)[0].files[0];
            let length = $(`#Length${index}`).val();
            let width = $(`#Width${index}`).val();
            let height = $(`#Height${index}`).val();
            let weight = $(`#Weight${index}`).val()
            if (length == '' || width == '' || height  == '' || weight == ''){
              $('#log').text(`There are fields not filled on Pallet No. ${index + 1}`);
              $('#log').show();
              return 
            }

            let palletobj = {
                Length: parseFloat(length),
                Width: parseFloat(width),
                Height: parseFloat(height),
                Weight: parseFloat(weight),
                pictureOnScaleProimg: null,
                pictureOnScaleProfile : null,
                pictureSidePalletDisplayimg: null,
                pictureSidePalletDisplayfile : null,
                packingListimg : null,
                packingListfile : null
            };


            if(pictureOnScalePro){
              palletobj.pictureOnScaleProimg = pictureOnScalePro.name
              palletobj.pictureOnScaleProfile = pictureOnScalePro
            }
            if(pictureSidePalletDisplay){
              // console.log(imgsidePallet.name);
              palletobj.pictureSidePalletDisplayimg = pictureSidePalletDisplay.name;
              palletobj.pictureSidePalletDisplayfile = pictureSidePalletDisplay
            }
            if(packingList){
              // console.log(imgsidePallet.name);
              palletobj.packingListimg = packingList.name;
              palletobj.packingListfile = packingList
            }
          
            pallet.push(palletobj);
        }
    }

    formData.append('palletdet', JSON.stringify(palletdet));
    formData.append('pallet', JSON.stringify(pallet));
    formData.append('warehouse', "Bedtech@pinnacleteam.com");

    for (let i = 0; i < pallet.length; i++) {
      // console.log('here', pallet[i].palletScaleimg, pallet[i].sidePalletimg != null)
      if (pallet[i].pictureOnScaleProfile != null) {
          formData.append('attachments[]', pallet[i].pictureOnScaleProfile);
      }
      if (pallet[i].pictureSidePalletDisplayfile != null ) {
          formData.append('attachments[]', pallet[i].pictureSidePalletDisplayfile);
      }
      if (pallet[i].packingListfile != null ) {
          formData.append('attachments[]', pallet[i].packingListfile);
      }
  }
// https://tryexpress-1jl5.onrender.com
// http://localhost:3000
  $('#log').text('Sending pallets please wait...');
  $('#Send').hide();
  $('#log').show();
  fetch('https://tryexpress-1jl5.onrender.com/v1/', {
      method: 'POST',
      body: formData
  })
  .then(response => {
      if (!response.ok) {
        $('#log').text('Network response was not ok');
        $('#log').show();
        throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      $('#log').text('Pallet Details sent!');
      $('#log').show();
      setTimeout(() => {
        $('#log').hide();
      }, 5000);
      noofPallet = 0;
      btnbanding = null;
      btncornerProtectorsUse = null;
      btnShrinkWrapped = null;
      btnboxes = null;
      $('#saleOrderNumber').val('');
      $('#numberOfPallet').val('');
      $('.palletContainer').remove();
      $('.palletChecklistContainer').hide();
      $('#btnbandingUsedYes').css('background-color', '#D9D9D9');
      $('#btnbandingUsedNo').css('background-color', '#D9D9D9');
      $('#btncornerProtectorsUseNo').css('background-color', '#D9D9D9');
      $('#btncornerProtectorsUseyes').css('background-color', '#D9D9D9');
      $('#btnShrinkWrappedNo').css('background-color', '#D9D9D9');
      $('#btnShrinkWrappedYes').css('background-color', '#D9D9D9');$('#btnboxesNo').css('background-color', '#D9D9D9');
      $('#btnboxesYes').css('background-color', '#D9D9D9');
      console.log('Data sent successfully:', data);
  })
  .catch(error => {
      console.error('Error sending data:', error);
  });
}












