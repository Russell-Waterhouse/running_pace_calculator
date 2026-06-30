import './App.css'
import { useState } from 'react'

enum Unit {
  Miles,
  Kilometers,
}

function unitsToStrPlural(unit: Unit) {
  if (unit == Unit.Miles) {
    return "miles";
  }
  return "km";
}

function unitsToStrSingular(unit: Unit) {
  if (unit == Unit.Miles) {
    return "mile";
  }
  return "km";
}

function unselectedUnit(unit: Unit) {
  if (unit == Unit.Miles) {
    return Unit.Kilometers;
  }
  return Unit.Miles;
}

const KM_PER_MILE = 1.60934;

function convertDistance(distance: number, unit: Unit) {

  if (unit == Unit.Miles) {
    return distance * KM_PER_MILE;
  }

  return distance * KM_PER_MILE;
}

function formatSeconds(s: number) {
  return String(s).padStart(2, '0');
}

function calcPace(minutes: number, seconds: number, distance: number) {
  const SECONDS_PER_MIN = 60;
  const totalSeconds = (minutes * SECONDS_PER_MIN) + seconds;
  const secondsPerDistance = totalSeconds / distance;

  const paceMinutes = Math.round(secondsPerDistance / SECONDS_PER_MIN);
  const paceSeconds = Math.round(secondsPerDistance % SECONDS_PER_MIN);
  return [paceMinutes, paceSeconds];
}

function text(minutes: number, seconds: number, distance: number, unit: Unit) {
  const otherUnit = unselectedUnit(unit);
  const [paceMinutesOriginalUnit, paceSecondsOriginalUnit] = calcPace(minutes, seconds, distance);
  const [paceMinutesOtherUnit, paceSecondsOtherUnit] = calcPace(minutes, seconds, convertDistance(distance, unit));
  return `Ran ${distance} ${unitsToStrPlural(unit)} (${convertDistance(distance, unit)} ${unitsToStrPlural(otherUnit)}) in ${minutes}:${formatSeconds(seconds)};
Average pace of ${paceMinutesOriginalUnit}:${formatSeconds(paceSecondsOriginalUnit)}/${unitsToStrSingular(unit)} (${paceMinutesOtherUnit}:${formatSeconds(paceSecondsOtherUnit)}/${unitsToStrSingular(otherUnit)}).`;
}

function App() {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [unit, setUnit] = useState<Unit>(Unit.Miles);

  return (
    <>
      <h1>Running Pace Calculator</h1>
      <div className="card">
        <input
          type="number"
          placeholder="Distance"
          id="name"
          onChange={(e) => setDistance(Number(e.target.value))}
        />
        <br />
        <input
          type="number"
          placeholder="Minutes"
          id="minutes"
          onChange={(e) => setMinutes(Number(e.target.value))}
        />
        <br />
        <input
          type="number"
          placeholder="Seconds"
          id="seconds"
          onChange={(e) => setSeconds(Number(e.target.value))}
        />
        <fieldset>
          <div>
            <input
              type="radio"
              value="Miles"
              id="miles-select"
              checked={unit === Unit.Miles}
              onClick={() => setUnit(Unit.Miles)}
            />
            <label htmlFor="miles-select">Miles</label>
          </div>
          <div>
            <input
              type="radio"
              value="Kilometers"
              id="km-select"
              checked={unit === Unit.Kilometers}
              onClick={() => setUnit(Unit.Kilometers)}
            />
            <label htmlFor="km-select">Kilometers</label>
          </div>
        </fieldset>

        <p>{text(minutes, seconds, distance, unit)}</p>
        <button onClick={() => void navigator.clipboard.writeText(text(minutes, seconds, distance, unit))} >Copy</button>

      </div>
    </>
  )
}

export default App
