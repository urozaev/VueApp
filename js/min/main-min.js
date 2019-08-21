"use strict";const users=[],userForm=document.getElementById("userForm");fetch("https://urozaev.github.io/showTest/users.json").then(e=>200!=e.status?null:e.json(),e=>null).then(function(e){e.forEach(e=>{users.push(e)})}),Vue.component("user-component",{template:'\n      \n        <div class="user__info">\n            <div class="content">\n                    <span><strong>{{user.name}}</strong></span>\n                    <br>\n                    <span>ID: {{user.id}}</span>\n                    <br>\n                    <span>Специальность: {{user.role}}</span>\n                    <br>\n                    <span> Номер телефона: {{user.phone}}</span>\n            </div>\n            <slot name="user-modal">\n            \n            </slot>\n        </div>\n      \n    ',props:{user:Object}}),Vue.component("modal",{template:"#modal-template"});var vm=new Vue({el:"#app",data:function(){return{isModalVisible:!1,items:users,item:{name:"",phone:"",birthday:"",role:"",archive:""},edit:!1,editIndex:-1}},methods:{addItem:function(e){e.preventDefault(),this.edit?(this.items[this.editIndex]=this.item,this.item={name:"",phone:"",birthday:"",role:"",archive:""},this.edit=!1,this.editIndex=-1):(this.items.push(this.item),this.item={name:"",phone:"",birthday:"",role:"",archive:""}),fetch("https://api2.esetnod32.ru/frontend/test/",{body:new FormData(userForm),credentials:"same-origin",method:"POST"}).then(e=>{if(200<=e.status&&e.status<300)return e;throw new Error(response.statusText)}).then(e=>e.json()).then(e=>{console.log(e)}).catch(e=>{console.log(e)}),$("#modal").modal("hide")},editItem:function(e){this.edit=!0,this.editIndex=e,this.item=this.items[e],$("#modal").modal("show")},editCancel:function(e){this.item={name:"",phone:"",birthday:"",role:"",archive:""},this.editIndex=-1},filterAll(){this.items=_.filter(users,function(e){return users})},filterDesign(){this.items=_.filter(users,function(e){return"designer"===e.role})},filterDeveloper(){this.items=_.filter(users,function(e){return"developer"===e.role})},filterManager(){this.items=_.filter(users,function(e){return"manager"===e.role})},sortByName(){this.items=_.sortBy(this.items,["name"])},sortByBDate(){this.items=_.sortBy(this.items,["birthday"])},sortByID(){this.items=_.sortBy(this.items,["id"])}},props:{user:Object}});const setActive=e=>{[...e.parentElement.children].forEach(e=>e.classList.remove("active")),e.classList.add("active")};let active=[...document.body.querySelectorAll(".sort-button")];active.forEach(e=>e.addEventListener("click",t=>setActive(e))),$(".phone_mask").mask("+7 (999) 999-99-99"),$(".mask-date").mask("99.99.9999");