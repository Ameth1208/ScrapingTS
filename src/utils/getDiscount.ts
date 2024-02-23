function getDiscountRandom(): number {
  return Math.floor(Math.random() * (20 - 5 + 1)) + 5;
}

export default getDiscountRandom;
