import React from "react";
import { useNavigate } from "react-router";
import ReactWordcloud from "react-wordcloud";
function WordCloud() {
  const navigate = useNavigate();
  const callbacks = {
    onWordClick: (e) => navigate(`/tags/${e.text}`),
    onWordMouseOver: console.log
  };
  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "강원교육튼튼",
    fontSizes: [50, 200],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 10,
    rotations: 0,
    rotationAngles: [-90, 0],
    scale: "sqrt",
    spiral: "archimedean"
  };
  const size = [1000, 800];
  const words = [
    {
      text: "편의/도구",
      value: 172
    },
    {
      text: "취업",
      value: 4
    },
    {
      text: "기타",
      value: 10
    },
    {
      text: "게임",
      value: 40
    },
    {
      text: "패션",
      value: 24
    },
    {
      text: "환경",
      value: 38
    },
    {
      text: "의료",
      value: 11
    },
    {
      text: "음악",
      value: 3
    },
    {
      text: "운동/스포츠",
      value: 30
    },
    {
      text: "요리",
      value: 37
    },
    {
      text: "교육",
      value: 36
    },
    {
      text: "영화/도서",
      value: 15
    },
    {
      text: "생활",
      value: 118
    },
    {
      text: "AI",
      value: 10
    },
    {
      text: "여행",
      value: 16
    },
    {
      text: "힐링",
      value: 6
    },
    {
      text: "비즈니스",
      value: 5
    },
    {
      text: "커뮤니케이션",
      value: 13
    },
    {
      text: "쇼핑",
      value: 9
    },
    {
      text: "지도",
      value: 29
    },
    {
      text: "창작",
      value: 3
    },
    {
      text: "예술/디자인",
      value: 7
    },
    {
      text: "컴퓨팅",
      value: 3
    },
    {
      text: "보안",
      value: 7
    }];
    
  return (
    <div className="wordCloud">
      <ReactWordcloud
        className="WordCloud"
        callbacks={callbacks}
        options={options}
        size={size}
        words={words}
      />
    </div>
  );
}

export default WordCloud;
