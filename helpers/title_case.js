const toTitleCase = (string) => {
  return string.toLowerCase().split(' ').map(s => {
    return s.replace(s[0], s[0].toUpperCase())
  }).join(' ')
}

module.exports = toTitleCase