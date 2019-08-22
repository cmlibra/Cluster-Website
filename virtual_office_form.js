//used for email validation
const validate = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase())
}

$(document).ready(function() {

  var total_address_cost = 0
  var total_telephony_cost = 0
  var total_cost = 0
  
  var business_address = false
  var mail_forwarding = false
  var mail_scanning = false
  
  var business_phone = false
  var receptionist = false
  
	//Turn off checkbox options for default state.
  $("#mail_forwarding").hide();
  $("#mail_scanning").hide();
  $("#telephony_receptionist").hide();
  $("#sing_up_div").hide();
  $("#success_div").hide();
  
  //Hide form's error messages
  $("#calculator_error_msg").hide();
  $("#signup_error_msg").hide();
  
  //Hide activated options
  $("#activated_business_address").hide();
  $("#activated_address").hide();
  $("#activated_mail_forwarding").hide();
  $("#activated_mail_scanning").hide();
  $("#activated_business_phone").hide();
  $("#activated_receptionist").hide();

  function CalculateCosts() {
  	total_address_cost = 0
   	total_telephony_cost = 0

		//Calculate address costs
  	if (business_address) total_address_cost=total_address_cost+15
    if (mail_forwarding) total_address_cost=total_address_cost+15
    if (mail_scanning) total_address_cost=total_address_cost+20
    
   	//Calculate telephony costs
   	if (business_phone) total_telephony_cost=total_telephony_cost+8
   	if (receptionist) total_telephony_cost=total_telephony_cost+18

		text_mapper = 0
    if (business_address) text_mapper=1
    if (mail_forwarding) text_mapper+=1<<1
    if (mail_scanning) text_mapper+=1<<2
    switch (text_mapper) {
    	case 1:
      		$("#business_address_text").html("CBD Postal Address</br>Mail/Packages picked up by client</br>"+"$"+total_address_cost+" + GST/wk");
    		break;
    	case 3:
       		$("#business_address_text").html("CBD Postal Address</br>Mail/Packages forwarded to client</br>"+"$"+total_address_cost+" + GST/wk");
      	break;
      case 5:
        		$("#business_address_text").html("CBD Postal  Address</br>Mail scanned and emailed to client</br>"+"$"+total_address_cost+" + GST/wk");
      	break;
      case 7:
         		$("#business_address_text").html("CBD Postal  Address</br>Mail/Packages forwarded to client</br>Mail scanned and emailed to client</br>"+"$"+total_address_cost+" + GST/wk");
      	break;
      default:
        	 	$("#business_address_text").html("None");
      	break;
    }
    
    phone_mapper = 0
    if (business_phone) phone_mapper=1
    if (receptionist) phone_mapper+=1<<1
     switch (phone_mapper) {
    	case 1:
      		$("#phone_text").html("Dedicated Business Phone Number</br>"+"$"+total_telephony_cost+" + GST/wk");
    		break;
    	case 3:
       		$("#phone_text").html("Dedicated Business Phone Number</br>Receptionist answering calls</br>"+"$"+total_telephony_cost+" + GST/wk");
      	break;
      default:
         	$("#phone_text").html("None");
      	break;
    }
    total_cost = total_address_cost + total_telephony_cost

	  $("#security_deposit").text("$"+(total_cost*4.33).toFixed(2)+" + GST");
    $("#weekly_cost").text("$"+total_cost.toFixed(2)+" + GST/wk");
    $("#monthly_cost").text("$"+(total_cost*4.33).toFixed(2)+" + GST/month");
    $("#total_signup_fee").text("$"+(total_cost*4.33*2*1.1).toFixed(2)+" total inclusive of GST");
  }

	//checkbox callbacks
  $("#add_address_checkbox").click(function() {
  	business_address = !business_address
   	
    $("#mail_forwarding").toggle(100);
   	$("#mail_scanning").toggle(100);
    
    if (!business_address) {
     		mail_forwarding = false
  	 		mail_scanning = false
     		$("#mail_forward_checkbox").prop('checked',false);
     		$("#mail_scanning_checkbox").prop('checked',false);
     		$("#activated_business_address").show();
     		$("#activated_address").show();
  	} else {
    		$("#activated_business_address").show();
				$("#activated_address").show();
    }
    
    CalculateCosts()
 	});
  
   $("#mail_forward_checkbox").click(function() {
  	mail_forwarding = !mail_forwarding
    if (mail_forwarding) $("#activated_mail_forwarding").show();
    CalculateCosts()
 	});
  
  $("#mail_scanning_checkbox").click(function() {
  	mail_scanning = !mail_scanning
    if (mail_scanning) $("#activated_mail_scanning").show()
    CalculateCosts()
 	});
  
  $("#telephony_checkbox").click(function() {
  	business_phone = !business_phone
   	$("#telephony_receptionist").toggle(100);
    
     if (!business_phone) {
     		receptionist = false
     		$("#receptionist_checkbox").prop('checked',false);
  	} else {
    		   $("#activated_business_phone").show();
    }
    
    CalculateCosts()
 	});
     
   $("#receptionist_checkbox").click(function() {
  	receptionist = !receptionist
    if (receptionist)    $("#activated_receptionist").show();
    CalculateCosts()
 	});
  
   $("#activate_button").click(function() {
   	if (total_cost>0) {
  				$("#sing_up_div").toggle(100);
    			$("#calculator_div").toggle(100);
    			$("#calculator_error_msg").hide();
    	} else{
      		$("#calculator_error_msg").text("You need to select services before going to the next step.");
      		$("#calculator_error_msg").show();
    	}
 	});
  
   $("#go_back_calculator").click(function() {
  		$("#sing_up_div").toggle(100);
    	$("#calculator_div").toggle(100);
 	});
  
  $("#terms_and_conditions_link").click(function() {
  		$("#terms_and_conditions").toggle(100);
 	});
  
  $("#close_terms_and_conditions").click(function() {
  		$("#terms_and_conditions").toggle(0);
 	});
  
  $("#pay_complete_signup").click(function() {
   		$("#signup_error_msg").hide();
      
	 		if (! $('#agree_checkbox').is(":checked") ) {
   				$("#signup_error_msg").text("You must tick the checkbox above")
       		$("#signup_error_msg").show();
        	return;
   		}
      
      if (! $("#input_full_name").val() ) {
      	$("#signup_error_msg").text("You must enter your full name correctly")
       		$("#signup_error_msg").show();
        	return;
      }
      var email = $("#Email_INPUT").val()
      if (! validate(email) ) {
      		$("#signup_error_msg").text("You must enter a valid EMAIL address")
       		$("#signup_error_msg").show();
        	return;
      }
      
       if ( 
       	isNaN( $("#Phone_INPUT").val() ) ||
        ! $("#Phone_INPUT").val() 
			  ) {
      			$("#signup_error_msg").text("You must enter a valid phone number")
       			$("#signup_error_msg").show();
        		return;
      }
      
      if ( ! $( "#credit_card_selection_dropdown" ).val() ) {
      		$("#signup_error_msg").text("Please select Credit Card type")
        	$("#signup_error_msg").show();
        	return;
      }
      
      if ( ! $( "#credit_card_name" ).val() ) {
      		$("#signup_error_msg").text("Please enter your the Name on your Credit Card")
        	$("#signup_error_msg").show();
        	return;
      }
      
      if ( isNaN( $("#credit_card_number").val() ) ||
        ! $("#credit_card_number").val() ) {
      		$("#signup_error_msg").text("Please enter a valid Credit Card Number")
        	$("#signup_error_msg").show();
        	return;
      }
      
      if ( isNaN( $("#credit_card_cvv").val() ) ||
        ! $("#credit_card_cvv").val() ) {
      		$("#signup_error_msg").text("Please enter a valid CVV")
        	$("#signup_error_msg").show();
        	return;
      }
      
       if ( ! $( "#credit_card_expiry" ).val() ) {
      		$("#signup_error_msg").text("Please enter your a valid Credit Card Expiry date")
        	$("#signup_error_msg").show();
        	return;
      }
    
    $("#sing_up_div").hide();
    $("#success_div").show();
  });
     
  $( "#credit_card_selection_dropdown" ).change(function() {
    	console.log( $("#credit_card_selection_dropdown").val() );		
  });
      
});
