var stocks = new Stocks('Q96UCS6IUBYKR9MA');

async function request () {
  var today = new Date();
  var yesterday = new Date(today.getTime() - ((31) * 24 * 60 * 60 * 1000));
  var result = await stocks.timeSeries({
    symbol: 'VOD',
    interval: 'daily',
    start: yesterday,
    end: new Date()
  });

  var startClose = result[1].close;
  var endClose = result[0].close;

  var percentChange = (((endClose / startClose) - 1) * 100).toFixed(2).toString() + "%";
  var priceChange = (endClose - startClose).toFixed(2).toString();

  if(parseFloat(percentChange) >= 0){
    document.querySelector("div.content").classList.add("stockUp");
    percentChange = "+" + percentChange;
    priceChange = "+" + priceChange;
  }else{
    document.querySelector("div.content").classList.add("stockDown");
  }

  document.querySelector("div.content div.topbar h1 strong").innerHTML = endClose.toFixed(2).toString();
  document.querySelector("div.content div.topbar h1 span").innerHTML = priceChange + " (" + percentChange + ")" + document.querySelector("div.content div.topbar h1 span").innerHTML;

  document.querySelector("div.content > h1").removeAttribute("style");
  document.querySelector("div.content > div.topbar").removeAttribute("style");
}
request();
