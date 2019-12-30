const toTitleFoodName = (string) => {
  return string.toLowerCase()
  .split('')
  .map(s => {
    s.replace(s[0], s[0].toUpperCase)
  }).join(' ')
}

module.exports = toTitleFoodName