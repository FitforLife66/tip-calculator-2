import TipButton from "./components/TipButton"
import SummaryItem from "./components/SummaryItem"
import IconDollar from "./components/icons/IconDollar"
import IconPerson from "./components/icons/IconPerson"
import { useState } from "react"
import InputField from "./components/InputField"

type BillData = {
  bill: string | null, 
  percentage: number
  custom: string | null,
  people: string | null,
}

const FLOAT_REGEX = /^\d+(\.\d{0,2})?$/
const INT_REGEX = /^\d+$/
const LANG = 'en-US'
const REPLACE = /,/g    // US thousands characters

const initialbillData: BillData = {
  bill: null,  
  percentage: 0,
  custom: null,
  people: null
}

//  Helper Fuctions
//  ==============================================================

//  Calculating per Person Data
function calcBillData(billData: BillData) {;

  if (!billData.bill || !billData.people) {
    return { tipAmount: "0.00", total: "0.00" } 
  }

  const bill = Number(billData.bill.replace(REPLACE, ''))
  const people = Number(billData.people.replace(REPLACE, ''))

  if (isNaN(bill) || isNaN(people) || people === 0) {
    return { tipAmount: "0.00", total: "0.00" }
  }

  const hasCustom = billData.custom !== null && billData.custom !== ''

  const tipAmount = hasCustom
    ? bill * Number(billData.custom!.replace(REPLACE, '')) / 100 / people
    : billData.percentage
      ? bill * billData.percentage / 100 / people
      : 0

  const total = (bill / people) + tipAmount

  const fmt = new Intl.NumberFormat(LANG, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  return {
    tipAmount: fmt.format(tipAmount),
    total: fmt.format(total)
  }
}

//  App
//  ==============================================================
export default function App() { 
  
  const [billData, setBillData] = useState(initialbillData)
  const summary = calcBillData(billData)
  const hasInput = Boolean(billData.bill && billData.people)


  //  Handlers
  //  ==============================================================
  
  //  Handle Change
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

    const name = e.target.name
    const value = e.target.value
    const regex =
      name === "bill" ? FLOAT_REGEX :
      name === "people" ? INT_REGEX : 
      name === "custom" ? INT_REGEX : 
      null

    if (!regex) return

    //  Regex Test and State Update 
    if (value === "" || regex.test(value)) {
      console.log("value: ", value);
      setBillData(prev => ({
        ...prev,
        [name]: value, 
        percentage: name === "custom" ? 0 : prev.percentage
      }))       
    }
  }

  //  Handle Blur
  function handleBlur(e: React.FocusEvent<HTMLInputElement>) { 

    const name = e.currentTarget.name as keyof BillData;

    setBillData(prev => {
      const raw = prev[name]
      if (typeof raw !== 'string' || raw === '') return prev

      const num = Number(raw.replace(REPLACE, ''))
      if (isNaN(num)) return prev

      return {
        ...prev,
        [name]: new Intl.NumberFormat(LANG).format(num)
      }
    })
  }

  //  Handle Focus
  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {

    const name = e.currentTarget.name as keyof BillData;

    setBillData(prev => {
      const raw = prev[name]
      if (typeof raw !== 'string' || raw === '') return prev;

      const editable = raw.replace(REPLACE, '')   
      return {
        ...prev,
        [name]: editable
      }
    })
  }

  //  Handle Click on Tip %
  function handleClick(value: number) {
    setBillData( prev => ({
      ...prev,
      percentage: value,
      custom: null    // Reset custom percentage
    }))
  }

  //  JSX Return
  //  ==============================================================
  return (
    <div className="max-w-105 mx-auto bg-neutral-grey-200">

      <header>
        <h1 className="
        text-neutral-green-900 text-2xl/[150%] text-shadow-[0_4px_4px_rgb(0_0_0/0.25)] 
        flex flex-col items-center justify-center uppercase tracking-[0.5rem] pt-12.5 pb-10">
          <img src="./logo.svg" alt="" />
        </h1>
      </header>

      <main className="bg-white p-8 rounded-t-3xl">

        {/* Bill */}
        <label htmlFor="bill" className="text-neutral-grey-500 block mb-1.5">
          Bill
        </label>
        <div className="relative mb-8">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9EBBBD]">
            <IconDollar height={17} width={11} />
          </span>
          <InputField
            id="bill" 
            name="bill"
            inputMode="decimal"
            placeholder="0"
            value={billData.bill ?? ""}            
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />

        </div>           
          
        {/* Select Tip */}
        <fieldset className="mb-8">
          <legend className="text-neutral-grey-500 mb-1.5">Select Tip %</legend>
          <div className="grid grid-cols-2 gap-3">
            {[5, 10, 15, 25, 50].map(value => (
              <TipButton
                key={value}
                value={value}
                isActive={billData.percentage === value}
                onClick={handleClick}                
              /> 
            ))}
            <InputField
              type="text"
              name="custom"
              inputMode="numeric"
              value={billData.custom ?? ""} 
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              placeholder="Custom"
             /> 
          </div>
        </fieldset>

        {/* Number of People */}
        <label htmlFor="people" className="text-neutral-grey-500 block mb-1.5">
          Number of People
        </label>
        <div className="relative mb-8">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9EBBBD]">
            <IconPerson height={16} width={13} />
          </span>
          <InputField
            id="people"   
            type="text" 
            inputMode="numeric"            
            name="people"
            placeholder="0"
            value={billData.people ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
        </div>      

        {/* Summary */}
        <section className="bg-neutral-green-900 rounded-2xl px-6 pt-9 pb-6 flex flex-col gap-4">
          <SummaryItem label="Tip Amount" amount={summary.tipAmount} />
          <SummaryItem label="Total" amount={summary.total} />
          <button className={`
            text-xl text-neutral-green-900 rounded-md py-2.5 uppercase
            transition-all duration-150 ease-in-out
            ${hasInput 
              ? "bg-primary-green-400 active:bg-primary-green-300" 
              : "bg-neutral-green-500"}`}
            type="button"
            onClick={() => setBillData(initialbillData)}
            >
            Reset
          </button>
        </section>     
      </main>
    </div>
  )
}


