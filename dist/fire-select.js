!function e(t,n,i){function s(o,u){if(!n[o]){if(!t[o]){var c="function"==typeof require&&require;if(!u&&c)return c(o,!0);if(l)return l(o,!0);var p=new Error("Cannot find module '"+o+"'");throw p.code="MODULE_NOT_FOUND",p}var r=n[o]={exports:{}};t[o][0].call(r.exports,function(e){var n=t[o][1][e];return s(n?n:e)},r,r.exports,e,t,n,i)}return n[o].exports}for(var l="function"==typeof require&&require,o=0;o<i.length;o++)s(i[o]);return s}({1:[function(e,t,n){t.exports='<div\n    class="fire-select-box"\n    :class="{\n        \'multiple\': multiple,\n    }"\n    @click="open()"\n>\n    <ul class="fire-selected-list">\n        <li class="fire-selected-item empty" v-show="selected.length == 0">{{ placeholder }}</li>\n        <li class="fire-selected-item"\n            :class="{\n                \'animated\': animation\n            }"\n            :transition="animation ? \'bounce\' : \'\'"\n            v-for="option in selected"\n            @click.stop="open()"\n        >\n            {{ option.label }}\n            <b @click.stop="deselect(option)">&times;</b>\n        </li>\n    </ul>\n\n    <ul class="fire-select-list" v-show="isOpen" transition="bounce">\n        <li class="fire-select-item-input">\n            <input\n                type="text"\n                class="fire-select-input"\n                :placeholder="helperMessage"\n                v-model="input"\n                v-el:input\n                @keyup.enter="index === null || index == -1 ? newOption() : select(index)"\n                @keydown.esc="close()"\n                @keydown.up.prevent="up()"\n                @keydown.down.prevent="down()"\n                @blur="close() | debounce 100"\n            >\n        </li>\n\n        <li class="fire-select-item"\n            v-if="input && create"\n            @click="newOption()"\n            :class="{\n                \'hover\': index == -1,\n            }"\n        >\n            {{ addLabel }} <b>{{ input }}</b>\n        </li>\n\n        <li class="fire-select-item" v-if="tips.length == 0 && ! create">\n            {{ noResultsLabel }} <b>{{ input }}</b>\n        </li>\n\n        <li\n            class="fire-select-item"\n            v-for="option in tips"\n            @click.stop="select(option)"\n            @mouseover="index = null"\n            :class="{\n                \'hover\': $index == index,\n            }"\n        >\n            {{{ option.label | highlight }}}\n        </li>\n    </ul>\n\n    <select :name="name" :id="id" multiple style="display: none;">\n        <option :value="option.value" selected v-for="option in selected">{{ option.label }}</option>\n    </select>\n</div>\n'},{}],2:[function(e,t,n){"use strict";var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Vue.component("fire-select",{template:e("./fire-select.html"),props:{options:{type:Array,"default":[]},multiple:{type:Boolean,"default":!1},create:{type:Boolean,"default":!0},name:{type:String,"default":"fire-select[]"},id:{type:String,"default":"fire-select"},helperMessage:{type:String,"default":"Type anything to search"},placeholder:{type:String,"default":function(){return this.multiple?"Select some items":"Select an item"}},addLabel:{type:String,"default":"Add:"},noResultsLabel:{type:String,"default":"No results found for:"},animation:{type:Boolean,"default":!0}},data:function(){return{options_:[],input:"",index:null,isOpen:!1,isPopulating:!1,skipClose:!1}},transitions:{bounce:{enterClass:"fs-bounceIn",leaveClass:"fs-hidden"}},computed:{tips:function(){return this.options_.filter(function(e){return e.tip===!0&&e.selected===!1})},selected:function(){return this.options_.filter(function(e){return e.selected===!0})}},watch:{input:function(e){this.index=null,this.options_.forEach(function(t){var n=t.label.toLowerCase(),i=e.toLowerCase();t.tip=e.length?-1!=n.indexOf(i):!0})},options:{handler:function(){this.populate()},deep:!0},multiple:function(e){e===!1&&this.selected.length&&this.selected.forEach(function(e,t){t>0&&(e.selected=!1)})}},filters:{highlight:function(e){return this.input.length?e.replace(new RegExp("("+this.input+")","gi"),"<b>$1</b>"):e}},methods:{populate:function(){this.options_=[],this.index=null,this.isPopulating=!0,this.options.forEach(function(e,t){"string"==typeof e?this.addOption(t,e,!1,!0):this.addOption(e.value,e.label,e.selected,!0)}.bind(this)),this.isPopulating=!1},addOption:function(e,t,n,i){var s={value:e,label:t,selected:!1,tip:!!i};0===this.options_.filter(function(n){return n.value==e&&n.label==t}).length&&(this.options_.$set(this.options_.length,s),this.isPopulating||this.$dispatch("fsOptionAdded",Vue.util.extend({},s)),n&&this.select(s))},newOption:function(){if(this.create){var e=this.input.trim();e&&(this.singleDeselect(),this.addOption(e,e,!0,!0,!0),this.input="")}},select:function(e){"object"!=("undefined"==typeof e?"undefined":i(e))&&(e=this.tips[this.index],this.index=null),this.singleDeselect(),e.selected=!0,this.isPopulating||this.$dispatch("fsOptionSelected",Vue.util.extend({},e)),this.multiple?(this.skipClose=!0,this.isOpen&&this.$els.input.focus()):this.isOpen&&this.close()},deselect:function(e){e.selected=!1,this.isPopulating||this.$dispatch("fsOptionDeselect",Vue.util.extend({},e))},singleDeselect:function(){!this.multiple&&this.selected.length&&this.deselect(this.selected[0]),this.input=""},up:function(){null!==this.index&&this.index>-1?this.index--:this.index=this.tips.length-1},down:function(){null!==this.index&&this.index<this.tips.length-1?this.index++:this.index=this.input?-1:0},open:function(){this.isOpen=!0,this.$nextTick(function(){this.$els.input.focus()}.bind(this))},close:function(){return this.skipClose===!0?void(this.skipClose=!1):void(this.isOpen=!1)}},created:function(){this.populate()}})},{"./fire-select.html":1}]},{},[2]);