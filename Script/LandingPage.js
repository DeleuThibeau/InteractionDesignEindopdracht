
//#region ==== Mail verification //

let email = {},
  signInButton


//------------------------------HELPERS-----------------------------

const isValidEmailAddress = function(emailAddress) {
    // Basis manier om e-mailadres te checken.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};

const isEmpty = function(fieldValue) {
   return !fieldValue || !fieldValue.length;
};

//-----------------------------OBJECTEN MAKEN-----------------------


const getDOMElements = function () {
  email.field = document.querySelector('.js-email-field');
  console.log(email.field)
  email.errorMessage = document.querySelector('.js-email-error-message');

  email.input = document.querySelector('.js-email-input')

  email.label = document.querySelector('.js-email-label')
  console.log(email)
  
  signInButton = document.querySelector('.js-sign-in-button');

};

//----------------------Error-functions---------------------------


const addErrors = function(formfield, errorField, errorMessage) 
{
  formfield.classList.add('has-error');
  errorField.classList.remove('u-none')
  errorField.innerHTML = errorMessage
};


const removeErrors = function(formfield,errorField)
{
  formfield.classList.remove('has-error');
  errorField.classList.add('u-none');
};


//-------------------DOUBLE-CHECK------------------------------------


const doubleCheckEmailAddress = function ()
{
  if(!isEmpty(email.input.value) && isValidEmailAddress(email.input.value))
  {
    removeErrors(email.field, email.errorMessage)
    email.input.removeEventListener('input',doubleCheckEmailAddress)
    removeErrors(email.field,  email.errorMessage);
  }

  else
  {
    addErrors(email.field, email.errorMessage, "Field is invalid")
  }
}



//-------------EVENTS voor EMAIL en BUTTON----------------

//--------------EMAIL-----------------


const enableListeners = function()
{
  email.input.addEventListener('blur',function()
  {

    if(isEmpty(email.input.value) || !isValidEmailAddress(email.input.value)){

      addErrors(email.field,email.errorMessage,": This field is required");
      email.input.removeEventListener('input',doubleCheckEmailAddress);
      email.input.addEventListener('input',doubleCheckEmailAddress);
    }

    else
    {
      removeErrors(email.field, email.errorMessage);
      email.input.removeEventListener('input',doubleCheckEmailAddress)
    }

  });


//-------------BUTTON-------------------

  if(signInButton){ // als de knop bestaat (true)

    signInButton.addEventListener('click',function(event)
    {
      event.preventDefault();

      if(!isEmpty(email.input.value) && isValidEmailAddress(email.input.value))
          {
            console.log('succes')
            console.log(`email: ${email.input.value}`)
          }
          
          else
          {
            console.log('Try again')
          }
    });
  }
  
};


const handleFloatingLabel = function()
{
  email.input.addEventListener('blur', function()
  {
    console.log('focusout')
    if(!isEmpty(email.input.value))
    {
      console.log('email niet leeg')
      email.label.classList.add('is-floating')
    }
    else{
      console.log('email leeg')
      email.label.classList.remove('is-floating')
    }

  })


}


//-------------------------DOM------------------------------------

document.addEventListener('DOMContentLoaded', function () {
  console.log('Script loaded!');
  getDOMElements();
  enableListeners();
  handleFloatingLabel();
});


//#endregion
