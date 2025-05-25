import { useState } from "react";
import ErrorHandler from "../Components/Error/ErrorHandler";
import TodoSkelton from "../Components/TodoSkelton";
import Paginator from "../Components/UI/Paginator";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import { ITodo } from "../interface";

const userDataString = localStorage.getItem("loggedUser");
const userData = userDataString ? JSON.parse(userDataString) : null;

const TodosPage = () => {
  ///****1- state */
  const [pageSize, setPageSize] = useState<number>(10);
  const [sort, setSort] = useState<string>('ASC');
  const [currentPage, setCurrenPage] = useState(1);
  const { isLoading, data, error, isFetching } = useAuthenticatedQuery({
    url: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}&sort=createdAt:${sort}`,
    queryKey: [`todos-page-${currentPage}`, `${pageSize}`,`${sort}`],
    config: { headers: { Authorization: `Bearer ${userData.jwt}` } },
  });
  ///*******2- Handler */
  const onClickNext = () => {
    setCurrenPage((prev) => prev + 1);
  };
  const onClickPrev = () => {
    setCurrenPage((prev) => prev - 1);
  };
  const onChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+e.target.value);
  };
  const onChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };
  ///*****3- Render */
  if (error) return <ErrorHandler />;
  if (isLoading)
    return (
      <div>
        {Array.from({ length: 3 }, (_, i) => (
          <TodoSkelton key={i} />
        ))}
      </div>
    );
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end space-x-2 text-md">
        <select
          className="border-[1px] border-indigo-900 rounded-md py-2 outline-none"
          value={pageSize}
          onChange={onChangePageSize}
        >
          <option disabled>PageSize</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <select
          className="border-[1px] border-indigo-900 rounded-md py-2 outline-none px-2"
          value={sort}
          onChange={onChangeSort}
        >
          <option disabled>Sort</option>
          <option value="asc">Oldest</option>
          <option value="desc">Latest</option>
          
        </select>
      </div>
      {data.data.length ? (
        <>
          {data.data.map((todo: ITodo) => {
            return (
              <div
                key={todo.id}
                className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
              >
                <p className=" w-full font-semibold">
                  {todo.id} - {todo.title}
                </p>
              </div>
            );
          })}
        </>
      ) : (
        <h1 className="bg-gray-800 text-white rounded-md text-center py-3 ">
          No Found Todo Yet!!
        </h1>
      )}

      <Paginator
        total={data.meta.pagination.total}
        pageCount={data.meta.pagination.pageCount}
        isLoading={isLoading || isFetching}
        page={currentPage}
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
      />
    </div>
  );
};

export default TodosPage;
