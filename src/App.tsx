import Pagination from "./shared/components/Pagination";
import usePagination from "./shared/hooks/usePagination";

function App() {
  const items = [
    {
      id: 1,
      title: "item-1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, a.",
    },
    {
      id: 2,
      title: "item-2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, a.",
    },
    {
      id: 3,
      title: "item-3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, a.",
    },
    {
      id: 4,
      title: "item-4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, a.",
    },
    {
      id: 5,
      title: "item-5",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, a.",
    },
    {
      id: 6,
      title: "item-6",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, a.",
    },
    {
      id: 7,
      title: "item-7",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, a.",
    },
    {
      id: 8,
      title: "item-8",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, a.",
    },
    {
      id: 9,
      title: "item-9",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, a.",
    },
    {
      id: 10,
      title: "item-10",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, a.",
    },
  ];

  const { currentPage, goToPage } = usePagination(2);
  return (
    <div className="w-full h-[100vh] border border-red-400 flex items-center">
      <div>
        {/* <h1 className="text-3xl text-green-400">Hi</h1> */}
        <div className="flex">
          {items.slice(5 * (currentPage - 1), 5 * currentPage).map((item) => (
            <div key={item.id} className="border">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={2}
          onPageChange={goToPage}
        ></Pagination>
      </div>
    </div>
  );
}

export default App;
