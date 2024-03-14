const input = document.getElementById("input");
const search = document.getElementById("searchForm");
const submmit = document.querySelector("#submit");
const ul = document.querySelector(".coins");

search.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = "https://api.coinranking.com/v2";
  const apiKey = "coinranking43afd9055e96afc03aa3062b5134719594b407144f6b3299";
  const options = {
    headers: {
      "x-access-token": apiKey,
    },
  };
  try {
    const searchValue = input.value;
    const response = await fetch(`${url}/coins?search=${searchValue}`, options);

    if (response.ok) {
      const data = await response.json();

      getData(data);
    } else {
      throw new Error("API request is failed!!!");
    }
  } catch (error) {
    console.error(error);
  }
});

const getData = (data) => {
  const coins = data.data.coins;
  console.log(coins);
  // ul.innerHTML = "";
  coins.forEach((coin) => {
    ul.innerHTML += `
      <div class="card" style="width: 18rem;">
      <div class="position-absolute top-0 end-0">X</div>
      <div class="card-body d-flex justify-content-center align-items-center flex-column">
        <h5 class="card-title text-center">${coin.name}</h5>
        <h5 class="card-title text-center">${Number(coin.price).toFixed(
          8
        )} $</h5>
        <img src=${coin.iconUrl} width="200px">
        <div>${coin.symbol}</div>
      </div>
    </div>
  
    `;
  });
  const deleteIt = document.querySelectorAll(".top-0");
  deleteIt.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = document.querySelector(".card");
      card.remove();
    });
  });
};
