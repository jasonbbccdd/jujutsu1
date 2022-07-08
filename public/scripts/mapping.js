/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//  GLOBAL | Colors
const YELLOW_COLOR = '#EEFC57'
const BLACK_COLOR = '#010101'
const RED_COLOR = '#D90368'
const BLUE_COLOR = '#0f4bff'
const CYAN_COLOR = '#00ddff'
const GREEN_COLOR = '#44BBA4'

const RANKING_1 = '<img class="rounded-circle" src="https://i.imgur.com/bkAFWUg.png" style="margin-left: -10px; padding-right: 10px"/>'

const RANKING_2 = '<img class="rounded-circle" src="https://i.imgur.com/lefrmY6.png" style="margin-left: -10px; padding-right: 10px"/>'

const RANKING_3 = '<img class="rounded-circle" src="https://i.imgur.com/DCB0ivD.png" style="margin-left: -10px; padding-right: 10px"/>'

const RANKING_4 = '<img class="rounded-circle" src="https://i.imgur.com/lCVq0Ko.png" style="margin-left: -10px; padding-right: 10px"/>'

const flagURL = 'https://cf.eip.telegraph.co.uk/flags/'
const size1x1 = '1x1/'
const size4x3 = '4x3/'

const semiFinalists = {
  champion: '',
  runnerUp: '',
  thirdPlace: '',
  fourthPlaces: ''
}

//  GLOBAL | Mapping
const stages = {
  32: {},
  16: {
    title: 'Round of 16',
    matches: Array(8).fill(null).map(() => Array(2).fill(null))
  },
  8: {
    title: 'Quarter Finals',
    matches: Array(4).fill(null).map(() => Array(2).fill(null))
  },
  4: {
    title: 'Semi Finals',
    matches: Array(2).fill(null).map(() => Array(2).fill(null))
  },
  third: {
    title: 'Third Place',
    matches: Array(1).fill(null).map(() => Array(2).fill(null))
  },
  champion: {
    title: 'Final',
    matches: Array(1).fill(null).map(() => Array(2).fill(null))
  }
}

const GEN_BRACKETS_ORDER = [16, 8, 4, 'third', 'champion']
const STAGES_MAPPING = {
  32: {
    A1: [0, 0],
    A2: [4, 1],
    B1: [4, 0],
    B2: [0, 1],
    C1: [1, 0],
    C2: [5, 1],
    D1: [5, 0],
    D2: [1, 1],
    E1: [2, 0],
    E2: [6, 1],
    F1: [6, 0],
    F2: [2, 1],
    G1: [3, 0],
    G2: [7, 1],
    H1: [7, 0],
    H2: [3, 1]
  },
  16: {
    toStage: 8,
    mapping: {
      0: [0, 0],
      1: [0, 1],
      2: [1, 0],
      3: [1, 1],
      4: [2, 0],
      5: [2, 1],
      6: [3, 0],
      7: [3, 1]
    }
  },
  8: {
    toStage: 4,
    mapping: {
      0: [0, 0],
      1: [0, 1],
      2: [1, 0],
      3: [1, 1]
    }
  },
  4: {
    toStage: 'champion/third',
    mapping: {
      0: [0, 0],
      1: [0, 1]
    }
  }
}
const bind32 = ($main, $brackets, groups) => {
  $main.on('click', '.group-team', (e) => {
    const $elem = $(e.currentTarget)
    if (!$elem.hasClass('disabled')) {
      $elem.parent().find('.selected').removeClass('selected')
      $elem.addClass('selected')
    }
  })

  $main.on('click', '.group-standing', (e) => {
    const $elem = $(e.currentTarget)
    const $group = $elem.parents('.group')
    const $selected = $group.find('.selected')

    const groupID = $group.data('group-id')
    const teamID = $selected.data('team-id')
    const groupStandingIndex = $elem.data('group-standing-id')

    // eslint-disable-next-line no-var
    var rankingStyleHTML = ''

    const confederationSwitch = (confederation) => ({
      // eslint-disable-next-line quote-props
      'AFC': YELLOW_COLOR,
      // eslint-disable-next-line quote-props
      'CAF': BLACK_COLOR,
      // eslint-disable-next-line quote-props
      'CONMEBOL': RED_COLOR,
      // eslint-disable-next-line quote-props
      'CONCACAF': BLUE_COLOR,
      // eslint-disable-next-line quote-props
      'OFC': CYAN_COLOR,
      // eslint-disable-next-line quote-props
      'UEFA': GREEN_COLOR
    })[confederation]

    // eslint-disable-next-line no-undef
    const isStandingTaken = _.get(stages, `32.${groupID}[${groupStandingIndex}]`, null)

    if (!isStandingTaken && $selected.length > 0) {
      const teamData = groups[groupID][teamID]

      // eslint-disable-next-line no-undef
      _.set(stages, `32.${groupID}[${groupStandingIndex}]`, teamData)
      $elem.html(generate32CardStandingHTML(groupStandingIndex + 1, teamData))

      rankingStyleHTML += `background-color: ${confederationSwitch(teamData.qualification.from)} !important `

      $elem.attr('style', rankingStyleHTML)

      if (teamData.qualification.from === 'AFC') {
        // eslint-disable-next-line quotes
        rankingStyleHTML += `; color: black !important`
        $elem.attr('style', rankingStyleHTML)
      }

      $selected.removeClass('selected').addClass('disabled')
      // $selected.addClass('glow-on-hover')

      if (groupStandingIndex === 0 || groupStandingIndex === 1) {
        const stagesMatchPosition = STAGES_MAPPING[32][`${groupID}${groupStandingIndex + 1}`]
        const matchesIndex = stagesMatchPosition[0]
        const teamIndex = stagesMatchPosition[1]

        _.set(stages, `16.matches[${matchesIndex}][${teamIndex}]`, teamData)
        generateBrackets(GEN_BRACKETS_ORDER, stages, $brackets)
      }
    }
    window.stages = stages
  })

  $main.on('click', '.reset-btn', (e) => {
    const $elem = $(e.currentTarget)
    const $group = $elem.parents('.group')

    const groupID = $group.data('group-id')

    const groupFTeam = _.get(stages, `32.${groupID}[0]`, null)
    const groupSTeam = _.get(stages, `32.${groupID}[1]`, null)

    // reset brackets
    GEN_BRACKETS_ORDER.forEach((bracketID) => {
      stages[bracketID].matches = stages[bracketID].matches.map((match) => match.map((team) => {
        const condition1 = groupFTeam && team?.id === groupFTeam.id
        const condition2 = groupSTeam && team?.id === groupSTeam.id
        if (condition1 || condition2) {
          return null
        }
        return team
      }))
    })

    generateBrackets(GEN_BRACKETS_ORDER, stages, $brackets)

    // reset 32
    _.set(stages, `32.${groupID}`, [])
    $group.replaceWith(generate32CardHTML(groupID, groups[groupID]))
  })
}

const bindBrackets = ($brackets) => {
  $brackets.on('click', '.team', (e) => {
    const $elem = $(e.currentTarget)
    const $match = $elem.parents('.match')
    const $bracket = $elem.parents('.bracket')

    const teamIndex = $elem.data('team-index')
    const matchIndex = $match.data('match-index')
    const bracketID = $bracket.data('bracket-id')

    const winningTeam = _.get(stages, `${bracketID}.matches[${matchIndex}][${teamIndex}]`)
    const losingTeam = _.get(stages, `${bracketID}.matches[${matchIndex}][${teamIndex === 0 ? 1 : 0}]`)

    if (winningTeam && losingTeam) {
      if (bracketID !== 'champion' && bracketID !== 'third') {
        const stageMapping = _.get(STAGES_MAPPING, `${bracketID}`)
        // const toStage = stageMapping.toStage
        const { toStage } = stageMapping
        const [toMatchIndex, toTeamIndex] = _.get(stageMapping, `mapping[${matchIndex}]`)

        const bracketOrderIndex = GEN_BRACKETS_ORDER.indexOf(bracketID)
        GEN_BRACKETS_ORDER.slice(bracketOrderIndex + 1).forEach((otherBracketID) => {
          stages[otherBracketID].matches = stages[otherBracketID].matches.map((match) => match.map((team) => {
            if (team?.id && team?.id === losingTeam?.id) {
              return winningTeam // ! replace subsequent stage with winning team
              // return null // ! reset subsequent stages
            }

            return team
          }))
        })

        if (toStage === 'champion/third') {
          _.set(stages, `third.matches[${toMatchIndex}][${toTeamIndex}]`, losingTeam)
          _.set(stages, `champion.matches[${toMatchIndex}][${toTeamIndex}]`, winningTeam)
        } else {
          _.set(stages, `${toStage}.matches[${toMatchIndex}][${toTeamIndex}]`, winningTeam)
        }

        $(`[data-bracket-id=${bracketID}] [data-team-id=${losingTeam.id}]`).toggleClass('bracket-loser')
        generateBrackets(GEN_BRACKETS_ORDER, stages, $brackets)
      } else {
        // eslint-disable-next-line no-lonely-if
        if (bracketID === 'champion') {
          // championWinner = winningTeam
          semiFinalists.champion = winningTeam.id
          semiFinalists.runnerUp = losingTeam.id
          // $(`[data-bracket-id=${bracketID}] [data-team-id=${winningTeam.id}]`).toggleClass('bracket-loser')
          // $(`[data-bracket-id=${bracketID}] [data-team-id=${losingTeam.id}]`).toggleClass('bracket-loser')
        } else {
          semiFinalists.champion = winningTeam.id
          semiFinalists.runnerUp = losingTeam.id
          // $(`[data-bracket-id=${bracketID}] [data-team-id=${winningTeam.id}]`).toggleClass('bracket-loser')
          // $(`[data-bracket-id=${bracketID}] [data-team-id=${losingTeam.id}]`).toggleClass('bracket-loser')
        }
      }
    }
  })
}
