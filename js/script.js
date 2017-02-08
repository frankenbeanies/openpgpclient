var openpgp = require("openpgp");

function activateGenerate(){
  var nav0 = $("#nav-link-0");
  var nav1 = $("#nav-link-1");
  var nav2 = $("#nav-link-2");
  var generate = $("#generate-div");
  var encrypt = $("#encrypt-div");
  var decrypt = $("#decrypt-div");

  nav0.addClass("active");
  nav1.removeClass("active");
  nav2.removeClass("active");
  generate.show();
  encrypt.hide();
  decrypt.hide();
}

function activateEncrypt(){
  var nav0 = $("#nav-link-0");
  var nav1 = $("#nav-link-1");
  var nav2 = $("#nav-link-2");
  var generate = $("#generate-div");
  var encrypt = $("#encrypt-div");
  var decrypt = $("#decrypt-div");

  nav0.removeClass("active");
  nav1.addClass("active");
  nav2.removeClass("active");
  generate.hide();
  encrypt.show();
  decrypt.hide();
}

function activateDecrypt(){
  var nav0 = $("#nav-link-0");
  var nav1 = $("#nav-link-1");
  var nav2 = $("#nav-link-2");
  var generate = $("#generate-div");
  var encrypt = $("#encrypt-div");
  var decrypt = $("#decrypt-div");

  nav0.removeClass("active");
  nav1.removeClass("active");
  nav2.addClass("active");
  generate.hide();
  encrypt.hide();
  decrypt.show();
}

function generateKeys(){
  var options = {
    userIds: [{name: $("#fname").val() + " " + $("#lname").val(), email: $("#email").val()}],
    numBits: $("#rsa-length").find("option:selected").text(),
    passphrase: $("#passphrase").val()
  };

  openpgp.generateKey(options).then(function(key){
    $("#generate-private-key").val(key.privateKeyArmored);
    $("#generate-public-key").val(key.publicKeyArmored);
  });
}

function encrypt(){
  var key = $("#encrypt-public-key").val();
  var input = $("#encrypt-message-input").val();

  var options = {
    data: input,
    publicKeys: openpgp.key.readArmored(key).keys
  };

  openpgp.encrypt(options).then(function(ciphertext){
    $("#encrypt-message-output").val(ciphertext.data);
  });
}

function decrypt(){
  var pk = openpgp.key.readArmored($("#decrypt-private-key").val()).keys[0];
  pk.decrypt($("#decrypt-passphrase").val());

  var options = {
    message: openpgp.message.readArmored($("#decrypt-message-input").val()),
    privateKey: pk
  };

  openpgp.decrypt(options).then(function(plaintext){
    $("#decrypt-message-output").val(plaintext.data);
  });
}

$(document).ready(function(){
  activateGenerate();
});
