/**
 * localのjson読み込み
 *
 */
async function getStocks() {
  const response = await fetch(
    './marketStackFB.json' // jsonファイルの場所
  );
  const stocks = await response.json();
  console.log(stocks);
  return stocks;
}

/**
 * local marketStack.json読み込み
 * @var
 */
const reqListener = () => {
  const stocks = JSON.parse(xhr.response);

  /**
   * chart.js
   */
  let labels = [];
  let datas = [];
  for (const [key, stock] of Object.entries(stocks.data)) {
    var date = new Date(stock.date);
    result = date.toDateString();
    labels.push(result);
    datas.push(stock.adj_close);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'FaceBook',
        borderColor: 'rgba(35,200,153,1)',
        data: datas,
        lineTension: 0,
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
    options: {},
  };
  /**
   * DOM取得インスタンス化
   * @param DOM
   * @param object config
   */
  const myChart = new Chart(document.getElementById('myChart'), config);
  return xhr.response;
};

var xhr = new XMLHttpRequest();
xhr.addEventListener('load', reqListener);
xhr.open('GET', './src/js/marketStackFB.json');
xhr.send();
