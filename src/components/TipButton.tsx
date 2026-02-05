type TipButtonProps = {
    value: number,
		isActive: any,
    onClick: (value: number) => void		
}

export default function TipButton(props: TipButtonProps) {

	const { value, onClick, isActive } = props;

	return (
		<button className={`
			rounded-md text-2xl py-2
			transition-all duration-150 ease-in-out
			active:bg-primary-green-300 active:text-neutral-green-900
			${isActive 
				? "bg-primary-green-400 text-neutral-green-900" 
				: "bg-neutral-green-900 text-white" }`}
			onClick={() => onClick(value)}
			type="button">
			{value}%            
		</button>
	)
}