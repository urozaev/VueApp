//Не работают маски на ДР и телефон
//Не добавляет нового пользователя после вчерашних изменений(верни к исходнику посмотри как должно работать)
//почитай про хуки. Загугли "добавление нового пользователя"
//читай консоль! v-root - это написано про ошибки в index.html


'use strict';
//Parsing users.json
const request = new XMLHttpRequest();
request.open("GET", "https://urozaev.github.io/showTest/users.json", false);
request.send();
const users = JSON.parse(request.responseText);

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




//working code
var vm = new Vue({
	el: '#app',

	created: function () {

    var items = users;
    var item = function(index) {
      return {
        name: index.name,
        phone: index.phone,
        birthday: index.birthday,
        role: index.role,
        archive: index.isArchive
      }}

		// this.$set('items', items);
    this.$set(this.items, this.item)
  
  },

	data: function() {
    return {
    // users,
    isModalVisible: false,
		items: users,
    // item: {name: '',phone: ''},
    item: function(index) {
      return {
        name: index.name,
        phone: index.phone,
        birthday: index.birthday,
        role: index.role,
        archive: index.isArchive
      }
    },
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
        this.item = function(index) {
          return {
            name: index.name,
            phone: index.phone,
            birthday: index.birthday,
            role: index.role,
            archive: index.isArchive
          }
        };
      } 
      else 
      {
        this.items[this.editIndex] = this.item;
        // this.item = {name: '',phone: ''};
        this.item = function(index) {
          return {
            name: index.name,
            phone: index.phone,
            birthday: index.birthday,
            role: index.role,
            archive: index.isArchive
          }
        };
        this.edit = false;
        this.editIndex = -1;
      }
      
			$('#modal').modal('hide');
		},
		removeItem: function(index) {
			this.items.$remove(index);
		},
		editItem: function(index) {
    	this.edit = true;
      this.editIndex = index;
  	  this.item = this.items[index];
      $('#modal').modal('show');
		},
    editCancel: function(index){
      // this.item = {name: '',phone: ''};
      this.item = function(index) {
        return {
          name: index.name,
          phone: index.phone,
          birthday: index.birthday,
          role: index.role,
          archive: index.isArchive
        }
      };
      this.editIndex = -1;
    },
    filterAll() {
      this.users = _.filter(users, function (item) {
          return users;
        })
    },
    filterDesign() {
        this.users = _.filter(users, function (item) {
            return item.role === 'designer';
          })
    },
    filterDeveloper() {
        this.users = _.filter(users, function (item) {
            return item.role === 'developer';
          })
    },
    filterManager() {
        this.users = _.filter(users, function (item) {
            return item.role === 'manager';
          })
    },
    sortByName() {
      this.users = _.sortBy(this.users, ['name']);
    },
    sortByBDate() {
        this.users = _.sortBy(this.users, ['birthday']);
    },
    sortByID() {
        this.users = _.sortBy(this.users, ['id']);
    },
    showModal() {
      // this.user = this.users[index]
      this.isModalVisible = true

      },
    closeModal() {
        this.isModalVisible = false;
    }
  },
  props: {
    user: Object
  }
});



$(function() {
  var button = $("button");
  var name = $("input[name=name]");

  name.keyup(function() {
    if (name.val().length > 0) {
      button.addClass('active');
    } else {
      button.removeClass('active');
    }
  });

  $("form").submit(function(event) {
    event.preventDefault();

    //get the form data
    const formData = {
      name: $("#user-name").val(),
      email: $("#user-phone").val(),
      caps: $("#user-birthday").val()
    };

    // process the form
    $.ajax({
      type: "POST",
      url: "https://api2.esetnod32.ru/frontend/test/",
      data: formData,
      dataType: "json",
      encode: true
    }).done(function(data) {
      $(".response")
        .empty()
        .append(JSON.stringify(data, null, 2));
    });
  });
});



//Masks
//С МАСКАМИ ПОЧЕМУ ТО НЕ ВЕРНО ОТОБРАЖАЮТСЯ ДАННЫЕ ЮЗЕРА ПОСЛЕ ПРАВКИ
$(".phone_mask").mask("+7 (999) 999-99-99");
$('.mask-date').mask('99.99.9999');


//Active elements
const setActive = el => {
  [...el.parentElement.children].forEach(sib => sib.classList.remove('active'))
  el.classList.add('active')
}

let active = [...document.body.querySelectorAll('.sort-button')]
active.forEach(el => el.addEventListener('click', e => setActive(el)))