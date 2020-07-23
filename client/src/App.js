import React, { useState, useEffect } from 'react';
import './App.css';
import styled from "styled-components";
import axios from "axios";

const AppBar = styled.nav`
  width: 100%;
  font-size: 17px;
  display: flex;
  align-items: center;
  background: #543534;
  padding: 0 20px;
  color: brown;

  h1 {
    margin-right: 50px;
  }

  a {
    margin: 15px;
    text-decoration: none;
    color: brown;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

  #searchbox {
    background: none;
    border: 1px solid brown;
    padding: 10px;
    font-size: 17px;
    border-radius: 8px;
    margin-left: auto;

    &:focus {
      outline: none;
      border-width: 2px;
      color: brown;
    }
  }
`;

const AccountsTable = styled.table`
  margin: 0 auto;
  width: 500px;
  border-spacing: 0;

  tr:nth-child(even) {
    background-color: #543534;
    color: brown;
  }
  td {
    border: 1px solid black;
    margin: 0;
  }
`;

const formatCurrency = value => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function App() {
  const [accounts, setAccounts] = useState([]);

  const getAccountsData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/accounts");
      console.log(res.data);
      setAccounts(res.data.map(account => {
        return {
          id: account.id,
          name: account.name,
          budget: formatCurrency(account.budget)
        }
      }));
    }
    catch (err) {
      console.log(err.response.data.message)
    }
  }


  return (
    <div className="App">
      <AppBar>
        <h1>DB1 Project</h1>
        <a href = "#">Accounts</a>
        {/* <input id = "searchbox" type = "text" name = "searchInput" placeholder = "Search..." /> */}
      </AppBar>
      <div>
        <h2>Welcome to my React App for my very first SQL Database Project.</h2>
        <p>Though to be honest, I still did not build the database, just used KNEX SQL Queries to request the data...
          Will eventually build my own database, but one step at a time.
        </p>
        
        {accounts.length < 1 && <button onClick = {getAccountsData}>Click Here To Load Accounts</button>}

        {accounts.length > 0 && (
          <AccountsTable>
            <thead>
              <tr>
                {Object.keys(accounts[0]).map(key => <th key = {key}>{key.toUpperCase()}</th>)}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(account => (
                <tr key = {account.id}>
                  {Object.values(account).map(value => <td key = {value}>{value}</td>)}
                  {/* <td>
                    <button>Edit</button>{" "}
                    <button>Delete</button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </AccountsTable>
        )}
      </div>
    </div>
  );
}

export default App;
