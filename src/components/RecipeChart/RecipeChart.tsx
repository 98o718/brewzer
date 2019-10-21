import React, { useState, useEffect } from 'react'
import { RecipeChartWrapper } from './RecipeChart.styles'

const RecipeChart: React.FC = () => {
  const [points, setPoints] = useState(``)
  const [width, setWidth] = useState(0)
  const [tempsWithCoords, setTempsWithCoords] = useState<
    {
      value: number
      time: number
      ingredients?: {
        name: string
        weight: number
        time?: number
      }[]
      x1: number
      y1: number
      x2: number
      y2: number
    }[]
  >([])
  let temps = [
    // {
    //   value: 0,
    //   time: 15,
    // },
    {
      value: 63,
      time: 60,
    },
    // {
    //   value: 62,
    //   time: 15,
    // },
    // {
    //   value: 78,
    //   time: 1,
    // },
    // {
    //   value: 100,
    //   time: 90,
    // },
  ]

  useEffect(() => {
    let temps = [
      {
        value: 63,
        time: 60,
      },
      {
        value: 70,
        time: 20,
      },
      {
        value: 72,
        time: 20,
      },
      {
        value: 78,
        time: 10,
      },
      {
        value: 100,
        time: 90,
        ingredients: [
          {
            name: 'Tomahawk (альфа: 17.4)',
            weight: 25,
            time: 90,
          },
          {
            name: 'Northern Brewer (альфа: 10.1)',
            weight: 20,
            time: 5,
          },
          {
            name: 'Fuggle (альфа: 4.4)',
            weight: 25,
            time: 1,
          },
        ],
      },
    ]
    let points = ``
    let lastPoint = 0
    let tempsWithCoords: {
      value: number
      time: number
      ingredients?: {
        name: string
        weight: number
        time?: number
      }[]
      x1: number
      y1: number
      x2: number
      y2: number
    }[] = []

    let width = 0

    temps.forEach((temp, index) => {
      let x1 = lastPoint ? lastPoint : 0
      let y1 = (110 - temp.value) * 2

      let x2 = temp.time * 3 >= 30 ? x1 + temp.time * 3 : x1 + 30
      let y2 = (110 - temp.value) * 2

      points += `${x1},${y1} ${x2},${y2} `

      lastPoint = x2 + 10

      width += temp.time * 3 >= 30 ? temp.time * 3 + 10 : 30 + 10

      console.log(temp.time * 3, width, x2)

      tempsWithCoords.push({
        value: temp.value,
        time: temp.time,
        ingredients: temp.ingredients,
        x1,
        y1,
        x2,
        y2,
      })
    })

    setPoints(points)
    setTempsWithCoords(tempsWithCoords)
    setWidth(width)

    console.log(width)
    console.log(points)
  }, [])

  return (
    <RecipeChartWrapper>
      <svg viewBox={`0 0 ${width} 222`} style={{ overflow: 'overlay' }}>
        <polyline
          fill="none"
          stroke="#0074d9"
          strokeWidth="3"
          points={points}
        />
        {tempsWithCoords.map((temp, index, all) => {
          let x = temp.x2 - (temp.x2 - temp.x1) / 2
          let y = (110 - temp.value) * 2 - 5

          return (
            <React.Fragment key={index}>
              {temp.ingredients &&
                temp.ingredients.map((ingredient, index) => {
                  let x =
                    (temp.time -
                      (ingredient.time ? ingredient.time : temp.time / 2)) *
                      3 +
                    temp.x1

                  if (ingredient.time && ingredient.time >= temp.time - 5) {
                    x += 5
                  }

                  if (ingredient.time && ingredient.time <= 5) {
                    x -= 5
                  }

                  let y1 = temp.y1 + 20

                  let y2 = !ingredient.time ? temp.y1 : temp.y1 - 20

                  return (
                    <React.Fragment key={index}>
                      <polyline
                        fill="none"
                        stroke="#0074d9"
                        strokeWidth="3"
                        points={`
                        ${x}, ${y1}
                        ${x}, ${y2}
                      `}
                      />
                      <text
                        textAnchor="end"
                        x={x}
                        y={temp.y1 + 25}
                        transform={`rotate(-90, ${x}, ${temp.y1 + 25})`}
                        style={{
                          fontSize: '10px',
                          paintOrder: 'stroke',
                          stroke: 'white',
                          strokeWidth: '3px',
                          strokeLinecap: 'butt',
                          strokeLinejoin: 'miter',
                        }}
                      >
                        {ingredient.name}
                      </text>
                      {ingredient.time && (
                        <text
                          textAnchor="start"
                          x={x}
                          y={temp.y1 - 25}
                          transform={`rotate(-90, ${x}, ${temp.y1 - 25})`}
                          style={{
                            fontSize: '10px',
                            paintOrder: 'stroke',
                            stroke: 'white',
                            strokeWidth: '3px',
                            strokeLinecap: 'butt',
                            strokeLinejoin: 'miter',
                          }}
                        >
                          {temp.time - ingredient.time} мин
                        </text>
                      )}
                    </React.Fragment>
                  )
                })}
              <text
                textAnchor="middle"
                x={x < 0 ? 0 : x}
                y={y}
                style={{
                  fontSize: '10px',
                  paintOrder: 'stroke',
                  stroke: 'white',
                  strokeWidth: '3px',
                  strokeLinecap: 'butt',
                  strokeLinejoin: 'miter',
                }}
              >
                {temp.value}℃
              </text>
              <text
                textAnchor="middle"
                x={x < 0 ? 0 : x}
                y={y + 17}
                style={{
                  fontSize: '10px',
                  paintOrder: 'stroke',
                  stroke: 'white',
                  strokeWidth: '3px',
                  strokeLinecap: 'butt',
                  strokeLinejoin: 'miter',
                }}
              >
                {temp.time} мин
              </text>
            </React.Fragment>
          )
        })}
      </svg>
    </RecipeChartWrapper>
  )
}

export default RecipeChart
