import { useState, useEffect } from 'react';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // fetch from backend
    fetch('http://localhost:8080/api/transactions')
      .then(response => response.json())
      .then(data => {
        console.log(data);  // print data to the console
        setTransactions(data);  // update 'transactions' state variable
      });
  }, []);  // empty array means "run once when component loads"

    const handleSubmit = (e) => {
        e.preventDefault(); // keep page from reloading

    // Create transaction object
    const newTransaction = {
      amount: parseFloat(amount),
      category: category,
      type: type,
      date: date,
      description: description
    };

  // POST to backend
    fetch('http://localhost:8080/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction)
    })
      .then(response => response.json())
      .then(() => {
        // Refresh the list
        fetch('http://localhost:8080/api/transactions')
          .then(response => response.json())
          .then(data => setTransactions(data));

        // Clear form and hide it
        setAmount('');
        setCategory('');
        setType('');
        setDate('');
        setDescription('');
        setShowForm(false);
      });
    };
  return (
    <div>
      <h1>Transactions</h1>

      {/* if form is hidden, show "add transaction" button
          if not, show "cancel" button
      */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Transaction'}
      </button>

      {/* only show the form if showForm is true */}
      {/* amt, category, date, type, description (optional) */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label for='amount'>Amount:</label>
          <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} id='amount' name="amount" step='0.01' min='0' required/><br/><br/>
          <label for='category'>Category:</label>
          <select id="categories" value={category} onChange={(e) => setCategory(e.target.value)} name="categories" required>
            <option value="HOUSING">Housing</option>
            <option value="UTILITIES">Utilities</option>
            <option value="SALARY">Salary</option>
            <option value="TRANSPORTATION">Transportation</option>
            <option value="ENTERTAINMENT">Entertainment</option>
            <option value="GROCERIES">Groceries</option>
            <option value="INSURANCE">Insurance</option>
            <option value="TOILETRIES">Toiletries</option>
            <option value="SAVINGS">Savings</option>
            <option value="HOUSEHOLD_SUPPLIES">Household Supplies</option>
            <option value="OTHER">Other</option>
          </select><br/><br/>
          <label for='date'>Date:</label>
          <input type='date' value={date} onChange={(e) => setDate(e.target.value)} id='date' name='date' required/><br/><br/>
          <label for='type'>Transaction Type:</label>
          <select id='type' value={type} onChange={(e) => setType(e.target.value)} name='type' required>
            <option value='INCOME'>Income</option>
            <option value='EXPENSE'>Expense</option>
          </select><br/><br/>
          <label for='description'>Description (Optional):</label><br/>
          <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} name='description'></textarea><br/><br/>
          <button type='submit'>Submit</button>
        </form>
      )}

      <ul>
        {transactions.map(transaction => (
        <li key={transaction.id}>
            {transaction.type} - ${transaction.amount} - {transaction.category} - {transaction.description}
        </li>
      ))}
      </ul>
    </div>
  );
}

export default App;
