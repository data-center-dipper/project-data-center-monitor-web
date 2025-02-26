type Segment = [number, number]

export interface LottieEvent {
  play: () => void
  stop: () => void
  setSpeed: (speed: number) => void
  setDirection: (direction: 1 | -1) => void
  goToAndStop: (value: number, isFrame?: boolean) => void
  goToAndPlay: (value: number, isFrame?: boolean) => void
  playSegments: (segments: Segment | Segment[], forceFlag?: boolean) => void
  destroy: () => void
  getDuration: (inFrames: boolean) => void
  [propname: string]: any
}
