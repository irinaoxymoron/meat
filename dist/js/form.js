function ProfileForm() {

	var formData = new FormData();

	this.AddImageNotification = function(filename) {
		$("div.attached-photos").append("<p class='filename-cross'>"+filename+"</p><br>");
	}

	this.ReShowAttached = function(e) {
		$('.filename-cross').remove();
		for(var pair of formData.entries()) {
		   var filename = pair[1].name;
		   self.AddImageNotification(filename);
		}		
	}

	this.DeleteFromFormData = function(e) {
		var filename = e.target.innerText;
		formData.delete('photos['+filename+']');
		e.target.remove();
	}

	this.AddNewToFormData = function(e) {
		var loaded = e.target.files;
		for (var i = 0; i < loaded.length; i++) {
			formData.set('photos['+loaded[i].name+']', loaded[i], loaded[i].name);
		}
		self.ReShowAttached();
	}

	this.AjaxSendForm = function(e) {
		e.preventDefault();

		var name = document.getElementById('name').value;
		var phone = document.getElementById('phone').value;

		formData.set('name', name);
		formData.set('phone', phone);

	    $.ajax({
	        url: '/core/ajax.php',
	        data: formData,
	        // dataType: 'json',
	        processData: false,
	        contentType: false,
	        type: 'POST',
	        success: function (response) {
	        	document.getElementById('name').value = '';
	        	document.getElementById('phone').value = '';
	        	var formData = new FormData();
	        	document.getElementById("hiddenPhotoLoader").value = "";
	        	$('.filename-cross').remove();
	            $('.form_sent').show();
	            $('#indexform').hide();
	        },
	        error: function (error) {
	        	console.log(error);
	        }
	    });
	}

	$("#form-profile").on("click", ".button-photo", function(e) {
	  e.preventDefault();
      $("#hiddenPhotoLoader").click();
    });

	$("#form-profile").on("change", "#hiddenPhotoLoader", function(e) {
      self.AddNewToFormData(e);
    });

	$("#form-profile").on("click", ".filename-cross", function(e) {
      self.DeleteFromFormData(e);
    });

	$("#form-profile").on("click", "#backToForm", function(e) {
        $('.form_sent').hide();
        $('#indexform').show();
    });

	$("#form-profile").on("click", "#diffcity", function(e) {
        $('.diffcity_notif').show();
    });

   	$("#form-profile").on("click", "#spbcity", function(e) {
        $('.diffcity_notif').hide();
    });

	$("#form-profile").on("submit", "#indexform", function(e) {
	  if (document.getElementById('diffcity').checked) {
	  	$('.diffcity_notif').show();
	  } else {
      	self.AjaxSendForm(e);
	  }
    });
  

}

$(document).ready(function() {
    ProfileForm();
});