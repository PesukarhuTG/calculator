import React, { Component } from 'react';
import Total from './components/total/Total';
import History from './components/history/History';
import Operation from './components/operation/Operation';

class App extends Component {

  /* для хранения состояния в текущий момент -  создадим класс */
  state = {
      transactions: JSON.parse(localStorage.getItem('calcMoney')) || [],
      description: '',
      amount: '',
      resultIncome: 0,
      resultExpenses: 0,
      totalBalance: 0,
  }

componentWillMount() {
  this.getTotalBalance();
  }

componentDidUpdate() {
  this.addStorage();
 }

  addTransaction = add => {

    //создадим копию массива с помощью спред оператор
    const transactions = [...this.state.transactions,
    {
       id: `cmr${(+new Date()).toString(16)}`, //быстро генерируем уникальный id
       description: this.state.description,
       amount: parseFloat(this.state.amount),
       add //сюда попадает true / false
    }
  ];

    //и направим его в state
    this.setState({
      transactions,
      description: '', //очищаем поле после ввода
      amount: '',      //очищаем поле после ввода
    }, this.getTotalBalance);
  }
  
  /* описываем методы для передачи в Operation. 
  На входе принимает e=элемент, на ктрм сработало событие.
  ParseFloat - чтобы фиксировать число, а не строку */
  /*addAmount = e => {
    this.setState({ amount: e.target.value});
  }*/

  addAmount = e => {
    let reg = /^[0-9]*(\.|,)?\d{0,2}$/;
    if (reg.test(e.target.value)) {
      this.setState({ amount: parseFloat(e.target.value)});
    } else alert('введите корректное значение вида XXXX,XX')
  }

  addDescription = e => {
    this.setState({ description: e.target.value });
  }

  //ф-ция учета Доходов
  getIncome = () => this.state.transactions
    .reduce((acc, item) => item.add ? item.amount + acc : acc, 0)
      //перебираем все транзакции, фильтруя прибыль (у кого add=true)
      // reduce собирает данные (при этом начальный 0 обязателен) 
  
  //ф-ция учета Расходов
  getExpenses = () =>  this.state.transactions
    .reduce((acc, item) => !item.add ? item.amount + acc : acc, 0)

  //ф-ция итогового подсчета
  getTotalBalance() {
   const resultIncome = this.getIncome().toFixed(2);
   const resultExpenses = this.getExpenses().toFixed(2);

   const totalBalance = (resultIncome - resultExpenses).toFixed(2);
   
   //добавляем полученные результаты в setState
   this.setState({
    resultIncome,
    resultExpenses,
    totalBalance,
   });
  }

  //метод, отправляющий данные в local storage
  addStorage() {
    localStorage.setItem('calcMoney', JSON.stringify(this.state.transactions))
  }

  delTransaction = key => {
    const transactions = this.state.transactions.filter(item => item.id !== key)
    this.setState({ transactions }, this.getTotalBalance)
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
            <Total 
              resultExpenses={this.state.resultExpenses}
              resultIncome={this.state.resultIncome}
              totalBalance={this.state.totalBalance}
              />
            <History 
              transactions={this.state.transactions}
              delTransaction={this.delTransaction}
              />
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
