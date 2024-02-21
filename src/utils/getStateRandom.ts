function getRandomState(): string {
  const states = ["active", "forYou", "recommended", "surprise", "defeated"];
  const randomIndex = Math.floor(Math.random() * states.length);
  return states[randomIndex];
}

export default getRandomState;
