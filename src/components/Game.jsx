import React, { useState } from "react";
import Entity from "./Entity";
import GameOver from "./GameOver";
import Log from "./Log";

// ----------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------------------------------------

// Generate a random values in the range {min, max}
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Create an attack log
function createLogAttack(isPlayer, damage) {
  return {
    isPlayer: isPlayer,
    isDamage: true,
    text: ` takes ${damage} damages`,
    value: damage,
  };
}

// Create a healing log
function createLogHeal(healing) {
  return {
    isPlayer: true,
    isDamage: false,
    text: ` heal ${healing} life points`,
    value: healing,
  };
}

function Game() {
  // ----------------------------------------------------------------------------------------------------------
  // STATES & VARIABLES
  // ----------------------------------------------------------------------------------------------------------

  const [playerHeath,setPleayerHeath] = useState(100);
  const [monsterHeath,setMonsterheath] = useState(100);
  const [logs, setLogs] = useState([]);
  const [turn, setTurn] = useState(1);

  function addLog(newLog) {
    setLogs((prev) => [newLog, ...prev]);
  }
  // ----------------------------------------------------------------------------------------------------------
  // BUTTONS EVENT FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------
  function attackHandler() {
    const playerDamge = getRandomValue(5, 12);
    const monsterDamage = getRandomValue(8, 15);

    setMonsterheath((prev) => Math.max(prev - playerDamge, 0));
    setPleayerHeath((prev) => Math.max(prev - monsterDamage, 0));

    addLog(createLogAttack(true, playerDamge));
    addLog(createLogAttack(false, monsterDamage));
    
    setTurn((prev) => prev + 1);
    
  }

  function healHandler(){
    const heal = getRandomValue(8, 12);
    const monsterDamage = getRandomValue(8, 15);

    setPleayerHeath((prev) =>
      Math.max(Math.min(prev + heal, 100) - monsterDamage, 0)
    );

    addLog(createLogHeal(heal));
    addLog(createLogAttack(false, monsterDamage));

    setTurn((prev) => prev + 1);
  }

  function specialAttackHandler() {
    
    const damage = getRandomValue(8, 25);
    const monsterDamge = getRandomValue(8, 15);

    setMonsterheath((prev) => Math.max(prev - damage, 0));
    setPleayerHeath((prev) => Math.max(prev - monsterDamge, 0));

    addLog(createLogAttack(true, damage));
    addLog(createLogAttack(false, monsterDamge));

    setTurn((prev) => prev + 1);
  }
  // ----------------------------------------------------------------------------------------------------------
  // JSX FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------
  function surrenderHandler() {
    setPleayerHeath(0);
  }
  
  function restartGame() {
    setPleayerHeath(100);
    setMonsterheath(100);
    setLogs([]);
    setTurn(1);
  }

  let gameOver = false;
  let result = "";
  
  if (playerHeath <= 0 && monsterHeath <= 0) {
    gameOver = true;
    result = "Draw!"
  }else if (playerHeath <= 0) {
    gameOver = true;
    result = "Monster has won!"
  }else if (monsterHeath <= 0) {
    gameOver = true;
    result = "Player has won!"
  }
  // ----------------------------------------------------------------------------------------------------------
  // MAIN  TEMPLATE
  // ----------------------------------------------------------------------------------------------------------
  return (<>
  <Entity enName={"Your Heath"} per={playerHeath} />
  <Entity enName={"Monster Heath"} per={monsterHeath} />

  {!gameOver && (
    <section id="controls">
      <button onClick={attackHandler}>ATTACK</button>
      <button onClick={specialAttackHandler} disabled={turn % 3 !== 0} >SPECIAL !</button>
      <button onClick={healHandler}>HEAL</button>
      <button onClick={surrenderHandler}>KILL YOURSELF</button>
    </section>
  )}

  {gameOver && (
    <GameOver title={result} restartGame={restartGame} />
  )}

  <Log log ={logs}/>
  </>
  );
}

export default Game;
