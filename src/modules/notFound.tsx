import React from 'react';
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const NotFound: React.FC = (argu: any) => {
  const {match} = argu;
  console.log(match, 'argu:', argu);
  return (
    <div className="nf">Not found !</div>
  )
};

export default NotFound;
