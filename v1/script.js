const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

console.log(CATEGORIES.find((cat) => cat.name === "society").color);

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

async function loadFacts() {
  const res = await fetch(
    "https://vkiayrdrjsczckaapylp.supabase.co/rest/v1/fact",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZraWF5cmRyanNjemNrYWFweWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc0MTc0NTgsImV4cCI6MTk5Mjk5MzQ1OH0.OMnas-d-NLtxmcaTK5lu2e93VuTOUakLt2c2uiwzc2U",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZraWF5cmRyanNjemNrYWFweWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc0MTc0NTgsImV4cCI6MTk5Mjk5MzQ1OH0.OMnas-d-NLtxmcaTK5lu2e93VuTOUakLt2c2uiwzc2U",
      },
    }
  );
  const dataJson = await res.json();
  const filterData = dataJson.filter((el) => el.category === "society");
  createFactElement(dataJson);
}
loadFacts();

const btnOpen = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factList = document.querySelector(".fact-list");

factList.innerHTML = "";
function createFactElement(dataArray) {
  const factHTML = dataArray
    .map(
      (data) => `
  <li class="fact">
    <p>
      ${data.text}
      <a class="source" href="${data.source}" target="_blank">
        (Source)
      </a>
    </p>
    <span class="tag" style="background-color: ${
      CATEGORIES.find((cat) => cat.name === data.category).color
    }">
      ${data.category}
    </span>
    <div class="vote-buttons">
      <button>👍 29</button>
      <button>🤯 9</button>
      <button>⛔ 4</button>
    </div>
  </li>`
    )
    .join("");
  factList.insertAdjacentHTML("afterbegin", factHTML);
}

btnOpen.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btnOpen.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btnOpen.textContent = "Share a Fact";
  }
});

// let votesMindBlowing = 24;
// let votesInteresting = 9;
// let votesFalse = 4;

// let totalUpvotes = votesMindBlowing + votesInteresting;
// console.log("Total Upvotes : ", totalUpvotes);

// const isCorrect = totalUpvotes > votesFalse;
// console.log(isCorrect);

// const calAge = function (currentYear, birthYear) {};

// const mgmg = {
//   age: 18,
// };

// function factAge(factYear) {
//   const age = 2023 - factYear;
//   if (age > 0) {
//     return age;
//   } else {
//     return "Not Old Enough";
//   }
// }
const calculateAge = (birthYear) => 2023 - birthYear;
console.log(calculateAge(2003));
