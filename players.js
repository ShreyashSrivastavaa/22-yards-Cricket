const players = [
  {
    "id": "rohit-sharma",
    "name": "Rohit Sharma",
    "shortName": "Sharma",
    "ipl2026Team": "MI",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 16.3,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 19.56
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "surya-kumar-yadav",
    "name": "Surya Kumar Yadav",
    "shortName": "Yadav",
    "ipl2026Team": "MI",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 16.3,
    "age": 28,
    "analytics": {
      "overallRating": 96,
      "impactScore": 98,
      "archetype": "360 Genius",
      "scoutVerdict": "World-class manipulator of fields. 717 runs at a blistering 167 SR in 2025.",
      "peerRank": 0,
      "auctionCeiling": 19.56
    },
    "batting": {
      "ipl2025": {
        "runs": 717,
        "avg": 65.2,
        "sr": 167.9,
        "powerplaySR": 145,
        "middleOversSR": 162,
        "deathOversSR": 210
      },
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "hardik-pandya",
    "name": "Hardik Pandya",
    "shortName": "Pandya",
    "ipl2026Team": "MI",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 16.3,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 19.56
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "jasprit-bumrah",
    "name": "Jasprit Bumrah",
    "shortName": "Bumrah",
    "ipl2026Team": "MI",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 18.0,
    "age": 28,
    "analytics": {
      "overallRating": 98,
      "impactScore": 99,
      "archetype": "X-Factor Pace",
      "scoutVerdict": "Total control in all phases. Lowest economy rate across Powerplay and Death in 2025.",
      "peerRank": 0,
      "auctionCeiling": 21.599999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {
        "wickets": 18,
        "avg": 15.5,
        "econ": 6.4
      }
    }
  },
  {
    "id": "n-tilak-varma",
    "name": "N. Tilak Varma",
    "shortName": "Varma",
    "ipl2026Team": "MI",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 8.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 9.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "quinton-de-kock",
    "name": "Quinton de Kock",
    "shortName": "Kock",
    "ipl2026Team": "MI",
    "role": "WK-Batter",
    "nationality": "Overseas",
    "ipl2026Price": 12.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 14.399999999999999
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "trent-boult",
    "name": "Trent Boult",
    "shortName": "Boult",
    "ipl2026Team": "MI",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 10.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 12.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "will-jacks",
    "name": "Will Jacks",
    "shortName": "Jacks",
    "ipl2026Team": "MI",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 8.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 9.839999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "deepak-chahar",
    "name": "Deepak Chahar",
    "shortName": "Chahar",
    "ipl2026Team": "MI",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 9.25,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 11.1
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "mitchell-santner",
    "name": "Mitchell Santner",
    "shortName": "Santner",
    "ipl2026Team": "MI",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "sherfane-rutherford",
    "name": "Sherfane Rutherford",
    "shortName": "Rutherford",
    "ipl2026Team": "MI",
    "role": "Batter",
    "nationality": "Overseas",
    "ipl2026Price": 1.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.7999999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "ryan-rickelton",
    "name": "Ryan Rickelton",
    "shortName": "Rickelton",
    "ipl2026Team": "MI",
    "role": "WK-Batter",
    "nationality": "Overseas",
    "ipl2026Price": 1.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.2
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "robin-minz",
    "name": "Robin Minz",
    "shortName": "Minz",
    "ipl2026Team": "MI",
    "role": "WK-Batter",
    "nationality": "Indian",
    "ipl2026Price": 3.6,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 4.32
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "mayank-markande",
    "name": "Mayank Markande",
    "shortName": "Markande",
    "ipl2026Team": "MI",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "naman-dhir",
    "name": "Naman Dhir",
    "shortName": "Dhir",
    "ipl2026Team": "MI",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "shardul-thakur",
    "name": "Shardul Thakur",
    "shortName": "Thakur",
    "ipl2026Team": "MI",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 4.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 4.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "raj-angad-bawa",
    "name": "Raj Angad Bawa",
    "shortName": "Bawa",
    "ipl2026Team": "MI",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "atharva-ankolekar",
    "name": "Atharva Ankolekar",
    "shortName": "Ankolekar",
    "ipl2026Team": "MI",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "mayank-rawat",
    "name": "Mayank Rawat",
    "shortName": "Rawat",
    "ipl2026Team": "MI",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "corbin-bosch",
    "name": "Corbin Bosch",
    "shortName": "Bosch",
    "ipl2026Team": "MI",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "danish-malewar",
    "name": "Danish Malewar",
    "shortName": "Malewar",
    "ipl2026Team": "MI",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "ashwani-kumar",
    "name": "Ashwani Kumar",
    "shortName": "Kumar",
    "ipl2026Team": "MI",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "raghu-sharma",
    "name": "Raghu Sharma",
    "shortName": "Sharma",
    "ipl2026Team": "MI",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "mohammad-izhar",
    "name": "Mohammad Izhar",
    "shortName": "Izhar",
    "ipl2026Team": "MI",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "allah-ghazanfar",
    "name": "Allah Ghazanfar",
    "shortName": "Ghazanfar",
    "ipl2026Team": "MI",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 4.8,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 5.76
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "ruturaj-gaikwad",
    "name": "Ruturaj Gaikwad",
    "shortName": "Gaikwad",
    "ipl2026Team": "CSK",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 18.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 21.599999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "ms-dhoni",
    "name": "MS Dhoni",
    "shortName": "Dhoni",
    "ipl2026Team": "CSK",
    "role": "WK-Batter",
    "nationality": "Indian",
    "ipl2026Price": 4.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 4.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "shivam-dube",
    "name": "Shivam Dube",
    "shortName": "Dube",
    "ipl2026Team": "CSK",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 12.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 14.399999999999999
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "sanju-samson",
    "name": "Sanju Samson",
    "shortName": "Samson",
    "ipl2026Team": "CSK",
    "role": "WK-Batter",
    "nationality": "Indian",
    "ipl2026Price": 14.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 16.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "noor-ahmad",
    "name": "Noor Ahmad",
    "shortName": "Ahmad",
    "ipl2026Team": "CSK",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 10.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 12.0
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "khaleel-ahmed",
    "name": "Khaleel Ahmed",
    "shortName": "Ahmed",
    "ipl2026Team": "CSK",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 10.75,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 12.9
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "dewald-brevis",
    "name": "Dewald Brevis",
    "shortName": "Brevis",
    "ipl2026Team": "CSK",
    "role": "Batter",
    "nationality": "Overseas",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "matthew-william-short",
    "name": "Matthew William Short",
    "shortName": "Short",
    "ipl2026Team": "CSK",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "nathan-ellis",
    "name": "Nathan Ellis",
    "shortName": "Ellis",
    "ipl2026Team": "CSK",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "akeal-hosein",
    "name": "Akeal Hosein",
    "shortName": "Hosein",
    "ipl2026Team": "CSK",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "matt-henry",
    "name": "Matt Henry",
    "shortName": "Henry",
    "ipl2026Team": "CSK",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "jamie-overton",
    "name": "Jamie Overton",
    "shortName": "Overton",
    "ipl2026Team": "CSK",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "prashant-veer",
    "name": "Prashant Veer",
    "shortName": "Veer",
    "ipl2026Team": "CSK",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 14.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 17.04
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "kartik-sharma",
    "name": "Kartik Sharma",
    "shortName": "Sharma",
    "ipl2026Team": "CSK",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 14.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 17.04
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "mukesh-choudhary",
    "name": "Mukesh Choudhary",
    "shortName": "Choudhary",
    "ipl2026Team": "CSK",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "shreyas-gopal",
    "name": "Shreyas Gopal",
    "shortName": "Gopal",
    "ipl2026Team": "CSK",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "gurjapneet-singh",
    "name": "Gurjapneet Singh",
    "shortName": "Singh",
    "ipl2026Team": "CSK",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 2.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.64
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "rahul-chahar",
    "name": "Rahul Chahar",
    "shortName": "Chahar",
    "ipl2026Team": "CSK",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 3.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 3.84
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "sarfaraz-khan",
    "name": "Sarfaraz Khan",
    "shortName": "Khan",
    "ipl2026Team": "CSK",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "aman-khan",
    "name": "Aman Khan",
    "shortName": "Khan",
    "ipl2026Team": "CSK",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "anshul-kamboj",
    "name": "Anshul Kamboj",
    "shortName": "Kamboj",
    "ipl2026Team": "CSK",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "ramakrishna-ghosh",
    "name": "Ramakrishna Ghosh",
    "shortName": "Ghosh",
    "ipl2026Team": "CSK",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "zak-foulkes",
    "name": "Zak Foulkes",
    "shortName": "Foulkes",
    "ipl2026Team": "CSK",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "ayush-mhatre",
    "name": "Ayush Mhatre",
    "shortName": "Mhatre",
    "ipl2026Team": "CSK",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "virat-kohli",
    "name": "Virat Kohli",
    "shortName": "Kohli",
    "ipl2026Team": "RCB",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 21.0,
    "age": 28,
    "analytics": {
      "overallRating": 92,
      "impactScore": 90,
      "archetype": "Reliable Engine",
      "scoutVerdict": "Evergreen run-machine. Anchors the RCB innings while maintaining high impact scores.",
      "peerRank": 0,
      "auctionCeiling": 25.2
    },
    "batting": {
      "ipl2025": {
        "runs": 657,
        "avg": 43.8,
        "sr": 142.5
      },
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "rajat-patidar",
    "name": "Rajat Patidar",
    "shortName": "Patidar",
    "ipl2026Team": "RCB",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 11.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 13.2
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "josh-hazlewood",
    "name": "Josh Hazlewood",
    "shortName": "Hazlewood",
    "ipl2026Team": "RCB",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 12.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 15.0
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "phil-salt",
    "name": "Phil Salt",
    "shortName": "Salt",
    "ipl2026Team": "RCB",
    "role": "WK-Batter",
    "nationality": "Overseas",
    "ipl2026Price": 11.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 13.799999999999999
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "krunal-pandya",
    "name": "Krunal Pandya",
    "shortName": "Pandya",
    "ipl2026Team": "RCB",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 5.75,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 6.8999999999999995
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "venkatesh-iyer",
    "name": "Venkatesh Iyer",
    "shortName": "Iyer",
    "ipl2026Team": "RCB",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 5.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 6.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "jitesh-sharma",
    "name": "Jitesh Sharma",
    "shortName": "Sharma",
    "ipl2026Team": "RCB",
    "role": "WK-Batter",
    "nationality": "Indian",
    "ipl2026Price": 11.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 13.2
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "tim-david",
    "name": "Tim David",
    "shortName": "David",
    "ipl2026Team": "RCB",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 3.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 3.5999999999999996
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "romario-shepherd",
    "name": "Romario Shepherd",
    "shortName": "Shepherd",
    "ipl2026Team": "RCB",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 1.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.7999999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "jacob-bethell",
    "name": "Jacob Bethell",
    "shortName": "Bethell",
    "ipl2026Team": "RCB",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 1.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.7999999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "devdutt-padikkal",
    "name": "Devdutt Padikkal",
    "shortName": "Padikkal",
    "ipl2026Team": "RCB",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "bhuvneshwar-kumar",
    "name": "Bhuvneshwar Kumar",
    "shortName": "Kumar",
    "ipl2026Team": "RCB",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 10.75,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 12.9
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "rasikh-dar",
    "name": "Rasikh Dar",
    "shortName": "Dar",
    "ipl2026Team": "RCB",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 6.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 7.199999999999999
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "suyash-sharma",
    "name": "Suyash Sharma",
    "shortName": "Sharma",
    "ipl2026Team": "RCB",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "nuwan-thushara",
    "name": "Nuwan Thushara",
    "shortName": "Thushara",
    "ipl2026Team": "RCB",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 1.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.7999999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "swapnil-singh",
    "name": "Swapnil Singh",
    "shortName": "Singh",
    "ipl2026Team": "RCB",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "abhinandan-singh",
    "name": "Abhinandan Singh",
    "shortName": "Singh",
    "ipl2026Team": "RCB",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.3,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.36
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "jacob-duffy",
    "name": "Jacob Duffy",
    "shortName": "Duffy",
    "ipl2026Team": "RCB",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 1.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.2
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "mangesh-yadav",
    "name": "Mangesh Yadav",
    "shortName": "Yadav",
    "ipl2026Team": "RCB",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "satvik-deswal",
    "name": "Satvik Deswal",
    "shortName": "Deswal",
    "ipl2026Team": "RCB",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "vicky-ostwal",
    "name": "Vicky Ostwal",
    "shortName": "Ostwal",
    "ipl2026Team": "RCB",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "vihaan-malhotra",
    "name": "Vihaan Malhotra",
    "shortName": "Malhotra",
    "ipl2026Team": "RCB",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "cameron-green",
    "name": "Cameron Green",
    "shortName": "Green",
    "ipl2026Team": "KKR",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 25.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 30.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "rinku-singh",
    "name": "Rinku Singh",
    "shortName": "Singh",
    "ipl2026Team": "KKR",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 13.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 15.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "sunil-narine",
    "name": "Sunil Narine",
    "shortName": "Narine",
    "ipl2026Team": "KKR",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 12.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 14.399999999999999
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "vaibhav-arora",
    "name": "Vaibhav Arora",
    "shortName": "Arora",
    "ipl2026Team": "KKR",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 9.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 10.799999999999999
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "matheesha-pathirana",
    "name": "Matheesha Pathirana",
    "shortName": "Pathirana",
    "ipl2026Team": "KKR",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 18.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 21.599999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "harshit-rana",
    "name": "Harshit Rana",
    "shortName": "Rana",
    "ipl2026Team": "KKR",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 4.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 4.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "ajinkya-rahane",
    "name": "Ajinkya Rahane",
    "shortName": "Rahane",
    "ipl2026Team": "KKR",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 1.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.7999999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "angkrish-raghuvanshi",
    "name": "Angkrish Raghuvanshi",
    "shortName": "Raghuvanshi",
    "ipl2026Team": "KKR",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "manish-pandey",
    "name": "Manish Pandey",
    "shortName": "Pandey",
    "ipl2026Team": "KKR",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "finn-allen",
    "name": "Finn Allen",
    "shortName": "Allen",
    "ipl2026Team": "KKR",
    "role": "Batter",
    "nationality": "Overseas",
    "ipl2026Price": 1.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.7999999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "tim-seifert",
    "name": "Tim Seifert",
    "shortName": "Seifert",
    "ipl2026Team": "KKR",
    "role": "Batter",
    "nationality": "Overseas",
    "ipl2026Price": 1.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.7999999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "rahul-tripathi",
    "name": "Rahul Tripathi",
    "shortName": "Tripathi",
    "ipl2026Team": "KKR",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 3.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 3.5999999999999996
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "anukul-roy",
    "name": "Anukul Roy",
    "shortName": "Roy",
    "ipl2026Team": "KKR",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "rachin-ravindra",
    "name": "Rachin Ravindra",
    "shortName": "Ravindra",
    "ipl2026Team": "KKR",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 4.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 4.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "blessing-muzarabani",
    "name": "Blessing Muzarabani",
    "shortName": "Muzarabani",
    "ipl2026Team": "KKR",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 1.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.7999999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "kartik-tyagi",
    "name": "Kartik Tyagi",
    "shortName": "Tyagi",
    "ipl2026Team": "KKR",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "prashant-solanki",
    "name": "Prashant Solanki",
    "shortName": "Solanki",
    "ipl2026Team": "KKR",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "akash-deep",
    "name": "Akash Deep",
    "shortName": "Deep",
    "ipl2026Team": "KKR",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "umran-malik",
    "name": "Umran Malik",
    "shortName": "Malik",
    "ipl2026Team": "KKR",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "sarthak-ranjan",
    "name": "Sarthak Ranjan",
    "shortName": "Ranjan",
    "ipl2026Team": "KKR",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "daksh-kamra",
    "name": "Daksh Kamra",
    "shortName": "Kamra",
    "ipl2026Team": "KKR",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "tejasvi-singh",
    "name": "Tejasvi Singh",
    "shortName": "Singh",
    "ipl2026Team": "KKR",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "axar-patel",
    "name": "Axar Patel",
    "shortName": "Patel",
    "ipl2026Team": "DC",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 16.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 19.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "kl-rahul",
    "name": "KL Rahul",
    "shortName": "Rahul",
    "ipl2026Team": "DC",
    "role": "WK-Batter",
    "nationality": "Indian",
    "ipl2026Price": 14.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 16.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "kuldeep-yadav",
    "name": "Kuldeep Yadav",
    "shortName": "Yadav",
    "ipl2026Team": "DC",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 13.25,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 15.899999999999999
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "abishek-porel",
    "name": "Abishek Porel",
    "shortName": "Porel",
    "ipl2026Team": "DC",
    "role": "WK-Batter",
    "nationality": "Indian",
    "ipl2026Price": 4.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 4.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "mitchell-starc",
    "name": "Mitchell Starc",
    "shortName": "Starc",
    "ipl2026Team": "DC",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 11.75,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 14.1
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "t-natarajan",
    "name": "T. Natarajan",
    "shortName": "Natarajan",
    "ipl2026Team": "DC",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 10.75,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 12.9
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "david-miller",
    "name": "David Miller",
    "shortName": "Miller",
    "ipl2026Team": "DC",
    "role": "Batter",
    "nationality": "Overseas",
    "ipl2026Price": 7.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 9.0
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "prithvi-shaw",
    "name": "Prithvi Shaw",
    "shortName": "Shaw",
    "ipl2026Team": "DC",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 4.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 4.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "karun-nair",
    "name": "Karun Nair",
    "shortName": "Nair",
    "ipl2026Team": "DC",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "ben-duckett",
    "name": "Ben Duckett",
    "shortName": "Duckett",
    "ipl2026Team": "DC",
    "role": "Batter",
    "nationality": "Overseas",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "pathum-nissanka",
    "name": "Pathum Nissanka",
    "shortName": "Nissanka",
    "ipl2026Team": "DC",
    "role": "Batter",
    "nationality": "Overseas",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "sameer-rizvi",
    "name": "Sameer Rizvi",
    "shortName": "Rizvi",
    "ipl2026Team": "DC",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "ashutosh-sharma",
    "name": "Ashutosh Sharma",
    "shortName": "Sharma",
    "ipl2026Team": "DC",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "auqib-nabi",
    "name": "Auqib Nabi",
    "shortName": "Nabi",
    "ipl2026Team": "DC",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 8.4,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 10.08
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "mukesh-kumar",
    "name": "Mukesh Kumar",
    "shortName": "Kumar",
    "ipl2026Team": "DC",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "dushmantha-chameera",
    "name": "Dushmantha Chameera",
    "shortName": "Chameera",
    "ipl2026Team": "DC",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "lungisani-ngidi",
    "name": "Lungisani Ngidi",
    "shortName": "Ngidi",
    "ipl2026Team": "DC",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "kyle-jamieson",
    "name": "Kyle Jamieson",
    "shortName": "Jamieson",
    "ipl2026Team": "DC",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "sahil-parakh",
    "name": "Sahil Parakh",
    "shortName": "Parakh",
    "ipl2026Team": "DC",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "vipraj-nigam",
    "name": "Vipraj Nigam",
    "shortName": "Nigam",
    "ipl2026Team": "DC",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "ajay-mandal",
    "name": "Ajay Mandal",
    "shortName": "Mandal",
    "ipl2026Team": "DC",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "tripurana-vijay",
    "name": "Tripurana Vijay",
    "shortName": "Vijay",
    "ipl2026Team": "DC",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "madhav-tiwari",
    "name": "Madhav Tiwari",
    "shortName": "Tiwari",
    "ipl2026Team": "DC",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "shubman-gill",
    "name": "Shubman Gill",
    "shortName": "Gill",
    "ipl2026Team": "GT",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 16.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 19.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "rashid-khan",
    "name": "Rashid Khan",
    "shortName": "Khan",
    "ipl2026Team": "GT",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 18.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 21.599999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "sai-sudharsan",
    "name": "Sai Sudharsan",
    "shortName": "Sudharsan",
    "ipl2026Team": "GT",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 8.5,
    "age": 28,
    "analytics": {
      "overallRating": 94,
      "impactScore": 92,
      "archetype": "Anchor Enforcer",
      "scoutVerdict": "Orange Cap 2025 with record 759 runs. Incredible consistency and mature phase acceleration.",
      "peerRank": 0,
      "auctionCeiling": 10.2
    },
    "batting": {
      "ipl2025": {
        "runs": 759,
        "avg": 54.2,
        "sr": 139.8,
        "powerplaySR": 128,
        "middleOversSR": 142,
        "deathOversSR": 185
      },
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "jos-buttler",
    "name": "Jos Buttler",
    "shortName": "Buttler",
    "ipl2026Team": "GT",
    "role": "WK-Batter",
    "nationality": "Overseas",
    "ipl2026Price": 15.75,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 18.9
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "kagiso-rabada",
    "name": "Kagiso Rabada",
    "shortName": "Rabada",
    "ipl2026Team": "GT",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 10.75,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 12.9
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "mohammed-siraj",
    "name": "Mohammed Siraj",
    "shortName": "Siraj",
    "ipl2026Team": "GT",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 12.25,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 14.7
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "prasidh-krishna",
    "name": "Prasidh Krishna",
    "shortName": "Krishna",
    "ipl2026Team": "GT",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 5.8,
    "age": 28,
    "analytics": {
      "overallRating": 92,
      "impactScore": 90,
      "archetype": "Hit-the-Deck Specialist",
      "scoutVerdict": "Purple Cap 2025. Lethal with extra bounce and seam movement.",
      "peerRank": 0,
      "auctionCeiling": 6.96
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {
        "wickets": 25,
        "avg": 18.4,
        "econ": 8.2
      }
    }
  },
  {
    "id": "rahul-tewatia",
    "name": "Rahul Tewatia",
    "shortName": "Tewatia",
    "ipl2026Team": "GT",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 4.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 4.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "washington-sundar",
    "name": "Washington Sundar",
    "shortName": "Sundar",
    "ipl2026Team": "GT",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 3.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 3.5999999999999996
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "sai-kishore",
    "name": "Sai Kishore",
    "shortName": "Kishore",
    "ipl2026Team": "GT",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "kumar-kushagra",
    "name": "Kumar Kushagra",
    "shortName": "Kushagra",
    "ipl2026Team": "GT",
    "role": "WK-Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "anuj-rawat",
    "name": "Anuj Rawat",
    "shortName": "Rawat",
    "ipl2026Team": "GT",
    "role": "WK-Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "tom-banton",
    "name": "Tom Banton",
    "shortName": "Banton",
    "ipl2026Team": "GT",
    "role": "Batter",
    "nationality": "Overseas",
    "ipl2026Price": 1.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.7999999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "nishant-sindhu",
    "name": "Nishant Sindhu",
    "shortName": "Sindhu",
    "ipl2026Team": "GT",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "mohd-arshad-khan",
    "name": "Mohd. Arshad Khan",
    "shortName": "Khan",
    "ipl2026Team": "GT",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "jayant-yadav",
    "name": "Jayant Yadav",
    "shortName": "Yadav",
    "ipl2026Team": "GT",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "jason-holder",
    "name": "Jason Holder",
    "shortName": "Holder",
    "ipl2026Team": "GT",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "ishant-sharma",
    "name": "Ishant Sharma",
    "shortName": "Sharma",
    "ipl2026Team": "GT",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 1.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.7999999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "manav-suthar",
    "name": "Manav Suthar",
    "shortName": "Suthar",
    "ipl2026Team": "GT",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "gurnoor-singh-brar",
    "name": "Gurnoor Singh Brar",
    "shortName": "Brar",
    "ipl2026Team": "GT",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "ashok-sharma",
    "name": "Ashok Sharma",
    "shortName": "Sharma",
    "ipl2026Team": "GT",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "prithvi-raj-yarra",
    "name": "Prithvi Raj Yarra",
    "shortName": "Yarra",
    "ipl2026Team": "GT",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "luke-wood",
    "name": "Luke Wood",
    "shortName": "Wood",
    "ipl2026Team": "GT",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "rishabh-pant",
    "name": "Rishabh Pant",
    "shortName": "Pant",
    "ipl2026Team": "LSG",
    "role": "WK-Batter",
    "nationality": "Indian",
    "ipl2026Price": 27.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 32.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "nicholas-pooran",
    "name": "Nicholas Pooran",
    "shortName": "Pooran",
    "ipl2026Team": "LSG",
    "role": "WK-Batter",
    "nationality": "Overseas",
    "ipl2026Price": 21.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 25.2
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "mayank-yadav",
    "name": "Mayank Yadav",
    "shortName": "Yadav",
    "ipl2026Team": "LSG",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 11.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 13.2
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "mohammad-shami",
    "name": "Mohammad Shami",
    "shortName": "Shami",
    "ipl2026Team": "LSG",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 10.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 12.0
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "aiden-markram",
    "name": "Aiden Markram",
    "shortName": "Markram",
    "ipl2026Team": "LSG",
    "role": "Batter",
    "nationality": "Overseas",
    "ipl2026Price": 9.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 11.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "mitchell-marsh",
    "name": "Mitchell Marsh",
    "shortName": "Marsh",
    "ipl2026Team": "LSG",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 3.4,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 4.08
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "josh-inglis",
    "name": "Josh Inglis",
    "shortName": "Inglis",
    "ipl2026Team": "LSG",
    "role": "WK-Batter",
    "nationality": "Overseas",
    "ipl2026Price": 8.6,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 10.319999999999999
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "avesh-khan",
    "name": "Avesh Khan",
    "shortName": "Khan",
    "ipl2026Team": "LSG",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 9.75,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 11.7
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "arshin-kulkarni",
    "name": "Arshin Kulkarni",
    "shortName": "Kulkarni",
    "ipl2026Team": "LSG",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 4.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 4.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "abdul-samad",
    "name": "Abdul Samad",
    "shortName": "Samad",
    "ipl2026Team": "LSG",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 4.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 5.04
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "wanindu-hasaranga",
    "name": "Wanindu Hasaranga",
    "shortName": "Hasaranga",
    "ipl2026Team": "LSG",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 3.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 3.5999999999999996
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "shahbaz-ahamad",
    "name": "Shahbaz Ahamad",
    "shortName": "Ahamad",
    "ipl2026Team": "LSG",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 2.4,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.88
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "anrich-nortje",
    "name": "Anrich Nortje",
    "shortName": "Nortje",
    "ipl2026Team": "LSG",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 6.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 7.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "m-siddharth",
    "name": "M. Siddharth",
    "shortName": "Siddharth",
    "ipl2026Team": "LSG",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 1.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.2
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "himmat-singh",
    "name": "Himmat Singh",
    "shortName": "Singh",
    "ipl2026Team": "LSG",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "matthew-breetzke",
    "name": "Matthew Breetzke",
    "shortName": "Breetzke",
    "ipl2026Team": "LSG",
    "role": "Batter",
    "nationality": "Overseas",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "mukul-choudhary",
    "name": "Mukul Choudhary",
    "shortName": "Choudhary",
    "ipl2026Team": "LSG",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "akshat-raghuwanshi",
    "name": "Akshat Raghuwanshi",
    "shortName": "Raghuwanshi",
    "ipl2026Team": "LSG",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "digvesh-singh",
    "name": "Digvesh Singh",
    "shortName": "Singh",
    "ipl2026Team": "LSG",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "akash-singh",
    "name": "Akash Singh",
    "shortName": "Singh",
    "ipl2026Team": "LSG",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "prince-yadav",
    "name": "Prince Yadav",
    "shortName": "Yadav",
    "ipl2026Team": "LSG",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "arjun-tendulkar",
    "name": "Arjun Tendulkar",
    "shortName": "Tendulkar",
    "ipl2026Team": "LSG",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.3,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.36
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "naman-tiwari",
    "name": "Naman Tiwari",
    "shortName": "Tiwari",
    "ipl2026Team": "LSG",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "shreyas-iyer",
    "name": "Shreyas Iyer",
    "shortName": "Iyer",
    "ipl2026Team": "PBKS",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 26.75,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 32.1
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "arshdeep-singh",
    "name": "Arshdeep Singh",
    "shortName": "Singh",
    "ipl2026Team": "PBKS",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 18.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 21.599999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "marcus-stoinis",
    "name": "Marcus Stoinis",
    "shortName": "Stoinis",
    "ipl2026Team": "PBKS",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 11.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 13.2
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "yuzvendra-chahal",
    "name": "Yuzvendra Chahal",
    "shortName": "Chahal",
    "ipl2026Team": "PBKS",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 18.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 21.599999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "nehal-wadhera",
    "name": "Nehal Wadhera",
    "shortName": "Wadhera",
    "ipl2026Team": "PBKS",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 4.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 5.04
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "prabhsimran-singh",
    "name": "Prabhsimran Singh",
    "shortName": "Singh",
    "ipl2026Team": "PBKS",
    "role": "WK-Batter",
    "nationality": "Indian",
    "ipl2026Price": 4.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 4.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "shashank-singh",
    "name": "Shashank Singh",
    "shortName": "Singh",
    "ipl2026Team": "PBKS",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 5.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 6.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "harpreet-brar",
    "name": "Harpreet Brar",
    "shortName": "Brar",
    "ipl2026Team": "PBKS",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 1.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.7999999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "marco-jansen",
    "name": "Marco Jansen",
    "shortName": "Jansen",
    "ipl2026Team": "PBKS",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 7.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 8.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "vyshak-vijaykumar",
    "name": "Vyshak Vijaykumar",
    "shortName": "Vijaykumar",
    "ipl2026Team": "PBKS",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 1.8,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.16
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "yash-thakur",
    "name": "Yash Thakur",
    "shortName": "Thakur",
    "ipl2026Team": "PBKS",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 1.6,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.92
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "xavier-bartlett",
    "name": "Xavier Bartlett",
    "shortName": "Bartlett",
    "ipl2026Team": "PBKS",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 1.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.7999999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "azmatullah-omarzai",
    "name": "Azmatullah Omarzai",
    "shortName": "Omarzai",
    "ipl2026Team": "PBKS",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 2.4,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.88
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "musheer-khan",
    "name": "Musheer Khan",
    "shortName": "Khan",
    "ipl2026Team": "PBKS",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.3,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.36
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "priyansh-arya",
    "name": "Priyansh Arya",
    "shortName": "Arya",
    "ipl2026Team": "PBKS",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 3.8,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 4.56
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "vishnu-vinod",
    "name": "Vishnu Vinod",
    "shortName": "Vinod",
    "ipl2026Team": "PBKS",
    "role": "WK-Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "harnoor-pannu",
    "name": "Harnoor Pannu",
    "shortName": "Pannu",
    "ipl2026Team": "PBKS",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "pyla-avinash",
    "name": "Pyla Avinash",
    "shortName": "Avinash",
    "ipl2026Team": "PBKS",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "suryansh-shedge",
    "name": "Suryansh Shedge",
    "shortName": "Shedge",
    "ipl2026Team": "PBKS",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "mitch-owen",
    "name": "Mitch Owen",
    "shortName": "Owen",
    "ipl2026Team": "PBKS",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "cooper-connolly",
    "name": "Cooper Connolly",
    "shortName": "Connolly",
    "ipl2026Team": "PBKS",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "pravin-dubey",
    "name": "Pravin Dubey",
    "shortName": "Dubey",
    "ipl2026Team": "PBKS",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "vishal-nishad",
    "name": "Vishal Nishad",
    "shortName": "Nishad",
    "ipl2026Team": "PBKS",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "sanju-samson",
    "name": "Sanju Samson",
    "shortName": "Samson",
    "ipl2026Team": "RR",
    "role": "WK-Batter",
    "nationality": "Indian",
    "ipl2026Price": 18.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 21.599999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "yashasvi-jaiswal",
    "name": "Yashasvi Jaiswal",
    "shortName": "Jaiswal",
    "ipl2026Team": "RR",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 18.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 21.599999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "riyan-parag",
    "name": "Riyan Parag",
    "shortName": "Parag",
    "ipl2026Team": "RR",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 14.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 16.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "dhruv-jurel",
    "name": "Dhruv Jurel",
    "shortName": "Jurel",
    "ipl2026Team": "RR",
    "role": "WK-Batter",
    "nationality": "Indian",
    "ipl2026Price": 14.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 16.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "sandeep-sharma",
    "name": "Sandeep Sharma",
    "shortName": "Sharma",
    "ipl2026Team": "RR",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 4.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 4.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "ravindra-jadeja",
    "name": "Ravindra Jadeja",
    "shortName": "Jadeja",
    "ipl2026Team": "RR",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 9.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 11.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "jofra-archer",
    "name": "Jofra Archer",
    "shortName": "Archer",
    "ipl2026Team": "RR",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 12.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 15.0
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "ravi-bishnoi",
    "name": "Ravi Bishnoi",
    "shortName": "Bishnoi",
    "ipl2026Team": "RR",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 4.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 4.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "shimron-hetmyer",
    "name": "Shimron Hetmyer",
    "shortName": "Hetmyer",
    "ipl2026Team": "RR",
    "role": "Batter",
    "nationality": "Overseas",
    "ipl2026Price": 1.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.7999999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "donovan-ferreira",
    "name": "Donovan Ferreira",
    "shortName": "Ferreira",
    "ipl2026Team": "RR",
    "role": "Batter",
    "nationality": "Overseas",
    "ipl2026Price": 1.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.7999999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "adam-milne",
    "name": "Adam Milne",
    "shortName": "Milne",
    "ipl2026Team": "RR",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 1.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.7999999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "tushar-deshpande",
    "name": "Tushar Deshpande",
    "shortName": "Deshpande",
    "ipl2026Team": "RR",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 6.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 7.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "shubham-dubey",
    "name": "Shubham Dubey",
    "shortName": "Dubey",
    "ipl2026Team": "RR",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 5.8,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 6.96
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "vaibhav-suryavanshi",
    "name": "Vaibhav Suryavanshi",
    "shortName": "Suryavanshi",
    "ipl2026Team": "RR",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 1.1,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.32
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "lhuan-dre-pretorius",
    "name": "Lhuan-dre Pretorius",
    "shortName": "Pretorius",
    "ipl2026Team": "RR",
    "role": "Batter",
    "nationality": "Overseas",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "yudhvir-singh-charak",
    "name": "Yudhvir Singh Charak",
    "shortName": "Charak",
    "ipl2026Team": "RR",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "kwena-maphaka",
    "name": "Kwena Maphaka",
    "shortName": "Maphaka",
    "ipl2026Team": "RR",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "kuldeep-sen",
    "name": "Kuldeep Sen",
    "shortName": "Sen",
    "ipl2026Team": "RR",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 1.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.7999999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "sushant-mishra",
    "name": "Sushant Mishra",
    "shortName": "Mishra",
    "ipl2026Team": "RR",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "vignesh-puthur",
    "name": "Vignesh Puthur",
    "shortName": "Puthur",
    "ipl2026Team": "RR",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "brijesh-sharma",
    "name": "Brijesh Sharma",
    "shortName": "Sharma",
    "ipl2026Team": "RR",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "aman-rao-perala",
    "name": "Aman Rao Perala",
    "shortName": "Perala",
    "ipl2026Team": "RR",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "ravi-singh",
    "name": "Ravi Singh",
    "shortName": "Singh",
    "ipl2026Team": "RR",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "heinrich-klaasen",
    "name": "Heinrich Klaasen",
    "shortName": "Klaasen",
    "ipl2026Team": "SRH",
    "role": "WK-Batter",
    "nationality": "Overseas",
    "ipl2026Price": 23.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 27.599999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "pat-cummins",
    "name": "Pat Cummins",
    "shortName": "Cummins",
    "ipl2026Team": "SRH",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 18.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 21.599999999999998
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "abhishek-sharma",
    "name": "Abhishek Sharma",
    "shortName": "Sharma",
    "ipl2026Team": "SRH",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 14.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 16.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "nitish-kumar-reddy",
    "name": "Nitish Kumar Reddy",
    "shortName": "Reddy",
    "ipl2026Team": "SRH",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 6.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 7.199999999999999
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "travis-head",
    "name": "Travis Head",
    "shortName": "Head",
    "ipl2026Team": "SRH",
    "role": "Batter",
    "nationality": "Overseas",
    "ipl2026Price": 14.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 16.8
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "ishan-kishan",
    "name": "Ishan Kishan",
    "shortName": "Kishan",
    "ipl2026Team": "SRH",
    "role": "WK-Batter",
    "nationality": "Indian",
    "ipl2026Price": 11.25,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 13.5
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "harshal-patel",
    "name": "Harshal Patel",
    "shortName": "Patel",
    "ipl2026Team": "SRH",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 8.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 9.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "liam-livingstone",
    "name": "Liam Livingstone",
    "shortName": "Livingstone",
    "ipl2026Team": "SRH",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 13.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 15.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "kamindu-mendis",
    "name": "Kamindu Mendis",
    "shortName": "Mendis",
    "ipl2026Team": "SRH",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "brydon-carse",
    "name": "Brydon Carse",
    "shortName": "Carse",
    "ipl2026Team": "SRH",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 2.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 2.4
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "jaydev-unadkat",
    "name": "Jaydev Unadkat",
    "shortName": "Unadkat",
    "ipl2026Team": "SRH",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 1.0,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 1.2
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "zeeshan-ansari",
    "name": "Zeeshan Ansari",
    "shortName": "Ansari",
    "ipl2026Team": "SRH",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.5,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.6
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "aniket-verma",
    "name": "Aniket Verma",
    "shortName": "Verma",
    "ipl2026Team": "SRH",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "salil-arora",
    "name": "Salil Arora",
    "shortName": "Arora",
    "ipl2026Team": "SRH",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "smaran-ravichandran",
    "name": "Smaran Ravichandran",
    "shortName": "Ravichandran",
    "ipl2026Team": "SRH",
    "role": "Batter",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "harsh-dubey",
    "name": "Harsh Dubey",
    "shortName": "Dubey",
    "ipl2026Team": "SRH",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "shivang-kumar",
    "name": "Shivang Kumar",
    "shortName": "Kumar",
    "ipl2026Team": "SRH",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "jack-edwards",
    "name": "Jack Edwards",
    "shortName": "Edwards",
    "ipl2026Team": "SRH",
    "role": "All-rounder",
    "nationality": "Overseas",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "eshan-malinga",
    "name": "Eshan Malinga",
    "shortName": "Malinga",
    "ipl2026Team": "SRH",
    "role": "Bowler",
    "nationality": "Overseas",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "sakib-hussain",
    "name": "Sakib Hussain",
    "shortName": "Hussain",
    "ipl2026Team": "SRH",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "onkar-tarmale",
    "name": "Onkar Tarmale",
    "shortName": "Tarmale",
    "ipl2026Team": "SRH",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "amit-kumar",
    "name": "Amit Kumar",
    "shortName": "Kumar",
    "ipl2026Team": "SRH",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "praful-hinge",
    "name": "Praful Hinge",
    "shortName": "Hinge",
    "ipl2026Team": "SRH",
    "role": "Bowler",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  },
  {
    "id": "krains-fuletra",
    "name": "Krains Fuletra",
    "shortName": "Fuletra",
    "ipl2026Team": "SRH",
    "role": "All-rounder",
    "nationality": "Indian",
    "ipl2026Price": 0.2,
    "age": 28,
    "analytics": {
      "overallRating": 85,
      "impactScore": 75,
      "archetype": "Specialist",
      "scoutVerdict": "Solid addition to any 2026 contingent.",
      "peerRank": 0,
      "auctionCeiling": 0.24
    },
    "batting": {
      "ipl2025": {},
      "recentForm": [
        8,
        7,
        9,
        6,
        8
      ]
    },
    "bowling": {
      "ipl2025": {}
    }
  }
];
