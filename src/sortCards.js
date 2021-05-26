const fs = require('fs');

let rawdata = fs.readFileSync('src/features/flash-cards/cards.json');
let allCards = JSON.parse(rawdata);
let sortedCards = {}
let domains = Object.keys(allCards).sort()

domains.forEach(domain => {
    sortedCards[domain] = {}

    let themes = Object.keys(allCards[domain]).sort()
    themes.forEach(theme => {

        let cards = allCards[domain][theme].sort((a, b) => {
            const diff = a.level - b.level
            if (diff === 0) return a.name < b.name ? -1 : 1
            else return diff
        })
        cards = cards.map(({ level, grade, name, ...rest }) => ({
            level,
            grade,
            name,
            ...Object.keys(rest).sort().reduce((acc, current) => {
                acc[current] = rest[current]
                return acc
            }
                , {})

        }))
        sortedCards[domain][theme] = cards
    })
})


let data = JSON.stringify(sortedCards, null, 2);
fs.writeFileSync('sortedCards.json', data);

console.log('cards', sortedCards)

