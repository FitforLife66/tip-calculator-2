type SummaryItemProps = {
    label: string, 
    amount: string
}

export default function SummaryItem(props: SummaryItemProps) {
  const { label, amount } = props

  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-white">{label}</p>
        <p className="text-[0.8125rem] text-neutral-grey-400">/ person</p>
      </div>

      <p className="text-primary-green-400 text-[2rem]"><span>$</span>{amount}</p>

    </div>
  )
}