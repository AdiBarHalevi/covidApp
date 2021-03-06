const url = "cors-anywhere.herokuapp.com";

const $ = document.querySelector.bind(document);

let area;
let chart;
let myChart;

const errorhandler = (err) => {
  console.log(`an eror accured`);
  console.log(err);
};

function chartUpdate(wantedInfo){
    let header;
    let nums;
    header = wantedInfo;
    nums = webSiteObj.displayPage[wantedInfo];
    chart.data.datasets[0][`label`] = header;
    chart.data.datasets[0][`data`] = nums;
    chart.update();
}


const webSiteObj = {
  mainPage: {
    checkBoxUse: function () {
      const selectRegion = $(`.select-continent .btn`);
      const innerForm = $(`.inner-form`);
      selectRegion.addEventListener(`change`, (x) => {
        if (x.target.checked) {
          innerForm.style.display = `flex`;
        } else {
          innerForm.style.display = `none`;
        }
      });
    },
    chooseArea: function () {
      let selectedArea;
      const btn = $(`.submit-area`);
      btn.addEventListener(`click`, () => {
        selectedArea = $('input[name="chose"]:checked');
        $(`.page2`).style.display = `flex`;
        this.fetchAreaData(selectedArea.id).catch(errorhandler);
        setTimeout(()=>{
          window.scrollTo({
            top: 1800,
            behavior: 'smooth'
          });
          $(`.confirmed`).click()
        },1000)

      });
    },
    fetchAreaData: async function (area) {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      let data;
      if (area === `world`) {
        data = await fetch(
        // `https://cors-proxy.htmldriven.com/?url=https://restcountries.herokuapp.com/api/v1`,
          `https://cors-anywhere.herokuapp.com/https://restcountries.herokuapp.com/api/v1`,
          requestOptions
        );
        data = await data.json();
      } else {
        data = await fetch(
          `https://cors-anywhere.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/${area}`,
          requestOptions
        );
        data = await data.json();
      }
      webSiteObj.mainPage.useData(data);
    },
    useData: function (data) {
      const countryArr = [];
      let startPoint =webSiteObj.displayPage.picCode; 
      for (const [key, value] of Object.entries(data)) {
        startPoint[value[`name`][`common`]]= value.cca2
        countryArr.push(value.cca2);
      }
      webSiteObj.displayPage[`countries`] = countryArr;
      webSiteObj.displayPage.covidData(countryArr);
    },
    mainPageRun: async function () {
      webSiteObj.mainPage.checkBoxUse();
      webSiteObj.mainPage.chooseArea();
    },
  },
  displayPage: {
    picCode:{},
    lables: [],
    confirmed: [],
    deaths: [],
    recoverd: [],
    critical: [],
    covidData: function () {
      let labelsArr = [];
      let datasets = [];
      webSiteObj.displayPage.countries.forEach((element) => {
        this.covidFetch(element).catch(errorhandler);
      });
      webSiteObj.displayPage[`labels`] = labelsArr;
      webSiteObj.displayPage[`confirmed`] = datasets;
      this.genChart();
    },
    covidFetch: async function (element) {
      let covidData;
      covidData = await fetch(
        `https://cors-anywhere.herokuapp.com/http://corona-api.com/countries/${element}`
      );
      covidData = await covidData.json();
      webSiteObj.displayPage[`labels`].push(covidData.data.name);
      webSiteObj.displayPage[`confirmed`].push(
      covidData.data.latest_data.confirmed
      );
      webSiteObj.displayPage[`deaths`].push(covidData.data.latest_data.deaths);
      webSiteObj.displayPage[`recoverd`].push(
        covidData.data.latest_data.recovered
      );
      webSiteObj.displayPage[`critical`].push(
        covidData.data.latest_data.critical
      );
    },
    genChart: function () {
      webSiteObj.displayPage.countryListGen();
      let cases = webSiteObj.displayPage.confirmed;
      let countries = webSiteObj.displayPage.labels;
      if(myChart){
        chart.data[`labels`] = countries
        chart.data.datasets[0][`data`] = cases
        chart.update()
        webSiteObj.displayPage.countryListGen()
      }else{
        myChart = $(`#myChart`).getContext(`2d`);
        chart = new Chart(myChart, {
          type: `bar`,
          data: {
            labels: countries,
            datasets: [
              {
                label: `confirmed cases`,
                data: cases,
                backgroundColor: `orange`,
              },
            ],
          },
          options: {},
        });
      }
      webSiteObj.displayPage.countryListGen()
    },
    secondPage: function() {
        const lowerP2 = $(`.lower-p2`)
        let selectedArea;
        lowerP2.addEventListener(`click`,(e)=>{       
            switch(e.target.classList.value){
                case `display`:
                    webSiteObj.displayPage.countryListGen();
                break;
                case `recoverd`:
                chartUpdate(e.target.classList.value)
                break;
                case `deaths`:
                chartUpdate(e.target.classList.value)
                break;
                case `confirmed`:
                chartUpdate(e.target.classList.value)
                break;
                case `critical`:
                chartUpdate(e.target.classList.value)
                break;
                case `asia`:
                    selectedArea = e.target.classList.value;
                    myChart = $(`#myChart`);
                    this.chooseArea2(selectedArea);
                break
                case `europe`:
                    selectedArea = e.target.classList.value;
                    myChart = $(`#myChart`);
                    this.chooseArea2(selectedArea);
                break
                case `africa`:
                    selectedArea = e.target.classList.value;
                    myChart = $(`#myChart`);
                    this.chooseArea2(selectedArea);
                break
                case `Americas`:
                    selectedArea = e.target.classList.value;
                    myChart = $(`#myChart`);
                    this.chooseArea2(selectedArea);
                break
                case `world`:
                    selectedArea = e.target.classList.value;
                    myChart = $(`#myChart`);
                    this.chooseArea2(selectedArea);
                break
                default:
                    webSiteObj.thirdPage.p3run(e.target.textContent)
                break
            }
            setTimeout(()=>{
              window.scroll({
                top: 2200,
                behavior: 'smooth'
              });
            },500)     
        })
    },
    chooseArea2: function(selectedArea){
        webSiteObj.mainPage.fetchAreaData(selectedArea).catch(errorhandler);
    },
    countryListGen:function(){
        let list = webSiteObj.displayPage.labels
        let countryDiv = $(`.countryList`)
        countryDiv.innerHTML = ""
        list.forEach((x)=>{
            countryDiv.innerHTML += `<li>${x}</li>`
        })
    }
  },
  thirdPage:{
    p3run:function(countryName){
      let code = webSiteObj.displayPage.picCode[countryName].toLowerCase()
      let serialNum 
      let header = $(`.page3 h2`)
      let confirmed = $(`.page3 .confirmed`)
      let deaths = $(`.page3 .deaths`)
      let recoverd = $(`.page3 .recoverd`)
      let critical = $(`.page3 .critical`)
      let picDiv = $(`.page3 .pic`)
      serialNum = webSiteObj.displayPage.labels.indexOf(countryName);
      this.genPieChart(serialNum)
      confirmed.innerText =  webSiteObj.displayPage.confirmed[serialNum];
      deaths.innerText =  webSiteObj.displayPage.deaths[serialNum];
      recoverd.innerText  =  webSiteObj.displayPage.recoverd[serialNum];
      critical.innerText  = webSiteObj.displayPage.critical[serialNum];
      picDiv.style.background =`url("https://www.countryflags.io/${code}/shiny/64.png")center center/cover`;
      header.innerText  = countryName;
      $(`.page3`).style.display = `flex`
    },
    genPieChart:function(serialNum){
      let myChart2 = $(`#myChart2`).getContext(`2d`)
      chart = new Chart(myChart2, {
        type: `pie`,
        data: {
          labels:[`confirmed`,`deaths`,`recoverd`,`critcal`],
          datasets: [
            {
              label: `confirmed cases`,
              data: [webSiteObj.displayPage.confirmed[serialNum],
              webSiteObj.displayPage.deaths[serialNum],
              webSiteObj.displayPage.recoverd[serialNum],
              webSiteObj.displayPage.critical[serialNum]
            ],
              backgroundColor:[
                `rgba(255,99,132,0.6)`,
                `rgba(54,162,235,0.6)`,
                `rgba(255,206,86,0.6)`,
                `rgba(75,192,192,0.6)`
              ],
            },
          ],
        },
        options: {},
      });

    }
  }
};




webSiteObj.mainPage.mainPageRun();
webSiteObj.displayPage.secondPage();



  


