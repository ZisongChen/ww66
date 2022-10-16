import "./styles.css";
import { Chart } from "frappe-charts";
const jsonQuery1 = {
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
        values: ["vm11"]
      }
    }
  ],
  response: {
    format: "json-stat2"
  }
};
const jsonQuery2 = {
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
        values: ["vm01"]
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
    body: JSON.stringify(jsonQuery1)
  });
  if (!res.ok) {
    return;
  }
  const data = await res.json();

  return data;
};
const getData2 = async () => {
  const url =
    "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";

  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(jsonQuery2)
  });
  if (!res.ok) {
    return;
  }
  const data = await res.json();

  return data;
};
const buildChart = async () => {
  const data = await getData();
  const data1 = await getData2();
  const values = data.value;
  const value1 = data1.value;
  var labels = [];
  var valuelist = [];
  var valuelist1 = [];
  var year = 2000;
  var j = 0;
  var h = 0;
  for (var i in values) {
    labels.push(year);
    year++;
    valuelist.push(values[i]);
    j++;
  }
  for (var w in values) {
    valuelist1.push(value1[w]);
    h++;
  }
  var name;
  var name1;
  var jj = 0;
  var hh = 0;
  for (var iii in data.dimension.Alue.category.label) {
    if (jj === 0) {
      name = data.dimension.Alue.category.label[iii];
    } else if (jj === 1) {
      name1 = data.dimension.Alue.category.label[iii];
    }
    jj++;
  }
  for (var www in data1.dimension.Alue.category.label) {
    if (hh === 0) {
      name1 = data1.dimension.Alue.category.label[www];
    } else if (hh === 1) {
      name1 = data1.dimension.Alue.category.label[www];
    }
    hh++;
  }
  const chartData = {
    labels: labels,
    datasets: [
      { name: "birth", values: valuelist },
      { name: "death", values: valuelist1 }
    ]
  };
  const chart = new Chart("#chart", {
    title: "birth in Finland",
    data: chartData,
    type: "bar",
    height: 450,
    colors: ["#63d0ff", "#363636"]
    /*barOptions: {
        stacked: 1
    },*/
  });
};
buildChart();
