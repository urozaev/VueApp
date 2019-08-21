//Не работают маски на ДР и телефон
//отправляй на сервак новых пользователей
//сортировка по дате рождения(попробуй moment)


'use strict';

const users = []
const userForm = document.getElementById('userForm');

fetch('https://urozaev.github.io/showTest/users.json').then(
  successResponse => {
    if (successResponse.status != 200) {
      return null;
    } else {
      return successResponse.json();
    }
  },
  failResponse => {
    return null;
  })
  .then(function(json) {
    json.forEach(element => {
      users.push(element)
    });
  });

Vue.component('user-component', { 
    template: `
      
        <div class="user__info">
            <div class="content">
                    <span><strong>{{user.name}}</strong></span>
                    <br>
                    <span>ID: {{user.id}}</span>
                    <br>
                    <span>Специальность: {{user.role}}</span>
                    <br>
                    <span> Номер телефона: {{user.phone}}</span>
            </div>
            <slot name="user-modal">
            
            </slot>
        </div>
      
    `,
    props: {
      user: Object
    }
  });
  
  Vue.component('modal', {
    template: '#modal-template'
  })

var vm = new Vue({
	el: '#app',
	data: function() {
    return {
    // users,
    isModalVisible: false,
		items: users,
    item: {name: '',phone: '',birthday: '',role: '',archive: ''},
    // item: function(index) {
    //   return {
    //     name: index.name,
    //     phone: index.phone,
    //     birthday: index.birthday,
    //     role: index.role,
    //     archive: index.isArchive
    //   }
    // },
    edit: false,
    editIndex:-1
    }
	},

	methods: {
		addItem: function(e) {
			e.preventDefault();
      
      if(!this.edit)
        {
          this.items.push(this.item);
          // this.item = {name: '',phone: ''};
          this.item = {name: '',phone: '',birthday: '',role: '',archive: ''};
          // function submitForm() {
          //   fetch("https://api2.esetnod32.ru/frontend/test/", {
          //     method: "POST",
          //     body: JSON.stringify(this.item)
          //   })
          // }
          // fetch('https://urozaev.github.io/showTest/users.json', {
          //   method: 'POST', // или 'PUT'
          //   body: JSON.stringify('kjhj'), // data может быть типа `string` или {object}!
          //   headers:{'Content-Type': 'application/json; charset=utf-8'}
          // })
          // userForm.onsubmit = async (e) => {
          //   e.preventDefault();
        
          //   let response = await fetch('https://api2.esetnod32.ru/frontend/test/', {
          //     method: 'POST',
          //     body: new FormData(userForm)
          //   });
        
          //   let result = await response.json();
        
          //   alert(result.message);
          // };
        } 
      else 
        {
          this.items[this.editIndex] = this.item;
          // this.item = {name: '',phone: ''};
          this.item = {name: '',phone: '',birthday: '',role: '',archive: ''};
          this.edit = false;
          this.editIndex = -1;
        }

          fetch('https://api2.esetnod32.ru/frontend/test/', {
            body: new FormData(userForm),
            credentials: 'same-origin',
            method: 'POST'
          })
          .then((res) => {
            if(200 <= res.status && res.status < 300) {
              return res;
            }
            throw new Error(response.statusText);
          })
          .then((res) => { return res.json()})
          .then((data) => {console.log(data)})
          .catch((error) => {console.log(error)})
          
      
			$('#modal').modal('hide');
		},
		// removeItem: function(index) {
		// 	this.items.$remove(index);
		// },
		editItem: function(index) {
    	this.edit = true;
      this.editIndex = index;
  	  this.item = this.items[index];
      $('#modal').modal('show');
		},
    editCancel: function(index){
      this.item = {name: '',phone: '',birthday: '',role: '',archive: ''};
      this.editIndex = -1;
    },
    filterAll() {
      this.items = _.filter(users, function (item) {
          return users;
        })
    },
    filterDesign() {
      this.items = _.filter(users, function (item) {
        return item.role === 'designer';
      })
    },
    filterDeveloper() {
        this.items = _.filter(users, function (item) {
            return item.role === 'developer';
          })
    },
    filterManager() {
        this.items = _.filter(users, function (item) {
            return item.role === 'manager';
          })
    },
    sortByName() {
      this.items = _.sortBy(this.items, ['name']);
    },
    sortByBDate() {
      this.items = _.sortBy(this.items, ['birthday']);
      // this.items = _.sortBy(this.items, function(e) {
      //   return new Date(e.birthday);
      // });
          // this.items.sort(function(a, b) {
          //   let dateA = new Date(a.birthday);
          //   let dateB = new Date(b.birthday);
          //   console.log(dateA)
          //   return dateA - dateB;
          // });
        // function formatDate(date) {
         
        // this.items = function(a) {
        //   console.log(a)
        //   return Intl.DateTimeFormat('ru').format(a.birthday);
        // }  
        // }
    },
    sortByID() {
        this.items = _.sortBy(this.items, ['id']);
    },
  },
  props: {
    user: Object
  }
});



// $(function() {
//   var button = $("button");
//   var name = $("input[name=name]");

//   name.keyup(function() {
//     if (name.val().length > 0) {
//       button.addClass('active');
//     } else {
//       button.removeClass('active');
//     }
//   });

//   $("form").submit(function(event) {
//     event.preventDefault();

//     //get the form data
//     const formData = {
//       name: $("#user-name").val(),
//       email: $("#user-phone").val(),
//       caps: $("#user-birthday").val()
//     };

//     // process the form
//     $.ajax({
//       type: "POST",
//       url: "https://api2.esetnod32.ru/frontend/test/",
//       data: formData,
//       dataType: "json",
//       encode: true
//     }).done(function(data) {
//       $(".response")
//         .empty()
//         .append(JSON.stringify(data, null, 2));
//     });
//   });
// });






//Active elements
const setActive = el => {
  [...el.parentElement.children].forEach(sib => sib.classList.remove('active'))
  el.classList.add('active')
}

let active = [...document.body.querySelectorAll('.sort-button')]
active.forEach(el => el.addEventListener('click', e => setActive(el)))

//Masks
//С МАСКАМИ ПОЧЕМУ ТО НЕ ВЕРНО ОТОБРАЖАЮТСЯ ДАННЫЕ ЮЗЕРА ПОСЛЕ ПРАВКИ
$(".phone_mask").mask("+7 (999) 999-99-99");
$('.mask-date').mask('99.99.9999');