import $ from 'jquery';
import dialog from 'jquery-ui/ui/widgets/dialog';
import tabs from 'jquery-ui/ui/widgets/tabs';
import 'jquery-ui/themes/base/all.css';


require('webpack-jquery-ui');
import '../css/styles.css';

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

// Här tillämpar vi mönstret reavealing module pattern:
// Mer information om det mönstret här: https://bit.ly/1nt5vXP
const jtrello = (function() {
  "use strict"; // https://lucybain.com/blog/2014/js-use-strict/

  // Referens internt i modulen för DOM element
  let DOM = {};

  /* =================== Privata metoder nedan ================= */
  function captureDOMEls() {
    DOM.$board = $('.board');
    DOM.$listDialog = $('#list-creation-dialog');
    DOM.$tabsHolder = $('#tabs');
    DOM.$columns = $('.column');
    DOM.$lists = $('.list');
    DOM.$cards = $('.card');
    
    DOM.$newListButton = $('button#new-list');
    DOM.$deleteListButton = $('.list-header > button.delete');

    DOM.$newCardForm = $('form.new-card');
    DOM.$deleteCardButton = $('.card > button.delete');
  }
  function createTabs() {
    $(DOM.$tabsHolder).tabs();
  }

  function createTabs() {}
  function createDialogs() {
    dialog({ autoOpen: false }, DOM.$listDialog);
  }
  
  
  /*
  *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
  *  createList, deleteList, createCard och deleteCard etc.
  */
  function bindEvents() {
    DOM.$newListButton.on('click', createList);
    DOM.$deleteListButton.on('click', deleteList);

    DOM.$newCardForm.on('submit', createCard);
    DOM.$deleteCardButton.on('click', deleteCard);
  }

  /* ============== Metoder för att hantera listor nedan ============== */
  function createList() {
    event.preventDefault();
    dialog('open', DOM.$listDialog);
  };

  function deleteList() {
    $(this).closest('.list').remove();
    };
  
  

  /* =========== Metoder för att hantera kort i listor nedan =========== */
  function createCard(event) {
    event.preventDefault();
    let addTextToCard = $(this).find('.addText').val();

    $(this).closest('div.list').append($('<li class="card">' + addTextToCard + '<button class="button delete">X</button></li>').on('click', deleteCard)).sortable({
      connectWith: '.list-cards'
    });;

    sortCard();
  };
// DOM.$deleteCardButton = $('.card > button.delete');
  function deleteCard() {
    $(this).closest('.card').remove();
  }; 

    function sortCard() {
    $(".list-cards").sortable({
      connectWith: '.list-cards'
    });
  };

  // Metod för att rita ut element i DOM:en
  function render() {}

  /* =================== Publika metoder nedan ================== */
  
  // Init metod som körs först
  function init() {
    console.log(':::: Initializing JTrello ::::');
    // Förslag på privata metoder
    captureDOMEls();
    createTabs();
    createDialogs();
    bindEvents();
    sortCard();
  };
  // All kod här

  return {
    init: init
  };
})();

//usage
$("document").ready(function() {
  jtrello.init();
});
