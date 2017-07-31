
function contactList() {

	axios.post('/api/list')
		.then(function (response) {
			console.log(response);
			console.log('res is ok');
			var html = '';
			for (var i = 0; i < response.data.result.length; i++) {
				var address = response.data.result[i].address;
				var email = response.data.result[i].email;
				var name = response.data.result[i].name;
				var number = response.data.result[i].number;
				
				html += `<tr id=row${i + 1}>`;
				html += '<td>' + (i + 1) + '</td>';
				html += `<td id=rowname${i + 1} value=${response.data.result[i].name}>` + response.data.result[i].name + '</td>';
				html += `<td id=rowemail${i + 1} value=${response.data.result[i].email}>` + response.data.result[i].email + '</td>';
				html += `<td id=rownumber${i + 1} value=${response.data.result[i].number}>` + response.data.result[i].number + '</td>';
				html += `<td id=rowaddress${i + 1} value=${response.data.result[i].address}>` + response.data.result[i].address + '</td>';
				
				html += '<td>' + `<button type="button" id=${i + 1} onclick="editCon(${i + 1},'${name}','${email}','${number}','${address}')">` + "EDIT" + `</button>` + `</td>`;
				html += '<td>' + `<button type="button" id=${i + 1} onclick="deleteCon('${name}','${email}','${number}','${address}')">` + "DELETE" + `</button>` + `</td>`;
				html += '</tr>';
				
			};
			html += '</br>';
			html += '<button value="Submit" onclick="SignOff()">Sign Off</button>'
			document.getElementById('contact_list').innerHTML = html;
			

		})
		.catch(function (error) {
			console.log(error);
		});
}

function addCon() {

	
	
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
    var number = document.getElementById("number").value;
	var address = document.getElementById("address").value;
	axios.post('/api/add', {
        name: name,
        email: email,
        number: number,
        address: address
	})
		.then(function (response) {
			console.log('ok')
			if (response) {
			// console.log('add rsep',response);
			}
		})
		.then(function () {
			console.log('fine upto here');
			contactList();
		})
		.catch(function (error) {
			console.log(error);
		});
}

function deleteCon(name, email, number, address) {
	axios.post('/api/delete', {
		name: name,
		email: email,
		number: number,
		address: address
	})
		.then(function (response) {

			if (response) {
				console.log(response);
				contactList();
			}
		})
		.catch(function (error) {
			console.log(error);
		});
}

function editCon(i, name, email, number, address) {

	// var em = em;

	var html = '';
	html += '<tr>';
	html += '<td>' + (i) + '</td>';
	html += '<td>' + `<input type = "text" name = "name" id="nameedit" placeholder=${name}>` + '</td>'
	html += '<td>' + `<input type = "email" name = "email" id="emailedit" placeholder=${email}>` + '</td>'
	html += '<td>' + `<input type = "number" name = "number" id="numberedit" placeholder=${number}>` + '</td>'
	html += '<td>' + `<input type = "address" name = "address" id="addressedit" placeholder=${address}>` + '</td>'
	html += '<td>' + `<button value = "Submit" onclick="addAfterEdit('${number}')" >Submit</button>` + '</td>'
	html += '</tr>';

	document.getElementById(`row${i}`).innerHTML = html;
}

function addAfterEdit(on) {
	var name = document.getElementById("nameedit").value;
	var email = document.getElementById("emailedit").value;
	var number = document.getElementById("numberedit").value;
	var address = document.getElementById("addressedit").value;	
	var oldnum = on;
	// console.log('eeee ', email);
	axios.post('/api/edit', {
		name: name,
		email: email,
		number: number,
		address: address,
		oldnumb: oldnum
	})
		.then(function (response) {
			console.log('user edited');
			contactList();
		})
}

function SignOff() {
	axios.post('/api/logout')
		.then(function (response) {
			if (response.data.isLogged == false) {
				location.replace('/')
				alert('you logged out');
		}
	
	})
}

contactList();

