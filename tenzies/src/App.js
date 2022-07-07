import React from "react"
import Die from "./Die"
import "./App.css"
import {nanoid} from "nanoid";
import ReactConfetti from "react-confetti";

export default function App() {

    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value === firstValue)

        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won")
        }

    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }


    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice)
        }

    }

    const diceElements = dice.map(die =>
        <Die
            key={die.id}
            isHeld={die.isHeld}
            value={die.value}
            holdDice={() => holdDice(die.id)}
        />)

    // function allNewDice(){
    //     return Array.from({length: 6}, () => Math.ceil(Math.random() * 6))
    // }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    return (
        <main>
            {tenzies && <ReactConfetti/>}
            <div className="dice-container">
                {diceElements}
            </div>
            <button
                onClick={rollDice}
                className={'roll-dice'}>{tenzies ? "New game" : "Roll"}</button>
        </main>
    )
}