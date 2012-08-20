/*
---

name: Flexo.Bold
description: simple inline editor
license: MIT-style license.
requires: [Flexo]
provides: Flexo.Bold

...
*/

Object.extend({

	equals: function(obj1, obj2) {
		var property;
		obj2 = obj2 || this;
		for(property in obj2) {
			if(typeof(obj1[property])=='undefined') {return false;}
		}

		for(property in obj2) {
			if (obj2[property]) {
					switch(typeof(obj2[property]))	{
						case 'object':
							if (!obj2[property].equals(obj1[property])) { return false }; break;
						case 'function':
							if (typeof(obj1[property])=='undefined' || (property != 'equals' && obj2[property].toString() != obj1[property].toString())) { return false; }; break;
						default:
							if (obj2[property] != obj1[property]) { return false; }
					}
			}	else {
				if (obj1[property])	{
					return false;
				}
			}
		}

		for(property in obj1) {
			if(typeof(obj2[property])=='undefined') {return false;}
		}

		return true;
	}

});

Flexo.Bold = new Class({
	Implements: [Options, Events],
	options: {
		tag: 'strong',
		styles: {
			'font-weight': 'bold'
		},
		mode: 'spanStyle'
	},

	editor: null,

	initialize: function(editor, options) {
		this.editor = editor;
		this.setOptions(options);
	},

	checkCarrotPosition: function() {
		var element = this.editor.getElement();
		return this.isTag(element) || this.sameStyles(element);
	},

	activate: function() {
		if (this.options.mode === 'tag') {
			this.editor.updateSelection(new Element(this.options.tag));
		}
		if (this.options.mode === 'style') {
			this.editor.getElement().setStyles(this.options.styles);
		}
		if (this.options.mode === 'spanStyle') {
			this.editor.updateSelection( new Element('span', {styles: this.options.styles}) );
		}
	},

	deactivate: function() {

	},

	sameStyles: function(element) {
		var styles = element.getStyles(Object.keys(this.options.styles));
		return Object.equals(this.options.styles, styles);
	},

	isTag: function(element) {
		return element.get('tag') === this.options.tag;
	}

});