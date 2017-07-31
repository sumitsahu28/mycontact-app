function userLogin() {
	var number = document.getElementById("loginNumber").value;
	var password = document.getElementById("loginPassword").value;
	axios.post('/api/authenticate', {
		number: number,
		password: password
	})
		.then(function (response) {
			console.log('singn in res', response);
			if (response.data.success && response.data.isLogged) {
				location.replace('/home')

			}
			else if (response.data.message == "Authentication failed. Wrong password.") {
				location.reload();
				alert('Password is Incorrect!');
			}
			else if (response.data.message == "Authentication failed. User not found.") {
				location.reload();
				alert('User Mobile Number not found! Please sign Up!');
			}
		})
}

function userSignUp() {
	var number = document.getElementById("signUpNumber").value;
	var password = document.getElementById("signInPassword").value;
	if (number && password) {
		axios.post('/api/addUser', {
			number: number,
			password: password
		})
			.then(function (response) {
				if (response.data.status == "added successfully") {
					var html = '';
					html += '<p>Congratulations , you are registered!!</p>'
					html += '<p>Please sign in</p>'
					html += '<input type="text" name="number" id="loginNumber" placeholder="Enter Mobile NUmber">'
					html += '<input type="text" name="Password" id="loginPassword" placeholder="Enter password">'
					html += '<button value="Submit" onclick="userLogin()">Login</button>'
					document.getElementById(`afterSignUp`).innerHTML = html;
				} else {
					location.reload();
					alert('Already signed Up!  Please login');

				}
			})

	} else {
		location.reload();
		alert('Mobile number or Password cannot be null!!');
	}
}
