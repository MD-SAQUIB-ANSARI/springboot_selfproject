console.log("this is script file");

const toggleSidebar = () => {
  if ($(".sidebar").is(":visible")) {
    //true
    //band karna hai
    $(".sidebar").css("display", "none");
    $(".content").css("margin-left", "0%");
  } else {
    //false
    //show karna hai
    $(".sidebar").css("display", "block");
    $(".content").css("margin-left", "20%");
  }
};

const search = () => {
  // console.log("searching...");

  let query = $("#search-input").val();

  if (query == "") {
    $(".search-result").hide();
  } else {
    //search
    console.log(query);

    //sending request to server

    let url = `http://localhost:8282/search/${query}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //data......
        // console.log(data);

        let text = `<div class='list-group'>`;

        data.forEach((contact) => {
          text += `<a href='/user/${contact.cId}/contact' class='list-group-item list-group-item-action'> ${contact.name}  </a>`;
        });

        text += `</div>`;

        $(".search-result").html(text);
        $(".search-result").show();
      });
  }
};

//first request- to server to create order

const paymentStart = () => {
  console.log("payment started..");
  var amount = $("#payment_field").val();
  console.log(amount);
  if (amount == "" || amount == null) {
    // alert("amount is required !!");
    swal("Failed !!", "amount is required !!", "error");
    return;
  }

  //code...
  // we will use ajax to send request to server to create order- jquery

  $.ajax({
    url: "/user/create_order",
    data: JSON.stringify({ amount: amount, info: "order_request" }),
    contentType: "application/json",
    type: "POST",
    dataType: "json",
    success: function (response) {
      //invoked when success
      console.log(response);
      if (response.status == "created") {
        //open payment form
        let options = {
          key: "rzp_test_haDRsJIQo9vFPJ",
          amount: response.amount,
          currency: "INR",
          name: "Smart Contact Manager",
          description: "Donation",
          image:
            "https://yt3.ggpht.com/-4BGUu55s_ko/AAAAAAAAAAI/AAAAAAAAAAA/3Cfl_C4o8Uo/s108-c-k-c0x00ffffff-no-rj-mo/photo.jpg",
          order_id: response.id,
          handler: function (response) {
            console.log(response.razorpay_payment_id);
            console.log(response.razorpay_order_id);
            console.log(response.razorpay_signature);
            console.log("payment successful !!");
            // alert("congrates !! Payment successful !!");
            swal("Good job!", "congrates !! Payment successful !!", "success");
          },
          prefill: {
            name: "",
            email: "",
            contact: "",
          },

          notes: {
            address: "LearnCodeWith Durgesh ",
          },
          theme: {
            color: "#3399cc",
          },
        };

        let rzp = new Razorpay(options);

        rzp.on("payment.failed", function (response) {
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
          //alert("Oops payment failed !!");
          swal("Failed !!", "Oops payment failed !!", "error");
        });

        rzp.open();
      }
    },
    error: function (error) {
      //invoked when error
      console.log(error);
      alert("something went wrong !!");
    },
  });
};
/* script drop down code*/
  $(document).ready(function() {
    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            first_name: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please supply your first name'
                    }
                }
            },
             last_name: {
                validators: {
                     stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your last name'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your email address'
                    },
                    emailAddress: {
                        message: 'Please supply a valid email address'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your phone number'
                    },
                    phone: {
                        country: 'US',
                        message: 'Please supply a vaild phone number with area code'
                    }
                }
            },
            address: {
                validators: {
                     stringLength: {
                        min: 8,
                    },
                    notEmpty: {
                        message: 'Please supply your street address'
                    }
                }
            },
            city: {
                validators: {
                     stringLength: {
                        min: 4,
                    },
                    notEmpty: {
                        message: 'Please supply your city'
                    }
                }
            },
            state: {
                validators: {
                    notEmpty: {
                        message: 'Please select your state'
                    }
                }
            },
            zip: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your zip code'
                    },
                    zipCode: {
                        country: 'US',
                        message: 'Please supply a vaild zip code'
                    }
                }
            },
            comment: {
                validators: {
                      stringLength: {
                        min: 10,
                        max: 200,
                        message:'Please enter at least 10 characters and no more than 200'
                    },
                    notEmpty: {
                        message: 'Please supply a description of your project'
                    }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                console.log(result);
            }, 'json');
        });
});

/*user details add */
 	function addData() { 
			// Get input values 
			let name = 
				document.getElementById("nameInput").value; 
			let email = 
				document.getElementById("emailInput").value; 
			let mobile = 
				document.getElementById("numberInput").value; 
			let address = 
				document.getElementById("addressInput").value; 
			
			// Get the table and insert a new row at the end 
			let table = document.getElementById("outputTable"); 
			let newRow = table.insertRow(table.rows.length); 
			
			// Insert data into cells of the new row 
			newRow.insertCell(0).innerHTML = name; 
			newRow.insertCell(1).innerHTML = email; 
			newRow.insertCell(2).innerHTML = mobile; 
			newRow.insertCell(3).innerHTML = address; 
			newRow.insertCell(4).innerHTML = 
				'<button onclick="editData(this)">Edit</button>'+ 
				'<button onclick="deleteData(this)">Delete</button>'; 
			
			// Clear input fields 
			clearInputs(); 
		} 

		function editData(button) { 
			
			// Get the parent row of the clicked button 
			let row = button.parentNode.parentNode; 
			
			// Get the cells within the row 
			let nameCell = row.cells[0]; 
			let emailCell = row.cells[1]; 
			let mobileCell = row.cells[2]; 
			let addressCell = row.cells[3]; 
			
			// Prompt the user to enter updated values 
			let nameInput = 
				prompt("Enter the updated name:", 
					nameCell.innerHTML); 
			let emailInput = 
				prompt("Enter the updated email:", 
					emailCell.innerHTML); 
			let numberInput = 
				prompt("Enter the updated mobile details:", 
					mobileCell.innerHTML 
				); 
			let addressInput = 
				prompt("Enter the updated address:", 
					addressCell.innerHTML 
				); 
			
			// Update the cell contents with the new values 
			nameCell.innerHTML = nameInput; 
			emailCell.innerHTML = emailInput; 
			mobileCell.innerHTML = numberInput; 
			addressCell.innerHTML = addressInput; 
		} 
		function deleteData(button) { 
			
			// Get the parent row of the clicked button 
			let row = button.parentNode.parentNode; 

			// Remove the row from the table 
			row.parentNode.removeChild(row); 
		} 
		function clearInputs() { 
			
			// Clear input fields 
			document.getElementById("nameInput").value = ""; 
			document.getElementById("emailInput").value = ""; 
			document.getElementById("numberInput").value = ""; 
			document.getElementById("addressInput").value = ""; 
		} 

/*auto toel menu after click*/
/*const menuButton = getElementsByClassName('navbar-collapse');
const menu = document.getElementByClassName('navbar-toggler');
button.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

// show/hide the menu when the button is clicked
menuB
// hide the menu when a click event occurs outside the menu
document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
    menu.classList.add('hidden');
  }
});*/ 


/*$('.bg-primary').click(function() {
  $('.navbar-collapse').show(); 
  
  });*/
  
  /*if(jQuery('.bg-primary').click) {
    //do-some-stuff
     $('.navbar-collapse').show();
} else {
    //run function2
     $('.navbar-collapse').hide();
}*/

function showNavBarHide()
{
	  $('.navbar-collapse').show();	
      /*$('.navbar-collapse').hide(); */
}
   

