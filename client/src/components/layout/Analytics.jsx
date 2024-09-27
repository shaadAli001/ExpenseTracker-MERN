import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransaction }) => {
  const category = ["salary", "tip", "project", "food", "movie", "medical"];

  const totalTransaction = allTransaction.length;

  const totalIncomeTransaction = allTransaction.filter(
    (transaction) => transaction.type === "income"
  );

  const totalExpenseTransaction = allTransaction.filter(
    (transaction) => transaction.type === "expense"
  );

  const totalIncomePercent =
    (totalIncomeTransaction.length / totalTransaction) * 100;

  const totalExpensePercent =
    (totalExpenseTransaction.length / totalTransaction) * 100;

  // turn Over

  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalIncomeTurnOver = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnOver = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnOverPercent =
    (totalIncomeTurnOver / totalTurnover) * 100;

  const totalExpenseTurnOverPercent =
    (totalExpenseTurnOver / totalTurnover) * 100;
  return (
    <>
      <div className="row m-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Tranactions:{totalTransaction}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income:{totalIncomeTransaction.length}
              </h5>
              <h5 className="text-danger">
                Expense:{totalExpenseTransaction.length}
              </h5>
            </div>
            <div className="m-3">
              <Progress
                type="circle"
                strokeColor={"green"}
                className="mx-5"
                percent={totalIncomePercent.toFixed()}
              />
              <Progress
                type="circle"
                strokeColor={"red"}
                className="mx-5"
                percent={totalExpensePercent.toFixed()}
              />
            </div>
          </div>
        </div>
        {/* turnover */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total TurnOver:{totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">Income:{totalIncomeTurnOver}</h5>
              <h5 className="text-danger">Expense:{totalExpenseTurnOver}</h5>
            </div>
            <div className="m-3">
              <Progress
                type="circle"
                strokeColor={"green"}
                className="mx-5"
                percent={totalIncomeTurnOverPercent.toFixed()}
              />
              <Progress
                type="circle"
                strokeColor={"red"}
                className="mx-5"
                percent={totalExpenseTurnOverPercent.toFixed()}
              />
            </div>
          </div>
        </div>
        {/* Income */}
        <div className="col-md-2">
          <h4 className="text-center"> IncomeTrack</h4>
          {category.map((category) => {
            const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.type === "income" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card m-3">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalIncomeTurnOver) * 100).toFixed()}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
        {/* expense */}
        <div className="col-md-2">
          <h4 className="text-center">Expense Track</h4>
          {category.map((category) => {
            const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.type === "expense" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card m-3">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={(
                        (amount / totalExpenseTurnOver) *
                        100
                      ).toFixed()}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Analytics;
