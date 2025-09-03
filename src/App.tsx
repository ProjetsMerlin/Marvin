import { useState } from "react";
import { checklist, categoryOrder } from "./checklist";

export interface ChecklistItem {
  id: number;
  content: string;
  status: boolean;
  category: string;
  myrdhin: boolean;
  externalUrl: string;
}

function App() {
  const [checkedItems, setCheckedItems] = useState<ChecklistItem[]>(checklist);
  const [checkMyrdhin, setMyrdhin] = useState(false);
  const totalItems = checkedItems.length;
  const checkedCount = checkedItems.filter((item) => item.status).length;
  const progress = (checkedCount / totalItems) * 100;

  const handleReset = () => {
    setCheckedItems(
      checkedItems.map((item) =>
        item.status === true ? { ...item, status: false } : item
      )
    );
    setMyrdhin(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleChange = (id: number) => {
    setCheckedItems(
      checkedItems.map((item) =>
        item.id === id ? { ...item, status: checkMyrdhin } : item
      )
    );
  };

  const runMyrdhin = (checkMyrdhin: boolean) => {
    setMyrdhin(!checkMyrdhin);

    setCheckedItems(
      checkedItems.map((item) =>
        item.myrdhin === true ? { ...item, status: !item.status } : item
      )
    );
  };

  const groupedItems = checkedItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, ChecklistItem[]>
  );

  const sortedCategories = Object.entries(groupedItems).sort(
    ([categoryA], [categoryB]) => {
      const indexA = categoryOrder.indexOf(categoryA);
      const indexB = categoryOrder.indexOf(categoryB);
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    }
  );

  return (
    <section className="min-h-screen bg-gray-50 relative m-auto max-w-[1920px]">
      <div
        aria-hidden={true}
        className="w-full bg-gray-200 h-4 absolute bottom-0"
      >
        <div
          aria-hidden="true"
          className="bg-(--primaryColor) h-4 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mx-auto p-4">
        <h1 className="text-5xl font-bold mb-4 text-center text-(--primaryColor)">
          Website Checklist
        </h1>
        <div className="py-4 text-center">
          <input
            type="checkbox"
            id="Myrdhin"
            checked={checkMyrdhin}
            onChange={() => runMyrdhin(checkMyrdhin)}
            className="h-5 w-5 accent-(--primaryColor) rounded cursor-pointer print:hidden"
          />
          <label
            htmlFor="Myrdhin"
            className="ml-2 text-gray-700 cursor-pointer print:hidden"
          >
            Myrdhin
          </label>
        </div>
        <div className="md:flex flex-wrap items-around">
          {sortedCategories.map(([category, items]) => (
            <div
              key={category}
              className="p-4 mb-4 w-12/12 2xl:w-1/4 xl:w-1/3 md:w-1/2"
            >
              <h2 className="text-lg font-semibold mb-2">{category}</h2>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`item-${item.id}`}
                      checked={item.status}
                      onChange={() => handleChange(item.id)}
                      className="h-5 w-5 accent-(--primaryColor) rounded cursor-pointer"
                    />
                    <label
                      htmlFor={`item-${item.id}`}
                      className="ml-2 text-gray-700 cursor-pointer"
                    >
                      {item.id + ". " + item.content}
                      {item.externalUrl && (
                        <a
                          className="inline-block ml-1 print:hidden"
                          href={item.externalUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                            />
                          </svg>
                        </a>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-500 text-center">
          {Number(progress.toFixed(1))} % complet
        </p>
        <div className="mt-8 text-center">
          <button className="btn" onClick={handlePrint}>
            Imprimer la page
          </button>
          <button className="ml-3 btn btn--white" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
export default App;
