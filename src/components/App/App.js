import "./App.css";
import Header from "../Header/index.js";
import Graph from "../Graph/index.js";
import Faq from "../Faqs/index.js";
import Invest from "../Invest/index.js";
import Contact from "../Contact";
import { useState, useEffect } from "react";

// [{Month: 'Month 1', Value: 15}, {Month: 'Month 2', Value: 20},
//   {Month: 'Month 3', Value: 38},
//   {Month: 'Month 4', Value: 43},
//   {Month: 'Month 6', Value: 49}]

const url = process.env.REACT_APP_BACKEND_URL ?? "http://localhost:3000";

function App() {
  const [dummyData, setDummyData] = useState("");
  const [faqData, setFaqData] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  //const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${url}/v1/faqData`);
      const data = await response.json();
      setFaqData(data);
    }
    fetchData();
    console.log(faqData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${url}/v1/spaceCoinDummyData`);
      const data = await response.json();
      setDummyData(data);
    }
    fetchData();
    
    setInterval(() => {
      console.log("re-rendered due to interval");
      fetchData();
    }, 30000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(formData);
  function handleSubmit(e) {
    e.preventDefault();
    let data = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };
    setFormData(data);
    console.log(formData);
  }

  // if (!faqData) {
  //   return (
  //     <div>
  //       <h1>Server Loading... {console.log(faqData)}</h1>
  //     </div>
  //   );
  // }

  return (
    <div className="body">
      <header>
        <Header className="App-header"></Header>
      </header>

      <div className="flex-container1">
      {dummyData &&
        <Graph info={dummyData} data={faqData}></Graph>
      }
      </div>

      <div className="flex-container2">
        <Invest
          Contact={Contact}
          buttonText="Submit"
          onSubmit={handleSubmit}
        ></Invest>
        {faqData && 
        <Faq data={faqData}></Faq>
        }
      </div>
      <div>Hello</div>
    </div>
  );
}
export default App;
