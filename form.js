var newForm = document.getElementById('newForm');

function searchOnFormTab() {
    var generatedElements = document.getElementsByClassName('generated');
    while (generatedElements[0]) {
      generatedElements[0].parentNode.removeChild(generatedElements[0]);
    }

    var formName = document.getElementById('formNameSearch').value;
    var formVersion = document.getElementById('versionSearch').value;
    var allForms = JSON.parse(localStorage.getItem('administrationForms'));
    var existingForms = JSON.parse(localStorage.getItem('formList'));

    if (!allForms) {
      alert("Forms not created");
      return;
    }

    var form = null;

    for(var j = 0; j < allForms.length; j++) {
      if(formName === allForms[j].formName) {
        form = allForms[j];
        break;
      }
    }

    if (!form) {
      alert("There is no form with the provided name: " + formName);
      return;
    }

    var formValues = null;

    if (existingForms) {
      for(var m = 0; m < existingForms.length; m++) {
        if ((formName === existingForms[m].formName) && 
            (parseInt(formVersion) === existingForms[m].version)
        ) {
          formValues = existingForms[m];
          break;
        }
    }
    }

      

    var textBoxElementCounter = 0;
    var radioButtonElementCounter = 0;
    var checkBoxElementCounter = 0;

    for(var l = 0; l < form.elements.length; l++) {
      var lineBreaker = document.createElement('br');
      lineBreaker.setAttribute('class', 'generated');
      if(form.elements[l].elementType === 'textBox') {
        var lB = document.createElement('br');
        newForm.appendChild(lB);
        lB.setAttribute('class', 'generated');
        var lsTextBox = document.createElement('input');
        lsTextBox.setAttribute('class', 'tbinput generated');
        lsTextBox.setAttribute('type', 'text');
        lsTextBox.setAttribute('id', 'tbinput' + l);
        if (form.elements[l].validationType === 'mandatory') {
          lsTextBox.setAttribute('class', 'tbinput mandatory-tb generated');
          lsTextBox.required = true;
        } 
        else if (form.elements[l].validationType === 'numeric') {          
          lsTextBox.setAttribute('class', 'tbinput numeric generated');
        }
        
        if(formValues != null) {
            if (formValues.textBoxElements.length > 0) {
                lsTextBox.setAttribute('value', formValues.textBoxElements[textBoxElementCounter]);
                textBoxElementCounter++;
            }
        }
        
        var textboxLabel = document.createElement('label');
        textboxLabel.setAttribute('id', 'tblabel' + l);
        textboxLabel.setAttribute('class', 'tblabel generated');
        textboxLabel.innerHTML = form.elements[l].labelName;
        newForm.appendChild(lineBreaker);
        newForm.appendChild(textboxLabel);
        newForm.appendChild(lsTextBox);

      }
      if(form.elements[l].elementType === 'radioButton') {
        var lB = document.createElement('br');
        lB.setAttribute('class', 'generated');
        var rbMainLabel = document.createElement('label');
        rbMainLabel.setAttribute('class', 'generated rb-label');
        rbMainLabel.innerHTML = form.elements[l].labelName;
        newForm.appendChild(lB);
        newForm.appendChild(rbMainLabel);
        for(var m = 0; m < form.elements[l].optionsQuantity; m++) {
          var lsRadio = document.createElement('input');
          lsRadio.setAttribute('type', 'radio');
          lsRadio.setAttribute('name', form.elements[l].labelName);
          lsRadio.setAttribute('value', form.elements[l].options[m]);
          lsRadio.setAttribute('class', 'radioinput generated');
          if (form.elements[l].validationType === 'mandatory') {
            lsRadio.setAttribute('name', "rb-mandatory-opt");
          }

          if(formValues != null) {
            if (formValues.radioButtonElements.length > 0) {
                if( formValues.radioButtonElements[radioButtonElementCounter] === true) {
                    lsRadio.setAttribute('checked', true);
                }
                radioButtonElementCounter++;
            }
        }
        
        
          var rbLabel = document.createElement('label');
          rbLabel.setAttribute('class', 'generated');
          rbLabel.innerHTML = form.elements[l].options[m];
          var lB = document.createElement('br');
          lB.setAttribute('class', 'generated');
          newForm.appendChild(lsRadio);
          newForm.appendChild(rbLabel);

          for(var n = 1; n < form.elements[l].optionsQuantity; n++) {
            newForm.appendChild(lB)
          }
        }

      }
      if(form.elements[l].elementType === 'checkBox') {
        var lB = document.createElement('br');
        lB.setAttribute('class', 'generated');
        newForm.appendChild(lB);
        var lsCheckbox = document.createElement('input');
        lsCheckbox.setAttribute('type', 'checkbox');
        lsCheckbox.setAttribute('id', 'cb' + l);
        lsCheckbox.setAttribute('class', 'cbinput generated');

        if (form.elements[l].validationType === 'mandatory') {
          lsCheckbox.setAttribute('class', 'cbinput generated mandatory-cb');
          lsCheckbox.required = true;
        } 
        if(formValues != null) {
            if (formValues.checkBoxElements.length > 0) {
                if( formValues.checkBoxElements[checkBoxElementCounter] === true) {
                    lsCheckbox.setAttribute('checked', true);
                }
                checkBoxElementCounter++;
            }
        }
        var checkboxLabel = document.createElement('label');
        checkboxLabel.setAttribute('id', 'cblabel' + l);
        checkboxLabel.setAttribute('class', 'generated');
        checkboxLabel.innerHTML = form.elements[l].labelName;
        newForm.appendChild(checkboxLabel);
        newForm.appendChild(lsCheckbox);

      }
    }
    newForm.appendChild(lineBreaker);
    var saveButton = document.createElement('button');
    var buttonText = document.createTextNode('Save');
    saveButton.appendChild(buttonText);
    saveButton.setAttribute('type', 'button');
    saveButton.setAttribute('class', 'generated');
    saveButton.setAttribute('id', 'formSaveBtn');
    saveButton.addEventListener('click', function() {
        saveFormTab();
    });
    newForm.appendChild(saveButton);

}

    function saveFormTab() {
      var formList = [];
      var formName = document.getElementById('formNameSearch').value;
      var formVersion = document.getElementById('versionSearch').value;
      var textElements = document.getElementsByClassName('tbinput');
      var checkElements = document.getElementsByClassName('cbinput');
      var radioElements = document.getElementsByClassName('radioinput');

      var form = {
        formName: formName,
        version: parseInt(formVersion),
        textBoxElements: [],
        radioButtonElements: [],
        checkBoxElements: []
    }

    for (var i = 0; i < textElements.length; i++) {
        form.textBoxElements.push(textElements[i].value);
    }

    for (var k = 0; k < radioElements.length; k++) {
      form.radioButtonElements.push(radioElements[k].checked);
    }

    for (var j = 0; j < checkElements.length; j++) {
        form.checkBoxElements.push(checkElements[j].checked);
    }

    var existingForms = JSON.parse(localStorage.getItem('formList'));
    if (existingForms != null) {
        formList = existingForms;
    }
    
    if (!formVersion) {
      alert('What version?');
      return;
    }

    var regExp = /^[0-9]+$/;
    var numeric = document.getElementsByClassName('numeric');
    var z = 0;
    while(z < numeric.length) {
      if (!regExp.test(numeric[z].value)) {
        var numericalElementId = parseInt(numeric[z].id.split('tbinput').pop());
        var numericalElementLabel = document.getElementById('tblabel' + numericalElementId);
        alert(numericalElementLabel.innerHTML + ' must be a number!');
        return;
      } 
      z++;
    }

    var mandatoryTextbox = document.getElementsByClassName('mandatory-tb');
    var mandatoryCheckbox = document.getElementsByClassName('mandatory-cb');

    var y = 0;
    var x = 0;

    if (mandatoryTextbox.length > 0) {
    while(y < mandatoryTextbox.length) {
      if (isEmpty(mandatoryTextbox[y].value)) {
        var mandatoryTextboxId = parseInt(mandatoryTextbox[y].id.split('tbinput').pop());
        var mandatoryTextboxLabel = document.getElementById('tblabel' + mandatoryTextboxId);
        alert(mandatoryTextboxLabel.innerHTML + ' is mandatory!');
        return;
      }
      y++;
    }
  }

    if (!validateRadioButtons()) {
      alert("You must choose one option!");
      return;
    }

    if (mandatoryCheckbox.length > 0) {
    while(x < mandatoryCheckbox.length) {
      if (!(mandatoryCheckbox[x].checked)) {
        var mandatoryCheckboxId = parseInt(mandatoryCheckbox[x].id.split('cb').pop());
        var mandatoryCheckboxLabel = document.getElementById('cblabel' + mandatoryCheckboxId);
        alert(mandatoryCheckboxLabel.innerHTML + ' is mandatory!');
        return;
      }
      x++;
    }
  }
 
    for (var f = 0; f < formList.length; f++) {
      if (formList[f].formName === form.formName && formList[f].version === form.version ) {
        formList.splice(f, 1);
        break;
      }
    }
    formList.push(form);
    localStorage.setItem('formList', JSON.stringify(formList));
    alert('Form has been stored.');
  }

  function isEmpty(str) {
    return !str.trim().length || str === null;
}

function validateRadioButtons() {
  var radios = document.getElementsByName("rb-mandatory-opt");
  var formValid = false;
 if(radios.length == 0) {
  return true;
}
  var i = 0;
  while (!formValid && i < radios.length) {
      if (radios[i].checked) formValid = true;
      i++;        
  }
  return formValid;
}
