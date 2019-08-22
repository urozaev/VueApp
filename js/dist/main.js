//при добавлении маски не обновляются реактивно данные(связать v-model маски с действующим)
//отправляй на сервак новых пользователей
//должен парсить id пользователя
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

// Vue.component('user-component', { 
//     template: `
      
//         <div class="user__info">
//             <div class="content">
//                     <span><strong>{{user.name}}</strong></span>
//                     <br>
//                     <span>ID: {{user.id}}</span>
//                     <br>
//                     <span>Специальность: {{user.role}}</span>
//                     <br>
//                     <span> Номер телефона: {{user.phone}}</span>
//             </div>
//             <slot name="user-modal">
            
//             </slot>
//         </div>
      
//     `,
//     props: {
//       user: Object
//     }
//   });
  
  // Vue.component('modal', {
  //   template: '#modal-template'
  // })


var vm = new Vue({
	el: '#app',
	data: function() {
    return {
		items: users,
    item: {name: '',phone: '',birthday: '',role: '',archive: ''},
    edit: false,
    editIndex:-1
    }
	},
  // mounted: function() {
  //   var im = new Inputmask("+7 (999) 999-9999");
  //   im.mask(this.$refs.field);
  // },
	methods: {
		addItem: function(e) {
			e.preventDefault();
      if(!this.edit)
        {
          this.items.push(this.item);
          this.item = {name: '',phone: '',birthday: '',role: '',archive: ''};
        } 
      else 
        {
          this.items[this.editIndex] = this.item;
          this.item = {name: '',phone: '',birthday: '',role: '',archive: ''};
          this.edit = false;
          this.editIndex = -1;
        }

        fetch('https://api2.esetnod32.ru/frontend/test/', {
          body: JSON.stringify(this.item),
          credentials: 'same-origin',
          method: 'POST'
        })
        .then((res) => {
          if(200 <= res.status && res.status < 300) {
            return res;
          }
          throw new Error(response.statusText);
        })
        // .then(function(response) {
        //   return response.json();
        // })
        .then((data) => {console.log(data)})
        .catch((error) => {console.log(error)})
          
      
      $('#modal').modal('hide');

		},
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

//Active elements
const setActive = el => {
  [...el.parentElement.children].forEach(sib => sib.classList.remove('active'))
  el.classList.add('active')
}

let active = [...document.body.querySelectorAll('.sort-button')]
active.forEach(el => el.addEventListener('click', e => setActive(el)))