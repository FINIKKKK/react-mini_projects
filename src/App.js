import React from "react";

import "./index.scss";

const questions = [
  {
    title: "React - это ... ?",
    variants: ["библиотека", "фреймворк", "приложение"],
    correct: 0,
  },
  {
    title: "Компонент - это ... ",
    variants: [
      "приложение",
      "часть приложения или страницы",
      "то, что я не знаю что такое",
    ],
    correct: 1,
  },
  {
    title: "Что такое JSX?",
    variants: [
      "Это простой HTML",
      "Это функция",
      "Это тот же HTML, но с возможностью выполнять JS-код",
    ],
    correct: 2,
  },
];

function Result({ rightAnswers, setRightAnswers, setActiveQuestion }) {
  const onRestartGame = () => {
    setActiveQuestion(0);
    setRightAnswers(0);
  };

  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {rightAnswers} ответа из {questions.length}</h2>
      <button onClick={onRestartGame}>Попробовать снова</button>
    </div>
  );
}

function Game({
  activeQuestion,
  setActiveQuestion,
  rightAnswers,
  setRightAnswers,
}) {
  const onClickAnswer = (index) => {
    if (questions[activeQuestion].correct === index) {
      setRightAnswers(rightAnswers + 1);
    }

    setActiveQuestion(activeQuestion + 1);
  };

  const percent = Math.round((activeQuestion / questions.length) * 100);

  return (
    <>
      <div className="progress">
        <div style={{ width: `${percent}%` }} className="progress__inner"></div>
      </div>
      <h1>{questions[activeQuestion].title}</h1>

      <ul>
        {questions[activeQuestion].variants.map((label, index) => (
          <li onClick={() => onClickAnswer(index)} key={index}>
            {label}
          </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  const [activeQuestion, setActiveQuestion] = React.useState(0);
  const [rightAnswers, setRightAnswers] = React.useState(0);

  return (
    <div className="App">
      {activeQuestion !== questions.length ? (
        <Game
          activeQuestion={activeQuestion}
          setActiveQuestion={setActiveQuestion}
          rightAnswers={rightAnswers}
          setRightAnswers={setRightAnswers}
        />
      ) : (
        <Result
          rightAnswers={rightAnswers}
          setRightAnswers={setRightAnswers}
          setActiveQuestion={setActiveQuestion}
        />
      )}
    </div>
  );
}

export default App;
