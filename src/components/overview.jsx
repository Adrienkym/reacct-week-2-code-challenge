import React from "react"; 

function Overview({ goals }) { 
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completedGoals = goals.filter(g => g.savedAmount >= g.target).length;

  const today = new Date();

  return (
    <div className="overview">
      <h2>Overview</h2>
      <p><strong>Total Goals:</strong> {totalGoals}</p>
      <p><strong>Total Saved:</strong> ${totalSaved.toFixed(2)}</p>
      <p><strong>Goals Completed:</strong> {completedGoals}</p>

      <ul>
        {goals.map(goal => {
          const deadline = new Date(goal.deadline);
          const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
          const isComplete = goal.savedAmount >= goal.target;
          const warning =
            daysLeft < 0 && !isComplete
              ? "Deadline missed!"
              : daysLeft <= 30 && !isComplete
              ? " Deadline approaching"
              : "";

          return (
            <li key={goal.id}>
              <strong>{goal.name}</strong> - {daysLeft} days left {warning && `(${warning})`}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Overview;
