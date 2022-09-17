let i = 0;
let bar = '░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░';
const txt = 'This is a 10 year loading bar.';
const txt2 = 'It was started on 17 september 2022.';
const txt3 = 'It is indeed useless, but I wonder where I will be when it finishes loading.';
const speed = 25;

const start = 1978981200000;
const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;

async function typeWriter(id, text) {
  while (i < text.length) {
    document.getElementById(id).innerHTML += text.charAt(i);
    i++;
    await new Promise(resolve => setTimeout(resolve, speed));
  }
  i = 0;
}

async function load() {
  document.getElementById('barwrapper').style.visibility = 'hidden';
  document.getElementById('facts').style.visibility = "hidden";
  await typeWriter("console", txt);
  document.getElementById("console").innerHTML += `<br>`;
  await typeWriter("console", txt2);
  document.getElementById("console").innerHTML += `<br>`;
  await typeWriter("console", txt3);
  document.getElementById('barwrapper').style.visibility = 'visible';
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    await typeWriter("bar", bar.substring(0,10));
  else await typeWriter("bar", bar);
  spinner();
  document.getElementById('facts').style.visibility = "visible";
  while(true)
  {
    updatebar();
    updatefacts();
    await new Promise(resolve => setTimeout(resolve, 60000));
  }
}

async function updatebar() {
  let proc = Math.floor((start - Date.now())  / year * 10);
  bar ='';
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    steps = proc/10
    for (let i = 10 - steps; i > 0; i--) {
      if (i >= 0.5)
        bar += '▓';
      else bar += '▒';
    }
    for (let i = steps; i >= 1; i--)
      bar += '░';
  }
  else {
    steps = proc/2;
    for (let i = 25 - steps; i > 0; i--) {
      if (i >= 0.5)
        bar += '▓';
      else bar+= '▒';
    }
    for (let i = steps; i >= 1; i--)
      bar += '░';
  }
  document.getElementById('bar').innerText = bar;
}

async function updatefacts() {
  let days = Math.round((start - Date.now())  / day);
  let hours = Math.round((start - Date.now())  / hour);
  let minutes = Math.round((start - Date.now())  / minute);
  let years = Math.round((start - Date.now())  / year);
  document.getElementById('yrs').innerText =years;
  document.getElementById('days').innerText = days;
  document.getElementById('hrs').innerText = hours;
  document.getElementById('mins').innerText = minutes;
}

async function spinner() {
  let spinner="―\\|/"
  while(true)
    for(let i = 0; i < 4; i++) {
      document.getElementById("spinner").innerText = spinner[i];
      await new Promise(resolve => setTimeout(resolve, 50));
    }
}
window.onload = load();

