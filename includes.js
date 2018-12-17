function includeCode(code){
  switch (code) {
    case "nav":
      document.write(`
        <nav>
          <a class="logo" href="index.html">VodCentral</a>
          <ul>
            <a href="stocks.html">Vodafone Stock</a>
            <a href="news.html">Vodafone News</a>
          </ul>
        </nav>
      `);
      break;
    case "footer":
      document.write(`
        <footer>
          <p class="left">VodCentral is not associated with Vodafone in any way.</p>
          <p class="right">&copy; 2018</p>
        </footer>
      `);
      break;
    default:
      console.error("Code " + code + " not found.");
  }
}
