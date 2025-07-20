
import { useState } from "react";

function DepositForm({ goals, onDeposit }) {
  const [amount, setAmount] = useState("");
  const [selectedGoalId, setSelectedGoalId] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const goal = goals.find((g) => g.id === parseInt(selectedGoalId));
    if (!goal || amount <= 0) return;

    const updatedAmount = goal.savedAmount + parseFloat(amount);
    onDeposit(goal.id, updatedAmount);

    setAmount("");
    setSelectedGoalId("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Make a Deposit</h3>

      <label>
        Choose Goal:
        <select value={selectedGoalId} onChange={(e) => setSelectedGoalId(e.target.value)} required>
          <option value="">--Select--</option>
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.name}
            </option>
          ))}
        </select>
      </label>

      <br />

      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          required
        />
      </label>

      <br />

      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
