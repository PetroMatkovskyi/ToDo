let [dateNow, mounthNow] = new Date().toLocaleDateString().split('.');

class Options {
  #animationSpeed = 500;
  #closing = false;
  #option = document.getElementById('options_overley');

  constructor() {}

  get isClose() {
    return this.#closing;
  }

  set changeClose(close) {
    this.#closing = close;
  }

  get options() {
    return this.#option;
  }

  get speed() {
    return this.#animationSpeed;
  }

  open() {
    let option = document.getElementById('options_overley');
    if (!this.isClose && option) {
      option.classList.add('open');
    }
  }

  close() {
    let option = document.getElementById('options_overley');

    this.changeClose = true;
    option.classList.remove('open');
    option.classList.add('hide');
    setTimeout(() => {
      option.classList.remove('hide');
      this.changeClose = false;
    }, this.speed);
  }

  background(event) {
    console.log(body.style.backgroundImage);
    body.style.backgroundImage = `url(${event.target.src})`;
  }
}

const options = new Options();

class Widgets {
  constructor() {}

  checkMain() {
    if (Object.keys(data.main).length === 0) {
      [
        data.main.dateToday,
        data.main.monthToday,
      ] = new Date().toLocaleDateString().split('.');
      data.main.random = Math.ceil(Math.random() * quotes.length);
    }
  }

  getRandomNum() {
    this.checkMain();
    let m = data.main;
    if (m.dateToday !== dateNow || m.monthToday !== mounthNow) {
      [m.dateToday, m.monthToday] = [dateNow, mounthNow];
      m.random = Math.ceil(Math.random() * quotes.length);
    }
    return m.random;
  }

  getQoute() {
    return [
      quotes[this.getRandomNum()].phrase,
      quotes[this.getRandomNum()].creator,
    ];
  }

  getAutoRequest() {
    let m = data.main;
    let time = new Date().getTime();
    if (!m.time || time - m.time > 180000) {
      this.getWeaher();
    }
  }

  getWeaher() {
    let json = {};

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          data.main.time = new Date().getTime();
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const myKey = '60b62c649f5e75dc7b03da241b241954';
          const requestURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myKey}`;

          fetch(requestURL)
            .then((response) => {
              return response.json();
            })
            .then((j) => Object.assign(json, j))
            .then(() => {
              data.main.weather = `<p>${json.name} ${Math.ceil(
                json.main.temp - 272.15
              )}°</p>`;
              if (document.getElementById('weather')) {
                document.getElementById('weather').innerHTML = '';
                document.getElementById('weather').innerHTML =
                  data.main.weather;
              }
            });
        },
        function (e) {
          alert(e);
        },
        {enableHighAccuracy: true, timeout: 4000, maximumAge: 0}
      );
    } else console.log('Your browser does not support geolocation.');
  }
}

const widgets = new Widgets();
