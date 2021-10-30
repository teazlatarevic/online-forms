var formBuilder = document.getElementById('formBuilder');
var addNewRow = document.getElementById('addNewRow');
var elementCounter = 0;
var dropdown = document.getElementById('fieldConstraint');
var formTabSearchBtn = document.getElementById('formTabSearchBtn');
var showingRow = document.getElementById('wrapper');


function openTab(evt, tabName) {
    var j, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
    for (j = 0; j < tabcontent.length; j++) {
      tabcontent[j].style.display = "none";
    }
      tablinks = document.getElementsByClassName("tablinks");
    for (j = 0; j < tablinks.length; j++) {
      tablinks[j].className = tablinks[j].className.replace(" active", "");
    }
      document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  document.getElementById("defaultOpen").click();
  
  function addingRow(elementType, elementValue) {
    var lineBreaker = document.createElement('br');
    lineBreaker.setAttribute('class', 'generated');
    formBuilder.insertBefore(lineBreaker, addNewRow);

    elementCounter++;

    var newLabel = document.createElement('label');
    newLabel.setAttribute('class', 'generated');
    newLabel. innerHTML = "Element " + elementCounter;
    formBuilder.insertBefore(newLabel, addNewRow);
    
    var newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('class', 'form-element-labels generated');
    if (elementValue) {
      newInput.setAttribute('value', elementValue);
    }
    formBuilder.insertBefore(newInput, addNewRow);
    
    var typeOfField = document.createElement('select');
    typeOfField.setAttribute('name', 'fieldType' + elementCounter);
    typeOfField.setAttribute('id', 'fieldType' + elementCounter);
    typeOfField.setAttribute('class', 'selection' + elementCounter + ' generated');
    typeOfField.addEventListener('change', function() {
      update(typeOfField);
    });
    formBuilder.insertBefore(typeOfField, addNewRow);

    if (elementType === 'textBox' || !elementType) {
      typeOfField.options[typeOfField.options.length] = new Option('TextBox', 'textBox');
      typeOfField.options[typeOfField.options.length] = new Option('RadioButton', 'radioButton');
      typeOfField.options[typeOfField.options.length] = new Option('CheckBox', 'checkBox');
    } else if (elementType === 'checkBox') {
      typeOfField.options[typeOfField.options.length] = new Option('CheckBox', 'checkBox');
      typeOfField.options[typeOfField.options.length] = new Option('TextBox', 'textBox');
      typeOfField.options[typeOfField.options.length] = new Option('RadioButton', 'radioButton');
    } else if (elementType === 'radioButton') {
      typeOfField.options[typeOfField.options.length] = new Option('RadioButton', 'radioButton');
      typeOfField.options[typeOfField.options.length] = new Option('CheckBox', 'checkBox');
      typeOfField.options[typeOfField.options.length] = new Option('TextBox', 'textBox');
    }

    var constraintOfField = document.createElement('select');
    constraintOfField.setAttribute('name', 'fieldConstraint' + elementCounter);
    constraintOfField.setAttribute('id', 'fieldConstraint' + elementCounter);
    constraintOfField.setAttribute('class', 'generated');
    formBuilder.insertBefore(constraintOfField, addNewRow);

    constraintOfField.options[constraintOfField.options.length] = new Option('None', 'none');
    constraintOfField.options[constraintOfField.options.length] = new Option('Mandatory', 'mandatory');
    constraintOfField.options[constraintOfField.options.length] = new Option('Numeric', 'numeric');
    return typeOfField;
  }

 function update(event) {
  var selectElement = document.getElementById(event.id);
  var selectedFieldType = selectElement.options[selectElement.selectedIndex].value;
  var numericalId = event.id.split('fieldType').pop();

  if(selectedFieldType === 'textBox' || selectedFieldType === 'checkBox') {
    var rbLabelOptions = document.getElementsByClassName('label-for-options' + parseInt(numericalId));
    var rbInputOptions = document.getElementsByClassName('input-for-options' + parseInt(numericalId));
    var rbInputNumbers = document.getElementsByClassName('input-number' + parseInt(numericalId));
    var rbLineBreakers = document.getElementsByClassName('line-breaker' + parseInt(numericalId));



    while(rbLabelOptions[0]) {
      rbLabelOptions[0].parentNode.removeChild(rbLabelOptions[0]);
    }
    
    while(rbInputOptions[0]) {
      rbInputOptions[0].parentNode.removeChild(rbInputOptions[0]);
    }
    while(rbInputNumbers[0]) {
      rbInputNumbers[0].parentNode.removeChild(rbInputNumbers[0]);
    }

    while(rbLineBreakers[0]) {
      rbLineBreakers[0].parentNode.removeChild(rbLineBreakers[0]);
    }
    
  }

  else if (selectedFieldType === 'radioButton') {
    var rbQuantity = document.createElement('input');
    rbQuantity.setAttribute('type', 'number');
    rbQuantity.setAttribute('id', 'optionNumber' + parseInt(numericalId));
    rbQuantity.setAttribute('class', 'input-number' + parseInt(numericalId) + ' generated');
    formBuilder.insertBefore(rbQuantity, selectElement.nextSibling);
    rbQuantity.addEventListener('change', function() {
      updateOptionQuantity(selectElement, rbQuantity);
    });
  }

  return rbQuantity;
}

  function updateOptionQuantity(event, targetElement) {
    var id = event.id.split('fieldType').pop();
    var rbLabelOptions = document.getElementsByClassName('label-for-options' + parseInt(id));
    var rbInputOptions = document.getElementsByClassName('input-for-options' + parseInt(id));
    var rbInputNumbers = document.getElementsByClassName('line-breaker' + parseInt(id));


    while(rbLabelOptions[0]) {
      rbLabelOptions[0].parentNode.removeChild(rbLabelOptions[0]);
    }
    
    while(rbInputOptions[0]) {
      rbInputOptions[0].parentNode.removeChild(rbInputOptions[0]);
    }

    while(rbInputNumbers[0]) {
      rbInputNumbers[0].parentNode.removeChild(rbInputNumbers[0]);
    }

    var numberOfOptions = parseInt(targetElement.value);
    for (var j = numberOfOptions; j >= 1; j--) { 
      var optionNumber = document.createElement('label');
      optionNumber. innerHTML = "Option " + j;
      optionNumber.setAttribute('class', 'label-for-options' + parseInt(id) + ' generated');
      var optionText = document.createElement('input');
      optionText.setAttribute('type', 'text');
      optionText.setAttribute('class', 'input-for-options' + parseInt(id) + ' generated');
      optionText.setAttribute('id', 'option' + j);
      var fieldConstraint = targetElement.nextSibling;
      formBuilder.insertBefore(optionText, fieldConstraint.nextSibling);
      formBuilder.insertBefore(optionNumber, fieldConstraint.nextSibling);
      var lineBreaker = document.createElement('br');
      lineBreaker.setAttribute('class', 'line-breaker' + parseInt(id) + ' generated');
      formBuilder.insertBefore(lineBreaker, optionNumber);
    }
    
  }

  function saveForm() {
    var form = {
      formName: "",
      elements: []
    }
    var administrationForms = [];
    var alreadyAddedForms = JSON.parse(localStorage.getItem('administrationForms'));
    if (alreadyAddedForms != null) {
      administrationForms = alreadyAddedForms;
    }
    var formName = document.getElementById('formName').value;
    form.formName = formName;

    if (!form.formName) {
      alert("What is the name of the form?");
      return;
    }

    var labelNames = document.getElementsByClassName('form-element-labels');
    for(var j = 0; j < labelNames.length; j++) {
      var fieldTypeId = 'fieldType' + (j + 1);
      var selectedFieldType = document.getElementById(fieldTypeId).value;
      var fieldConstraintId = 'fieldConstraint' + (j + 1);
      var selectedFieldConstraint = document.getElementById(fieldConstraintId).value;
      if (selectedFieldType === 'radioButton') {
        var optionsQuantityId = 'optionNumber' + (j + 1);
        var optionsQuantity = document.getElementById(optionsQuantityId).value;
        var options = document.getElementsByClassName('input-for-options' + (j + 1));
        var optionValues = [];
        for(var k=0; k<options.length; k++) {
          optionValues.push(options[k].value);
        }
        var element = {
          labelName: labelNames[j].value,
          elementType: selectedFieldType,
          optionsQuantity: optionsQuantity,
          options: optionValues,
          validationType: selectedFieldConstraint
        };
      } else {
        var element = {
          labelName: labelNames[j].value,
          elementType: selectedFieldType,
          optionsQuantity: 1,
          validationType: selectedFieldConstraint
        };
      }
      form.elements.push(element);
    }
    for (var x = 0; x < administrationForms.length; x++) {
      if (administrationForms[x].formName === form.formName) {
        administrationForms.splice(x, 1);
        break;
      }
    }
    administrationForms.push(form);
    localStorage.setItem('administrationForms', JSON.stringify(administrationForms));
    alert("Your new form has been stored.");
  }

  function searchForm() {
    var addButton = document.getElementById('addNewRow');
    var saveForm = document.getElementById('administrationSaveButton');

    saveForm.style.display = 'inline-block';
    addButton.style.display = 'inline-block';

    var generatedElements = document.getElementsByClassName('generated');
    if (generatedElements.length > 0) {
      while (generatedElements[0]) {
        generatedElements[0].parentNode.removeChild(generatedElements[0]);
      }
    }
    elementCounter = 0;
    var formName = document.getElementById('formName').value;
    var allForms = JSON.parse(localStorage.getItem('administrationForms'));

    if (!allForms) {
      addingRow('textBox', null);
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
      addingRow('textBox', null);
      return;
    }

    for (var i = 0; i < form.elements.length; i++) {
    if ((form.elements[i].elementType === 'textBox') || (form.elements[i].elementType === 'checkBox')) {
      addingRow(form.elements[i].elementType, form.elements[i].labelName);
    }

    if (form.elements[i].elementType === 'radioButton') {
      var typeOfField = addingRow(form.elements[i].elementType, form.elements[i].labelName);
      var selectElement = document.getElementById(typeOfField.id);
      var rbQuantity = update(typeOfField);
      rbQuantity.setAttribute('value', form.elements[i].optionsQuantity);
      updateOptionQuantity(selectElement, rbQuantity);
      var numberOfOptions = parseInt(rbQuantity.value);
      for (var j = numberOfOptions; j >= 1; j--) {
        document.getElementById('option' + j).value = form.elements[i].options[j - 1];
      }
    }

    var fieldConstraint = document.getElementById('fieldConstraint' + (i + 1));

    if(fieldConstraint !== null) {
      fieldConstraint.value = form.elements[i].validationType;
    }
  }
}