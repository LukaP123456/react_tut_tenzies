import React from "react"
import Die from "./Die"
import "./App.css"

export default function App() {

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false
            })
        }
        return newDice
    }

    function rollDice(){
        setDice(allNewDice())
    }

    const [dice, setDice] = React.useState(allNewDice());

    const diceElements = dice.map( die => <Die isHeld = {die.isHeld} value={die.value}/> )

    // function allNewDice(){
    //     return Array.from({length: 6}, () => Math.ceil(Math.random() * 6))
    // }

    return (
        <main>
            <div className="dice-container">
                {diceElements}
            </div>
            <button onClick={rollDice} className={'roll-dice'}>Roll</button>
        </main>
    )
}