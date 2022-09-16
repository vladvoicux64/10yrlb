let i = 0;
let bar = '░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░';
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
  await typeWriter("bar", bar);
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
  let steps = Math.round((start - Date.now())  / year * 10);
  let bar ='';
  for(let i=100-steps; i>0; i--)
    bar+='▓';
  for(let i=steps; i>0; i--)
    bar+='░';
  document.getElementById('bar=').innerText = bar;
}

async function updatefacts() {
  let days = Math.round((start - Date.now())  / day);
  let hours = Math.round((start - Date.now())  / hour);
  let minutes = Math.round((start - Date.now())  / minute);
  let years = Math.round((start - Date.now())  / year);
  document.getElementById('yrs').innerText = Math.floor(years);
  document.getElementById('days').innerText = Math.floor(days);
  document.getElementById('hrs').innerText = Math.floor(hours);
  document.getElementById('mins').innerText = Math.floor(minutes);
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

