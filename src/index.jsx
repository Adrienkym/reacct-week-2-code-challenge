import { useState, useEffect } from "react";
import GoalForm from "./components/goalform"
import DepositForm from "./components/depositform"
import Overview from "./components/overview";


function App() {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/goals")
      .then((res) => res.json())
      .then(setGoals);
  }, []);

  function handleAddGoal(newGoal) {
    setGoals([...goals, newGoal]);
  }

  function handleEditGoal(goal) {
    setEditingGoal(goal);
  }

  function handleUpdateGoal(updatedGoal) {
    setGoals((goals) =>
      goals.map((g) => (g.id === updatedGoal.id ? updatedGoal : g))
    );
    setEditingGoal(null);
  }

  function handleDeleteGoal(id) {
    fetch(`http://localhost:3000/goals/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setGoals((prevGoals) => prevGoals.filter((g) => g.id !== id));
      });
  }
  function handleDeposit(goalId, newSavedAmount) {
  fetch(`http://localhost:3000/goals/${goalId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ savedAmount: newSavedAmount }),
  })
    .then((res) => res.json())
    .then((updatedGoal) => {
      setGoals((prevGoals) =>
        prevGoals.map((g) => (g.id === goalId ? updatedGoal : g))
      );
    });
}


  return (
    <div>
      <h1>SMART Goal Planner</h1>

      {editingGoal ? (
        <GoalForm
          onAddGoal={handleUpdateGoal}
          initialData={editingGoal}
          isEditing={true}
        />
      ) : ( 

        <GoalForm onAddGoal={handleAddGoal} />
      )}
      <Overview goals={goals} />

      <DepositForm goals={goals} onDeposit={handleDeposit} />
  <ul>
  {goals.map((goal) => {
    const progressPercent = (goal.savedAmount / goal.target) * 100;
    const remaining = goal.target - goal.savedAmount;

    return (
      <li key={goal.id} style={{ marginBottom: "2rem" }}>
        <h3>{goal.name}</h3>
        <p>Category: {goal.category}</p>
        <p>Deadline: {goal.deadline}</p>
        <p>
           ${goal.savedAmount} saved of ${goal.target}
        </p>
        <p> Remaining: ${remaining}</p>

        <div style={{
          background: "#eee",
          height: "20px",
          borderRadius: "10px",
          overflow: "hidden",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "0.5rem"
        }}>
          <div
            style={{
              height: "100%",
              width: `${Math.min(progressPercent, 100)}%`,
              backgroundColor: "#4caf50",
              transition: "width 0.3s"
            }}
          />
        </div>

        <button onClick={() => handleEditGoal(goal)}>Edit</button>{" "}
        <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
      </li>
    );
  })}
</ul>

    </div>
  );
}
export default App;