import TodoItem from "./TodoItem";

const TodoItems = ({ todoItems, onDeleteClick, onToggleComplete }) => {
  // Ensure todoItems is always an array
  const items = Array.isArray(todoItems) ? todoItems : [];
  
  // Group items by completion status
  const pendingItems = items.filter((item) => item && !item.completed);
  const completedItems = items.filter((item) => item && item.completed);

  return (
    <div>
      {pendingItems.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Tasks to Do ({pendingItems.length})
          </h2>
          <div className="space-y-3">
            {pendingItems.map((item) => (
              <TodoItem
                key={item.id || item._id} // Use id or _id as fallback
                id={item.id || item._id}
                todoDate={item.dueDate}
                todoName={item.name}
                completed={item.completed}
                onDeleteClick={onDeleteClick}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </div>
        </div>
      )}

      {completedItems.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-500 mb-3">
            Completed Tasks ({completedItems.length})
          </h2>
          <div className="space-y-3">
            {completedItems.map((item) => (
              <TodoItem
                key={item.id || item._id} // Use id or _id as fallback
                id={item.id || item._id}
                todoDate={item.dueDate}
                todoName={item.name}
                completed={item.completed}
                onDeleteClick={onDeleteClick}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </div>
        </div>
      )}

      {items.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No tasks yet. Add your first task above!</p>
        </div>
      )}
    </div>
  );
};

export default TodoItems;