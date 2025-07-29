
import { useState } from "react"; 

function DepositForm({ goals, onDeposit }) { 
  const [amount, setAmount] = useState(""); // used to track the deposit amount
  const [selectedGoalId, setSelectedGoalId] = useState(""); // used to track the selected goal for deposit 

  function handleSubmit(e) { 
    e.preventDefault();
    const goal = goals.find((g) => g.id === selectedGoalId); // find the goal by ID
    if (!goal || amount <= 0) return; // validate the goal and amount

    const updatedAmount = goal.savedAmount + parseFloat(amount); //parsefloat to ensure it's a number
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
          {goals.map((goal) => ( // map through goals to create options
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
          onChange={(e) => setAmount(e.target.value)} // update amount state
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
