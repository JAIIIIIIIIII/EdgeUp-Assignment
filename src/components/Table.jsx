import React from "react";

const table = ({ expenseData, lastRowRef }) => {
  return (
    <div className="overflow-hidden flex-1 flex flex-col">
      <table className="table-auto border border-gray-400 w-full">
        <thead className="bg-gray-300 sticky top-0 z-10">
          <tr>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">House Rent</th>
            <th className="p-2 border">Groceries</th>
            <th className="p-2 border">Transport</th>
            <th className="p-2 border">Savings</th>
            <th className="p-2 border">Miscellaneous</th>
            <th className="p-2 border">Total</th>
          </tr>
        </thead>
      </table>
      <div className="overflow-y-auto border border-t-0 border-gray-400 w-full max-h-[200px]">
        <table className="table-auto w-full border-collapse">
          <tbody>
            {expenseData.map((item, idx) => {
              return (
                <tr
                  key={idx}
                  ref={idx === expenseData.length - 1 ? lastRowRef : null}
                >
                  <td className="p-2 border">{item.date}</td>
                  <td className="p-2 border">${item.rent}</td>
                  <td className="p-2 border">${item.grocery}</td>
                  <td className="p-2 border">${item.transport}</td>
                  <td className="p-2 border">${item.savings}</td>
                  <td className="p-2 border">${item.miscellaneous}</td>
                  <td className="p-2 border font-semibold">${item.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default table;
