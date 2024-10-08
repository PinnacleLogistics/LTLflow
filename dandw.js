let noofPallet = 0;
let btncornerProtectorsUse = null;
let btnShrinkWrapped = null;
let nooverhang = null;

 let allFilesMap = {};

(function() {


$('#saleOrderNumber, #numberOfPallet').on('blur', function() {
  const saleOrderNumber = $('#saleOrderNumber').val();
  let numberOfPallet = $('#numberOfPallet').val();

  numberOfPallet = parseInt(numberOfPallet, 10);

  if (isNaN(numberOfPallet) || numberOfPallet <= 0) {
    $('#Send').hide();
    return; 
  }

  if (saleOrderNumber && numberOfPallet) {
    $('#Send').show();
    $('#log').text('');
    $('.palletChecklistContainer').show();

    let currentPalletCount = $('.palletContainer').length;

    if (numberOfPallet < currentPalletCount) {
      for (let i = numberOfPallet; i < currentPalletCount; i++) {
        $(`.palletContainer:eq(${i})`).remove();
        delete allFilesMap[i];
      }
    }

    // If the new pallet count is greater, append new pallets
    for (let i = currentPalletCount; i < numberOfPallet; i++) {
      const palletDiv = `
        <div class="pallet-info palletContainer">
          <h5 id="title">Pallet No. ${i + 1}</h5>
          <div class="row">
            <div class="col">
              <div class="input-quote">
                <input type="text" id="Length${i}" class="input-populated">
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
          <div class="row">
            <div class="col">
              <div class="input-quote">
                <input type="text" id="Weight${i}" class="input-populated">
                <label for="Weight${i}">Weight</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="input_containers">
                <label class="mylabel" for="pictureSidePalletDisplay${i}">Click Here to Upload Picture 1</label>
                <input type="file" id="pictureSidePalletDisplay${i}" style="display:none;">
                <p>Pallet on scale with weight display visible</p>
              </div>
            </div>
          </div>
          <div class="input_containers">
            <label class="mylabel" for="packingList${i}">Click Here to Upload Picture 2</label>
            <input type="file" id="packingList${i}" style="display:none;" multiple>
            <p>Packing List with weight display visible</p>
            <p id="packingListfilepicked${i}"></p>
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

      $(`#pictureSidePalletDisplay${i}`).on('change', function() {
        const fileName = $(this).prop('files')[0]?.name;
        const label = $(`label[for=pictureSidePalletDisplay${i}]`);
        label.text(fileName || 'Click Here to Upload Picture 1');
      });

      setupFileInput(i);
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
  if (btncornerProtectorsUse && btnShrinkWrapped && nooverhang){
    return true;
  }
  $('#log').text('There are unchecked items on checklist section');
  $('#log').show();
}

function btn(){
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
  $('#btnNoOverhangYes').on('click', function() {
    $('#btnNoOverhangYes').css('background-color', '#00FF94');
    $('#btnNoOverhang').css('background-color', '#D9D9D9');
      nooverhang = 'Yes';
  });
  $('#btnNoOverhang').on('click', function() {
    $('#btnNoOverhang').css('background-color', '#FF8787');
    $('#btnNoOverhangYes').css('background-color', '#D9D9D9');
      nooverhang = 'No';
  });

}


async function submitForm(){
    const formData = new FormData();
    let saleOrderNumber = $('#saleOrderNumber').val();
    let numberOfPallet = $('#numberOfPallet').val();
    let pallet = [];
    
    let palletdet = {
        saleOrderNumber: saleOrderNumber,
        numberOfPallet: numberOfPallet,
        btncornerProtectorsUse: btncornerProtectorsUse,
        btnShrinkWrapped: btnShrinkWrapped,
        nooverhang: nooverhang
    };

    let noofPallet = parseInt(numberOfPallet);
   
    if(noofPallet > 0) {
        for (let index = 0; index < noofPallet; index++) {
            let pictureSidePalletDisplay = $(`#pictureSidePalletDisplay${index}`)[0].files[0];
            if(!pictureSidePalletDisplay){
              $('#log').text(`Pictures not attached on Pallet No. ${index + 1} - Pallet on scale`);
              $('#log').show();
              return;
            }
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
                pictureSidePalletDisplayimg: null,
                pictureSidePalletDisplayfile : null,
                packingListfile : null
            };


            if(pictureSidePalletDisplay){
              palletobj.pictureSidePalletDisplayimg = pictureSidePalletDisplay.name;
              palletobj.pictureSidePalletDisplayfile = pictureSidePalletDisplay
            }
            // if(allFilesMap.index){
            //   palletobj.packingListfile = packingList
            // }
          
            pallet.push(palletobj);
        }
    }

    formData.append('palletdet', JSON.stringify(palletdet));
    formData.append('pallet', JSON.stringify(pallet));
    formData.append('warehouse', "D&W Silks");
    formData.append('sendTo', "p_deeley@dwsilks.com"); //p_deeley@dwsilks.com
    formData.append('customerID', "51420-P1");

    for (let i = 0; i < pallet.length; i++) {
      if (pallet[i].pictureSidePalletDisplayfile != null ) {
          formData.append('attachments[]', pallet[i].pictureSidePalletDisplayfile);
      }
    
      if (allFilesMap[`${i}`].length > 0){
        for (let j = 0; j < allFilesMap[`${i}`].length; j++) {
          formData.append('attachments[]', allFilesMap[`${i}`][j]);
        }
      }else{
        $('#log').text(`Pictures not attached on Pallet No. ${i + 1} - Packing List`);
        $('#log').show();
        return;
      }
    }

    
// https://tryexpress-1jl5.onrender.com
// http://localhost:3000
  $('#log').text('Sending pallets please wait...');
  // $('#Send').hide();
  $('#log').show();
  fetch('https://tryexpress-1jl5.onrender.com/v1', {
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
      allFilesMap = {};
      for (let index = 0; index < noofPallet; index++) {
        $(`#packingListfilepicked${index}`).empty();
      }
      noofPallet = 0;
      btncornerProtectorsUse = null;
      btnShrinkWrapped = null;
      nooverhang = null;
      $('#saleOrderNumber').val('');
      $('#numberOfPallet').val('');
      $('.palletContainer').remove();
      $('.palletChecklistContainer').hide();
      $('#btncornerProtectorsUseNo').css('background-color', '#D9D9D9');
      $('#btncornerProtectorsUseyes').css('background-color', '#D9D9D9');
      $('#btnShrinkWrappedNo').css('background-color', '#D9D9D9');
      $('#btnShrinkWrappedYes').css('background-color', '#D9D9D9');
      $('#btnNoOverhang').css('background-color', '#D9D9D9');
      $('#btnNoOverhangYes').css('background-color', '#D9D9D9');
      console.log('Data sent successfully:', data);
  })
  .catch(error => {
      console.error('Error sending data:', error);
  });
}


/* -------------------------------------setup file inputs-------------------------------------- */
 function setupFileInput(i) {
    allFilesMap[i] = allFilesMap[i] || [];

    $(`#packingList${i}`).on('change', function() {
      var files = $(this)[0].files;
      allFilesMap[i] = allFilesMap[i].concat(Array.from(files));
      const uniqueFiles = Array.from(new Set(allFilesMap[i].map(file => file.name)))
      .map(name => {
        return allFilesMap[i].find(file => file.name === name);
      });
      allFilesMap[i] = uniqueFiles;
      displayFiles(i);
    });
  }

function displayFiles(i) {
  $(`#packingListfilepicked${i}`).empty();
  $.each(allFilesMap[i], function(index, file) {
    $(`#packingListfilepicked${i}`).append(
      `<div class="file-item" data-file-index="${index}">
        ${file.name} <span class="delete-file" data-file-name="${file.name}">X</span>
      </div>`
    );
  });

  $(`#packingListfilepicked${i} .delete-file`).on('click', function() {
    var fileName = $(this).data('file-name');
    allFilesMap[i] = allFilesMap[i].filter(file => file.name !== fileName);
    displayFiles(i);
  });
}












