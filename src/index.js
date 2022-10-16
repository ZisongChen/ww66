import "./styles.css";
import { Chart } from "frappe-charts";
const jsonQuery = {
  query: [
    {
      code: "Vuosi",
      selection: {
        filter: "item",
        values: [
          "2000",
          "2001",
          "2002",
          "2003",
          "2004",
          "2005",
          "2006",
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021"
        ]
      }
    },
    {
      code: "Alue",
      selection: {
        filter: "item",
        values: ["SSS"]
      }
    },
    {
      code: "Tiedot",
      selection: {
        filter: "item",
        values: ["vaesto"]
      }
    }
  ],
  response: {
    format: "json-stat2"
  }
};

const getData = async () => {
  const url =
    "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";

  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(jsonQuery)
  });
  if (!res.ok) {
    return;
  }
  const data = await res.json();

  return data;
};
const buildChart = async () => {
  const data = await getData();
  const values = data.value;

  var labels = [];
  var valuelist = [];
  var valuelist1 = [];
  var year = 2000;
  var j = 0;
  for (var i in values) {
    labels.push(year);
    year++;
    valuelist.push(values[i]);
    j++;
  }
  var name;
  var name1;
  var jj = 0;
  for (var iii in data.dimension.Alue.category.label) {
    if (jj === 0) {
      name = data.dimension.Alue.category.label[iii];
    } else if (jj === 1) {
      name1 = data.dimension.Alue.category.label[iii];
    }
    jj++;
  }
  const chartData = {
    labels: labels,
    datasets: [{ name: name, values: valuelist }]
  };
  const chart = new Chart("#chart", {
    title: "Population growth in Finland",
    data: chartData,
    type: "line",
    height: 450,
    colors: ["#eb5146"]
    /*barOptions: {
        stacked: 1
    },*/
  });

  const add = document.getElementById("submit-data");
  add.onclick = function () {
    getUsers();
    return false;
  };
  async function getUsers(event) {
    const url =
      "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";
    var show = document.getElementById("input-area").value;
    var data11 = show.toLowerCase();
    var index = 0;
    var name;
    const city = await fetch(url);
    var c = await city.json();
    for (var inn in c.variables[1].valueTexts) {
      if (c.variables[1].valueTexts[inn].toLowerCase() === data11) {
        name = c.variables[1].values[inn];
        console.log(name);
        break;
      }
    }

    jsonQuery.query[1].selection.values[0] = name;
    buildChart();
    return false;
  }
  const pre = document.getElementById("add-data");
  pre.onclick = function () {
    getUsers1();
  };
  async function getUsers1(event) {
    const data = await getData();
    const values = data.value;
    var valuelist2 = [];
    for (var w in values) {
      valuelist2.push(values[w]);
      j++;
    }
    var l = 0;
    var sum = 0;
    for (var ww = 0; ww < 21; ww++) {
      var a = valuelist2[ww];
      var b = valuelist2[ww + 1];
      sum = sum + (b - a);
      l++;
    }
    var da = sum / 21 + valuelist2[21];
    let label = "2022";
    let valueFromEachDataset = [da];
    chart.addDataPoint(label, valueFromEachDataset);
  }
};

buildChart();
