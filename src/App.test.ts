import {
  Unit,
  calcPace,
  convertDistance,
  formatSeconds,
  text,
  unitsToStrPlural,
  unitsToStrSingular,
  unselectedUnit,
} from './App'


describe('conversion', () => {
  it('produces all values for running a 10-minute mile', () => {
    const minutes = 10
    const seconds = 0
    const distance = 1
    const unit = Unit.Miles
    expect(convertDistance(distance, Unit.Miles)).toBe(1.60934)
    expect(convertDistance(1.60934, Unit.Kilometers)).toBeCloseTo(1, 5)
    expect(calcPace(minutes, seconds, distance)).toEqual([10, 0])
    expect(calcPace(minutes, seconds, convertDistance(distance, unit))).toEqual([6, 13])
    expect(formatSeconds(seconds)).toBe('00')
    expect(formatSeconds(13)).toBe('13')
    expect(unitsToStrPlural(unit)).toBe('miles')
    expect(unitsToStrPlural(Unit.Kilometers)).toBe('km')
    expect(unitsToStrSingular(unit)).toBe('mile')
    expect(unitsToStrSingular(Unit.Kilometers)).toBe('km')
    expect(unselectedUnit(unit)).toBe(Unit.Kilometers)
    expect(unselectedUnit(Unit.Kilometers)).toBe(Unit.Miles)
    expect(text(minutes, seconds, distance, unit)).toBe(
      'Ran 1 miles (1.61 km) in 10:00;\nAverage pace of 10:00/mile (6:13/km).'
    )
  })
  it('produces all values for running a 8:37-minute mile', () => {
    const minutes = 8
    const seconds = 37
    const distance = 1
    const unit = Unit.Miles
    expect(convertDistance(distance, Unit.Miles)).toBe(1.60934)
    expect(convertDistance(1.60934, Unit.Kilometers)).toBeCloseTo(1, 5)
    expect(calcPace(minutes, seconds, distance)).toEqual([8, 37])
    expect(calcPace(minutes, seconds, convertDistance(distance, unit))).toEqual([5, 21])
    expect(formatSeconds(seconds)).toBe('37')
    expect(formatSeconds(13)).toBe('13')
    expect(unitsToStrPlural(unit)).toBe('miles')
    expect(unitsToStrPlural(Unit.Kilometers)).toBe('km')
    expect(unitsToStrSingular(unit)).toBe('mile')
    expect(unitsToStrSingular(Unit.Kilometers)).toBe('km')
    expect(unselectedUnit(unit)).toBe(Unit.Kilometers)
    expect(unselectedUnit(Unit.Kilometers)).toBe(Unit.Miles)
    expect(text(minutes, seconds, distance, unit)).toBe(
      'Ran 1 miles (1.61 km) in 8:37;\nAverage pace of 8:37/mile (5:21/km).'
    )
  })
})
