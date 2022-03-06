function getPokemonBaseStats() {
    const baseStats = [
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 130,
            "defense": 120,
            "hp": 105,
            "special": 45,
            "speed": 40
        },
        {
            "attack": 95,
            "defense": 80,
            "hp": 105,
            "special": 40,
            "speed": 90
        },
        {
            "attack": 57,
            "defense": 40,
            "hp": 46,
            "special": 40,
            "speed": 50
        },
        {
            "attack": 45,
            "defense": 48,
            "hp": 70,
            "special": 60,
            "speed": 35
        },
        {
            "attack": 60,
            "defense": 30,
            "hp": 40,
            "special": 31,
            "speed": 70
        },
        {
            "attack": 30,
            "defense": 50,
            "hp": 40,
            "special": 55,
            "speed": 100
        },
        {
            "attack": 92,
            "defense": 77,
            "hp": 81,
            "special": 75,
            "speed": 85
        },
        {
            "attack": 75,
            "defense": 110,
            "hp": 95,
            "special": 80,
            "speed": 30
        },
        {
            "attack": 62,
            "defense": 63,
            "hp": 60,
            "special": 80,
            "speed": 60
        },
        {
            "attack": 95,
            "defense": 85,
            "hp": 95,
            "special": 125,
            "speed": 55
        },
        {
            "attack": 55,
            "defense": 75,
            "hp": 90,
            "special": 60,
            "speed": 30
        },
        {
            "attack": 40,
            "defense": 80,
            "hp": 60,
            "special": 60,
            "speed": 40
        },
        {
            "attack": 80,
            "defense": 50,
            "hp": 80,
            "special": 40,
            "speed": 25
        },
        {
            "attack": 65,
            "defense": 60,
            "hp": 60,
            "special": 130,
            "speed": 110
        },
        {
            "attack": 47,
            "defense": 52,
            "hp": 55,
            "special": 40,
            "speed": 41
        },
        {
            "attack": 82,
            "defense": 87,
            "hp": 90,
            "special": 75,
            "speed": 76
        },
        {
            "attack": 50,
            "defense": 95,
            "hp": 50,
            "special": 40,
            "speed": 35
        },
        {
            "attack": 85,
            "defense": 95,
            "hp": 80,
            "special": 30,
            "speed": 25
        },
        {
            "attack": 85,
            "defense": 80,
            "hp": 130,
            "special": 95,
            "speed": 60
        },
        {
            "attack": 110,
            "defense": 80,
            "hp": 90,
            "special": 80,
            "speed": 95
        },
        {
            "attack": 100,
            "defense": 100,
            "hp": 100,
            "special": 100,
            "speed": 100
        },
        {
            "attack": 125,
            "defense": 79,
            "hp": 95,
            "special": 100,
            "speed": 81
        },
        {
            "attack": 65,
            "defense": 100,
            "hp": 30,
            "special": 45,
            "speed": 40
        },
        {
            "attack": 40,
            "defense": 35,
            "hp": 40,
            "special": 100,
            "speed": 70
        },
        {
            "attack": 35,
            "defense": 30,
            "hp": 30,
            "special": 100,
            "speed": 80
        },
        {
            "attack": 110,
            "defense": 80,
            "hp": 70,
            "special": 55,
            "speed": 105
        },
        {
            "attack": 45,
            "defense": 55,
            "hp": 30,
            "special": 70,
            "speed": 85
        },
        {
            "attack": 83,
            "defense": 100,
            "hp": 79,
            "special": 85,
            "speed": 78
        },
        {
            "attack": 125,
            "defense": 100,
            "hp": 65,
            "special": 55,
            "speed": 85
        },
        {
            "attack": 55,
            "defense": 115,
            "hp": 65,
            "special": 100,
            "speed": 60
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 70,
            "defense": 45,
            "hp": 55,
            "special": 50,
            "speed": 60
        },
        {
            "attack": 45,
            "defense": 160,
            "hp": 35,
            "special": 30,
            "speed": 70
        },
        {
            "attack": 90,
            "defense": 65,
            "hp": 65,
            "special": 61,
            "speed": 100
        },
        {
            "attack": 45,
            "defense": 40,
            "hp": 40,
            "special": 35,
            "speed": 56
        },
        {
            "attack": 65,
            "defense": 65,
            "hp": 90,
            "special": 40,
            "speed": 15
        },
        {
            "attack": 35,
            "defense": 30,
            "hp": 40,
            "special": 120,
            "speed": 105
        },
        {
            "attack": 95,
            "defense": 115,
            "hp": 55,
            "special": 45,
            "speed": 35
        },
        {
            "attack": 5,
            "defense": 5,
            "hp": 250,
            "special": 105,
            "speed": 50
        },
        {
            "attack": 100,
            "defense": 70,
            "hp": 80,
            "special": 50,
            "speed": 45
        },
        {
            "attack": 45,
            "defense": 65,
            "hp": 40,
            "special": 100,
            "speed": 90
        },
        {
            "attack": 120,
            "defense": 53,
            "hp": 50,
            "special": 35,
            "speed": 87
        },
        {
            "attack": 105,
            "defense": 79,
            "hp": 50,
            "special": 35,
            "speed": 76
        },
        {
            "attack": 85,
            "defense": 69,
            "hp": 60,
            "special": 65,
            "speed": 80
        },
        {
            "attack": 95,
            "defense": 80,
            "hp": 60,
            "special": 80,
            "speed": 30
        },
        {
            "attack": 52,
            "defense": 48,
            "hp": 50,
            "special": 50,
            "speed": 55
        },
        {
            "attack": 48,
            "defense": 45,
            "hp": 60,
            "special": 90,
            "speed": 42
        },
        {
            "attack": 110,
            "defense": 130,
            "hp": 80,
            "special": 55,
            "speed": 45
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 95,
            "defense": 57,
            "hp": 65,
            "special": 85,
            "speed": 93
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 83,
            "defense": 57,
            "hp": 65,
            "special": 85,
            "speed": 105
        },
        {
            "attack": 60,
            "defense": 95,
            "hp": 50,
            "special": 120,
            "speed": 70
        },
        {
            "attack": 65,
            "defense": 95,
            "hp": 40,
            "special": 60,
            "speed": 35
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 80,
            "defense": 35,
            "hp": 40,
            "special": 35,
            "speed": 70
        },
        {
            "attack": 45,
            "defense": 55,
            "hp": 65,
            "special": 70,
            "speed": 45
        },
        {
            "attack": 55,
            "defense": 25,
            "hp": 10,
            "special": 45,
            "speed": 95
        },
        {
            "attack": 100,
            "defense": 95,
            "hp": 75,
            "special": 70,
            "speed": 110
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 65,
            "defense": 55,
            "hp": 52,
            "special": 58,
            "speed": 60
        },
        {
            "attack": 55,
            "defense": 50,
            "hp": 60,
            "special": 40,
            "speed": 45
        },
        {
            "attack": 134,
            "defense": 95,
            "hp": 91,
            "special": 100,
            "speed": 80
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 85,
            "defense": 45,
            "hp": 35,
            "special": 35,
            "speed": 75
        },
        {
            "attack": 50,
            "defense": 40,
            "hp": 40,
            "special": 40,
            "speed": 90
        },
        {
            "attack": 50,
            "defense": 35,
            "hp": 65,
            "special": 95,
            "speed": 95
        },
        {
            "attack": 100,
            "defense": 90,
            "hp": 90,
            "special": 125,
            "speed": 90
        },
        {
            "attack": 85,
            "defense": 100,
            "hp": 90,
            "special": 125,
            "speed": 85
        },
        {
            "attack": 90,
            "defense": 85,
            "hp": 90,
            "special": 125,
            "speed": 100
        },
        {
            "attack": 48,
            "defense": 48,
            "hp": 48,
            "special": 48,
            "speed": 48
        },
        {
            "attack": 45,
            "defense": 35,
            "hp": 40,
            "special": 40,
            "speed": 90
        },
        {
            "attack": 105,
            "defense": 90,
            "hp": 30,
            "special": 25,
            "speed": 50
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 41,
            "defense": 40,
            "hp": 38,
            "special": 65,
            "speed": 65
        },
        {
            "attack": 76,
            "defense": 75,
            "hp": 73,
            "special": 100,
            "speed": 100
        },
        {
            "attack": 55,
            "defense": 30,
            "hp": 35,
            "special": 50,
            "speed": 90
        },
        {
            "attack": 90,
            "defense": 55,
            "hp": 60,
            "special": 90,
            "speed": 100
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 64,
            "defense": 45,
            "hp": 41,
            "special": 50,
            "speed": 50
        },
        {
            "attack": 84,
            "defense": 65,
            "hp": 61,
            "special": 70,
            "speed": 70
        },
        {
            "attack": 80,
            "defense": 90,
            "hp": 30,
            "special": 45,
            "speed": 55
        },
        {
            "attack": 115,
            "defense": 105,
            "hp": 60,
            "special": 70,
            "speed": 80
        },
        {
            "attack": 40,
            "defense": 70,
            "hp": 30,
            "special": 70,
            "speed": 60
        },
        {
            "attack": 65,
            "defense": 95,
            "hp": 55,
            "special": 95,
            "speed": 85
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 75,
            "defense": 85,
            "hp": 50,
            "special": 30,
            "speed": 40
        },
        {
            "attack": 100,
            "defense": 110,
            "hp": 75,
            "special": 55,
            "speed": 65
        },
        {
            "attack": 40,
            "defense": 100,
            "hp": 35,
            "special": 90,
            "speed": 35
        },
        {
            "attack": 60,
            "defense": 125,
            "hp": 70,
            "special": 115,
            "speed": 55
        },
        {
            "attack": 45,
            "defense": 20,
            "hp": 115,
            "special": 25,
            "speed": 20
        },
        {
            "attack": 70,
            "defense": 45,
            "hp": 140,
            "special": 50,
            "speed": 45
        },
        {
            "attack": 55,
            "defense": 50,
            "hp": 55,
            "special": 65,
            "speed": 55
        },
        {
            "attack": 130,
            "defense": 60,
            "hp": 65,
            "special": 110,
            "speed": 65
        },
        {
            "attack": 65,
            "defense": 60,
            "hp": 65,
            "special": 110,
            "speed": 130
        },
        {
            "attack": 65,
            "defense": 60,
            "hp": 130,
            "special": 110,
            "speed": 65
        },
        {
            "attack": 80,
            "defense": 50,
            "hp": 70,
            "special": 35,
            "speed": 35
        },
        {
            "attack": 45,
            "defense": 35,
            "hp": 40,
            "special": 40,
            "speed": 55
        },
        {
            "attack": 60,
            "defense": 44,
            "hp": 35,
            "special": 40,
            "speed": 55
        },
        {
            "attack": 70,
            "defense": 55,
            "hp": 35,
            "special": 55,
            "speed": 25
        },
        {
            "attack": 65,
            "defense": 65,
            "hp": 65,
            "special": 50,
            "speed": 90
        },
        {
            "attack": 85,
            "defense": 95,
            "hp": 90,
            "special": 70,
            "speed": 70
        },
        {
            "attack": 35,
            "defense": 30,
            "hp": 40,
            "special": 20,
            "speed": 50
        },
        {
            "attack": 25,
            "defense": 50,
            "hp": 45,
            "special": 25,
            "speed": 35
        },
        {
            "attack": 80,
            "defense": 40,
            "hp": 65,
            "special": 45,
            "speed": 75
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 110,
            "defense": 70,
            "hp": 60,
            "special": 60,
            "speed": 100
        },
        {
            "attack": 105,
            "defense": 60,
            "hp": 65,
            "special": 60,
            "speed": 95
        },
        {
            "attack": 80,
            "defense": 50,
            "hp": 35,
            "special": 70,
            "speed": 120
        },
        {
            "attack": 65,
            "defense": 60,
            "hp": 70,
            "special": 90,
            "speed": 90
        },
        {
            "attack": 70,
            "defense": 80,
            "hp": 90,
            "special": 95,
            "speed": 70
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 30,
            "defense": 35,
            "hp": 45,
            "special": 20,
            "speed": 45
        },
        {
            "attack": 20,
            "defense": 55,
            "hp": 50,
            "special": 25,
            "speed": 30
        },
        {
            "attack": 45,
            "defense": 50,
            "hp": 60,
            "special": 80,
            "speed": 70
        },
        {
            "attack": 130,
            "defense": 80,
            "hp": 90,
            "special": 65,
            "speed": 55
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 82,
            "defense": 78,
            "hp": 80,
            "special": 80,
            "speed": 85
        },
        {
            "attack": 73,
            "defense": 70,
            "hp": 85,
            "special": 115,
            "speed": 67
        },
        {
            "attack": 80,
            "defense": 70,
            "hp": 75,
            "special": 75,
            "speed": 90
        },
        {
            "attack": 110,
            "defense": 90,
            "hp": 106,
            "special": 154,
            "speed": 130
        },
        {
            "attack": 110,
            "defense": 65,
            "hp": 160,
            "special": 65,
            "speed": 30
        },
        {
            "attack": 10,
            "defense": 55,
            "hp": 20,
            "special": 20,
            "speed": 80
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 105,
            "defense": 75,
            "hp": 105,
            "special": 65,
            "speed": 50
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 130,
            "defense": 115,
            "hp": 55,
            "special": 50,
            "speed": 75
        },
        {
            "attack": 95,
            "defense": 180,
            "hp": 50,
            "special": 85,
            "speed": 70
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 50,
            "defense": 70,
            "hp": 60,
            "special": 80,
            "speed": 140
        },
        {
            "attack": 70,
            "defense": 73,
            "hp": 95,
            "special": 85,
            "speed": 60
        },
        {
            "attack": 90,
            "defense": 120,
            "hp": 65,
            "special": 85,
            "speed": 60
        },
        {
            "attack": 70,
            "defense": 60,
            "hp": 65,
            "special": 65,
            "speed": 115
        },
        {
            "attack": 80,
            "defense": 110,
            "hp": 60,
            "special": 50,
            "speed": 45
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 50,
            "defense": 45,
            "hp": 45,
            "special": 115,
            "speed": 95
        },
        {
            "attack": 20,
            "defense": 15,
            "hp": 25,
            "special": 105,
            "speed": 90
        },
        {
            "attack": 50,
            "defense": 45,
            "hp": 55,
            "special": 135,
            "speed": 120
        },
        {
            "attack": 60,
            "defense": 55,
            "hp": 63,
            "special": 50,
            "speed": 71
        },
        {
            "attack": 80,
            "defense": 75,
            "hp": 83,
            "special": 70,
            "speed": 91
        },
        {
            "attack": 75,
            "defense": 85,
            "hp": 60,
            "special": 100,
            "speed": 115
        },
        {
            "attack": 49,
            "defense": 49,
            "hp": 45,
            "special": 65,
            "speed": 45
        },
        {
            "attack": 82,
            "defense": 83,
            "hp": 80,
            "special": 100,
            "speed": 80
        },
        {
            "attack": 70,
            "defense": 65,
            "hp": 80,
            "special": 120,
            "speed": 100
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 67,
            "defense": 60,
            "hp": 45,
            "special": 50,
            "speed": 63
        },
        {
            "attack": 92,
            "defense": 65,
            "hp": 80,
            "special": 80,
            "speed": 68
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 85,
            "defense": 55,
            "hp": 50,
            "special": 65,
            "speed": 90
        },
        {
            "attack": 100,
            "defense": 70,
            "hp": 65,
            "special": 80,
            "speed": 105
        },
        {
            "attack": 56,
            "defense": 35,
            "hp": 30,
            "special": 25,
            "speed": 72
        },
        {
            "attack": 81,
            "defense": 60,
            "hp": 55,
            "special": 50,
            "speed": 97
        },
        {
            "attack": 72,
            "defense": 57,
            "hp": 61,
            "special": 55,
            "speed": 65
        },
        {
            "attack": 62,
            "defense": 67,
            "hp": 70,
            "special": 55,
            "speed": 56
        },
        {
            "attack": 80,
            "defense": 100,
            "hp": 40,
            "special": 30,
            "speed": 20
        },
        {
            "attack": 60,
            "defense": 70,
            "hp": 65,
            "special": 75,
            "speed": 40
        },
        {
            "attack": 105,
            "defense": 65,
            "hp": 80,
            "special": 60,
            "speed": 130
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 35,
            "defense": 70,
            "hp": 25,
            "special": 95,
            "speed": 45
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 52,
            "defense": 43,
            "hp": 39,
            "special": 50,
            "speed": 65
        },
        {
            "attack": 48,
            "defense": 65,
            "hp": 44,
            "special": 50,
            "speed": 43
        },
        {
            "attack": 64,
            "defense": 58,
            "hp": 58,
            "special": 65,
            "speed": 80
        },
        {
            "attack": 63,
            "defense": 80,
            "hp": 59,
            "special": 65,
            "speed": 58
        },
        {
            "attack": 84,
            "defense": 78,
            "hp": 78,
            "special": 85,
            "speed": 100
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 136,
            "defense": 0,
            "hp": 33,
            "special": 6,
            "speed": 29
        },
        {
            "attack": 50,
            "defense": 55,
            "hp": 45,
            "special": 75,
            "speed": 30
        },
        {
            "attack": 65,
            "defense": 70,
            "hp": 60,
            "special": 85,
            "speed": 40
        },
        {
            "attack": 80,
            "defense": 85,
            "hp": 75,
            "special": 100,
            "speed": 50
        },
        {
            "attack": 75,
            "defense": 35,
            "hp": 50,
            "special": 70,
            "speed": 40
        },
        {
            "attack": 90,
            "defense": 50,
            "hp": 65,
            "special": 85,
            "speed": 55
        },
        {
            "attack": 105,
            "defense": 65,
            "hp": 80,
            "special": 100,
            "speed": 70
        },
    ];

    return baseStats;
}
