document.addEventListener("DOMContentLoaded", () => {
    const agents = ['Astra', 'Breach', 'Brimstone', 'Chamber', 'Clove', 'Cypher', 'Deadlock', 'Fade', 'Gekko', 'Harbor', 'Iso', 'Jett', 'Kayo', 'Killjoy', 'Miks', 'Neon', 'Omen', 'Phoenix', 'Raze', 'Reyna', 'Sage', 'Skye', 'Sova', 'Tejo', 'Veto', 'Viper', 'Vyse', 'Waylay', 'Yoru'];

    const selectElement = document.getElementById('agentSelect');

    agents.forEach(agent => {
        const option = document.createElement('option');

        option.textContent = agent;
        option.value = agent.toLowerCase();
        
        selectElement.appendChild(option);
    });
});