import React from 'react';

const Operation = ({ addTransaction, addDescription, addAmount, description, amount }) => {
    return (
        <section className="operation">
            <h3>Новая операция</h3>
            <form id="form">
                <label>
                    <input 
                        type="text" 
                        className="operation__fields operation__name" 
                        placeholder="Наименование операции"
                        onChange={addDescription}
                        value={description}
                         />
                </label>
                <label>
                    <input 
                        type="number" 
                        className="operation__fields operation__amount" 
                        placeholder="Введите сумму"
                        onChange={addAmount}
                        value={amount}
                         />
                </label>
                <div className="operation__btns">
                    <button
                        onClick={() => addTransaction(false)} //решили, что если расход, то передаем false
                        type="button" 
                        className="operation__btn operation__btn-subtract"
                        > РАСХОД </button>
                    <button
                        onClick={() => addTransaction(true)} //решили, что если доход, то передаем true
                        type="button" 
                        className="operation__btn operation__btn-add"
                        > ДОХОД </button>
                </div>

            </form>
        </section>
    );
}

export default Operation;