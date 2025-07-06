/** 
 @param {number} multiplier - multiplier value for max value
  @returns {number} Returns random delay in ms in range 0.1s - 1s 
*/
export const getRandomTimeoutMs = (multiplier?: number) => {
  const randomNum = Math.floor(Math.random() * ((multiplier ?? 1) * 1000) + 1);
  const roundToHundredths = Math.ceil(randomNum * 100) / 100;

  return roundToHundredths;
};
