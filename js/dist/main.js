//при добавлении маски не обновляются реактивно данные(связать v-model маски с действующим)
//редактирование данных на сервере
//сортировка по дате рождения
//разбить код на модули

'use strict';

const users = []
// 'https://urozaev.github.io/showTest/users.json'
const vm = new Vue({
	el: '#app',
	data: function() {
    return {
		items: users,
    item: {name: '',phone: '',birthday: '',role: '',archive: ''},
    edit: false,
    editIndex:-1,
    name: ''
    }
	},
  mounted: function() {
    fetch('http://localhost:3000/users')
    .then((res) => {
      if(200 <= res.status && res.status < 300) {
        return res;
      }
      throw new Error(response.statusText);
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      json.forEach(user => {
        users.push(user)
      });
    })
    .catch((error) => {console.log(error)})

    // var imp = new Inputmask("+7 (999) 999-9999");
    // imp.mask(this.$refs.field);
    // var imd = new Inputmask("##/##/####");
    // imd.mask(this.$refs.datemask);
  },
	methods: {
		addItem: function(e) {
      
      if(!this.edit)
        {
          fetch('http://localhost:3000/users', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.item),
          })
          .then((res) => {
            if(200 <= res.status && res.status < 300) {
              return res;
            }
            throw new Error(response.statusText);
          })
          .then((response) => {
            return response.json()
          })
          .then((newUser) => {
            users.push(newUser)
          })
          .then(() => {
            console.log('Пользователь добавлен');
          })
          .catch((error) => {console.log(error)})
        } 
      else 
        {
          this.items[this.editIndex] = this.item;
          this.edit = false;
          this.editIndex = -1;
        }
 
      $('#modal').modal('hide');
      e.preventDefault();

		},
		editItem: function(index) {
    	this.edit = true;
      this.editIndex = index;
      this.item = this.items[index];

      $('#modal').modal('show');
    },
    // updateUser: function(index){
    //   e.preventDefault();
    //   fetch('http://localhost:3000/users', {
    //       method: 'PATCH',
    //       credentials: 'include',
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'API-Key': 'secret'
    //       },
    //       body: JSON.stringify(this.item),
    //     })
    //     .then((res) => {
    //       if(200 <= res.status && res.status < 300) {
    //         return res;
    //       }
    //       throw new Error(response.statusText);
    //     })
    //     .then((response) => {
    //       return response.json()
    //     })
    //     // .then((newUser) => {
    //     //   users.push(newUser)
    //     // })
    //     .then(() => {
    //       console.log('Данные пользователя изменены');
    //     })
    //     .catch((error) => {console.log(error)})
    // },
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