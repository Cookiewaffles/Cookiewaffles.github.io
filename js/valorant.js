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

    const agentSecretNumbers = document.getElementById("agentSecretNumber");

    const abilityACount = document.getElementById("abilityACount");
    const abilityBCount = document.getElementById("abilityBCount");
    const abilityCCount = document.getElementById("abilityCCount");

    //
    const abilityA1 = document.getElementById("A-1");
    const abilityA2 = document.getElementById("A-2");
    const abilityA3 = document.getElementById("A-3");

    const abilityB1 = document.getElementById("B-1");
    const abilityB2 = document.getElementById("B-2");
    const abilityB3 = document.getElementById("B-3");
    const abilityB4 = document.getElementById("B-4");
    const abilityB5 = document.getElementById("B-5");
    const abilityB6 = document.getElementById("B-6");
    const abilityB7 = document.getElementById("B-7");
    const abilityB8 = document.getElementById("B-8");

    const abilityC1 = document.getElementById("C-1");
    const abilityC2 = document.getElementById("C-2");
    const abilityC3 = document.getElementById("C-3");

    abilityB4.hidden = true;
    abilityB5.hidden = true;
    abilityB6.hidden = true;
    abilityB7.hidden = true;
    abilityB8.hidden = true;


    var roundsLostInARow = 0;
    var currentRound = 1;

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

        agentAbilityChart(agentSelect.value);

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

            currentRound = +currentRound + 1
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
        
        currentRound = +currentRound + 1;
        moneyCurr.value = +moneyCurr.value + 3000;

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

        nextRound(currentRound, roundsLostInARow, moneyCurr.value, "lived", agentSelect.value).then(information => {
            loadoutPrimary.textContent = information[0];
            loadoutPistol.textContent = information[1];
            loadoutShield.textContent = information[2];
            moneySpent.textContent = `- ${information[3]}`;
            moneyPrev.textContent = moneyCurr.value;

            moneyCurr.value = +moneyCurr.value - information[3];
        });

        if(moneyCurr.value >= 9999){
            moneyCurr.value = 9999;
        }
    });
    winDieBTN.addEventListener("click", () => {
        roundsLostInARow = 0;

        currentRound = +currentRound + 1;
        moneyCurr.value = +moneyCurr.value + 3000;

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

        nextRound(currentRound, roundsLostInARow, moneyCurr.value, "died", agentSelect.value).then(information => {
            loadoutPrimary.textContent = information[0];
            loadoutPistol.textContent = information[1];
            loadoutShield.textContent = information[2];
            moneySpent.textContent = `- ${information[3]}`;
            moneyPrev.textContent = moneyCurr.value;

            moneyCurr.value = +moneyCurr.value - information[3];
        });

        if(moneyCurr.value >= 9999){
            moneyCurr.value = 9999;
        }
    });
    loseSurviveBTN.addEventListener("click", () => {
        roundsLostInARow = +roundsLostInARow + 1;

        currentRound = +currentRound + 1;
        moneyCurr.value = +moneyCurr.value + 1000;

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

        nextRound(currentRound, roundsLostInARow, moneyCurr.value, "lived", agentSelect.value).then(information => {
            loadoutPrimary.textContent = information[0];
            loadoutPistol.textContent = information[1];
            loadoutShield.textContent = information[2];
            moneySpent.textContent = `- ${information[3]}`;
            moneyPrev.textContent = moneyCurr.value;

            moneyCurr.value = +moneyCurr.value - information[3];
        });

        if(moneyCurr.value >= 9999){
            moneyCurr.value = 9999;
        }
    });
    loseDieBTN.addEventListener("click", () => {
        roundsLostInARow = +roundsLostInARow + 1;

        currentRound = +currentRound + 1;
        var money = 1900;

        if(roundsLostInARow === 1){
            money = 1900;
        }
        else if(roundsLostInARow === 2) {
            money = 2400;
        }
        else if(roundsLostInARow === 3){
            money = 2900;
        }

        moneyCurr.value = +moneyCurr.value + +money;

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

        nextRound(currentRound, roundsLostInARow, moneyCurr.value, "died", agentSelect.value).then(information => {
            console.log(information);

            loadoutPrimary.textContent = information[0];
            loadoutPistol.textContent = information[1];
            loadoutShield.textContent = information[2];
            moneySpent.textContent = `- ${information[3]}`;
            moneyPrev.textContent = moneyCurr.value;

            moneyCurr.value = moneyCurr.value - information[3];
        });

        if(moneyCurr.value >= 9999){
            moneyCurr.value = 9999;
        }
    });
    killBTN.addEventListener("click", () => {
        currMoney.value = +currMoney.value + 200;

        if(currMoney.value > 9999){currMoney.value = 9999}
    });
    spikeBTN.addEventListener("click", () => {
        currMoney.value = +currMoney.value + 300;
        if(currMoney.value > 9999){currMoney.value = 9999}
    });

    //Ability Count Buttons
    abilityAButton.addEventListener("click", () => {
        if(+abilityACount.textContent > 0){
            if(agentSelect.value === "Astra"){
                agentSecretNumbers.textContent = +agentSecretNumbers.textContent - 1;
            }

            const abilityBox = document.getElementById(`A-${abilityACount.textContent}`);
            abilityBox.src = "../../images/ValorantAbilityIcons/box.png";

            abilityACount.textContent = +abilityACount.textContent - 1;
        }
    });
    abilityBButton.addEventListener("click", () => {
        if(+abilityBCount.textContent > 0){
            if(agentSelect.value === "Astra"){
                agentSecretNumbers.textContent = +agentSecretNumbers.textContent - 1;
            }

            const abilityBox = document.getElementById(`B-${abilityBCount.textContent}`);
            abilityBox.src = "../../images/ValorantAbilityIcons/box.png";

            abilityBCount.textContent = +abilityBCount.textContent - 1;
        }
    });
    abilityCButton.addEventListener("click", () => {
        if(+abilityCCount.textContent > 0){
            if(agentSelect.value === "Astra"){
                agentSecretNumbers.textContent = +agentSecretNumbers.textContent - 1;
            }

            const abilityBox = document.getElementById(`C-${abilityCCount.textContent}`);
            abilityBox.src = "../../images/ValorantAbilityIcons/box.png";

            abilityCCount.textContent = +abilityCCount.textContent - 1;
        }
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

async function nextRound(roundNumber, roundsLostInARow, currMoney, aliveOrDead, agentName){
    //elements
    const agentAddText = document.getElementById("agentAddText");
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


    //Randomize loadout
    if (roundNumber === 1 || (roundNumber === 2 && roundsLostInARow === 1) || roundNumber === 14 || (roundNumber === 15 && roundsLostInARow === 1)){
        //Pistol
        const filteredPistols = PistolList.filter(item => item[1] <= currMoney);
        if(filteredPistols.length > 0){
            const randomPistolNumber = Math.floor(Math.random() * filteredPistols.length);

            currMoney = currMoney - filteredPistols[randomPistolNumber][1];
            moneySpent = moneySpent + filteredPistols[randomPistolNumber][1];
            Pistol = filteredPistols[randomPistolNumber][0];
        }

        //abilities
        abilityMoneySpent = abilityCharges(agentName, currMoney, agentList);
        currMoney = currMoney - +abilityMoneySpent;
        moneySpent = moneySpent + +abilityMoneySpent;

        //Shield
        if(currMoney > 400){
            const filteredShields = ShieldList.filter(item => item[1] <= currMoney);

            if(filteredShields.length > 0){
                const randomShieldNumber = Math.floor(Math.random() * filteredShields.length);
            
                currMoney = currMoney - filteredShields[randomShieldNumber][1];
                moneySpent = moneySpent + filteredShields[randomShieldNumber][1];

                Shield = filteredShields[randomShieldNumber][0];
            }
        }
    }
    else{
        if(currMoney <= 3000){
            
            const buyOrSave = Math.floor(Math.random() * 100) + 1;
            if(buyOrSave <= 44){
                if(aliveOrDead === "died" || roundNumber == 3){
                    //Pistol
                    const filteredPistols = PistolList.filter(item => item[1] <= currMoney);
                    if(filteredPistols.length > 0){
                        const randomPistolNumber = Math.floor(Math.random() * filteredPistols.length);

                        currMoney = currMoney - filteredPistols[randomPistolNumber][1];
                        moneySpent = moneySpent + filteredPistols[randomPistolNumber][1];
                        Pistol = filteredPistols[randomPistolNumber][0];
                    }
                }

                //abilities
                abilityMoneySpent = abilityCharges(agentName, currMoney, agentList);
                currMoney = currMoney - +abilityMoneySpent;
                moneySpent = moneySpent + +abilityMoneySpent;

                //shield
                const filteredShields = ShieldList.filter(item => item[1] <= currMoney);
                if(filteredShields.length > 0){
                    const randomShieldNumber = Math.floor(Math.random() * filteredShields.length);
                
                    currMoney = currMoney - filteredShields[randomShieldNumber][1];
                    moneySpent = moneySpent + filteredShields[randomShieldNumber][1];

                    Shield = filteredShields[randomShieldNumber][0];
                }
            }
            else{
                if(aliveOrDead === "died" || roundNumber == 3){
                    //Primary
                    const filteredPrimary = PrimaryList.filter(item => item[1] <= currMoney);

                    if(filteredPrimary.length > 0){
                        const randomPrimaryNumber = Math.floor(Math.random() * filteredPrimary.length);
                    
                        currMoney = currMoney - filteredPrimary[randomPrimaryNumber][1];
                        moneySpent = moneySpent + filteredPrimary[randomPrimaryNumber][1];
                        Primary = filteredPrimary[randomPrimaryNumber][0];
                    }
                }

                //abilities
                abilityMoneySpent = abilityCharges(agentName, currMoney, agentList);
                currMoney = currMoney - +abilityMoneySpent;
                moneySpent = moneySpent + +abilityMoneySpent;

                //Shield
                const filteredShields = ShieldList.filter(item => item[1] <= currMoney);
                
                if(filteredShields.length > 0){
                    const randomShieldNumber = Math.floor(Math.random() * filteredShields.length);
                
                    currMoney = currMoney - filteredShields[randomShieldNumber][1];
                    moneySpent = moneySpent + filteredShields[randomShieldNumber][1];

                    Shield = filteredShields[randomShieldNumber][0];
                }

                if(aliveOrDead === "died"){
                    //Pistol
                    const filteredPistols = PistolList.filter(item => item[1] <= currMoney);

                    if(filteredPistols.length > 0){
                        const randomPistolNumber = Math.floor(Math.random() * filteredPistols.length);

                        currMoney = currMoney - filteredPistols[randomPistolNumber][1];
                        moneySpent = moneySpent + filteredPistols[randomPistolNumber][1];
                        Pistol = filteredPistols[randomPistolNumber][0];
                    }
                }
            }
        }
        else{
            if(aliveOrDead === "died" || roundNumber == 3){
                //Primary
                PrimaryList = PrimaryList.filter(item => item[1] > 0);

                const filteredPrimary = PrimaryList.filter(item => item[1] <= currMoney);
                
                if(filteredPrimary.length > 0){
                    const randomPrimaryNumber = Math.floor(Math.random() * filteredPrimary.length);
                
                    currMoney = currMoney - filteredPrimary[randomPrimaryNumber][1];
                    moneySpent = moneySpent + filteredPrimary[randomPrimaryNumber][1];
                    Primary = filteredPrimary[randomPrimaryNumber][0];
                }
            }

            //abilities
            abilityMoneySpent = abilityCharges(agentName, currMoney, agentList);
            currMoney = currMoney - +abilityMoneySpent;
            moneySpent = moneySpent + +abilityMoneySpent;
            
            //Shield
            if(currMoney >= 400){
                ShieldList = ShieldList.filter(item => item[1] > 0);
            }

            const filteredShields = ShieldList.filter(item => item[1] <= currMoney);

            if(filteredShields.length > 0){
                const randomShieldNumber = Math.floor(Math.random() * filteredShields.length);
            
                currMoney = currMoney - filteredShields[randomShieldNumber][1];
                moneySpent = moneySpent + filteredShields[randomShieldNumber][1];

                Shield = filteredShields[randomShieldNumber][0];
            }

            if(aliveOrDead === "died"){
                //Pistol
                const filteredPistols = PistolList.filter(item => item[1] <= currMoney);

                if(filteredPistols.length > 0){
                    const randomPistolNumber = Math.floor(Math.random() * filteredPistols.length);

                    currMoney = currMoney - filteredPistols[randomPistolNumber][1];
                    moneySpent = moneySpent + filteredPistols[randomPistolNumber][1];
                    Pistol = filteredPistols[randomPistolNumber][0];
                }
            }
        }
    }

    return [Primary, Pistol, Shield, moneySpent];
}

function agentAbilityChart(agentName){
    const abilityA1 = document.getElementById("A-1");
    const abilityA2 = document.getElementById("A-2");
    const abilityA3 = document.getElementById("A-3");

    const abilityB1 = document.getElementById("B-1");
    const abilityB2 = document.getElementById("B-2");
    const abilityB3 = document.getElementById("B-3");
    const abilityB4 = document.getElementById("B-4");
    const abilityB5 = document.getElementById("B-5");
    const abilityB6 = document.getElementById("B-6");
    const abilityB7 = document.getElementById("B-7");
    const abilityB8 = document.getElementById("B-8");

    const abilityC1 = document.getElementById("C-1");
    const abilityC2 = document.getElementById("C-2");
    const abilityC3 = document.getElementById("C-3");

    switch (agentName) {
        case "Astra":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = false;
            abilityC3.hidden = true;

            break;
        case "Breach":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = false;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;

            break;
        case "Brimstone":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = false;
            abilityC3.hidden = false;
            
            break;
        case "Chamber":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = false;
            abilityB3.hidden = false;
            abilityB4.hidden = false;
            abilityB5.hidden = false;
            abilityB6.hidden = false;
            abilityB7.hidden = false;
            abilityB8.hidden = false;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Clove":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = false;
            abilityC3.hidden = true;
            
            break;
        case "Cypher":
            abilityA1.hidden = false;
            abilityA2.hidden = false;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = false;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Deadlock":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = false;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Fade":
            abilityA1.hidden = false;
            abilityA2.hidden = false;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Gekko":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Harbor":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Hush":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Iso":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Jett":
            abilityA1.hidden = false;
            abilityA2.hidden = false;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Kayo":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = false;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Killjoy":
            abilityA1.hidden = false;
            abilityA2.hidden = false;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Miks":
            abilityA1.hidden = false;
            abilityA2.hidden = false;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = false;
            abilityC3.hidden = true;
            
            break;
        case "Neon":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = false;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Omen":
            abilityA1.hidden = false;
            abilityA2.hidden = false;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = false;
            abilityC3.hidden = true;
            
            break;
        case "Phoenix":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = false;
            abilityC3.hidden = true;
            
            break;
        case "Raze":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = false;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Reyna":
            abilityA1.hidden = false;
            abilityA2.hidden = false;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Sage":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = false;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Skye":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = false;
            abilityC3.hidden = true;
            
            break;
        case "Sova":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = false;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Tejo":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = false;
            abilityC3.hidden = true;
            
            break;
        case "Veto":
            abilityA1.hidden = false;
            abilityA2.hidden = false;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Viper":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Vyse":
            abilityA1.hidden = false;
            abilityA2.hidden = false;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Waylay":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = true;
            abilityC3.hidden = true;
            
            break;
        case "Yoru":
            abilityA1.hidden = false;
            abilityA2.hidden = true;
            abilityA3.hidden = true;

            abilityB1.hidden = false;
            abilityB2.hidden = true;
            abilityB3.hidden = true;
            abilityB4.hidden = true;
            abilityB5.hidden = true;
            abilityB6.hidden = true;
            abilityB7.hidden = true;
            abilityB8.hidden = true;

            abilityC1.hidden = false;
            abilityC2.hidden = false;
            abilityC3.hidden = true;
            
            break;
        default:
    }
}

function abilityCharges(agentName, currMoney, agentList){
    const agentSecretNumber = document.getElementById("agentSecretNumber");
    const abilityACount = document.getElementById("abilityACount");
    const abilityBCount = document.getElementById("abilityBCount");
    const abilityCCount = document.getElementById("abilityCCount");

    const abilityA1 = document.getElementById("A-1");
    const abilityA2 = document.getElementById("A-2");
    const abilityA3 = document.getElementById("A-3");

    const abilityB1 = document.getElementById("B-1");
    const abilityB2 = document.getElementById("B-2");
    const abilityB3 = document.getElementById("B-3");
    const abilityB4 = document.getElementById("B-4");
    const abilityB5 = document.getElementById("B-5");
    const abilityB6 = document.getElementById("B-6");
    const abilityB7 = document.getElementById("B-7");
    const abilityB8 = document.getElementById("B-8");

    const abilityC1 = document.getElementById("C-1");
    const abilityC2 = document.getElementById("C-2");
    const abilityC3 = document.getElementById("C-3");

    var abilityACharges = 0;
    var abilityBCharges = 0;
    var abilityCCharges = 0;
    var moneySpent = 0;

    if(agentName === "Astra"){
        const currentStars = agentSecretNumber.textContent;

        var maxStars = Math.floor(+currMoney / +agentList[0][0]);

        if(maxStars === 0){ maxStars = 1; }
        if(maxStars > 5){ maxStars = 5; }

        maxStars = +maxStars - +currentStars;

        const randomStarNumber = Math.floor(Math.random() * maxStars) + 1;
        currMoney = currMoney - (agentList[0][0] * randomStarNumber);
        moneySpent = +moneySpent + (agentList[0][0] * randomStarNumber)

        agentAddText.textContent = `Buy ${randomStarNumber} additional stars`;
        agentSecretNumber.textContent = +currentStars + +randomStarNumber;

        var number = agentSecretNumber.textContent;

        if(number > 0){
            let upperBound = Math.min(number, agentList[1][1] - abilityACount.textContent);
            
            abilityACharges = Math.floor(Math.random() * upperBound+1);
            
            number = number - abilityACharges;
        }

        if(number > 0){
            let upperBound = Math.min(number, agentList[2][1] - abilityBCount.textContent);
            
            abilityBCharges = Math.floor(Math.random() * upperBound+1);

            number = number - abilityBCharges;
        }

        if(number > 0){
            let upperBound = Math.min(number, agentList[3][1] - abilityCCount.textContent);
            
            abilityCCharges = Math.floor(Math.random() * (upperBound+1));

            number = number - abilityCCharges;
        }

        abilityACount.textContent = +abilityACount.textContent + +abilityACharges;
        abilityBCount.textContent = +abilityBCount.textContent + +abilityBCharges;
        abilityCCount.textContent = +abilityCCount.textContent + +abilityCCharges;

        for(i = 1; i <= +abilityACount.textContent; i++){
            const ability = document.getElementById(`A-${i}`);
            ability.src = "../../images/ValorantAbilityIcons/boxGreen.png";
        }
        for(i = 1; i <= +abilityBCount.textContent; i++){
            const ability = document.getElementById(`B-${i}`);
            ability.src = "../../images/ValorantAbilityIcons/boxGreen.png";
        }
        for(i = 1; i <= +abilityCCount.textContent; i++){
            const ability = document.getElementById(`C-${i}`);
            ability.src = "../../images/ValorantAbilityIcons/boxGreen.png";
        }

    }
    else {
        //charge signature by 1
        if(abilityCCount.textContent === "0"){
            abilityCCount.textContent = 1;
            const ability = document.getElementById(`C-1`);
            ability.src = "../../images/ValorantAbilityIcons/boxGreen.png";
        }

        var upperBound = 0;
        var maxPossible = 0;
        //ability A
        maxPossible = Math.floor(+currMoney/+agentList[0][1]);
        upperBound = Math.min(maxPossible, agentList[0][1] - abilityACount.textContent);

        abilityACharges = Math.floor(Math.random() * (upperBound+1));

        abilityACount.textContent = +abilityACount.textContent + +abilityACharges;
        currMoney = currMoney - (agentList[0][0] * +abilityACharges);
        moneySpent = +moneySpent + (agentList[0][0] * +abilityACharges);
        console.log("Money spent after A: " + moneySpent)

        for(i = 1; i <= +abilityACount.textContent; i++){
            const ability = document.getElementById(`A-${i}`);
            ability.src = "../../images/ValorantAbilityIcons/boxGreen.png";
        }
        //ability B
        maxPossible = Math.floor(+currMoney/+agentList[1][1]);
        upperBound = Math.min(maxPossible, agentList[1][1] - abilityBCount.textContent);

        abilityBCharges = Math.floor(Math.random() * (upperBound+1));

        abilityBCount.textContent = +abilityBCount.textContent + +abilityBCharges;
        currMoney = currMoney - (agentList[1][0] * +abilityBCharges);
        moneySpent = +moneySpent + (agentList[1][0] * +abilityBCharges);
        console.log("Money spent after B: " + moneySpent)

        for(i = 1; i <= +abilityBCount.textContent; i++){
            const ability = document.getElementById(`B-${i}`);
            ability.src = "../../images/ValorantAbilityIcons/boxGreen.png";
        }

        //abilityC
        maxPossible = Math.floor(+currMoney/+agentList[2][1]);
        upperBound = Math.min(maxPossible, agentList[2][1] - abilityCCount.textContent);

        abilityCCharges = Math.floor(Math.random() * (upperBound+1));
        
        abilityCCount.textContent = +abilityCCount.textContent + +abilityCCharges;
        currMoney = currMoney - (agentList[2][0] * +abilityCCharges);
        moneySpent = +moneySpent + (agentList[2][0] * +abilityCCharges);
        console.log("Money spent after C: " + moneySpent)


        for(i = 1; i <= +abilityCCount.textContent; i++){
            const ability = document.getElementById(`C-${i}`);
            ability.src = "../../images/ValorantAbilityIcons/boxGreen.png";
        }
    }

    return moneySpent;
}