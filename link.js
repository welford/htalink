/*\
title: $:/plugins/welford/htalink/link.js
type: application/javascript
module-type: startup

catches links in hta and opens them in the default browser
\*/


(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

// Export name and synchronous status
exports.name = "htalink";
exports.platforms = ["browser"];
exports.before = ["startup"];
exports.synchronous = true;


exports.startup = function() {		
	function findParentWithClass(node,classNames) {
		classNames = classNames.split(" ");
		while(node) {
			if(node.classList) {
				for(var t=0; t<classNames.length; t++) {
					if(node.classList.contains(classNames[t])) {
						return node;
					}
				}
			}
			node = node.parentNode;
		}
		return null;
	}

	function trapLinks(doc) {
		doc.addEventListener("click",function(event) {
			//leave this here for now incase it is useful later
			// See if we're in an interwiki link
			//var interwikiLink = findParentWithClass(event.target,"tc-interwiki-link");		
			//if(interwikiLink) {
				//openWikiIfNotOpen(interwikiLink.href);
				//event.preventDefault();
				//event.stopPropagation();
				//return false;
				//alert("derp");
			//}
			// See if we're in an external link
			// "tc-tiddlylink-external" is for TW5, "externallink" for TWC
			var externalLink = findParentWithClass(event.target,"tc-tiddlylink-external externalLink");
			if(externalLink) {
				try{
					var shell = new ActiveXObject("WScript.Shell");
					shell.run(externalLink.href);			
					event.preventDefault();
					event.stopPropagation();
					return false;
				}
				catch (err) {
					//silent failure
				}
			}
			return true;
		},false);
	}
	trapLinks(document);
}

})();