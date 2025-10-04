import { useEffect, useState, useRef } from "react";
import Table from "./Table";
const Body = () => {
  const [date, setDate] = useState("");
  const [rent, setRent] = useState(0);
  const [grocery, setGrocery] = useState(0);
  const [transport, setTransport] = useState(0);
  const [savings, setSavings] = useState(0);
  const [miscellaneous, setMiscellaneous] = useState(0);

  const lastRowRef = useRef(null);

  const [expenseData, setExpenseData] = useState(() => {
    const savedData = localStorage.getItem("expenseData");
    return savedData ? JSON.parse(savedData) : [];
  });

  const [grandTotal, setGrandTotal] = useState(() => {
    const savedTotal = localStorage.getItem("grandTotal");
    return savedTotal ? JSON.parse(savedTotal) : 0;
  });

  const handleSubmit = () => {
    // Handle form submission logic here
    if (!date) {
      alert("Please select a date.");
      return;
    }
    if (!rent && !grocery && !transport && !savings && !miscellaneous) {
      alert("Please enter at least one expense.");
      return;
    }
    const newExpense = {
      date,
      rent: Number(rent),
      grocery: Number(grocery),
      transport: Number(transport),
      savings: Number(savings),
      miscellaneous: Number(miscellaneous),
      total:
        Number(rent) +
        Number(grocery) +
        Number(transport) +
        Number(savings) +
        Number(miscellaneous),
    };
    if (expenseData.find((item) => item.date === date)) {
      alert("Expense for this date already exists.");
      return;
    }
    setExpenseData((prev) => [...prev, newExpense]);
    setGrandTotal((prev) => prev + newExpense.total);
    setDate("");
    setRent(0);
    setGrocery(0);
    setTransport(0);
    setSavings(0);
    setMiscellaneous(0);
  };

  useEffect(() => {
    // Calculate grand total whenever expenseData changes
    localStorage.setItem("expenseData", JSON.stringify(expenseData));
    localStorage.setItem("grandTotal", JSON.stringify(grandTotal));
    if (lastRowRef.current) {
      lastRowRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [expenseData, grandTotal]);

  return (
    <>
      <div className="flex justify-center items-center bg-gray-200 h-[50px]">
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
      </div>

      <div className="h-[calc(100vh-5rem)] flex flex-col">
        <div className="flex-1 flex flex-col bg-white border-b border-gray-300">
          {/* Scrollable Table */}

          <Table expenseData={expenseData} lastRowRef={lastRowRef} />

          <div className="bg-gray-100 p-3 text-right font-bold text-lg border-t border-gray-300">
            Grand Total: <span className="text-blue-600">{grandTotal}</span>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center bg-gray-100">
          <form className="space-y-4 flex flex-col w-full max-w-md p-4">
            <label className="flex items-center">
              <span className="w-32 text-gray-700 font-semibold">Date</span>
              <input
                type="date"
                className="border p-2 flex-grow"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>

            <label className="flex items-center">
              <span className="w-32 text-gray-700 font-semibold">Rent</span>
              <input
                type="number"
                placeholder="Rent"
                className="border p-2 flex-grow"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
              />
            </label>

            <label className="flex items-center">
              <span className="w-32 text-gray-700 font-semibold">Grocery</span>
              <input
                type="number"
                placeholder="Grocery"
                className="border p-2 flex-grow"
                value={grocery}
                onChange={(e) => setGrocery(e.target.value)}
              />
            </label>

            <label className="flex items-center">
              <span className="w-32 text-gray-700 font-semibold">
                Transport
              </span>
              <input
                type="number"
                placeholder="Transport"
                className="border p-2 flex-grow"
                value={transport}
                onChange={(e) => setTransport(e.target.value)}
              />
            </label>

            <label className="flex items-center">
              <span className="w-32 text-gray-700 font-semibold">Savings</span>
              <input
                type="number"
                placeholder="Savings"
                className="border p-2 flex-grow"
                value={savings}
                onChange={(e) => setSavings(e.target.value)}
              />
            </label>

            <label className="flex items-center">
              <span className="w-32 text-gray-700 font-semibold">
                Miscellaneous
              </span>
              <input
                type="number"
                placeholder="Miscellaneous"
                className="border p-2 flex-grow"
                value={miscellaneous}
                onChange={(e) => setMiscellaneous(e.target.value)}
              />
            </label>

            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded mt-2"
              onClick={handleSubmit}
            >
              Add Expense
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Body;
