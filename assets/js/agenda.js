let monthCalendar, weekCalendar;

const baseTitle = 'Formation';

const randomNameFormation = ['Informatique', 'Full-Stack', 'Mobile', 'Design', 'Cuisine', 'Serveur', 'Chef Cuisine', 'Bar Man', 'Jardinier']
const formations = {};

let eventsMonth = [];
let eventsWeek = [];

// Use pour les fetch image pour les formations
let indexFormationImage = 0;

// Les mois où l'on dit d'octobre , d'avril, d'aout
const articlesMonth = [3,7,9];

const optionsCalendar = {
  customButtons: {
    customMonthButton: {
      text: 'Mois',
      click: function() {
        $('#weekAgenda').hide();
        $('#monthAgenda').show();
        const date = new Date();
        date.setMonth(weekCalendar.getDate().getMonth());
        date.setFullYear(weekCalendar.getDate().getFullYear());
        monthCalendar.gotoDate(date);
        monthCalendar.render();
      }
    },
    customWeekButton: {
      text: 'Semaine',
      click: function() {
        $('#monthAgenda').hide();
        $('#weekAgenda').show();
        const date = new Date();
        date.setMonth(monthCalendar.getDate().getMonth());
        date.setFullYear(monthCalendar.getDate().getFullYear());
        weekCalendar.gotoDate(date);
        weekCalendar.render();
      }
    }
  },
  locale: 'fr',
  themeSystem: 'bootstrap5',
  initialView: 'dayGridMonth',
  initialDate: Date.now(),
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'customMonthButton,customWeekButton'
  },
  events: eventsMonth,
  eventClick: function(info) {
    //info.el.addEventListener('mouseover', ()=>console.log('test'));
  },
  eventBackgroundColor: `rgb(${getComputedStyle(document.body).getPropertyValue('--bs-primary-rgb')})`,
  eventBorderColor: `rgb(${getComputedStyle(document.body).getPropertyValue('--bs-secondary-rgb')})`,
  eventContent: function( info ) {
    return {html: info.event.title};
  }
};


$(function(){
    initButtonMonth();
    initAmountFormationMonth();
    initFormations();
    $firstBtnMonth = $('.btn-month:eq(0)');
    const length = +$firstBtnMonth.data('content'); // convert to number
    const month = +$firstBtnMonth.data('month'); // convert to number
    initTitleMonth(month);
    initBannerMonth(month);
    initEventsCalendar(month);
    initCalendar();
    initCarousel(length);
    fillCarousel(month);
    initListener();
    setTimeout(() => {
      $('#js-preloader').addClass('loaded'); // enleve le loading
      AOS.init({
				duration: 1000, // values from 0 to 3000, with step 50ms
				offset: 160, // base 120
			});
    }, 500); // juste pour le style
});

function initListener(){
  $('.btn-month').click(function(){
    $element = $(this);
    const length = +$element.data('content');
    const month = +$element.data('month');
    const year = +$element.data('year');

    monthCalendar.removeAllEvents();
    weekCalendar.removeAllEvents();
    initEventsCalendar(month);
    monthCalendar.addEventSource(eventsMonth);
    weekCalendar.addEventSource(eventsWeek);

    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month);

    monthCalendar.gotoDate(date);
    weekCalendar.gotoDate(date);

    initTitleMonth(month);
    clearAllItemsCarousel();
    destroyCarousel();
    initCarousel(length);
    fillCarousel(month);
    $('.btn-month.active').removeClass('active');
    $(`.btn-month[data-month="${month}"]`).addClass('active');
    initBannerMonth(month);
  })
}

/**
 * 
 * @param {number} month 
 */
function initTitleMonth(month){
  const date = new Date();
  date.setMonth(month);
  const title = date.toLocaleString('default', { month: 'long' });
  const monthName = title.charAt(0).toUpperCase() + title.slice(1);
  $('.month-title').text(monthName);
  $('.article-month-title').text(articlesMonth.includes(month) ? 'D\'' : 'De ');
}

/**
 * 
 * @param {number} month 
 */
function initBannerMonth(month){
  $('#month-banner').attr('src', 'assets/images/mois/'+month+'.webp');
}

/**
 *
 * @param {number} month
 */
function fillCarousel(month){
  const formation = formations[month];
  for(const datas of formation)
    addFormationIntoCarousel(datas.title, datas.start, datas.end);
  
  
}

function initFormations(){
  $('.btn-month').each(function(){
    const $element = $(this);
    const length = $element.data('content');
    const month = $element.data('month');
    const year = $element.data('year');
    formations[month] = [];
    const randomNameFormationCopy = [...randomNameFormation];

    for(let i = 0; i < length; i++){
      const formation = {};
  
      const duration = generateDurationFormation(month, year);
      const randomName = randomNameFormationCopy[Math.floor(Math.random() * randomNameFormationCopy.length)];
      const indexName = randomNameFormationCopy.findIndex(name => name === randomName);

      formation.title = baseTitle + ' ' + randomNameFormationCopy.splice(indexName, 1)[0];
      formation.start = duration.start;
      formation.end = duration.end;
      formation.allDay = true;
      formation.classNames = ['formation-month-agenda'];
      formations[month].push(formation);
    }
  });
}
/**
 * 
 * @param {number} month 
 */
function initEventsCalendar(month){
  eventsMonth = [];
  eventsWeek = [];
  const formation = formations[month];
  eventsMonth = formation;
  for(let datas of formation){
    const dateStart = new Date(datas.start);
    const dateEnd = new Date(datas.end);
    const diff = dateStart.getTime() - dateEnd.getTime();
    const diffDays = Math.abs(diff / (1000 * 3600 * 24));
    for(let i = 0; i < diffDays; i++){
      const event = {};
      event.title = datas.title;
      event.start = getFormatedDate(dateStart) + 'T09:00:00';
      event.end = getFormatedDate(dateStart) + 'T16:30:00';
      event.allDay = false;
      event.classNames = ['formation-week-agenda'];
      eventsWeek.push(event);
      dateStart.setDate(dateStart.getDate() + 1);
    }
  }

}

function initCalendar() {
    const monthCalendarEl = document.getElementById('monthAgenda');
    const weekCalendarEl = document.getElementById('weekAgenda');
    
    optionsCalendar.events = eventsMonth;

    monthCalendar = new FullCalendar.Calendar(monthCalendarEl, optionsCalendar);
    monthCalendar.render();

    optionsCalendar.events = eventsWeek;
    optionsCalendar.initialView = 'timeGridWeek';

    weekCalendar = new FullCalendar.Calendar(weekCalendarEl, optionsCalendar);
    weekCalendar.render();
    
    $('.fc-customMonthButton-button:eq(0)').addClass('active');
    $('.fc-customWeekButton-button:eq(1)').addClass('active');

    $('#weekAgenda').hide();

}

function initButtonMonth(){
  const date = new Date();
  $('.btn-month').each(function(index){
    if(index <= 9){
      // On ne prend pas le mois de juillet et le moi d'aout
      // Juillet == 6 & Aout == 7
      if(date.getMonth() == 6)
          date.setMonth(8);
      const title = date.toLocaleString('default', { month: 'long' });
      const monthName = title.charAt(0).toUpperCase() + title.slice(1);
      $(this)
        .text(monthName + ' ' + date.getFullYear())
        .attr('data-month', date.getMonth())
        .attr('data-year', date.getFullYear());
      date.setMonth(date.getMonth() + 1);
    }else{
      const $element = $(`.btn-month:eq(${index - 10})`);
      $(this)
        .text($element.text())
        .attr('data-month', $element.data('month'))
        .attr('data-year', $element.data('year'));
    }
  });
}

function initAmountFormationMonth(){
  $('.btn-month').each(function(index){
    if(index <= 9){
      const amount = Math.floor(Math.random() * 10);
      $(this).attr('data-content', amount);
    }else{
      const $element = $(`.btn-month:eq(${index - 10})`);
      $(this).attr('data-content', $element.data('content'));
    }
  });
}

/**
 * 
 * @param {number} month 
 * @param {number} year 
 * @returns {object} start & end
 */
function generateDurationFormation(month, year){
  const date = new Date();
  date.setFullYear(year);
  date.setMonth(month);
  const targetDay = Math.floor(Math.random() * 28) + 1;
  const currentDate = date.getDate();
  const diff = targetDay - currentDate;
  date.setDate(date.getDate() + diff);
  let start = '';
  let end = '';
  start += getFormatedDate(date);
  date.setMonth(date.getMonth() + (Math.floor(Math.random() * 12) + 1));
  end += getFormatedDate(date);
    
  return {
    start,
    end
  }
}

/**
 * 
 * @param {string} title 
 * @param {string} start 
 * @param {string} end 
 */
function addFormationIntoCarousel(title, start, end){
  const currentIndex = indexFormationImage++;
  fetchImageAPI(currentIndex);
  const item = `
        <div class="item">
          <div class="project-item">
            <img src="assets/images/spinner.svg" class="img-formation-${currentIndex}" alt="">
            <h4 class="text-primary text-center">${title}</h4>
            <div class="text-content">
              <p class="text-center mb-0"><span class="text-secondary fw-bold">Date de début :</span> ${start}</p>
              <p class="text-center mb-0"><span class="text-secondary fw-bold">Date de fin :</span> ${end}</p>
            </div>
            <a class="btn btn-info text-white w-75 mx-auto d-block" href="#">En savoir plus</a>
          </div>
        </div>
  `;
  $('.owl-carousel').trigger('add.owl.carousel', [item])
  .trigger('refresh.owl.carousel');

}
/**
 * 
 * @param {number} currentIndex 
 * @param {number} tries default 1
 */
function fetchImageAPI(currentIndex, tries = 1){
  fetch('https://random.imagecdn.app/450/350')
  .then(response => response.blob())
  .then(blob => {
    const url = URL.createObjectURL(blob);
    $(`.img-formation-${currentIndex}`).attr('src', url);
  })
  .catch(error => {
    console.error('Erreur:', error);
    if(tries > 3) return;
    fetchImageAPI(currentIndex, ++tries);
  });
}

function isMonthAgenda(){
  return $('#monthAgenda').is(':visible');
}

function clearAllItemsCarousel(){
  const length = $('.owl-item').length;
  for(let i = 0; i < length; i++)
    $(".owl-carousel").trigger('remove.owl.carousel', [i])
      .trigger('refresh.owl.carousel');
}

function destroyCarousel(){
  $(".owl-carousel").trigger('destroy.owl.carousel')
}
/**
 * 
 * @param {Date} date 
 * @returns 
 */
function getFormatedDate(date){
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

/**
 * 
 * @param {number} length 
 */
function initCarousel(length){
  $("#wrapper-carousel").removeClass(['col-lg-8', 'col-lg-6', 'col-lg-5']).addClass(length >= 3 ? 'col-lg-8' : length == 2 ? 'col-lg-6' : 'col-lg-5');
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    autoplay: true,
    autoplayTimeout: 3500,
    autoplaySpeed: 2000,
    autoplayHoverPause: true,
    smartSpeed: 500,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: length > 3 ? 3 : length
      },
      1000: {
        items: length > 3 ? 3 : length
      }
    }
  });  
}