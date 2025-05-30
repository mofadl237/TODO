const TodoSkelton = () => {
  return (
    <div
      role="status"
      className="flex items-center justify-between pt-4 animate-pulse dark:divide-gray-700"
    >
      <div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="flex space-x-2">
        <div className="h-9 w-20 bg-gray-300 rounded-md dark:bg-gray-700"></div>
        <div className="h-9 w-20 bg-gray-300 rounded-md dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default TodoSkelton;
