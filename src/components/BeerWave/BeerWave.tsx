import React from 'react'
import { BeerWaveWrapper, Wave } from './BeerWave.styles'

import { isMobile } from 'react-device-detect'

const BeerWave: React.FC = () => (
  <BeerWaveWrapper>
    <Wave>
      <svg width="100%" height={isMobile ? '125px' : '200px'} fill="none">
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E2B125" />
          <stop offset="50%" stopColor="#FFD83B" />
          <stop offset="100%" stopColor="#E2B127" />
        </linearGradient>
        <path
          fill="url(#grad1)"
          d="
          M0 67
          C 273,183
            822,-40
            1920.00,106 

          V 359 
          H 0 
          V 67
          Z"
        >
          <animate
            repeatCount="indefinite"
            fill="#454599"
            attributeName="d"
            dur="15s"
            values="
            M0 77 
            C 473,283
              822,-40
              1920,116 

            V 359 
            H 0 
            V 67 
            Z; 

            M0 77 
            C 473,-40
              1222,283
              1920,136 

            V 359 
            H 0 
            V 67 
            Z; 

            M0 77 
            C 973,260
              1722,-53
              1920,120 

            V 359 
            H 0 
            V 67 
            Z; 

            M0 77 
            C 473,283
              822,-40
              1920,116 

            V 359 
            H 0 
            V 67 
            Z
            "
          />
        </path>
      </svg>
    </Wave>
  </BeerWaveWrapper>
)

export default BeerWave
