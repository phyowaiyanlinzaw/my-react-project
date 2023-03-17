import { useState } from "react";
import "./style.css";

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

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState(initialFacts);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />

      {showForm ? <NewFactForm setFacts={setFacts} /> : null}

      <main className="main">
        <CategoryFilter />
        <FactList facts={facts} />
      </main>
    </>
  );
}

function Header({ showForm, setShowForm }) {
  const appTitle = "React Project";
  return (
    <header className="header">
      <div className="logo">
        <img src="./logo.png" alt="My Website logo" />
        <h1>{appTitle}</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Share A Face"}
      </button>
    </header>
  );
}

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

function NewFactForm({ setFacts }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");

  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  function handleSubmit(e) {
    //browserရဲ့ default loading ကို ရပ်ပစ်ရန်
    e.preventDefault(); //loading false
    // console.log(text, source, category);

    //User ထည့်လိုက်တဲ့ dataတွေ Formထဲမှာ တကယ် ပါ/မပါ စစ်ပေးရမှာ.. ပါတယ်ဆိုရင် Fact အသစ်ဆောက်
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      //Fact အသစ်ကို Fact Object အဖြစ်ပြောင်းရန်
      const newFact = {
        id: Math.round(Math.random() * 1000000),
        text: text,
        source: source,
        category: category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),
      };

      //Fact Object ကို UIမှာ ပြပေးရန်.... Fact State အသစ်တစ်ခုရေးပေးရန်
      setFacts((currentFacts) => [newFact, ...currentFacts]);
      // //Formထဲက Dataတွေကို အကုန်ပြန်ဖျက်ရန်
      setText("");
      setSource("");
      setCategory("");
      // setFacts([]);
      //Form ကို ပြန်ပိတ်ရန်
    }
  }

  const textLength = text.length;
  // console.log(text);
  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share A Fact With The Words ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span className="counting-words">{200 - textLength}</span>
      <input
        type="text"
        placeholder="Trustworthy Source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select
        name=""
        id=""
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Choose Category:</option>

        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}

        <option value="science">Science</option>
        <option value="finance">Finance</option>
      </select>
      <button className="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li className="category">
          <button className="btn btn-all-category">All</button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts }) {
  return (
    <section>
      <ul className="fact-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} />
        ))}
        <p>There are {facts.length} Facts.</p>
      </ul>
    </section>
  );
}

function Fact({ fact }) {
  // const { fact } = props;
  return (
    <li className="fact">
      <p>
        {fact.text}
        <a href={fact.source} target="_blank" className="source">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button>👍 {fact.votesInteresting}</button>
        <button>🤯 {fact.votesMindblowing}</button>
        <button>⛔️ {fact.votesFalse}</button>
      </div>
    </li>
  );
}

export default App;
