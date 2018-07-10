/* ©2017 Blizzard Entertainment, Inc. All rights reserved. */
"use strict";
$(function(){"undefined"!=typeof addBalanceSettings&&BalanceInput.init(addBalanceSettings,addBalanceMsgs)});var BalanceInput={addBalanceForm:null,inputField:null,continueButton:null,attachAuthenticatorButton:null,warning:null,warningContent:null,settings:{decimalPointChar:".",maxBalanceAllowed:0,remainingMaxBalanceAllowed:0,maxBalanceAllowedType:"max",minBalanceRequired:1,hasAuthenticator:!1,authenticatorCap:0,remainingAuthenticatorLimit:0},messages:{authenticatorRequired:"",capped:{max:"",monthly:""},minRequired:{minRequired:""}},options:{addBalanceFormSelector:"#add-balance-form",inputFieldSelector:"#balance-input-text",continueButtonSelector:"#payment-submit",attachAuthenticatorButtonSelector:"#attach-authenticator-button",warningSelector:"#purchase-warning-tooltip",warningMessageSelector:"#purchase-warning-tooltip .tooltip-inner",showWarningCssClass:"in",alertCssClass:"tooltip-alert",warningCssClass:"tooltip-warning",alertContentCssClass:"alert-error",warningContentCssClass:"alert-warning"},init:function(t,i,e){return $.extend(this.settings,t),$.extend(this.messages,i),$.extend(this.options,e),this.addBalanceForm=$(this.options.addBalanceFormSelector),this.inputField=$(this.options.inputFieldSelector),this.continueButton=$(this.options.continueButtonSelector),this.attachAuthenticatorButton=$(this.options.attachAuthenticatorButtonSelector),this.warning=$(this.options.warningSelector),this.warningContent=$(this.options.warningMessageSelector),this.attachListeners(),this},attachListeners:function(){return this.addBalanceForm.on({requireAuth:$.proxy(this.requireAuth,this),failedValidation:$.proxy(this.failedValidation,this),validated:$.proxy(this.validated,this)}),this.inputField.on("keyup",function(t){(t.keyCode<33||t.keyCode>=46)&&BalanceInput.checkInput(8===t.keyCode||46===t.keyCode)}),this},checkInput:function(t){var i,e,n,a=this.inputField.val(),s=this.settings.decimalPointChar,o=new RegExp("^[0-9"+s+"]$"),r=[],l=0,h=0,d=!1,u="",c=a.length,p=!1;for(e=0;e<c;e++)n=a.charAt(e),o.test(n)&&(n===s&&h++,h<2&&r.push(n),e===c-1&&(p=!0));for(i=r.length,t&&!p&&i--,e=0;e<i;e++)r[e]===s&&(0===e&&(d=!0),l=e),(0===l||e<l+3)&&(d||(u+=r[e]));return this.inputField.val(u),this.validateBalance(this.parseCurrencyNumber(u)),this},validateBalance:function(t){if(0!==t&&""!==t)if(t<this.settings.minBalanceRequired)this.addBalanceForm.trigger({type:"failedValidation",validationType:"minRequired",reason:"minRequired"});else if(t>this.settings.remainingMaxBalanceAllowed)this.addBalanceForm.trigger({type:"failedValidation",validationType:"capped",reason:this.settings.maxBalanceAllowedType});else{if(!this.settings.hasAuthenticator&&t>this.settings.remainingAuthenticatorLimit)return this.addBalanceForm.trigger("requireAuth"),this;this.addBalanceForm.trigger("validated")}return this},parseCurrencyNumber:function(t){return t&&("number"!=typeof t&&(t=t.replace(",",".").replace(/[^0-9\.]/g,"")),t=parseFloat(parseFloat(t,10).toFixed(2),10)),t},requireAuth:function(){this.warningContent.text(this.messages.authenticatorRequired).removeClass(this.options.alertContentCssClass).addClass(this.options.warningContentCssClass),this.warning.removeClass(this.options.alertCssClass).addClass(this.options.warningCssClass).addClass(this.options.showWarningCssClass).css("margin-top",-(this.warning.height()/2-this.inputField.outerHeight(!0)/2)+"px"),this.continueButton.prop("disabled",!0).addClass("disabled"),this.attachAuthenticatorButton.show(),window.dataLayer.push({event:"balance-require-auth"})},failedValidation:function(t){return this.warningContent.text(this.messages[t.validationType][t.reason]).removeClass(this.options.warningContentCssClass).addClass(this.options.alertContentCssClass),this.warning.removeClass(this.options.warningCssClass).addClass(this.options.alertCssClass+" "+this.options.showWarningCssClass).css("margin-top",-(this.warning.height()/2-this.inputField.outerHeight(!0)/2)+"px"),this.continueButton.prop("disabled",!0).addClass("disabled"),this.attachAuthenticatorButton.hide(),this},validated:function(){return this.warning.removeClass(this.options.showWarningCssClass),this.continueButton.prop("disabled",!1).removeClass("disabled"),this.attachAuthenticatorButton.hide(),this}};