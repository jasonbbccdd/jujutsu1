import Client from '@prisma/client'

const prisma = new Client.PrismaClient()

const genConfederations = async () => {
  const promises = []
  const confederationsList = [
    'UEFA',
    'CONMEBOL',
    'CONCACAF',
    'CAF',
    'AFC',
    'OFC'
  ]

  for (let i = 0; i < confederationsList.length; i += 1) {
    promises.push(prisma.confederation.create({
      data: {
        code: confederationsList[i]
      }
    }))
  }

  await Promise.all(promises)
}

const genTournament = async () => {
  const tournamentData = {
    code: 'WC',
    name: 'World Cup 2022',
    version: new Date('2022-11-21'),
    host: 'Qatar',
    groups: {
      create: [
        {
          code: 'A',
          teamsOnGroups: {
            create: [
              {
                order: 1,
                team: {
                  create: {
                    code3: 'QAT',
                    type: 'national',
                    name: 'Qatar',
                    code2: 'qa',
                    codeNum: '634',
                    confederation: {
                      connect: {
                        code: 'AFC'
                      }
                    }
                  }
                }
              }, {
                order: 2,
                team: {
                  create: {
                    code3: 'ECU',
                    type: 'national',
                    name: 'Ecuador',
                    code2: 'ec',
                    codeNum: '218',
                    confederation: {
                      connect: {
                        code: 'CONMEBOL'
                      }
                    }
                  }
                }
              }, {
                order: 3,
                team: {
                  create: {
                    code3: 'SEN',
                    type: 'national',
                    name: 'Senegal',
                    code2: 'sn',
                    codeNum: '686',
                    confederation: {
                      connect: {
                        code: 'CAF'
                      }
                    }
                  }
                }
              }, {
                order: 4,
                team: {
                  create: {
                    code3: 'NED',
                    type: 'national',
                    name: 'Netherlands',
                    code2: 'nl',
                    codeNum: '528',
                    confederation: {
                      connect: {
                        code: 'UEFA'
                      }
                    }
                  }
                }
              }
            ]
          }
        }, {
          code: 'B',
          teamsOnGroups: {
            create: [
              {
                order: 1,
                team: {
                  create: {
                    code3: 'ENG',
                    type: 'national',
                    name: 'England',
                    code2: 'gb-eng',
                    codeNum: '826',
                    confederation: {
                      connect: {
                        code: 'UEFA'
                      }
                    }
                  }
                }
              }, {
                order: 2,
                team: {
                  create: {
                    code3: 'IRN',
                    type: 'national',
                    name: 'Iran',
                    code2: 'ir',
                    codeNum: '364',
                    confederation: {
                      connect: {
                        code: 'AFC'
                      }
                    }
                  }
                }
              }, {
                order: 3,
                team: {
                  create: {
                    code3: 'USA',
                    type: 'national',
                    name: 'United States',
                    code2: 'us',
                    codeNum: '840',
                    confederation: {
                      connect: {
                        code: 'CONCACAF'
                      }
                    }
                  }
                }
              }, {
                order: 4,
                team: {
                  create: {
                    code3: 'WAL',
                    type: 'national',
                    name: 'Wales',
                    code2: 'gb-wls',
                    codeNum: '840',
                    confederation: {
                      connect: {
                        code: 'UEFA'
                      }
                    }
                  }
                }
              }
            ]
          }
        }, {
          code: 'C',
          teamsOnGroups: {
            create: [
              {
                order: 1,
                team: {
                  create: {
                    code3: 'ARG',
                    type: 'national',
                    name: 'Argentina',
                    code2: 'ar',
                    codeNum: '032',
                    confederation: {
                      connect: {
                        code: 'CONMEBOL'
                      }
                    }
                  }
                }
              }, {
                order: 2,
                team: {
                  create: {
                    code3: 'KSA',
                    type: 'national',
                    name: 'Saudi Arabia',
                    code2: 'sa',
                    codeNum: '682',
                    confederation: {
                      connect: {
                        code: 'AFC'
                      }
                    }
                  }
                }
              }, {
                order: 3,
                team: {
                  create: {
                    code3: 'MEX',
                    type: 'national',
                    name: 'Mexico',
                    code2: 'mx',
                    codeNum: '484',
                    confederation: {
                      connect: {
                        code: 'CONCACAF'
                      }
                    }
                  }
                }
              }, {
                order: 4,
                team: {
                  create: {
                    code3: 'POL',
                    type: 'national',
                    name: 'Poland',
                    code2: 'pl',
                    codeNum: '616',
                    confederation: {
                      connect: {
                        code: 'UEFA'
                      }
                    }
                  }
                }
              }
            ]
          }
        }, {
          code: 'D',
          teamsOnGroups: {
            create: [
              {
                order: 1,
                team: {
                  create: {
                    code3: 'FRA',
                    type: 'national',
                    name: 'France',
                    code2: 'fr',
                    codeNum: '250',
                    confederation: {
                      connect: {
                        code: 'UEFA'
                      }
                    }
                  }
                }
              }, {
                order: 2,
                team: {
                  create: {
                    code3: 'AUS',
                    type: 'national',
                    name: 'Australia',
                    code2: 'au',
                    codeNum: '036',
                    confederation: {
                      connect: {
                        code: 'AFC'
                      }
                    }
                  }
                }
              }, {
                order: 3,
                team: {
                  create: {
                    code3: 'DEN',
                    type: 'national',
                    name: 'Denmark',
                    code2: 'dk',
                    codeNum: '208',
                    confederation: {
                      connect: {
                        code: 'UEFA'
                      }
                    }
                  }
                }
              }, {
                order: 4,
                team: {
                  create: {
                    code3: 'TUN',
                    type: 'national',
                    name: ' Tunisia',
                    code2: 'tn',
                    codeNum: '788',
                    confederation: {
                      connect: {
                        code: 'CAF'
                      }
                    }
                  }
                }
              }
            ]
          }
        }, {
          code: 'E',
          teamsOnGroups: {
            create: [
              {
                order: 1,
                team: {
                  create: {
                    code3: 'ESP',
                    type: 'national',
                    name: 'Spain',
                    code2: 'es',
                    codeNum: '724',
                    confederation: {
                      connect: {
                        code: 'UEFA'
                      }
                    }
                  }
                }
              }, {
                order: 2,
                team: {
                  create: {
                    code3: 'CRC',
                    type: 'national',
                    name: 'Costa Rica',
                    code2: 'cr',
                    codeNum: '188',
                    confederation: {
                      connect: {
                        code: 'CONCACAF'
                      }
                    }
                  }
                }
              }, {
                order: 3,
                team: {
                  create: {
                    code3: 'GER',
                    type: 'national',
                    name: 'Germany',
                    code2: 'de',
                    codeNum: '276',
                    confederation: {
                      connect: {
                        code: 'UEFA'
                      }
                    }
                  }
                }
              }, {
                order: 4,
                team: {
                  create: {
                    code3: 'JPN',
                    type: 'national',
                    name: 'Japan',
                    code2: 'jp',
                    codeNum: '392',
                    confederation: {
                      connect: {
                        code: 'AFC'
                      }
                    }
                  }
                }
              }
            ]
          }
        }, {
          code: 'F',
          teamsOnGroups: {
            create: [
              {
                order: 1,
                team: {
                  create: {
                    code3: 'BEL',
                    type: 'national',
                    name: 'Belgium',
                    code2: 'be',
                    codeNum: '056',
                    confederation: {
                      connect: {
                        code: 'UEFA'
                      }
                    }
                  }
                }
              }, {
                order: 2,
                team: {
                  create: {
                    code3: 'CAN',
                    type: 'national',
                    name: 'Canada',
                    code2: 'ca',
                    codeNum: '124',
                    confederation: {
                      connect: {
                        code: 'CONCACAF'
                      }
                    }
                  }
                }
              }, {
                order: 3,
                team: {
                  create: {
                    code3: 'MAR',
                    type: 'national',
                    name: 'Morocco',
                    code2: 'ma',
                    codeNum: '504',
                    confederation: {
                      connect: {
                        code: 'CAF'
                      }
                    }
                  }
                }
              }, {
                order: 4,
                team: {
                  create: {
                    code3: 'CRO',
                    type: 'national',
                    name: 'Croatia',
                    code2: 'hr',
                    codeNum: '191',
                    confederation: {
                      connect: {
                        code: 'UEFA'
                      }
                    }
                  }
                }
              }
            ]
          }
        }, {
          code: 'G',
          teamsOnGroups: {
            create: [
              {
                order: 1,
                team: {
                  create: {
                    code3: 'BRA',
                    type: 'national',
                    name: 'Brazil',
                    code2: 'br',
                    codeNum: '076',
                    confederation: {
                      connect: {
                        code: 'CONMEBOL'
                      }
                    }
                  }
                }
              }, {
                order: 2,
                team: {
                  create: {
                    code3: 'SRB',
                    type: 'national',
                    name: 'Serbia',
                    code2: 'rs',
                    codeNum: '688',
                    confederation: {
                      connect: {
                        code: 'UEFA'
                      }
                    }
                  }
                }
              }, {
                order: 3,
                team: {
                  create: {
                    code3: 'SUI',
                    type: 'national',
                    name: 'Switzerland',
                    code2: 'ch',
                    codeNum: '756',
                    confederation: {
                      connect: {
                        code: 'UEFA'
                      }
                    }
                  }
                }
              }, {
                order: 4,
                team: {
                  create: {
                    code3: 'CMR',
                    type: 'national',
                    name: 'Cameroon',
                    code2: 'cm',
                    codeNum: '120',
                    confederation: {
                      connect: {
                        code: 'CAF'
                      }
                    }
                  }
                }
              }
            ]
          }
        }, {
          code: 'H',
          teamsOnGroups: {
            create: [
              {
                order: 1,
                team: {
                  create: {
                    code3: 'POR',
                    type: 'national',
                    name: 'Portugal',
                    code2: 'pt',
                    codeNum: '616',
                    confederation: {
                      connect: {
                        code: 'UEFA'
                      }
                    }
                  }
                }
              }, {
                order: 2,
                team: {
                  create: {
                    code3: 'GHA',
                    type: 'national',
                    name: 'Ghana',
                    code2: 'gh',
                    codeNum: '288',
                    confederation: {
                      connect: {
                        code: 'CAF'
                      }
                    }
                  }
                }
              }, {
                order: 3,
                team: {
                  create: {
                    code3: 'URU',
                    type: 'national',
                    name: 'Uruguay',
                    code2: 'uy',
                    codeNum: '858',
                    confederation: {
                      connect: {
                        code: 'CONMEBOL'
                      }
                    }
                  }
                }
              }, {
                order: 4,
                team: {
                  create: {
                    code3: 'KOR',
                    type: 'national',
                    name: 'South Korea',
                    code2: 'kr',
                    codeNum: '410',
                    confederation: {
                      connect: {
                        code: 'AFC'
                      }
                    }
                  }
                }
              }
            ]
          }
        }
      ]
    }
  }

  await prisma.tournament.create({
    data: tournamentData
  })
}

const seed = async () => {
  await genConfederations()
  await genTournament()
}

seed()
