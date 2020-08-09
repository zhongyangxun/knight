import React, { FC, CSSProperties } from 'react'
import { ThemeProps } from '../Icon/icon'

interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: CSSProperties;
  theme?: Exclude<ThemeProps, 'light'>;
}

const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme,
  } = props

  return (
    <div
      className="knight-progress"
      style={styles}
    >
      <div
        className="knight-progress-outer"
        style={{
          height: `${strokeHeight}px`
        }}
      >
        <div
          className={`knight-progress-inner color-${theme}`}
          style={{
            width: `${percent}%`
          }}
        >
          { showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary',
}

export default Progress
