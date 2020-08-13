import React, { Component } from 'react';
import Total from './components/total/Total';
import History from './components/history/History';
import Operation from './components/operation/Operation';

class App extends Component {

  /* для хранения состояния в текущий момент -  создадим класс */
  state = {
      transactions: [],
      description: '',
      amount: '',
    }

  addTransaction = add => {

    //создадим копию массива с помощью спред оператор
    const transactions = [...this.state.transactions];
     
    const transaction = {
       id: `cmr${(+new Date).toString(16)}`, //быстро генерируем уникальный id
       description: this.state.description,
       amount: this.state.amount,
       add //сюда попадает true / false
    };

    //теперь можно в копию массива добавить объект, ктр-й создали
    transactions.push(transaction);

    //и направим его в state
    this.setState({
      transactions,
      description: '', //очищаем поле после ввода
      amount: '',
    });
     
  }
  
  /* описываем методы для передачи в Operation. 
  На входе принимает e=элемент, на ктрм сработало событие */
  addAmount = e => {
    this.setState({ amount: e.target.value });
  }

  addDescription = e => {
    this.setState({ description: e.target.value });
  }
  
  render() {
    return (
      <>
        <header>
          <h1>Кошелек</h1>
          <h2>Калькулятор расходов</h2>
        </header>
  
        <main>
          <div className="container">
            <Total />
            <History transactions={this.state.transactions} />
            <Operation 
              addTransaction={this.addTransaction} 
              addAmount={this.addAmount}
              addDescription={this.addDescription}
              description={this.state.description} //передали обратно пустую строку
              amount={this.state.amount}           //передали обратно пустую строку
            />
          </div>
        </main>
      </>
    );
  }
}

export default App;
