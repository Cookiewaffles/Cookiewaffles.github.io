document.addEventListener("DOMContentLoaded", () => {
    //Load Drop Downs
    loadAgents();
    loadMaps();

    //All varaibles
    const startBTN = document.getElementById("startBtn");
    const manualRerollBTN = document.getElementById("manualRerollBtn");
    const resetBTN = document.getElementById("resetBtn");

    const agentSelect = document.getElementById("agentSelect");
    const mapSelect = document.getElementById("mapSelect");
    const gameSelect = document.getElementById("gameSelect");

    const loadoutPrimary = document.getElementById("primaryGun").querySelector('p');
    const loadoutPistol = document.getElementById("pistolGun").querySelector('p');
    const loadoutShield = document.getElementById("shield").querySelector('p');

    const abilityA = document.getElementById("abilityA");
    const abilityB = document.getElementById("abilityB");
    const abilityC = document.getElementById("abilityC");

    const winSurviveBTN = document.getElementById("winSurvive");
    const winDieBTN = document.getElementById("winDie");
    const loseSurviveBTN = document.getElementById("loseSurvive");
    const loseDieBTN = document.getElementById("loseDie");
    const killBTN = document.getElementById("kill");
    const spikeBTN = document.getElementById("spike");

    const moneyCurr = document.getElementById("currMoney");
    const moneySpent = document.getElementById("spendMoney");
    const moneyPrev = document.getElementById("prevMoney");

    const stratText = document.getElementById("strategySelection").querySelector('p');
    const secretText = document.getElementById("secretSelection").querySelector('p');

    //Abilities to hide
    const abilityB4 = document.getElementById("B-4");
    const abilityB5 = document.getElementById("B-5");
    const abilityB6 = document.getElementById("B-6");
    const abilityB7 = document.getElementById("B-7");
    const abilityB8 = document.getElementById("B-8");

    abilityB4.hidden = true;
    abilityB5.hidden = true;
    abilityB6.hidden = true;
    abilityB7.hidden = true;
    abilityB8.hidden = true;


    var roundsLostInARow = 0;
    var currentRound = 0;

    //Events
    //Setup Buttons
    startBTN.addEventListener("click", () => {
        if(agentSelect.value === ""){
            console.log("Error: No agent selected")
            return;
        }
        if(mapSelect.value === ""){
            //console.log("Error: No map selected")
            //return;
        }

        startBTN.disabled = true;
        agentSelect.disabled = true;
        mapSelect.disabled = true;

        if(agentSelect.value === "Random"){
            const options = Array.from(agentSelect.options).slice(2);

            const randomNumber = Math.floor(Math.random() * options.length);

            agentSelect.selectedIndex = randomNumber;
        }

        agentSetup(agentSelect.value, abilityA, abilityB, abilityC);
        currentRound = UpdateRoundNumber(currentRound);

        agentAbilityChart(agentSelect.value).then(() => {
            if(agentSelect.value === "Reyna"){
                agentAddText.textContent = "Ability 2 and 3 charges are together. If you have a charge in one, you may use either ability"
            }
            
            nextRound(currentRound, roundsLostInARow, moneyCurr.value, "start", agentSelect.value).then(information => {
                loadoutPrimary.textContent = information[0];
                loadoutPistol.textContent = information[1];
                loadoutShield.textContent = information[2];
                moneySpent.textContent = `- ${information[3]}`;
                moneyPrev.textContent = moneyCurr.value;

                moneyCurr.value = moneyCurr.value - information[3];
            });
        });
    });
    manualRerollBTN.addEventListener("click", () => {
        if(currentRound === 1){
            console.log("Error: Game Not started Yet")
            return;
        }
        currentRound = +currentRound + 1;

        if(currentRound == 14){
            moneyCurr.value = 800;
            roundsLostInARow = 0;

            abilityA1.src = "../../images/ValorantAbilityIcons/box.png";
            abilityA2.src = "../../images/ValorantAbilityIcons/box.png";
            abilityA3.src = "../../images/ValorantAbilityIcons/box.png";

            abilityB1.src = "../../images/ValorantAbilityIcons/box.png"
            abilityB2.src = "../../images/ValorantAbilityIcons/box.png"
            abilityB3.src = "../../images/ValorantAbilityIcons/box.png"
            abilityB4.src = "../../images/ValorantAbilityIcons/box.png"
            abilityB5.src = "../../images/ValorantAbilityIcons/box.png"
            abilityB6.src = "../../images/ValorantAbilityIcons/box.png"
            abilityB7.src = "../../images/ValorantAbilityIcons/box.png"
            abilityB8.src = "../../images/ValorantAbilityIcons/box.png"

            abilityC1.src = "../../images/ValorantAbilityIcons/box.png";
            abilityC2.src = "../../images/ValorantAbilityIcons/box.png";
            abilityC3.src = "../../images/ValorantAbilityIcons/box.png";

            abilityACount.textContent = "0";
            abilityBCount.textContent = "0";
            abilityCCount.textContent = "0";
        }

        if(agentSelect.value === "Random"){
            const options = Array.from(agentSelect.options).slice(2);

            const randomNumber = Math.floor(Math.random() * options.length);

            agentSelect.selectedIndex = randomNumber;
        }

        agentSetup(agentSelect.value, abilityA, abilityB, abilityC);
        
        nextRound(currentRound, roundsLostInARow, moneyCurr.value, "start", agentSelect.value).then(information => {
            loadoutPrimary.textContent = information[0];
            loadoutPistol.textContent = information[1];
            loadoutShield.textContent = information[2];
            moneySpent.textContent = `- ${information[3]}`;
            moneyPrev.textContent = moneyCurr.value;

            moneyCurr.value = moneyCurr.value - information[3];
        });
    });
    resetBTN.addEventListener("click", () => {
        window.location.reload();
    });

    //Result Button
    winSurviveBTN.addEventListener("click", () => {
        roundsLostInARow = 0;
        
        currentRound = UpdateRoundNumber(currentRound);
        moneyCurr.value = UpdateMoney(moneyCurr.value, gameSelect.value, currentRound, roundsLostInARow, "win", "live");

        if(currentRound == 13){
            moneyCurr.value = 800;
            roundsLostInARow = 0;

            abilityReset();
        }

        nextRound(currentRound, roundsLostInARow, moneyCurr.value, "lived", agentSelect.value).then(information => {
            loadoutPrimary.textContent = information[0];
            loadoutPistol.textContent = information[1];
            loadoutShield.textContent = information[2];
            moneySpent.textContent = `- ${information[3]}`;
            moneyPrev.textContent = moneyCurr.value;

            moneyCurr.value = +moneyCurr.value - information[3];
        });
    });
    winDieBTN.addEventListener("click", () => {
        roundsLostInARow = 0;

        currentRound = UpdateRoundNumber(currentRound);
        moneyCurr.value = UpdateMoney(moneyCurr.value, gameSelect.value, currentRound, roundsLostInARow, "win", "died");

        if(currentRound == 13){
            moneyCurr.value = 800;
            roundsLostInARow = 0;

            abilityReset();
        }

        nextRound(currentRound, roundsLostInARow, moneyCurr.value, "died", agentSelect.value).then(information => {
            loadoutPrimary.textContent = information[0];
            loadoutPistol.textContent = information[1];
            loadoutShield.textContent = information[2];
            moneySpent.textContent = `- ${information[3]}`;
            moneyPrev.textContent = moneyCurr.value;

            moneyCurr.value = +moneyCurr.value - information[3];
        });
    });
    loseSurviveBTN.addEventListener("click", () => {
        roundsLostInARow = +roundsLostInARow + 1;

        currentRound = UpdateRoundNumber(currentRound);
        moneyCurr.value = UpdateMoney(moneyCurr.value, gameSelect.value, currentRound, roundsLostInARow, "lost", "live");

        if(currentRound == 13){
            moneyCurr.value = 800;
            roundsLostInARow = 0;

            abilityReset();
        }

        nextRound(currentRound, roundsLostInARow, moneyCurr.value, "lived", agentSelect.value).then(information => {
            loadoutPrimary.textContent = information[0];
            loadoutPistol.textContent = information[1];
            loadoutShield.textContent = information[2];
            moneySpent.textContent = `- ${information[3]}`;
            moneyPrev.textContent = moneyCurr.value;

            moneyCurr.value = +moneyCurr.value - information[3];
        });
    });
    loseDieBTN.addEventListener("click", () => {
        roundsLostInARow = +roundsLostInARow + 1;

        currentRound = UpdateRoundNumber(currentRound);
        moneyCurr.value = UpdateMoney(moneyCurr.value, gameSelect.value, currentRound, roundsLostInARow, "lost", "died");

        if(currentRound == 13){
            moneyCurr.value = 800;
            roundsLostInARow = 0;

            abilityReset();
        }

        nextRound(currentRound, roundsLostInARow, moneyCurr.value, "died", agentSelect.value).then(information => {
            console.log(information);

            loadoutPrimary.textContent = information[0];
            loadoutPistol.textContent = information[1];
            loadoutShield.textContent = information[2];
            moneySpent.textContent = `- ${information[3]}`;
            moneyPrev.textContent = moneyCurr.value;

            moneyCurr.value = moneyCurr.value - information[3];
        });
    });
    killBTN.addEventListener("click", () => {
        currMoney.value = +currMoney.value + 200;

        if(currMoney.value > 9000){currMoney.value = 9000}
    });
    spikeBTN.addEventListener("click", () => {
        currMoney.value = +currMoney.value + 300;
        if(currMoney.value > 9000){currMoney.value = 9000}
    });

    //Ability Count Buttons
    abilityAButton.addEventListener("click", () => {
        abilityUsed("A");
    });
    abilityBButton.addEventListener("click", () => {
        abilityUsed("B");
    });
    abilityCButton.addEventListener("click", () => {
        abilityUsed("C");
    });
});

/*Functions*/
async function loadAgents() {
    try {
        const selectAgentElement = document.getElementById('agentSelect');

        // Path to your text file inside a local directory
        const response = await fetch('./../../files/ValAgents/Info/agents.txt');
        const text = await response.text();

        // Split text by whitespace into an array of words
        const agentText = text.replaceAll(',', '');

        const agents = agentText.trim().split(/\s+/);

        agents.forEach(agent => {
            const option = document.createElement('option');

            option.textContent = agent;
            option.value = agent;
            
            selectAgentElement.appendChild(option);
        });
    } catch (error) {
        console.error('Failed to load file:', error);
    }
}

async function loadMaps() {
    try {
        const selectMapElement = document.getElementById('mapSelect');

        // Path to your text file inside a local directory
        const response = await fetch('./../../files/ValAgents/Info/maps.txt');
        const text = await response.text();

        // Split text by whitespace into an array of words
        const mapText = text.replaceAll(',', '');

        const maps = mapText.trim().split(/\s+/);

        maps.forEach(map => {
            const option = document.createElement('option');

            option.textContent = map;
            option.value = map.toLowerCase();
            
            selectMapElement.appendChild(option);
        });
    } catch (error) {
        console.error('Failed to load file:', error);
    }
}

function agentSetup(agent, abilityA, abilityB, abilityC) {
    if(agent === "Cypher"){
        agent = "CypherA";
    }

    abilityA.src = `../../images/ValorantAbilityIcons/${agent}/A.png`;
    abilityB.src = `../../images/ValorantAbilityIcons/${agent}/B.png`;
    abilityC.src = `../../images/ValorantAbilityIcons/${agent}/C.png`;
}

function abilityReset(){
    const abilityACount = document.getElementById("abilityACount");
    const abilityBCount = document.getElementById("abilityBCount");
    const abilityCCount = document.getElementById("abilityCCount");

    abilityACount.textContent = "0";
    abilityBCount.textContent = "0";
    abilityCCount.textContent = "0";

    //abiltiy A
    for(i = 1; i < 4; i++){
        document.getElementById(`A-${i}`).src = "../../images/ValorantAbilityIcons/box.png";
    }

    // //abiltiy B
    for(i = 1; i < 9; i++){
        document.getElementById(`B-${i}`).src = "../../images/ValorantAbilityIcons/box.png";
    }


    // //abiltiy C
    for(i = 1; i < 3; i++){
        if(i === 1){
            document.getElementById(`C-${i}`).src = "../../images/ValorantAbilityIcons/boxGreen.png";
        }else{
            document.getElementById(`C-${i}`).src = "../../images/ValorantAbilityIcons/box.png";
        } 
    }

    return;
}

function abilityUsed(abilityUsed){
    var abilityCount;
    const agentSecretNumbers = document.getElementById('agentSecretNumber');

    //select correct text area
    if(abilityUsed === "A"){
        abilityCount = document.getElementById('abilityACount');
    }
    if(abilityUsed === "B"){
        abilityCount = document.getElementById('abilityBCount');
    }
    else if(abilityUsed === "C"){
        abilityCount = document.getElementById('abilityCCount');
    }else{
        return;
    }

    //update ability text
    if(+abilityCount.textContent > 0){
        if(agentSelect.value === "Astra"){
            agentSecretNumbers.textContent = +agentSecretNumbers.textContent - 1;
        }

        const abilityBox = document.getElementById(`${abilityUsed}-${abilityCount.textContent}`);
        abilityBox.src = "../../images/ValorantAbilityIcons/box.png";

        abilityCount.textContent = +abilityCount.textContent - 1;
    }
}

function UpdateRoundNumber(roundNumber){
    const roundNumberText = document.getElementById('roundNumber');

    roundNumber = roundNumber + 1;
    roundNumberText.textContent = roundNumber;

    return roundNumber;
}

function UpdateMoney(moneyValue, gameMode, roundNumber, roundsLostInARow, winLose, liveDie){
    var money = 0;

    if(gameMode === "normal"){
        if(winLose == "win" && liveDie ==  "live"){
            money = 3000;
        }
        else if(winLose == "win" && liveDie ==  "died"){
            money = 3000;
        }
        else if(winLose == "lost" && liveDie ==  "live"){
            money = 1000;
        }
        else if(winLose == "lost" && liveDie ==  "died"){
            if(roundsLostInARow === 1){
                money = 1900;
            }
            else if(roundsLostInARow === 2) {
                money = 2400;
            }
            else if(roundsLostInARow === 3){
                money = 2900;
            }
        }

        //Calculate new total
        moneyValue = +moneyValue + +money;
    }
    else if(gameMode === "swift"){
        moneyValue = +moneyValue + 3000;

        if(roundNumber == 1){
            moneyValue = 800;
        }
        else if(roundNumber == 2){
            if(winLose === "win"){
                moneyValue = +moneyValue + 3000;
            }else{
                moneyValue = +moneyValue + 2400;
            }
        }
        else if(roundNumber == 3){
            moneyValue = +moneyValue + 4250;
        }
        else if(roundNumber == 4){
            moneyValue = +moneyValue + 4250;
        }
        else if(roundNumber == 5){
            moneyValue = 5000;
        }
    }
    else{
        moneyValue = +moneyValue + 3000;
    }

    if(moneyValue > 9000){
        moneyValue = 9000;
    }

    return moneyValue;
}

async function nextRound(roundNumber, roundsLostInARow, currMoney, aliveOrDead, agentName){
    //elements
    const primaryText = document.querySelector("#primaryGun p");
    const PistolText = document.querySelector("#pistolGun p");
    const ShieldText = document.querySelector("#shield p");

    //Result Variables
    var Primary = primaryText.textContent;
    var Pistol = PistolText.textContent;
    var Shield = ShieldText.textContent;
    var moneySpent = 0;
    var abilityMoneySpent = 0;
    //Set Money
    currMoney = +currMoney;

    console.log(roundNumber);

    //Grab Lists
    const PistolResponse =  await fetch('./../../files/ValAgents/Info/Pistols.txt');
    const PistolsContent = await PistolResponse.text();
    const PistolsLines = PistolsContent.split(/\r?\n/);

    const PrimaryResponse =  await fetch('./../../files/ValAgents/Info/Primary.txt');
    const PrimaryContent = await PrimaryResponse.text();
    const PrimaryLines = PrimaryContent.split(/\r?\n/);

    const ShieldResponse =  await fetch('./../../files/ValAgents/Info/Shields.txt');
    const ShieldContent = await ShieldResponse.text();
    const ShieldLines = ShieldContent.split(/\r?\n/);
 
    var PistolList = PistolsLines
    .map(line => line.trim())
    .filter(line => line.length > 0) // Skip empty lines
    .map(line => {
        // Split by comma (change delimiter if your file uses spaces or tabs)
        const [strPart, numPart] = line.split(','); 
        
        return [strPart.trim(), parseInt(numPart.trim(), 10)];
    });

    var PrimaryList = PrimaryLines
    .map(line => line.trim())
    .filter(line => line.length > 0) // Skip empty lines
    .map(line => {
        // Split by comma (change delimiter if your file uses spaces or tabs)
        const [strPart, numPart] = line.split(','); 
        
        return [strPart.trim(), parseInt(numPart.trim(), 10)];
    });

    var ShieldList = ShieldLines
    .map(line => line.trim())
    .filter(line => line.length > 0) // Skip empty lines
    .map(line => {
        // Split by comma (change delimiter if your file uses spaces or tabs)
        const [strPart, numPart] = line.split(','); 
        
        return [strPart.trim(), parseInt(numPart.trim(), 10)];
    });

    if(agentName === "Cypher"){ agentName = agentName + "A"; }
    const agentResponse =  await fetch(`./../../files/ValAgents/${agentName}/ability.txt`);
    const agentContent = await agentResponse.text();
    const agentLines = agentContent.split(/\r?\n/);

    var agentList = agentLines
    .map(line => line.trim())
    .filter(line => line.length > 0) // Skip empty lines
    .map(line => {
        // Split by comma (change delimiter if your file uses spaces or tabs)
        const [strPart, numPart] = line.split(','); 
        
        return [strPart.trim(), parseInt(numPart.trim(), 10)];
    });

    return [Primary, Pistol, Shield, moneySpent];
}

async function agentAbilityChart(agentName){
    if(agentName == "Cypher"){agentName = agentName + "A";}

    const response =  await fetch(`./../../files/ValAgents/${agentName}/ability.txt`);
    const content = await response.text();
    const lines = content.split(/\r?\n/);

    var agentAbilityList = lines
    .map(line => line.trim())
    .filter(line => line.length > 0) // Skip empty lines
    .map(line => {
        // Split by comma (change delimiter if your file uses spaces or tabs)
        const [strPart, numPart] = line.split(','); 
        
        return [strPart.trim(), parseInt(numPart.trim(), 10)];
    });

    if(agentName == "Astra"){
        agentAbilityList.shift();
    }

    //abiltiy A
    for(i = 0; i < 3; i++){
        if(i < agentAbilityList[0][1]){
            document.getElementById(`A-${i+1}`).hidden = false;
        }else{
            document.getElementById(`A-${i+1}`).hidden = true;
        } 
    }
    
    //abiltiy B
    for(i = 0; i < 8; i++){
        if(i < agentAbilityList[1][1]){
            document.getElementById(`B-${i+1}`).hidden = false;
        }else{
            document.getElementById(`B-${i+1}`).hidden = true;
        } 
    }

    //abiltiy C
    for(i = 0; i < 3; i++){
        if(i < agentAbilityList[2][1]){
            document.getElementById(`C-${i+1}`).hidden = false;
        }else{
            document.getElementById(`C-${i+1}`).hidden = true;
        } 
    }
}

function abilityCharges(agentName, currMoney, agentList){
    const agentSecretNumber = document.getElementById("agentSecretNumber");
    const abilityACount = document.getElementById("abilityACount");
    const abilityBCount = document.getElementById("abilityBCount");
    const abilityCCount = document.getElementById("abilityCCount");

    var abilityACharges = 0;
    var abilityBCharges = 0;
    var abilityCCharges = 0;
    var moneySpent = 0;

    if(agentName === "Astra"){
        // const currentStars = agentSecretNumber.textContent;

        // var maxStars = Math.floor(+currMoney / +agentList[0][0]);

        // if(maxStars === 0){ maxStars = 1; }
        // if(maxStars > 5){ maxStars = 5; }

        // maxStars = +maxStars - +currentStars;

        // const randomStarNumber = Math.floor(Math.random() * maxStars) + 1;
        // currMoney = currMoney - (agentList[0][0] * randomStarNumber);
        // moneySpent = +moneySpent + (agentList[0][0] * randomStarNumber)

        // agentAddText.textContent = `Buy ${randomStarNumber} additional stars`;
        // agentSecretNumber.textContent = +currentStars + +randomStarNumber;

        // var number = agentSecretNumber.textContent;

        // if(number > 0){
        //     let upperBound = Math.min(number, agentList[1][1] - abilityACount.textContent);
            
        //     abilityACharges = Math.floor(Math.random() * upperBound+1);
            
        //     number = number - abilityACharges;
        // }

        // if(number > 0){
        //     let upperBound = Math.min(number, agentList[2][1] - abilityBCount.textContent);
            
        //     abilityBCharges = Math.floor(Math.random() * upperBound+1);

        //     number = number - abilityBCharges;
        // }

        // if(number > 0){
        //     let upperBound = Math.min(number, agentList[3][1] - abilityCCount.textContent);
            
        //     abilityCCharges = Math.floor(Math.random() * (upperBound+1));

        //     number = number - abilityCCharges;
        // }

        // abilityACount.textContent = +abilityACount.textContent + +abilityACharges;
        // abilityBCount.textContent = +abilityBCount.textContent + +abilityBCharges;
        // abilityCCount.textContent = +abilityCCount.textContent + +abilityCCharges;

        // for(i = 1; i <= +abilityACount.textContent; i++){
        //     const ability = document.getElementById(`A-${i}`);
        //     ability.src = "../../images/ValorantAbilityIcons/boxGreen.png";
        // }
        // for(i = 1; i <= +abilityBCount.textContent; i++){
        //     const ability = document.getElementById(`B-${i}`);
        //     ability.src = "../../images/ValorantAbilityIcons/boxGreen.png";
        // }
        // for(i = 1; i <= +abilityCCount.textContent; i++){
        //     const ability = document.getElementById(`C-${i}`);
        //     ability.src = "../../images/ValorantAbilityIcons/boxGreen.png";
        // }
    }
    else {
       
    }

    return moneySpent;
}