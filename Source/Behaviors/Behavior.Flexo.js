/*
---
name: Behavior.Flexo
description: Adds a Flexo interface (Flexo instance)
provides: [Behavior.Flexo]
requires: [Behavior/Behavior, /Flexo, Behavior/Element.Data, More/Object.Extras]
script: Behavior.Flexo.js

...
*/

Behavior.addGlobalFilter('Flexo', {

	setup: function(element, api) {
		var options = {};
		if (api.getAs(Boolean, 'allow-click-activation') === true) {
			options.allowClickActivation = true;
		}
		var myFlexo = new Flexo(element, options);
		return myFlexo;
	}

});