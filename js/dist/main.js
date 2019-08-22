//при добавлении маски не обновляются реактивно данные(связать v-model маски с действующим)
//должен парсить id пользователя


'use strict';

const users = []

const vm = new Vue({
	el: '#app',
	data: function() {
    return {
		items: users,
    item: {name: '',phone: '',birthday: '',role: '',archive: ''},
    edit: false,
    editIndex:-1
    }
	},
  mounted: function() {
    fetch('https://urozaev.github.io/showTest/users.json')
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
      json.forEach(element => {
        users.push(element)
      });
    })
    .catch((error) => {console.log(error)})
    var imp = new Inputmask("+7 (999) 999-9999");
    imp.mask(this.$refs.field);
    var imd = new Inputmask("01/01/2001");
    imd.mask(this.$refs.datemask);
  },
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